// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
const fs = require('fs');
const connect = new AWS.Connect();


/**
 * Re-implementation of Python rsplit
 **/
String.prototype.rsplit = function(sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};

exports.handler = async (event) => {
    let setupContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-setup.content.json"));
    let hopContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-hop.content.json"));
    let journeyContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-journey.content.json"));
    let dtmf1ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf1.content.json"));
    let dtmf2ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf2.content.json"));
    let dtmf3ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf3.content.json"));
    let dtmf4ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf4.content.json"));
    let dtmf5ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf5.content.json"));
    let dtmf6ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf6.content.json"));
    let dtmf7ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf7.content.json"));
    let dtmf8ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf8.content.json"));
    let dtmf9ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf9.content.json"));
    let dtmf0ContactFlow = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf0.content.json"));

    let setupContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-setup.json")).ContactFlow;
    let hopContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-hop.json")).ContactFlow;
    let journeyContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-journey.json")).ContactFlow;
    let dtmf1ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf1.json")).ContactFlow;
    let dtmf2ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf2.json")).ContactFlow;
    let dtmf3ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf3.json")).ContactFlow;
    let dtmf4ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf4.json")).ContactFlow;
    let dtmf5ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf5.json")).ContactFlow;
    let dtmf6ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf6.json")).ContactFlow;
    let dtmf7ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf7.json")).ContactFlow;
    let dtmf8ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf8.json")).ContactFlow;
    let dtmf9ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf9.json")).ContactFlow;
    let dtmf0ContactFlowTemplate = JSON.parse(fs.readFileSync("./contact-flows/contact-flow-dtmf0.json")).ContactFlow;


    let queuesResource = event.resources.filter(o => o.type == "queue");
    let hopResource = event.resources.find(o => o.type == "hop");
    const instanceId = event.experience.instance.rsplit("/", 1)[1];

    let contactFlowsResource = [];

    processDtmfs();

    let dtmfContactFlows = [
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
    ]

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

    for (let i = 0; i < dtmfContactFlows.length; i++) {
        let dtmfCfParam = {
            Content: JSON.stringify(dtmfContactFlows[i].Content),
            InstanceId: instanceId,
            Name: event.experience.title + "_" + dtmfContactFlows[i].Name + "_" + Date.now(),
            Type: "CONTACT_FLOW",
            Description: 'Created by SMB onboarding'
        }
        
        console.log(JSON.stringify(dtmfCfParam));

        await createContactFlowAsync(dtmfCfParam, 1000);
    }

    processInHoursJourney();
    journeyContactFlowTemplate.Content = journeyContactFlow;

    console.log(JSON.stringify(journeyContactFlowTemplate.Content))

    let inhoursJourneyParam = {
        Content: JSON.stringify(journeyContactFlowTemplate.Content),
        InstanceId: instanceId,
        Name: event.experience.title + "_" + journeyContactFlowTemplate.Name + "_" + Date.now(),
        Type: "CONTACT_FLOW",
        Description: 'Created by SMB onboarding'
    }
    await createContactFlowAsync(inhoursJourneyParam, 1000);

    processHoursOfOperation();
    hopContactFlowTemplate.Content = hopContactFlow;
    let hopParam = {
        Content: JSON.stringify(hopContactFlowTemplate.Content),
        InstanceId: instanceId,
        Name: event.experience.title + "_" + hopContactFlowTemplate.Name + "_" + Date.now(),
        Type: "CONTACT_FLOW",
        Description: 'Created by SMB onboarding'
    }

    console.log(JSON.stringify(hopContactFlowTemplate.Content));

    await createContactFlowAsync(hopParam, 1000);

    processSetup();
    setupContactFlowTemplate.Content = setupContactFlow;
    let setupParam = {
        Content: JSON.stringify(setupContactFlowTemplate.Content),
        InstanceId: instanceId,
        Name: event.experience.title + "_" + setupContactFlowTemplate.Name + "_" + Date.now(),
        Type: "CONTACT_FLOW",
        Description: 'Created by SMB onboarding'
    }
    await createContactFlowAsync(setupParam, 1000);

    event.resources = event.resources.concat(event.resources, contactFlowsResource);
    const response = event;

    return response;




    function processDtmfs() {
        let promptBlock = journeyContactFlow.Actions.find(action => action.Identifier == "696c575f-83a9-4102-a47a-3ad147b2ea82");
        console.log("Updating SEB - Journey DTMF1");
        if (!event.experience.journey.inHours.journey.dtmf1 || Object.keys(event.experience.journey.inHours.journey.dtmf1).length == 0) {
            console.log("Updating SEB - Journey DTMF1 to invalid option");
            promptBlock.Transitions.Conditions[0].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";

            let dtmf1BlockSetQueueBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf1BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

            dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf1.action == "transfer") {
                console.log("Updating SEB - DTMF1 to queue with queue id");
                let dtmf1BlockSetQueueBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf1BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf1.param).arn;

                dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf1.param).arn;
                dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf1.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf1.action == "external") {
                console.log("Updating SEB - DTMF1 to external number");
                dtmf1ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf1ExternalBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF1 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf1.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf1.param.split(";")[1];

                dtmf1ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf1ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf1ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf1BlockSetQueueBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf1BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf1ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf1BlockSetQueueBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf1BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf1ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf1MessageBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf1MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf1.param;
            }
        }

        console.log("Updating SEB - Journey DTMF2");
        if (!event.experience.journey.inHours.journey.dtmf2 || Object.keys(event.experience.journey.inHours.journey.dtmf2).length == 0) {
            console.log("Updating SEB - Journey DTMF2 to invalid option");
            promptBlock.Transitions.Conditions[1].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf2BlockSetQueueBlock = dtmf2ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf2BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf2.action == "transfer") {
                console.log("Updating SEB - DTMF2 to queue with queue id");
                let dtmf2BlockSetQueueBlock = dtmf2ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf2BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf2.param).arn;

                dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf2.param).arn;
                dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf2.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf2.action == "external") {
                console.log("Updating SEB - DTMF2 to external number");
                dtmf2ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf2ExternalBlock = dtmf1ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF2 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf2.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf2.param.split(";")[1];

                dtmf2ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf2ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf2ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf2BlockSetQueueBlock = dtmf2ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf2BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf2ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf2BlockSetQueueBlock = dtmf2ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf2BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf2ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf2MessageBlock = dtmf2ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf2MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf2.param;
            }
        }

        console.log("Updating SEB - Journey DTMF3");
        if (!event.experience.journey.inHours.journey.dtmf3 || Object.keys(event.experience.journey.inHours.journey.dtmf3).length == 0) {
            console.log("Updating SEB - Journey DTMF3 to invalid option");
            promptBlock.Transitions.Conditions[2].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf3BlockSetQueueBlock = dtmf3ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf3BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

            dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf3.action == "transfer") {
                console.log("Updating SEB - DTMF3 to queue with queue id");
                let dtmf3BlockSetQueueBlock = dtmf3ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf3BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf3.param).arn;;

                dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf3.param).arn;
                dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf3.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf3.action == "external") {
                console.log("Updating SEB - DTMF3 to external number");
                dtmf3ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf3ExternalBlock = dtmf3ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF3 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf3.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf3.param.split(";")[1];

                dtmf3ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf3ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf3ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf3BlockSetQueueBlock = dtmf3ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf3BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf3ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf3BlockSetQueueBlock = dtmf3ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf3BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

                dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf3ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf3MessageBlock = dtmf3ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf3MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf3.param;
            }
        }

        console.log("Updating SEB - Journey DTMF4");
        if (!event.experience.journey.inHours.journey.dtmf4 || Object.keys(event.experience.journey.inHours.journey.dtmf4).length == 0) {
            console.log("Updating SEB - Journey DTMF4 to invalid option");
            promptBlock.Transitions.Conditions[3].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf4BlockSetQueueBlock = dtmf4ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf4BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

            dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf4.action == "transfer") {
                console.log("Updating SEB - DTMF4 to queue with queue id");
                let dtmf4BlockSetQueueBlock = dtmf4ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf4BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf4.param).arn;;

                dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf4.param).arn;
                dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf4.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf4.action == "external") {
                console.log("Updating SEB - DTMF4 to external number");
                dtmf4ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf4ExternalBlock = dtmf4ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF4 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf4.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf4.param.split(";")[1];

                dtmf4ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf4ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf4ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf4BlockSetQueueBlock = dtmf4ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf4BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf4ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";

                let dtmf4BlockSetQueueBlock = dtmf4ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf4BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

                dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf4ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf4MessageBlock = dtmf4ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf4MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf4.param;
            }
        }

        console.log("Updating SEB - Journey DTMF5");
        if (!event.experience.journey.inHours.journey.dtmf5 || Object.keys(event.experience.journey.inHours.journey.dtmf5).length == 0) {
            console.log("Updating SEB - Journey DTMF5 to invalid option");
            promptBlock.Transitions.Conditions[4].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf5BlockSetQueueBlock = dtmf5ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf5BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

            dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf5.action == "transfer") {
                console.log("Updating SEB - DTMF5 to queue with queue id");
                let dtmf5BlockSetQueueBlock = dtmf5ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf5BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf5.param).arn;;

                dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf5.param).arn;
                dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf5.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf5.action == "external") {
                console.log("Updating SEB - DTMF5 to external number");
                dtmf5ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf5ExternalBlock = dtmf5ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF5 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf5.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf5.param.split(";")[1];

                dtmf5ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf5ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf5ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf5BlockSetQueueBlock = dtmf5ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf5BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf5ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf5BlockSetQueueBlock = dtmf5ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf5BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

                dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf5ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf5MessageBlock = dtmf5ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf5MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf5.param;
            }
        }

        console.log("Updating SEB - Journey DTMF6");
        if (!event.experience.journey.inHours.journey.dtmf6 || Object.keys(event.experience.journey.inHours.journey.dtmf6).length == 0) {
            console.log("Updating SEB - Journey DTMF6 to invalid option");
            promptBlock.Transitions.Conditions[5].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf6BlockSetQueueBlock = dtmf6ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf6BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

            dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf6.action == "transfer") {
                console.log("Updating SEB - DTMF6 to queue with queue id");
                let dtmf6BlockSetQueueBlock = dtmf6ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf6BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf6.param).arn;;

                dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf6.param).arn;
                dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf6.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf6.action == "external") {
                console.log("Updating SEB - DTMF6 to external number");
                dtmf6ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf6ExternalBlock = dtmf6ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF6 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf6.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf6.param.split(";")[1];

                dtmf6ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf6ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf6ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf6BlockSetQueueBlock = dtmf6ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf6BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf6ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf6BlockSetQueueBlock = dtmf6ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf6BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;

                dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf6ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf6MessageBlock = dtmf6ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf6MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf6.param;
            }
        }

        console.log("Updating SEB - Journey DTMF7");
        if (!event.experience.journey.inHours.journey.dtmf7 || Object.keys(event.experience.journey.inHours.journey.dtmf7).length == 0) {
            console.log("Updating SEB - Journey DTMF7 to invalid option");
            promptBlock.Transitions.Conditions[6].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf7BlockSetQueueBlock = dtmf7ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf7BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;
            dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf7.action == "transfer") {
                console.log("Updating SEB - DTMF7 to queue with queue id");
                let dtmf7BlockSetQueueBlock = dtmf7ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf7BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf7.param).arn;;
                dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf7.param).arn;
                dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf7.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf7.action == "external") {
                console.log("Updating SEB - DTMF7 to external number");
                dtmf7ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf7ExternalBlock = dtmf7ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF1 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf7.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf7.param.split(";")[1];

                dtmf7ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf7ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf7ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf7BlockSetQueueBlock = dtmf7ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf7BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf7ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";

                let dtmf7BlockSetQueueBlock = dtmf7ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf7BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;
                dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf7ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf7MessageBlock = dtmf7ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf7MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf7.param;
            }
        }

        console.log("Updating SEB - Journey DTMF8");
        if (!event.experience.journey.inHours.journey.dtmf8 || Object.keys(event.experience.journey.inHours.journey.dtmf8).length == 0) {
            console.log("Updating SEB - Journey DTMF8 to invalid option");
            promptBlock.Transitions.Conditions[7].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf8BlockSetQueueBlock = dtmf8ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf8BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;
            dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf8.action == "transfer") {
                console.log("Updating SEB - DTMF8 to queue with queue id");
                let dtmf8BlockSetQueueBlock = dtmf8ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf8BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf8.param).arn;;
                dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf8.param).arn;
                dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf8.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf8.action == "external") {
                console.log("Updating SEB - DTMF8 to external number");
                dtmf8ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf8ExternalBlock = dtmf8ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF8 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf8.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf8.param.split(";")[1];

                dtmf8ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf8ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf8ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf8BlockSetQueueBlock = dtmf8ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf8BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf1ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf8BlockSetQueueBlock = dtmf8ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf8BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;
                dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf8ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf8MessageBlock = dtmf8ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf8MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf8.param;
            }
        }

        console.log("Updating SEB - Journey DTMF9");
        if (!event.experience.journey.inHours.journey.dtmf9 || Object.keys(event.experience.journey.inHours.journey.dtmf9).length == 0) {
            console.log("Updating SEB - Journey DTMF9 to invalid option");
            promptBlock.Transitions.Conditions[8].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf9BlockSetQueueBlock = dtmf9ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf9BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;
            dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf9.action == "transfer") {
                console.log("Updating SEB - DTMF9 to queue with queue id");
                let dtmf9BlockSetQueueBlock = dtmf9ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf9BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf9.param).arn;;
                dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf9.param).arn;
                dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf9.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf9.action == "external") {
                console.log("Updating SEB - DTMF9 to external number");
                dtmf9ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf9ExternalBlock = dtmf9ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF9 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf9.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf9.param.split(";")[1];

                dtmf9ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf9ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf9ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf9BlockSetQueueBlock = dtmf9ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf9BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf9ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";
                let dtmf9BlockSetQueueBlock = dtmf9ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf9BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;;
                dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf9ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf9MessageBlock = dtmf9ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf9MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf9.param;
            }
        }

        console.log("Updating SEB - Journey DTMF0");
        if (!event.experience.journey.inHours.journey.dtmf0 || Object.keys(event.experience.journey.inHours.journey.dtmf0).length == 0) {
            console.log("Updating SEB - Journey DTMF0 to invalid option");
            promptBlock.Transitions.Conditions[9].NextAction = "b6567772-54ad-4b37-a551-82a0f1f6e4dc";
            let dtmf0BlockSetQueueBlock = dtmf0ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
            dtmf0BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
        }
        else {
            if (event.experience.journey.inHours.journey.dtmf0.action == "transfer") {
                console.log("Updating SEB - DTMF0 to queue with queue id");
                let dtmf0BlockSetQueueBlock = dtmf0ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf0BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf0.param).arn;
                dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf0.param).arn;
                dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.dtmf0.param).name;
            }
            else if (event.experience.journey.inHours.journey.dtmf0.action == "external") {
                console.log("Updating SEB - DTMF0 to external number");
                dtmf0ContactFlow.StartAction = "667cd27c-af36-4ae8-9d32-2c3f0399247e";

                let dmtf0ExternalBlock = dtmf0ContactFlow.Actions.find(action => action.Identifier == "667cd27c-af36-4ae8-9d32-2c3f0399247e");
                console.log("Updating SEB - DTMF0 external number value");

                // need to extract country code and do some number manipulation
                let countryCode = event.experience.journey.inHours.journey.dtmf0.param.split(";")[0];
                let number = event.experience.journey.inHours.journey.dtmf0.param.split(";")[1];

                dtmf0ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].CountryCode = countryCode;
                dtmf0ContactFlow.Metadata.ActionMetadata['667cd27c-af36-4ae8-9d32-2c3f0399247e'].parameters.ThirdPartyPhoneNumber.countryCode = countryCode.toUpperCase();

                dmtf0ExternalBlock.Parameters.ThirdPartyPhoneNumber = number;

                let dtmf0BlockSetQueueBlock = dtmf0ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf0BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;

                dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;
            }
            else {
                dtmf0ContactFlow.StartAction = "28cbeeac-2830-411b-aa1b-59bffc702415";

                let dtmf0BlockSetQueueBlock = dtmf0ContactFlow.Actions.find(action => action.Identifier == "d21dd8dd-adbd-42ab-8c38-b8e9fb4be790");
                dtmf0BlockSetQueueBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
                dtmf0ContactFlow.Metadata.ActionMetadata['d21dd8dd-adbd-42ab-8c38-b8e9fb4be790'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

                let dtmf0MessageBlock = dtmf0ContactFlow.Actions.find(action => action.Identifier == "28cbeeac-2830-411b-aa1b-59bffc702415");
                dtmf0MessageBlock.Parameters.Text = event.experience.journey.inHours.journey.dtmf0.param;
            }
        }
    }

    function processSetup() {
        var recordingBehaviourBlock = setupContactFlow.Actions.find(action => action.Identifier == "6338d7b8-4e6e-42d8-a123-9f5696ec919e");

        if (!event.experience.features.callRecording) {
            console.log("Disabling call recording");
            recordingBehaviourBlock.Parameters.RecordingBehavior.RecordedParticipants = []
        }

        if (!event.experience.features.realtimeAnalytics) {
            console.log("Disabling realtime analytics");
            recordingBehaviourBlock.Parameters.AnalyticsBehavior.AnalyticsMode = "PostCall";
        }

        if (!event.experience.features.postcallAnalytics) {
            console.log("Disabling postcall analytics");
            delete recordingBehaviourBlock.Parameters.AnalyticsBehavior;
        }

        console.log("Updating TTS");
        let ttsBlock = setupContactFlow.Actions.find(action => action.Identifier == "433622ac-e05f-4dda-acb0-0a24757a4b8c");
        ttsBlock.Parameters.TextToSpeechVoice = event.experience.voice.voice;

        setupContactFlow.Metadata.ActionMetadata['881a14e1-1560-40ff-a2ee-6ddf80746a00'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Hours Of Operation")).arn;
        setupContactFlow.Metadata.ActionMetadata['881a14e1-1560-40ff-a2ee-6ddf80746a00'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Hours Of Operation")).name;
        setupContactFlow.Metadata.ActionMetadata['12459c9b-d713-46f1-b8c7-44d0caea42f4'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Journey")).arn;
        setupContactFlow.Metadata.ActionMetadata['12459c9b-d713-46f1-b8c7-44d0caea42f4'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Journey")).name;

        let journeyBlock = setupContactFlow.Actions.find(action => action.Identifier == "12459c9b-d713-46f1-b8c7-44d0caea42f4");
        journeyBlock.Parameters.ContactFlowId = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Journey")).arn;

        let hopBlock = setupContactFlow.Actions.find(action => action.Identifier == "881a14e1-1560-40ff-a2ee-6ddf80746a00");
        hopBlock.Parameters.ContactFlowId = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Hours Of Operation")).arn;

        if (event.experience.checkHours) {
            console.log("Updating SEB - Setup next action to SEB - Hours Of Operation");
            recordingBehaviourBlock.Transitions.NextAction = "881a14e1-1560-40ff-a2ee-6ddf80746a00";
        }
        else {
            console.log("Updating SEB - Setup next action to SEB - Journey");
            recordingBehaviourBlock.Transitions.NextAction = "12459c9b-d713-46f1-b8c7-44d0caea42f4";
        }
    }

    function processHoursOfOperation() {
        let hoursOfOperationBlock = hopContactFlow.Actions.find(action => action.Identifier == "99f03788-deca-449f-8461-14e537ce708a");
        console.log("Updating SEB - Hours Of Operation HoursOfOperationId with ", hopResource.arn);
        hoursOfOperationBlock.Parameters.HoursOfOperationId = hopResource.arn;
        hopContactFlow.Metadata.ActionMetadata['99f03788-deca-449f-8461-14e537ce708a'].Hours.id = hopResource.arn;
        hopContactFlow.Metadata.ActionMetadata['99f03788-deca-449f-8461-14e537ce708a'].Hours.text = hopResource.name;
        hopContactFlow.Metadata.ActionMetadata['cd05ff33-07f6-4f6c-8bbc-b25d47f92fca'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Journey")).arn;
        hopContactFlow.Metadata.ActionMetadata['cd05ff33-07f6-4f6c-8bbc-b25d47f92fca'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - Journey")).name;

        console.log("Updating SEB - Hours Of Operation out of hours message");
        let oohMessageBlock = hopContactFlow.Actions.find(action => action.Identifier == "0cd237b4-25a6-4c0b-9953-cd1e37346a10");
        oohMessageBlock.Parameters.Text = event.experience.journey.outHours.message ? event.experience.journey.outHours.message : ".";

        let journeyBlock = hopContactFlow.Actions.find(action => action.Identifier == "cd05ff33-07f6-4f6c-8bbc-b25d47f92fca");
        journeyBlock.Parameters.ContactFlowId = hopContactFlow.Metadata.ActionMetadata['cd05ff33-07f6-4f6c-8bbc-b25d47f92fca'].ContactFlow.id;
    }

    function processInHoursJourney() {
        let greetingBlock = journeyContactFlow.Actions.find(action => action.Identifier == "c782111c-1b48-4c4c-8249-9ac2afd1acd4");
        console.log("Updating SEB - Journey greeting prompt");
        greetingBlock.Parameters.Text = event.experience.greeting;

        console.log("Updating Metadata")
        journeyContactFlow.Metadata.ActionMetadata['493f535b-3c46-4edd-a717-d8beb47d0fd2'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 0")).arn;
        journeyContactFlow.Metadata.ActionMetadata['493f535b-3c46-4edd-a717-d8beb47d0fd2'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 0")).name;
        journeyContactFlow.Metadata.ActionMetadata['2a90e4b5-39cf-4406-8aa5-67b1d4597a46'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 9")).arn;
        journeyContactFlow.Metadata.ActionMetadata['2a90e4b5-39cf-4406-8aa5-67b1d4597a46'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 9")).name;
        journeyContactFlow.Metadata.ActionMetadata['37892e16-f787-4cd8-9b4f-d8bff3e96125'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 8")).arn;
        journeyContactFlow.Metadata.ActionMetadata['37892e16-f787-4cd8-9b4f-d8bff3e96125'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 8")).name;
        journeyContactFlow.Metadata.ActionMetadata['f2d92c51-b597-4d18-928d-9561d51cca78'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 7")).arn;
        journeyContactFlow.Metadata.ActionMetadata['f2d92c51-b597-4d18-928d-9561d51cca78'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 7")).name;
        journeyContactFlow.Metadata.ActionMetadata['5a5d61d6-ce5f-4190-bd39-2a96bef6e063'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 6")).arn;
        journeyContactFlow.Metadata.ActionMetadata['5a5d61d6-ce5f-4190-bd39-2a96bef6e063'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 6")).name;
        journeyContactFlow.Metadata.ActionMetadata['cbadb7a6-1230-4ec2-8b52-0e47941a17a0'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 5")).arn;
        journeyContactFlow.Metadata.ActionMetadata['cbadb7a6-1230-4ec2-8b52-0e47941a17a0'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 5")).name;
        journeyContactFlow.Metadata.ActionMetadata['6035b99b-3723-478e-b11b-4e5295d1aa38'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 4")).arn;
        journeyContactFlow.Metadata.ActionMetadata['6035b99b-3723-478e-b11b-4e5295d1aa38'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 4")).name;
        journeyContactFlow.Metadata.ActionMetadata['e2e5e874-e2ed-48f2-96cc-77cc484de567'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 3")).arn;
        journeyContactFlow.Metadata.ActionMetadata['e2e5e874-e2ed-48f2-96cc-77cc484de567'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 3")).name;
        journeyContactFlow.Metadata.ActionMetadata['c9c8303b-66dc-4e8c-8b27-6e19bce839e5'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 2")).arn;
        journeyContactFlow.Metadata.ActionMetadata['c9c8303b-66dc-4e8c-8b27-6e19bce839e5'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 2")).name;
        journeyContactFlow.Metadata.ActionMetadata['a2bc89de-343b-4bbc-a846-d595fd8c5864'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 1")).arn;
        journeyContactFlow.Metadata.ActionMetadata['a2bc89de-343b-4bbc-a846-d595fd8c5864'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 1")).name;

        // updating actions
        journeyContactFlow.Actions.find(action => action.Identifier == "493f535b-3c46-4edd-a717-d8beb47d0fd2").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['493f535b-3c46-4edd-a717-d8beb47d0fd2'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "2a90e4b5-39cf-4406-8aa5-67b1d4597a46").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['2a90e4b5-39cf-4406-8aa5-67b1d4597a46'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "37892e16-f787-4cd8-9b4f-d8bff3e96125").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['37892e16-f787-4cd8-9b4f-d8bff3e96125'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "f2d92c51-b597-4d18-928d-9561d51cca78").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['f2d92c51-b597-4d18-928d-9561d51cca78'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "5a5d61d6-ce5f-4190-bd39-2a96bef6e063").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['5a5d61d6-ce5f-4190-bd39-2a96bef6e063'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "cbadb7a6-1230-4ec2-8b52-0e47941a17a0").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['cbadb7a6-1230-4ec2-8b52-0e47941a17a0'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "6035b99b-3723-478e-b11b-4e5295d1aa38").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['6035b99b-3723-478e-b11b-4e5295d1aa38'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "e2e5e874-e2ed-48f2-96cc-77cc484de567").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['e2e5e874-e2ed-48f2-96cc-77cc484de567'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "c9c8303b-66dc-4e8c-8b27-6e19bce839e5").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['c9c8303b-66dc-4e8c-8b27-6e19bce839e5'].ContactFlow.id;
        journeyContactFlow.Actions.find(action => action.Identifier == "a2bc89de-343b-4bbc-a846-d595fd8c5864").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['a2bc89de-343b-4bbc-a846-d595fd8c5864'].ContactFlow.id;


        if (event.experience.journey.inHours.type == "queue") {
            console.log("Updating SEB - Journey next action to queue no menu");
            greetingBlock.Transitions.NextAction = "8477d377-38cf-47a4-89ba-73059a407e1b";

            console.log("Updating SEB - Journey queue no menu queue value");
            let setWorkingQueueNoMenuBlock = journeyContactFlow.Actions.find(action => action.Identifier == "8477d377-38cf-47a4-89ba-73059a407e1b");
            setWorkingQueueNoMenuBlock.Parameters.QueueId = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.param).arn;
            journeyContactFlow.Metadata.ActionMetadata['8477d377-38cf-47a4-89ba-73059a407e1b'].queue.id = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.param).arn;
            journeyContactFlow.Metadata.ActionMetadata['8477d377-38cf-47a4-89ba-73059a407e1b'].queue.text = queuesResource.find(queue => queue.name == event.experience.journey.inHours.journey.param).name;
        }

        if (event.experience.journey.inHours.type == "menu") {
            let setWorkingQueueNoMenuBlock = journeyContactFlow.Actions.find(action => action.Identifier == "8477d377-38cf-47a4-89ba-73059a407e1b");
            setWorkingQueueNoMenuBlock.Parameters.QueueId = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            journeyContactFlow.Metadata.ActionMetadata['8477d377-38cf-47a4-89ba-73059a407e1b'].queue.id = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).arn;
            journeyContactFlow.Metadata.ActionMetadata['8477d377-38cf-47a4-89ba-73059a407e1b'].queue.text = queuesResource.find(queue => queue.name.startsWith(event.experience.title + "_default_")).name;

            let menu = event.experience.journey.inHours.type.journey;
            let promptBlock = journeyContactFlow.Actions.find(action => action.Identifier == "696c575f-83a9-4102-a47a-3ad147b2ea82");

            console.log("Updating SEB - Journey menu prompt");
            promptBlock.Parameters.Text = event.experience.journey.inHours.journey.prompt;

            console.log("Updating Metadata")
            journeyContactFlow.Metadata.ActionMetadata['493f535b-3c46-4edd-a717-d8beb47d0fd2'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 0")).arn;
            journeyContactFlow.Metadata.ActionMetadata['493f535b-3c46-4edd-a717-d8beb47d0fd2'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 0")).name;
            journeyContactFlow.Metadata.ActionMetadata['2a90e4b5-39cf-4406-8aa5-67b1d4597a46'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 9")).arn;
            journeyContactFlow.Metadata.ActionMetadata['2a90e4b5-39cf-4406-8aa5-67b1d4597a46'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 9")).name;
            journeyContactFlow.Metadata.ActionMetadata['37892e16-f787-4cd8-9b4f-d8bff3e96125'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 8")).arn;
            journeyContactFlow.Metadata.ActionMetadata['37892e16-f787-4cd8-9b4f-d8bff3e96125'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 8")).name;
            journeyContactFlow.Metadata.ActionMetadata['f2d92c51-b597-4d18-928d-9561d51cca78'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 7")).arn;
            journeyContactFlow.Metadata.ActionMetadata['f2d92c51-b597-4d18-928d-9561d51cca78'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 7")).name;
            journeyContactFlow.Metadata.ActionMetadata['5a5d61d6-ce5f-4190-bd39-2a96bef6e063'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 6")).arn;
            journeyContactFlow.Metadata.ActionMetadata['5a5d61d6-ce5f-4190-bd39-2a96bef6e063'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 6")).name;
            journeyContactFlow.Metadata.ActionMetadata['cbadb7a6-1230-4ec2-8b52-0e47941a17a0'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 5")).arn;
            journeyContactFlow.Metadata.ActionMetadata['cbadb7a6-1230-4ec2-8b52-0e47941a17a0'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 5")).name;
            journeyContactFlow.Metadata.ActionMetadata['6035b99b-3723-478e-b11b-4e5295d1aa38'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 4")).arn;
            journeyContactFlow.Metadata.ActionMetadata['6035b99b-3723-478e-b11b-4e5295d1aa38'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 4")).name;
            journeyContactFlow.Metadata.ActionMetadata['e2e5e874-e2ed-48f2-96cc-77cc484de567'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 3")).arn;
            journeyContactFlow.Metadata.ActionMetadata['e2e5e874-e2ed-48f2-96cc-77cc484de567'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 3")).name;
            journeyContactFlow.Metadata.ActionMetadata['c9c8303b-66dc-4e8c-8b27-6e19bce839e5'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 2")).arn;
            journeyContactFlow.Metadata.ActionMetadata['c9c8303b-66dc-4e8c-8b27-6e19bce839e5'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 2")).name;
            journeyContactFlow.Metadata.ActionMetadata['a2bc89de-343b-4bbc-a846-d595fd8c5864'].ContactFlow.id = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 1")).arn;
            journeyContactFlow.Metadata.ActionMetadata['a2bc89de-343b-4bbc-a846-d595fd8c5864'].ContactFlow.text = contactFlowsResource.find(cf => cf.name.startsWith(event.experience.title + "_SEB - DTMF 1")).name;

            // updating actions
            journeyContactFlow.Actions.find(action => action.Identifier == "493f535b-3c46-4edd-a717-d8beb47d0fd2").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['493f535b-3c46-4edd-a717-d8beb47d0fd2'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "2a90e4b5-39cf-4406-8aa5-67b1d4597a46").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['2a90e4b5-39cf-4406-8aa5-67b1d4597a46'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "37892e16-f787-4cd8-9b4f-d8bff3e96125").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['37892e16-f787-4cd8-9b4f-d8bff3e96125'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "f2d92c51-b597-4d18-928d-9561d51cca78").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['f2d92c51-b597-4d18-928d-9561d51cca78'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "5a5d61d6-ce5f-4190-bd39-2a96bef6e063").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['5a5d61d6-ce5f-4190-bd39-2a96bef6e063'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "cbadb7a6-1230-4ec2-8b52-0e47941a17a0").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['cbadb7a6-1230-4ec2-8b52-0e47941a17a0'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "6035b99b-3723-478e-b11b-4e5295d1aa38").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['6035b99b-3723-478e-b11b-4e5295d1aa38'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "e2e5e874-e2ed-48f2-96cc-77cc484de567").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['e2e5e874-e2ed-48f2-96cc-77cc484de567'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "c9c8303b-66dc-4e8c-8b27-6e19bce839e5").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['c9c8303b-66dc-4e8c-8b27-6e19bce839e5'].ContactFlow.id;
            journeyContactFlow.Actions.find(action => action.Identifier == "a2bc89de-343b-4bbc-a846-d595fd8c5864").Parameters.ContactFlowId = journeyContactFlow.Metadata.ActionMetadata['a2bc89de-343b-4bbc-a846-d595fd8c5864'].ContactFlow.id;

        }
    }

    async function createContactFlowAsync(param, timeout) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log("Creating a contact flow: ", param.Name);

                let result = connect.createContactFlow(param, (err, data) => {
                    if (err) {
                        console.log(err);

                        res(false);
                    }
                    else {
                        contactFlowsResource.push({
                            name: param.Name,
                            type: "contact_flow",
                            arn: data.ContactFlowArn
                        });

                        res(data);
                    }
                });

            }, timeout);
        });
    }
};
