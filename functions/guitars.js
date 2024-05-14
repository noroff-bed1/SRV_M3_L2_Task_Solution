const { v4: uuidv4 } = require('uuid');
const guitars = require('../guitarData.js');

exports.handler = async (event) => {
    const { httpMethod, body } = event;

    if (httpMethod === 'GET') {
        // Get guitars logic
        return {
            statusCode: 200,
            body: JSON.stringify(guitars)
        };
    }

    if (httpMethod === 'POST') {
        const newGuitar = JSON.parse(body);
        newGuitar.id = uuidv4();
        guitars.push(newGuitar);

        return {
            statusCode: 201,
            body: JSON.stringify(newGuitar)
        };
    }
    if (httpMethod === 'DELETE') {
        const requestBody = JSON.parse(body);
        const { id } = requestBody;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'ID parameter is missing in the request body' })
            };
        }

        const index = guitars.findIndex(guitar => guitar.id === id);
        if (index !== -1) {
            guitars.splice(index, 1);
            return {
                statusCode: 204
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Guitar not found' })
            };
        }
    }

    // Handle unsupported methods
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
    };
};