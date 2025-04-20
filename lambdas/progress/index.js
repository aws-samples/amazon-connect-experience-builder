// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 StepFunctions client
const { SFNClient, DescribeExecutionCommand } = require('@aws-sdk/client-sfn');

// Initialize the StepFunctions client
const stepfunctions = new SFNClient();

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
        // Create and send the DescribeExecutionCommand
        const command = new DescribeExecutionCommand({ executionArn: JSON.parse(event.body).executionArn });
        const result = await stepfunctions.send(command);
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
