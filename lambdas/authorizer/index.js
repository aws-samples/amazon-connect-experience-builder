// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Lambda Authorizer for API Gateway
 * Validates API keys against a DynamoDB table and generates an IAM policy
 * to allow or deny access to the API endpoints
 */

const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const ddb = new DynamoDB();

/**
 * Lambda handler function that implements a custom authorizer
 * @param {Object} event - API Gateway authorizer event containing headers with Authorization
 * @returns {Object} IAM policy document determining if the request should be allowed or denied
 */
exports.handler = async (event) => {
    // Initialize default deny-all policy
    const response = {
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
    };

    /**
     * Query DynamoDB to validate the API key from Authorization header
     * Uses environment variable TABLE for the DynamoDB table name
     */
    const params = {
        TableName: process.env.TABLE,
        Key: {
            'apiKey': { S: event.headers.Authorization }
        }
    };
    
    try {
        const result = await ddb.getItem(params);

        // If API key exists in DynamoDB, update policy to allow access
        if (result.Item) {
            response.policyDocument.Statement[0].Effect = "Allow";
        }
    } catch (e) {
        console.error('Error validating API key:', e);
    }

    return response;
};
