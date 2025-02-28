// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Lambda function to list Amazon Connect instances
 * Returns a list of Connect instances with their ARNs and aliases
 */

const { ConnectClient, ListInstancesCommand } = require('@aws-sdk/client-connect');
const connect = new ConnectClient();

/**
 * Lambda handler to list Connect instances
 * @param {Object} event - API Gateway event
 * @returns {Object} HTTP response containing list of instances
 */
exports.handler = async (event) => {
    console.log(event);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    };
    
    const params = {
        // TODO implement listing instances for large numbers of instances
    };
    
    try {
        const command = new ListInstancesCommand(params);
        const results = await connect.send(command);
        
        const data = results.InstanceSummaryList.map(item => ({ 
            Arn: item.Arn,
            InstanceAlias: item.InstanceAlias
        }));
        
        response.body = JSON.stringify(data);
    } catch (error) {
        console.error('Error listing instances:', error);
        
        response.statusCode = 500;
        response.body = JSON.stringify(error);
    }
    
    return response;
};
