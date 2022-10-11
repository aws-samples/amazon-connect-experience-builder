// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
const connect = new AWS.Connect();


/**
 * Re-implementation of Python rsplit
 **/
String.prototype.rsplit = function(sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};
// event.body will contain an object with an instanceId property and 
// an array of resources that need to be created

// we want to compare these to the existing resources in the intance

// resources we need to care about:
// - queues
exports.handler = async (event) => {
    
    console.log(event);
    
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200
    };
    
    let body = {}
    
    /**
     * Request validation
    **/
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
    /** **/
    
    // TODO implement
    // We need to list queues
    let queues = [];
    
    try {
        const instanceId = body.instanceArn.rsplit("/", 1)[1];
        
        
        await getQueuesInInstance(instanceId);
        
        let queueData = queues.map(queue => { return {name: queue.Name, arn: queue.Arn, type: "queue" }});
        
        response.body = JSON.stringify(queueData);
       
    } catch (e) {
        console.log(e);
        
        response.statusCode = 500;
        response.body = "Error!";
    }
    
    
    
    return response;
    
    
    
    async function getQueuesInInstance(instance, nextToken) {
        console.log('Getting queues in instance.')
        var params = {
            InstanceId: instance,
            /* required */
            MaxResults: 100,
            QueueTypes: [
                "STANDARD"
            ],
            NextToken: nextToken
        };

        return new Promise((resolve, reject) => {
            connect.listQueues(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                else {
                    queues = queues.concat(data.QueueSummaryList);
                    if (data.NextToken) {
                        getQueuesInInstance(instance, data.NextToken);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
    }
};
