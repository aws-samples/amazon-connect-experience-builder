// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 StepFunctions client
const { SFNClient, StartExecutionCommand } = require('@aws-sdk/client-sfn');

// Initialize the StepFunctions client
const stepfunctions = new SFNClient();

const { v4: uuid } = require('uuid');

exports.handler = async (event) => {

    console.log(event);

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    };

    console.log(uuid());
    const params = {
        stateMachineArn: process.env.STATE_MACHINE_ARN,
        input: event.body,
        name: uuid()
    };
    
    try {
        // Create and send the StartExecutionCommand
        const command = new StartExecutionCommand(params);
        const res = await stepfunctions.send(command);
        response.body = res.executionArn;
    } catch (e) {
        console.log(e);
    }
    
    return response;
};
