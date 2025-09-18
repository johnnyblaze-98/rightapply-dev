const { DynamoDBClient, GetItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const dynamodb = new DynamoDBClient({});
const TABLE_NAME = 'rightapply-registrations';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

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

function generateCsv(items) {
  if (!items.length) return 'No data available';
  
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
        delete item.resumeEmailPassword;

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

    const limit = Math.min(parseInt(params.limit) || 50, 100);
    const format = params.format;

    let scanParams = {
      TableName: TABLE_NAME,
      Limit: limit
    };

    try {
      const result = await dynamodb.send(new ScanCommand(scanParams));
      let items = result.Items.map(item => {
        const unmarshalled = unmarshall(item);
        delete unmarshalled.resumeEmailPassword;
        return unmarshalled;
      });

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

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          items,
          count: items.length,
          scannedCount: result.ScannedCount
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