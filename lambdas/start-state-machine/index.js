// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();

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
    var params = {
        stateMachineArn: process.env.STATE_MACHINE_ARN,
        input: event.body,
        name: uuid()
    };
    
    try {
        const res = await stepfunctions.startExecution(params).promise();
        response.body = res.executionArn;
    } catch (e) {
        console.log(e);
    }
    
    return response;
};
