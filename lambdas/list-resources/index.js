// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const { ConnectClient, ListQueuesCommand } = require('@aws-sdk/client-connect');
const connect = new ConnectClient();

/**
 * Re-implementation of Python rsplit
 */
String.prototype.rsplit = function(sep, maxsplit) {
    const split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};

/**
 * Lambda handler to list Connect resources
 * @param {Object} event - API Gateway event containing instance ARN
 * @returns {Object} HTTP response containing list of resources
 */
exports.handler = async (event) => {
    console.log(event);
    
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200
    };
    
    let body = {};
    
    /**
     * Request validation
     */
    if (event) {
        try {
            body = JSON.parse(event.body);
        } catch (e) {
            console.log(e);
            
            response.statusCode = 400;
            response.body = "Body is not JSON";
            
            return response;
        }
    } else {
        response.statusCode = 400;
        response.body = "No body in request";
            
        return response;
    }

    // List queues
    let queues = [];
    
    try {
        const instanceId = body.instanceArn.rsplit("/", 1)[1];
        await getQueuesInInstance(instanceId);
        
        const queueData = queues.map(queue => ({ 
            name: queue.Name, 
            arn: queue.Arn, 
            type: "queue" 
        }));
        
        response.body = JSON.stringify(queueData);
       
    } catch (error) {
        console.error('Error listing resources:', error);
        response.statusCode = 500;
        response.body = JSON.stringify({ error: "Error listing resources" });
    }
    
    return response;
    
    /**
     * Gets all queues in a Connect instance
     * @param {string} instance - Instance ID
     * @param {string} nextToken - Token for pagination
     * @returns {Promise} Promise that resolves when all queues are retrieved
     */
    async function getQueuesInInstance(instance, nextToken) {
        console.log('Getting queues in instance');
        
        const params = {
            InstanceId: instance,
            MaxResults: 100,
            QueueTypes: ["STANDARD"],
            NextToken: nextToken
        };

        try {
            const command = new ListQueuesCommand(params);
            const data = await connect.send(command);
            
            queues = queues.concat(data.QueueSummaryList);
            
            if (data.NextToken) {
                await getQueuesInInstance(instance, data.NextToken);
            }
            
            return Promise.resolve();
        } catch (error) {
            console.error('Error getting queues:', error);
            return Promise.reject(error);
        }
    }
};
