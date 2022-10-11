// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
const connect = new AWS.Connect();

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
    
    let params = {
        // TODO implement listing instances for large numbers of instances
    }
    
    try {
        const results = await connect.listInstances(params).promise();
        
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
