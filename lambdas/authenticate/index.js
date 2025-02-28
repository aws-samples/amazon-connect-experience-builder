// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Authentication Lambda function that validates API keys against a DynamoDB table
 * This function serves as an authentication mechanism for API requests by validating
 * provided API keys and returning associated email addresses if found
 */

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const ddb = new DynamoDB();

/**
 * Lambda handler function that processes API key authentication requests
 * @param {Object} event - API Gateway event object containing the request details
 * @returns {Object} Response object with authentication result
 *                   Status 200: Successfully authenticated with email
 *                   Status 400: Invalid request format
 *                   Status 403: Invalid API key
 *                   Status 500: Server error
 */
exports.handler = async (event) => {
    // Set up CORS-enabled response headers
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200
    };

    let body = {};

    /**
     * Validate incoming request structure and API key presence
     * Ensures the request contains a body and a valid API key
     */
    if (!event) {
        response.statusCode = 400;
        response.body = "No body in request";
        return response;
    }

    try {
        body = JSON.parse(event.body);
        
        if (!body.apiKey || body.apiKey.length === 0) {
            response.statusCode = 400;
            response.body = "Body has no API key";
            return response;
        }
    } catch (e) {
        console.error(e);
        response.statusCode = 400;
        response.body = "Body is not JSON";
        return response;
    }

    /**
     * Query DynamoDB to validate the API key and retrieve associated email
     * Uses environment variable TABLE for the DynamoDB table name
     */
    const params = {
        TableName: process.env.TABLE,
        Key: {
            'apiKey': { S: body.apiKey }
        }
    };
    
    try {
        const result = await ddb.getItem(params);
        console.log(result);
        
        if (result.Item) {
            // API key found, return associated email
            response.statusCode = 200;
            response.body = result.Item.email.S;
            console.log(response);
        } else {
            // API key not found in database
            response.statusCode = 403;
        }
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = "Couldn't read users table.";
        return response;
    }

    return response;
};
