const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { SecretsManagerClient, CreateSecretCommand } = require('@aws-sdk/client-secrets-manager');
const { marshall } = require('@aws-sdk/util-dynamodb');
const crypto = require('crypto');

const dynamodb = new DynamoDBClient({});
const s3 = new S3Client({});
const secretsManager = new SecretsManagerClient({});

const TABLE_NAME = process.env.TABLE_NAME;
const RAW_BUCKET = process.env.RAW_BUCKET;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const SECRET_PREFIX = process.env.SECRET_PREFIX;

const corsHeaders = {
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key',
  'Access-Control-Max-Age': '86400'
};

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
    // Parse request body
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

    // Validate required fields
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.resumeEmail)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Generate ID and timestamp
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const datePrefix = createdAt.split('T')[0]; // YYYY-MM-DD

    // Extract password and create secret
    const { resumeEmailPassword, ...dataWithoutPassword } = body;
    const secretId = `${SECRET_PREFIX}/${id}/resumeEmailPassword`;

    try {
      await secretsManager.send(new CreateSecretCommand({
        Name: secretId,
        SecretString: resumeEmailPassword,
        Description: `Resume email password for registration ${id}`,
        Tags: [
          { Key: 'RegistrationId', Value: id },
          { Key: 'CreatedAt', Value: createdAt },
          { Key: 'Purpose', Value: 'ResumeEmailPassword' }
        ]
      }));
    } catch (error) {
      console.error('Failed to create secret:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to store credentials securely' })
      };
    }

    // Prepare DynamoDB item
    const dbItem = {
      id,
      createdAt,
      resumeEmailPasswordSecretId: secretId,
      ...dataWithoutPassword,
      // Ensure arrays are properly handled
      sectors: body.sectors || [],
      clients: body.clients || []
    };

    // Save to DynamoDB
    try {
      await dynamodb.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: marshall(dbItem, { removeUndefinedValues: true })
      }));
    } catch (error) {
      console.error('Failed to save to DynamoDB:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to save registration data' })
      };
    }

    // Save raw JSON to S3 (without password)
    const s3Key = `registrations/${datePrefix}/${id}.json`;
    const s3Data = {
      id,
      createdAt,
      ...dataWithoutPassword,
      sectors: body.sectors || [],
      clients: body.clients || []
    };

    try {
      await s3.send(new PutObjectCommand({
        Bucket: RAW_BUCKET,
        Key: s3Key,
        Body: JSON.stringify(s3Data, null, 2),
        ContentType: 'application/json',
        Metadata: {
          'registration-id': id,
          'created-at': createdAt
        }
      }));
    } catch (error) {
      console.error('Failed to save to S3:', error);
      // Don't fail the request if S3 fails, but log it
    }

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