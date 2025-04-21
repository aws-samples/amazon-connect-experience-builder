// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 Connect client
const { ConnectClient, CreateQueueCommand } = require('@aws-sdk/client-connect');

// Initialize the Connect client
const connect = new ConnectClient();

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
            const queueParams = {
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
            setTimeout(async () => {
                console.log("Creating a queue");

                try {
                    // Create and send the CreateQueueCommand
                    const command = new CreateQueueCommand(param);
                    const data = await connect.send(command);
                    
                    queuesResource.find(q => q.name == param.Name).arn = data.QueueArn;
                    res(data);
                } catch (err) {
                    console.log(err);
                    res(false);
                }
            }, timeout);
        });
    }
};
