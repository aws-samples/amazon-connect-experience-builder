// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require("aws-sdk");
const connect = new AWS.Connect();


/**
 * Re-implementation of Python rsplit
 **/
String.prototype.rsplit = function(sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};


exports.handler = async (event) => {

    const instanceId = event.experience.instance.rsplit("/", 1)[1];
    let hopResource = event.resources.find(o => o.type == "hop");

    console.log("Starting with resource:", hopResource);

    let hoursOfOperation = [{
            "Day": "FRIDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        },
        {
            "Day": "SUNDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        },
        {
            "Day": "SATURDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        },
        {
            "Day": "WEDNESDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        },
        {
            "Day": "THURSDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        },
        {
            "Day": "TUESDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        },
        {
            "Day": "MONDAY",
            "StartTime": {
                "Hours": 0,
                "Minutes": 0
            },
            "EndTime": {
                "Hours": 0,
                "Minutes": 0
            }
        }
    ];

    if (event.experience.checkHours) {
        hoursOfOperation = [];

        Object.keys(event.experience.hoursOfOperation).forEach(hop => {
            if (Object.keys(event.experience.hoursOfOperation[hop]).length != 0) {
                hoursOfOperation.push({
                    "Day": hop.toUpperCase(),
                    "StartTime": {
                        "Hours": parseInt(event.experience.hoursOfOperation[hop]['fromHours']),
                        "Minutes": parseInt(event.experience.hoursOfOperation[hop]['fromMinutes'])
                    },
                    "EndTime": {
                        "Hours": parseInt(event.experience.hoursOfOperation[hop]['toHours']),
                        "Minutes": parseInt(event.experience.hoursOfOperation[hop]['toMinutes'])
                    },
                });
            }
        });
    }

    let hoursParams = {
        "Name": event.resources.find(o => o.type == "hop").name,
        "Description": "Generated by SMB tool",
        "TimeZone": event.experience.checkHours ? event.experience.timezone : "UTC",
        "Config": hoursOfOperation,
        "InstanceId": instanceId
    }
    
    console.log(JSON.stringify(hoursParams));
    
    await createHopAsync(hoursParams, 1000);

    // TODO implement
    const response = event;

    return response;



    async function createHopAsync(param, timeout) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log("Creating a hop");

                let result = connect.createHoursOfOperation(param, (err, data) => {
                    if (err) {
                        console.log(err);

                        hopResource.message = err.code;

                        res(false);
                    }
                    else {
                        console.log(data);
                        hopResource.arn = data.HoursOfOperationArn;

                        res(data);
                    }
                });
            }, timeout);
        });
    }
};
