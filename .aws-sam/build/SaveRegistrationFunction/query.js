const { DynamoDBClient, GetItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const dynamodb = new DynamoDBClient({});

const TABLE_NAME = process.env.TABLE_NAME;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const corsHeaders = {
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

// Convert DynamoDB item to CSV row
function itemToCsvRow(item, headers) {
  return headers.map(header => {
    let value = item[header];
    if (value === undefined || value === null) return '';
    if (Array.isArray(value)) return `"${value.join('; ')}"`;
    if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
    if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return String(value);
  }).join(',');
}

// Generate CSV from items
function generateCsv(items) {
  if (!items.length) return 'No data available';
  
  // Define CSV headers (exclude sensitive fields)
  const headers = [
    'id', 'createdAt', 'preferredName', 'dateOfBirth', 'linkedinUrl',
    'resumeEmail', 'resumePhone', 'personalPhone', 'fullAddress',
    'sectors', 'mastersUniversityField', 'mastersGraduatedCompleted',
    'bachelorsUniversityField', 'bachelorsGraduatedCompleted',
    'currentVisaStatus', 'arrivalDateUSA', 'certificationsAchievements',
    'preferredMarketingRole', 'consentApply', 'consentEmailAccess',
    'legalName', 'signedDate'
  ];
  
  const csvRows = [headers.join(',')];
  items.forEach(item => {
    csvRows.push(itemToCsvRow(item, headers));
  });
  
  return csvRows.join('\n');
}

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle CORS preflight
  if (event.requestContext.http.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const { pathParameters, queryStringParameters } = event;
    const params = queryStringParameters || {};

    // Get single registration by ID
    if (pathParameters && pathParameters.id) {
      const { id } = pathParameters;
      
      try {
        const result = await dynamodb.send(new GetItemCommand({
          TableName: TABLE_NAME,
          Key: { id: { S: id } }
        }));

        if (!result.Item) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Registration not found' })
          };
        }

        const item = unmarshall(result.Item);
        // Remove sensitive fields from response
        delete item.resumeEmailPasswordSecretId;

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(item)
        };
      } catch (error) {
        console.error('Failed to get item:', error);
        return {
          statusCode: 500,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Failed to retrieve registration' })
        };
      }
    }

    // List registrations with optional filters
    const limit = Math.min(parseInt(params.limit) || 50, 100);
    const format = params.format;
    const visaFilter = params.visa;
    const sectorFilter = params.sector;
    const dateFrom = params.date_from;
    const dateTo = params.date_to;

    let scanParams = {
      TableName: TABLE_NAME,
      Limit: limit
    };

    // Build filter expression
    let filterExpressions = [];
    let expressionAttributeValues = {};
    let expressionAttributeNames = {};

    if (visaFilter) {
      filterExpressions.push('#visa = :visa');
      expressionAttributeNames['#visa'] = 'currentVisaStatus';
      expressionAttributeValues[':visa'] = { S: visaFilter };
    }

    if (sectorFilter) {
      filterExpressions.push('contains(sectors, :sector)');
      expressionAttributeValues[':sector'] = { S: sectorFilter };
    }

    if (filterExpressions.length > 0) {
      scanParams.FilterExpression = filterExpressions.join(' AND ');
      scanParams.ExpressionAttributeValues = expressionAttributeValues;
      if (Object.keys(expressionAttributeNames).length > 0) {
        scanParams.ExpressionAttributeNames = expressionAttributeNames;
      }
    }

    try {
      const result = await dynamodb.send(new ScanCommand(scanParams));
      let items = result.Items.map(item => {
        const unmarshalled = unmarshall(item);
        // Remove sensitive fields
        delete unmarshalled.resumeEmailPasswordSecretId;
        return unmarshalled;
      });

      // Post-filter by date range (since DynamoDB scan doesn't support range on non-key attributes efficiently)
      if (dateFrom || dateTo) {
        items = items.filter(item => {
          const itemDate = item.createdAt;
          if (dateFrom && itemDate < dateFrom) return false;
          if (dateTo && itemDate > dateTo + 'T23:59:59.999Z') return false;
          return true;
        });
      }

      // Return CSV format if requested
      if (format === 'csv') {
        const csv = generateCsv(items);
        return {
          statusCode: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="registrations-${new Date().toISOString().split('T')[0]}.csv"`
          },
          body: csv
        };
      }

      // Return JSON format
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          items,
          count: items.length,
          scannedCount: result.ScannedCount,
          filters: {
            visa: visaFilter,
            sector: sectorFilter,
            dateFrom,
            dateTo,
            limit
          }
        })
      };

    } catch (error) {
      console.error('Failed to scan items:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to retrieve registrations' })
      };
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};