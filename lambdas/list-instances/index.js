// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 Connect client
const { ConnectClient, ListInstancesCommand } = require('@aws-sdk/client-connect');

// Initialize the Connect client
const connect = new ConnectClient();

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
        // Create and send the ListInstancesCommand
        const command = new ListInstancesCommand(params);
        const results = await connect.send(command);
        
        let data = results.InstanceSummaryList.map(item => { 
            let mapped = {};
            
            mapped.Arn = item.Arn;
            mapped.InstanceAlias = item.InstanceAlias;
            
            return mapped;
        });
        
        response.body = JSON.stringify(data);
    } catch (e) {
        console.log(e);
        
        response.statusCode = 500;
        response.body = JSON.stringify(e);
    }
    
    return response;
};
