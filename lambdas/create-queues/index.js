// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Lambda function to create queues in Amazon Connect
 * Creates and configures queues with specified hours of operation
 */

const { ConnectClient, CreateQueueCommand } = require('@aws-sdk/client-connect');
const connect = new ConnectClient();

/**
 * Helper function to split a string from the right side
 * @param {string} sep - Separator to split on
 * @param {number} maxsplit - Maximum number of splits
 * @returns {Array} Array of split string parts
 */
String.prototype.rsplit = function(sep, maxsplit) {
    const split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};

/**
 * Lambda handler to process queue creation
 * @param {Object} event - Event containing experience and resource configuration
 * @returns {Object} Modified event object with created queue details
 */
exports.handler = async (event) => {
    console.log(event);

    // Add default queue if none exists
    event.resources.push({
        name: event.experience.title + "_default_" + Date.now(),
        type: "queue",
        arn: ""
    });

    // Get queues and HOP resources
    const queuesResource = event.resources.filter(o => o.type === "queue");
    const hopResource = event.resources.find(o => o.type === "hop");
    const instanceId = event.experience.instance.rsplit("/", 1)[1];

    // Create each queue
    for (const queue of queuesResource) {
        if (queue.arn === '') {
            const queueParams = {
                InstanceId: instanceId,
                Name: queue.name,
                HoursOfOperationId: hopResource.arn.rsplit("/", 1)[1]
            };
            
            console.log(queueParams);

            try {
                await createQueueAsync(queueParams, 1000);
            } catch (error) {
                console.error("Error creating queue:", error);
                // Continue with next queue if one fails
            }
        }
    }
    
    console.log(queuesResource);
    console.log(event);

    return event;
};

/**
 * Creates a queue with retry mechanism
 * @param {Object} param - Queue parameters
 * @param {number} timeout - Delay before creation in milliseconds
 * @returns {Promise} Promise that resolves when queue is created
 */
async function createQueueAsync(param, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                console.log("Creating a queue");
                const command = new CreateQueueCommand(param);
                const data = await connect.send(command);
                
                if (data.QueueArn) {
                    // Update queue resource with ARN
                    const queue = queuesResource.find(q => q.name === param.Name);
                    if (queue) {
                        queue.arn = data.QueueArn;
                    }
                    resolve(data);
                } else {
                    reject(new Error("No QueueArn returned"));
                }
            } catch (error) {
                console.error("Error in createQueueAsync:", error);
                reject(error);
            }
        }, timeout);
    });
}
