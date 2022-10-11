// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Box, Container, ExpandableSection, Header, Input, Link, RadioGroup } from "@awsui/components-react";
import { BaseNavigationDetail } from "@awsui/components-react/internal/events";
import React, { FC, useEffect } from "react";
import MenuComponent from "../MenuComponent/MenuComponent";
import "./CustomerJourneyComponent.css";

interface CustomerJourneyComponentProps {
    hasOperatingHours: boolean;
    setExperienceJourney: (journey: { inHours: {}, outHours: {} }) => void;
    setToolsContent: (tools: any) => void;
}

const toolsContent = {
    title: "Customer Journey",
    content: (
        <div>
            <p>Define the journey your customer will experience when interacting with your contact centre.</p>
            <p>Within operating hours, you can decide to send customers directly to a queue, or offer a DTMF menu.</p>
            <p>With a DTMF menu, you can send your customers to a queue, transfer them to an external number, or play a message before hanging up.</p>
            <p><i>Tip: You can use the same queue name for multiple options of your menu, resulting in customers following these options to be placed in the same queue.</i></p>
        </div>
    ),
    links: [
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/about-routing.html",
            text: "About routing in Amazon Connect"
        }
    ],
};

const CustomerJourneyComponent: FC<CustomerJourneyComponentProps> = (props) => {
    const [experienceType, setExperienceType] = React.useState("");
    const [queueParam, setQueueParam] = React.useState("");
    const [journeyInHours, setJourneyInHours] = React.useState({});
    const [journeyTypeInHours, setJourneyTypeInHours] = React.useState("")
    const [journeyOutHoursMessage, setJourneyOutHoursMessage] = React.useState("");

    const updateJourneyTypeInHours = (value: string) => {
        setJourneyTypeInHours(value);

        setJourneyInHours({ type: value, journey: {} });
    }

    const setJourneyInHoursQueueParam = (value: string) => {
        setQueueParam(value);

        setJourneyInHours({ type: journeyTypeInHours, journey: { action: "transfer", param: value } })
    };

    const updateJourneyInHours = (journey: {}) => {
        setJourneyInHours({ type: journeyTypeInHours, journey: journey });
    }

    useEffect(() => {
        let journey = {
            inHours: journeyInHours,
            outHours: props.hasOperatingHours ? {
                type: "disconnect",
                message: journeyOutHoursMessage
            } : {}
        };

        props.setExperienceJourney(journey);

    }, [journeyInHours, journeyOutHoursMessage]);

    const setToolsContent = (event: CustomEvent<BaseNavigationDetail>) => {
        event.preventDefault();
        props.setToolsContent(toolsContent);
    };

    return (
        <Container
            header={
                <Header variant="h2" description="How would you like to handle your customers ?">
                    Customer Journey{" "}
                    <Link
                        variant="info"
                        onFollow={(event) => {
                            setToolsContent(event);
                        }}
                    >
                        Info
                    </Link>
                </Header>
            }
        >
            <div className="container-content">
                <ExpandableSection header="Within operating hours">
                    <RadioGroup
                        onChange={({ detail }) => updateJourneyTypeInHours(detail.value)}
                        value={journeyTypeInHours}
                        items={[
                            { value: "menu", label: "With a DTMF menu" },
                            { value: "queue", label: "Transfer to a queue" },
                        ]}
                    />
                    {journeyTypeInHours === "menu" && <MenuComponent setMenu={updateJourneyInHours}/>}
                    {journeyTypeInHours === "queue" && (
                        <div className="queue-param-container">
                            <Box variant="p">
                                Using the following queue:
                            </Box>
                            <Input
                                onChange={({ detail }) => setJourneyInHoursQueueParam(detail.value)}
                                value={queueParam}
                                placeholder="Enter a name for the queue"
                            />
                        </div>
                    )}
                </ExpandableSection>
                {props.hasOperatingHours && (
                    <ExpandableSection header="Outside operating hours">
                        <Box variant="p">Play the following message and <span className="bold">hang up</span>:</Box>
                        <Input
                            onChange={({ detail }) => setJourneyOutHoursMessage(detail.value)}
                            value={journeyOutHoursMessage}
                            placeholder="Enter an outside of hours message"
                        />
                    </ExpandableSection>
                )}
            </div>
        </Container>
    );
};

export default CustomerJourneyComponent;
