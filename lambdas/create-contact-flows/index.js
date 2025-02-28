// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Lambda function to create and configure Amazon Connect contact flows
 * Handles creation of multiple contact flows including setup, hop, journey, and DTMF flows
 */

const { ConnectClient, CreateContactFlowCommand } = require('@aws-sdk/client-connect');
const { readFileSync } = require('fs');
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
 * Load all contact flow content files
 */
const setupContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-setup.content.json"));
const hopContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-hop.content.json"));
const journeyContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-journey.content.json"));
const dtmf1ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf1.content.json"));
const dtmf2ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf2.content.json"));
const dtmf3ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf3.content.json"));
const dtmf4ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf4.content.json"));
const dtmf5ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf5.content.json"));
const dtmf6ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf6.content.json"));
const dtmf7ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf7.content.json"));
const dtmf8ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf8.content.json"));
const dtmf9ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf9.content.json"));
const dtmf0ContactFlow = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf0.content.json"));

/**
 * Load all contact flow templates
 */
const setupContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-setup.json")).ContactFlow;
const hopContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-hop.json")).ContactFlow;
const journeyContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-journey.json")).ContactFlow;
const dtmf1ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf1.json")).ContactFlow;
const dtmf2ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf2.json")).ContactFlow;
const dtmf3ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf3.json")).ContactFlow;
const dtmf4ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf4.json")).ContactFlow;
const dtmf5ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf5.json")).ContactFlow;
const dtmf6ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf6.json")).ContactFlow;
const dtmf7ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf7.json")).ContactFlow;
const dtmf8ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf8.json")).ContactFlow;
const dtmf9ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf9.json")).ContactFlow;
const dtmf0ContactFlowTemplate = JSON.parse(readFileSync("./contact-flows/contact-flow-dtmf0.json")).ContactFlow;

/**
 * Lambda handler to process contact flow creation
 * @param {Object} event - Event containing experience configuration
 * @returns {Object} Modified event object with created contact flows
 */
exports.handler = async (event) => {
    // Extract required resources from event
    const queuesResource = event.resources.filter(o => o.type === "queue");
    const hopResource = event.resources.find(o => o.type === "hop");
    const instanceId = event.experience.instance.rsplit("/", 1)[1];
    
    let contactFlowsResource = [];

    // Process all DTMF configurations
    processDtmfs();

    // Create DTMF contact flows
    const dtmfContactFlows = [
        dtmf1ContactFlowTemplate,
        dtmf2ContactFlowTemplate,
        dtmf3ContactFlowTemplate,
        dtmf4ContactFlowTemplate,
        dtmf5ContactFlowTemplate,
        dtmf6ContactFlowTemplate,
        dtmf7ContactFlowTemplate,
        dtmf8ContactFlowTemplate,
        dtmf9ContactFlowTemplate,
        dtmf0ContactFlowTemplate
    ];

    // Assign content to templates
    dtmf0ContactFlowTemplate.Content = dtmf0ContactFlow;
    dtmf1ContactFlowTemplate.Content = dtmf1ContactFlow;
    dtmf2ContactFlowTemplate.Content = dtmf2ContactFlow;
    dtmf3ContactFlowTemplate.Content = dtmf3ContactFlow;
    dtmf4ContactFlowTemplate.Content = dtmf4ContactFlow;
    dtmf5ContactFlowTemplate.Content = dtmf5ContactFlow;
    dtmf6ContactFlowTemplate.Content = dtmf6ContactFlow;
    dtmf7ContactFlowTemplate.Content = dtmf7ContactFlow;
    dtmf8ContactFlowTemplate.Content = dtmf8ContactFlow;
    dtmf9ContactFlowTemplate.Content = dtmf9ContactFlow;

    // Create all DTMF flows
    for (const dtmfFlow of dtmfContactFlows) {
        const dtmfCfParam = {
            Content: JSON.stringify(dtmfFlow.Content),
            InstanceId: instanceId,
            Name: `${event.experience.title}_${dtmfFlow.Name}_${Date.now()}`,
            Type: "CONTACT_FLOW",
            Description: 'Created by SMB onboarding'
        };
        
        console.log('Creating DTMF flow with params:', JSON.stringify(dtmfCfParam));
        await createContactFlowAsync(dtmfCfParam, 1000);
    }

    // Process and create journey flow
    processInHoursJourney();
    journeyContactFlowTemplate.Content = journeyContactFlow;

    console.log('Journey contact flow content:', JSON.stringify(journeyContactFlowTemplate.Content));

    const inhoursJourneyParam = {
        Content: JSON.stringify(journeyContactFlowTemplate.Content),
        InstanceId: instanceId,
        Name: `${event.experience.title}_${journeyContactFlowTemplate.Name}_${Date.now()}`,
        Type: "CONTACT_FLOW",
        Description: 'Created by SMB onboarding'
    };
    await createContactFlowAsync(inhoursJourneyParam, 1000);

    // Process and create hours of operation flow
    processHoursOfOperation();
    hopContactFlowTemplate.Content = hopContactFlow;
    const hopParam = {
        Content: JSON.stringify(hopContactFlowTemplate.Content),
        InstanceId: instanceId,
        Name: `${event.experience.title}_${hopContactFlowTemplate.Name}_${Date.now()}`,
        Type: "CONTACT_FLOW",
        Description: 'Created by SMB onboarding'
    };

    console.log('HOP contact flow content:', JSON.stringify(hopContactFlowTemplate.Content));
    await createContactFlowAsync(hopParam, 1000);

    // Process and create setup flow
    processSetup();
    setupContactFlowTemplate.Content = setupContactFlow;
    const setupParam = {
        Content: JSON.stringify(setupContactFlowTemplate.Content),
        InstanceId: instanceId,
        Name: `${event.experience.title}_${setupContactFlowTemplate.Name}_${Date.now()}`,
        Type: "CONTACT_FLOW",
        Description: 'Created by SMB onboarding'
    };
    await createContactFlowAsync(setupParam, 1000);

    // Update event with created resources
    event.resources = event.resources.concat(contactFlowsResource);
    return event;
};

/**
 * Creates a contact flow with retry mechanism
 * @param {Object} params - Contact flow parameters
 * @param {number} delay - Delay before creation in milliseconds
 * @returns {Promise} Promise that resolves when contact flow is created
 */
async function createContactFlowAsync(params, delay) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                const result = await connect.send(new CreateContactFlowCommand(params));
                contactFlowsResource.push({
                    type: "contact_flow",
                    name: params.Name,
                    arn: result.ContactFlowArn
                });
                resolve(result);
            } catch (error) {
                console.error('Error creating contact flow:', error);
                resolve(null);
            }
        }, delay);
    });
}

/**
 * Process DTMF configurations and update contact flow content
 * This function modifies the global DTMF contact flow content variables
 */
function processDtmfs() {
    // Process DTMF 0
    dtmf0ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 1
    dtmf1ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 2
    dtmf2ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 3
    dtmf3ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 4
    dtmf4ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 5
    dtmf5ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 6
    dtmf6ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 7
    dtmf7ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 8
    dtmf8ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });

    // Process DTMF 9
    dtmf9ContactFlow.Actions.forEach(action => {
        if (action.Parameters && action.Parameters.ContactFlowId) {
            action.Parameters.ContactFlowId = "SetupContactFlow";
        }
    });
}

/**
 * Process in-hours journey flow configuration
 * Updates the journey contact flow with appropriate settings
 */
function processInHoursJourney() {
    journeyContactFlow.Actions.forEach(action => {
        if (action.Parameters) {
            if (action.Parameters.ContactFlowId) {
                action.Parameters.ContactFlowId = "SetupContactFlow";
            }
        }
    });
}

/**
 * Process hours of operation flow configuration
 * Updates the HOP contact flow with appropriate settings
 */
function processHoursOfOperation() {
    hopContactFlow.Actions.forEach(action => {
        if (action.Parameters) {
            if (action.Parameters.ContactFlowId) {
                action.Parameters.ContactFlowId = "SetupContactFlow";
            }
        }
    });
}

/**
 * Process setup flow configuration
 * Updates the setup contact flow with appropriate settings
 */
function processSetup() {
    setupContactFlow.Actions.forEach(action => {
        if (action.Parameters) {
            if (action.Parameters.ContactFlowId) {
                action.Parameters.ContactFlowId = "SetupContactFlow";
            }
        }
    });
}
