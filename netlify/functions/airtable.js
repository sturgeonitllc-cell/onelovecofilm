const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const { data } = await axios.get(
            `https://api.airtable.com/v0/${process.env.ATRTABLE_BASE_ID}/${process.env.ATRTABLE_TABLE_NAME}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.ATRTABLE_API_KEY}`
                }
            }
        );
        
        return {
            statusCode: 200,
            body: JSON.stringify(data.records)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' })
        };
    }
};
