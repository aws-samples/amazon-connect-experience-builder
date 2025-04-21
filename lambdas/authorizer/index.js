// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 DynamoDB client
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');

// Initialize the DynamoDB client
const ddb = new DynamoDBClient();

exports.handler = async (event) => {
    let response = {
        "principalId": "user",
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [{
                "Action": "execute-api:Invoke",
                "Effect": "Deny",
                "Resource": process.env.API + "/dev/*/*"
            }]
        },
        "context": {}
    }

    const params = {
        TableName: process.env.TABLE,
        Key: {
            'apiKey': { S: event.headers.Authorization }
        }
    };
    
    try {
        // Create and send the GetItemCommand
        const command = new GetItemCommand(params);
        const result = await ddb.send(command);

        if (result.Item) {
            response.policyDocument.Statement[0].Effect = "Allow"
        }
    } catch (e) {
        console.log(e);
    }

    return response;
};
