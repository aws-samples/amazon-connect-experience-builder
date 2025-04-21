// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 DynamoDB client
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');

// Initialize the DynamoDB client
const ddb = new DynamoDBClient();

exports.handler = async (event) => {
    
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200
    };

    let body = {}

    /**
     * Request validation
    **/
    if (event) {
        try {
            body = JSON.parse(event.body);
            
            if (!body.apiKey || body.apiKey.length == 0) {
                response.statusCode = 400;
                response.body = "Body has no API key";
            
                return response;
            }
        } catch (e) {
            console.log(e);
            
            response.statusCode = 400;
            response.body = "Body is not JSON";
            
            return response;
        }
    } else {
        response.statusCode = 400;
        response.body = "No body in request";
            
        return response;
    }


    const params = {
        TableName: process.env.TABLE,
        Key: {
            'apiKey': { S: body.apiKey }
        }
    };
    
    try {
        // Create and send the GetItemCommand
        const command = new GetItemCommand(params);
        const result = await ddb.send(command);
        
        console.log(result);
        if (result.Item) {
            response.statusCode = 200;
            response.body = result.Item.email.S;
            
            console.log(response);
        } else {
            response.statusCode = 403; 
        }
    } catch (e) {
        console.log(e);
        
        response.statusCode = 500;
        response.body = "Couldn't read users table.";
        
        return response;
    }

    return response;
};
