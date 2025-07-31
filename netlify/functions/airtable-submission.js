const Airtable = require('airtable');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    
    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.ATRTABLE_API_KEY })
      .base(process.env.ATRTABLE_BASE_ID);

    // Create record
    const record = await base(process.env.ATRTABLE_TABLE_NAME).create(body.fields);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Submission successful',
        recordId: record.id 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Error submitting to Airtable',
        error: error.message 
      })
    };
  }
};
