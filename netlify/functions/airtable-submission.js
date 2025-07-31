const Airtable = require('airtable');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming data
    const body = JSON.parse(event.body);
    
    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.ATRTABLE_API_KEY })
      .base(process.env.ATRTABLE_BASE_ID);

    // Create record in Airtable
    const record = await base(process.env.ATRTABLE_TABLE_NAME).create(body.fields);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Submission successful',
        recordId: record.id 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error submitting to Airtable',
        error: error.message 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};
