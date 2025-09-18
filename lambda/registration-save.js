const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const crypto = require('crypto');

const dynamodb = new DynamoDBClient({});
const TABLE_NAME = 'rightapply-registrations';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key',
  'Access-Control-Max-Age': '86400'
};

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
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const requiredFields = [
      'preferredName', 'resumeEmail', 'resumePhone', 'resumeEmailPassword',
      'personalPhone', 'fullAddress', 'currentVisaStatus', 'legalName', 'signedDate'
    ];

    const missingFields = requiredFields.filter(field => !body[field] || body[field].toString().trim() === '');
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing required fields', 
          missingFields 
        })
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.resumeEmail)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const dbItem = {
      id,
      createdAt,
      ...body,
      sectors: body.sectors || [],
      clients: body.clients || []
    };

    await dynamodb.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: marshall(dbItem, { removeUndefinedValues: true })
    }));

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({
        id,
        createdAt,
        message: 'Registration saved successfully'
      })
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};