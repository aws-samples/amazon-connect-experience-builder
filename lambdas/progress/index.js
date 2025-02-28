// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const { SFNClient, DescribeExecutionCommand } = require('@aws-sdk/client-sfn');
const sfn = new SFNClient();

/**
 * Lambda handler to check Step Functions execution progress
 * @param {Object} event - API Gateway event containing execution ARN
 * @returns {Object} HTTP response containing execution status
 */
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify('Hello from Lambda!')
    };

    try {
        const command = new DescribeExecutionCommand({ 
            executionArn: JSON.parse(event.body).executionArn 
        });
        const result = await sfn.send(command);
        response.body = result.status;
        
        console.log(JSON.stringify(result));
    }
    catch (error) {
        console.error('Error describing execution:', error);
        
        response.statusCode = 500;
        response.body = JSON.stringify(error);
    }

    return response;
};
