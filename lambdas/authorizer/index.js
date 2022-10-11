// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB();

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

    var params = {
        TableName: process.env.TABLE,
        Key: {
            'apiKey': { S: event.headers.Authorization }
        }
    };
    
    try {
        const result = await ddb.getItem(params).promise();

        if (result.Item) {
            response.policyDocument.Statement[0].Effect = "Allow"
            
        }
    } catch (e) {
        console.log(e);
    }

    return response;
};
