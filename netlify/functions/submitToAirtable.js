const Airtable = require('airtable');

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

    await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          Name: name,
          Email: email,
          Message: message
        }
      }
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Submission failed', details: error.message })
    };
  }
};
