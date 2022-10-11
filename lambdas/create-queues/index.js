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


exports.handler = async (event) => {
    
    console.log(event);

    event.resources.push({
        name: event.experience.title + "_default_" + Date.now(),
        type: "queue",
        arn: ""
    });

    let queuesResource = event.resources.filter(o => o.type == "queue");
    let hopResource = event.resources.find(o => o.type == "hop");
    const instanceId = event.experience.instance.rsplit("/", 1)[1];

    for (let i = 0; i < queuesResource.length; i++) {
        if (queuesResource[i].arn == '') {
            var queueParams = {
                InstanceId: instanceId,
                Name: queuesResource[i].name,
                HoursOfOperationId: hopResource.arn.rsplit("/", 1)[1]
            }
            
            console.log(queueParams);

            await createQueueAsync(queueParams, 1000);
        }
    }
    
    console.log(queuesResource);
    console.log(event);

    const response = event;
    
    return response;
    
    
    
    async function createQueueAsync(param, timeout) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log("Creating a queue");

                let result = connect.createQueue(param, (err, data) => {
                    if (err) {
                        console.log(err);

                        res(false);
                    }
                    else {
                        queuesResource.find(q => q.name == param.Name).arn = data.QueueArn;
                        
                        res(data);
                    }
                });
            }, timeout);
        });
    }
    
};
