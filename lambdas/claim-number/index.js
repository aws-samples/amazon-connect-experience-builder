// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Import the AWS SDK v3 Connect client
const { ConnectClient, ClaimPhoneNumberCommand, AssociatePhoneNumberContactFlowCommand } = require('@aws-sdk/client-connect');

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

    let phoneResource = event.resources.find(o => o.type == "phoneNumber");
    let instanceArn = event.experience.instance;
    let contactFlowArn = event.resources.find(o => (o.type == "contact_flow" && o.name.startsWith(event.experience.title + "_SEB - Setup"))).arn;

    console.log(contactFlowArn);

    let params = {
        PhoneNumber: phoneResource.name,
        TargetArn: instanceArn,
        PhoneNumberDescription: "Claimed by SMB"
    }

    try {
        // Create and send the ClaimPhoneNumberCommand
        const claimCommand = new ClaimPhoneNumberCommand(params);
        let result = await connect.send(claimCommand);

        phoneResource.arn = result.PhoneNumberArn;

        params = {
            ContactFlowId: contactFlowArn.rsplit("/", 1)[1],
            InstanceId: instanceArn.rsplit("/", 1)[1],
            PhoneNumberId: phoneResource.arn.rsplit("/", 1)[1]
        }

        result = await associateContactFlow(params);
    }
    catch (e) {
        console.log(e);
    }

    return event;

    async function associateContactFlow(params) {
        return new Promise((res, rej) => {
            setTimeout(async () => {
                try {
                    // Create and send the AssociatePhoneNumberContactFlowCommand
                    const associateCommand = new AssociatePhoneNumberContactFlowCommand(params);
                    let result = await connect.send(associateCommand);

                    res(true);
                }
                catch (e) {
                    console.log(e);
                    rej(e);
                }
            }, 6000)
        })
    }
};
