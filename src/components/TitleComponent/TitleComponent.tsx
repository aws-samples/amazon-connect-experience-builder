// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Container, Header, Input, Link } from "@awsui/components-react";
import { BaseNavigationDetail } from "@awsui/components-react/internal/events";
import React, { FC } from "react";

interface TitleComponentProps {
    setExperienceTitle: (value: string) => void;
    setToolsContent: (tools: any) => void;
}

const toolsContent = {
    title: "Experience Title",
    content: (
        <div>
            <p>This title will be used to identify the contact flows and the resources that will be created in Amazon Connect.</p>
        </div>
    ),
    links: [
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/connect-contact-flows.html",
            text: "About Contact Flows",
        },
    ],
};

const TitleComponent: FC<TitleComponentProps> = (props) => {
    const [title, setTitle] = React.useState("");

    const setExperienceTitle = (value: string) => {
        setTitle(value);
        props.setExperienceTitle(value);
    };

    const setToolsContent = (event: CustomEvent<BaseNavigationDetail>) => {
        event.preventDefault();
        props.setToolsContent(toolsContent);
    };

    return (
        <Container
            header={
                <Header variant="h2" description="What will be the name of your customer experience ?">
                    Experience name{" "}
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
                <Input
                    onChange={({ detail }) => setExperienceTitle(detail.value)}
                    value={title}
                    placeholder="Enter a name for your experience"
                />
            </div>
        </Container>
    );
};

export default TitleComponent;
