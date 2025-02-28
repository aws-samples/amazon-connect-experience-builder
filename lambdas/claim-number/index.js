// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Lambda function to claim and configure Amazon Connect phone numbers
 * Handles phone number claiming and associates it with a contact flow
 */

const { Connect } = require('@aws-sdk/client-connect');
const connect = new Connect();

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
 * Lambda handler to process phone number claiming for Amazon Connect
 * @param {Object} event - Event containing experience and resource information
 * @returns {Object} Modified event object with claimed phone number details
 */
exports.handler = async (event) => {
    // Find required resources from the event
    const phoneResource = event.resources.find(o => o.type == "phoneNumber");
    const instanceArn = event.experience.instance;
    const contactFlowArn = event.resources.find(o => 
        (o.type == "contact_flow" && o.name.startsWith(event.experience.title + "_SEB - Setup"))
    ).arn;

    console.log('Contact Flow ARN:', contactFlowArn);

    // Prepare parameters for claiming phone number
    const claimParams = {
        PhoneNumber: phoneResource.name,
        TargetArn: instanceArn,
        PhoneNumberDescription: "Claimed by SMB"
    };

    try {
        // Claim the phone number
        const claimResult = await connect.claimPhoneNumber(claimParams);
        phoneResource.arn = claimResult.PhoneNumberArn;

        // Prepare parameters for contact flow association
        const associateParams = {
            ContactFlowId: contactFlowArn.rsplit("/", 1)[1],
            InstanceId: instanceArn.rsplit("/", 1)[1],
            PhoneNumberId: phoneResource.arn.rsplit("/", 1)[1]
        };

        // Associate the phone number with the contact flow
        await associateContactFlow(associateParams);
    } catch (error) {
        console.error('Error in phone number claiming process:', error);
    }

    return event;
};

/**
 * Helper function to associate a phone number with a contact flow
 * Includes a delay to ensure phone number claiming is completed
 * @param {Object} params - Parameters for contact flow association
 * @returns {Promise} Resolves when association is complete
 */
async function associateContactFlow(params) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                await connect.associatePhoneNumberContactFlow(params);
                resolve(true);
            } catch (error) {
                console.error('Error associating contact flow:', error);
                reject(error);
            }
        }, 6000); // 6 second delay to ensure phone number claim is processed
    });
}
