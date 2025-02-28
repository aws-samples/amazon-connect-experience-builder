// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const { SFNClient, StartExecutionCommand } = require('@aws-sdk/client-sfn');

const sfn = new SFNClient();

/**
 * Lambda handler to start a Step Functions state machine execution
 * @param {Object} event - API Gateway event containing execution input
 * @returns {Object} HTTP response containing execution ARN
 */
exports.handler = async (event) => {
    console.log(event);

    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify('Hello from Lambda!')
    };

    const params = {
        stateMachineArn: process.env.STATE_MACHINE_ARN,
        input: event.body,
        name: Date.now()
    };
    
    try {
        const command = new StartExecutionCommand(params);
        const result = await sfn.send(command);
        response.body = result.executionArn;
    } catch (error) {
        console.error('Error starting execution:', error);
        response.statusCode = 500;
        response.body = JSON.stringify(error);
    }
    
    return response;
};
