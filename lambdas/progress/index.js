// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();

exports.handler = async (event) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    };

    try {
        const result = await stepfunctions.describeExecution({ executionArn: JSON.parse(event.body).executionArn }).promise();
        response.body = result.status;
        
        console.log(JSON.stringify(result));
    }
    catch (e) {
        console.log(e);
        
        response.statusCode = 500;
        response.body = JSON.stringify(e);
    }

    return response;
};
