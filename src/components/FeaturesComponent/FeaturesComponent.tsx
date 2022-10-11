// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Checkbox, Container, Header, Link } from "@awsui/components-react";
import { BaseNavigationDetail } from "@awsui/components-react/internal/events";
import React, { FC } from "react";

interface FeaturesComponentProps {
    setExperienceRecording: (value: boolean) => void;
    setExperiencePostcallAnalytics: (value: boolean) => void;
    setExperienceRealtimeAnalytics: (value: boolean) => void;
    setToolsContent: (tools: any) => void;
}

const toolsContent = {
    title: "Features",
    content: (
        <div>
            <p>If you choose to enable call recording, both agent and customer wil be recorded for each call.</p>
            <p>Speech analytics, powered by Contact Lens for Amazon Connect, allow you to gain insight on your customer sentiment throughout the call. By enabling analytics, calls will also be transcribed to text and Contact Lens will offer issues detection and call summarization (either in real-time or after the call).</p>
        </div>
    ),
    links: [
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/analyze-conversations.html",
            text: "About Contact Lens for Amazon Connect",
        },
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/review-recorded-conversations.html",
            text: "Review recorded conversations in Amazon Connect"
        }
    ],
};

const FeaturesComponent: FC<FeaturesComponentProps> = (props) => {
    const [checkCallRecording, setCallRecording] = React.useState(false);
    const [checkPostAnalytics, setPostAnalytics] = React.useState(false);
    const [checkRealAnalytics, setRealAnalytics] = React.useState(false);

    const setToolsContent = (event: CustomEvent<BaseNavigationDetail>) => {
        event.preventDefault();
        props.setToolsContent(toolsContent);
    };

    const setExperienceRecording = (value: boolean) => {
        setCallRecording(value);
        props.setExperienceRecording(value);
    };

    const setExperiencePostAnalytics = (value: boolean) => {
        setPostAnalytics(value);

        if (value) {
            setExperienceRecording(true);
        }

        props.setExperiencePostcallAnalytics(value);
    };

    const setExperienceRealAnalytics = (value: boolean) => {
        setRealAnalytics(value);

        if (value) {
            setExperiencePostAnalytics(true);
            setExperienceRecording(true);
        }

        props.setExperienceRealtimeAnalytics(value);
    };

    return (
        <Container
            header={
                <Header variant="h2" description="Which features would you like to use for this experience ?">
                    Features{" "}
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
                <Checkbox
                    onChange={({ detail }) => {
                        setExperienceRecording(detail.checked);
                    }}
                    checked={checkCallRecording || checkRealAnalytics || checkPostAnalytics}
                    disabled={checkRealAnalytics || checkPostAnalytics}
                >
                    Enable call recording
                </Checkbox>
                <Checkbox
                    onChange={({ detail }) => {
                        setExperiencePostAnalytics(detail.checked);
                    }}
                    checked={checkRealAnalytics ? true : checkPostAnalytics}
                    disabled={checkRealAnalytics}
                >
                    Enable post-call analytics
                </Checkbox>
                <Checkbox
                    onChange={({ detail }) => {
                        setExperienceRealAnalytics(detail.checked);
                    }}
                    checked={checkRealAnalytics}
                >
                    Enable real-time analytics
                </Checkbox>
            </div>
        </Container>
    );
};

export default FeaturesComponent;
