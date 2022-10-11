// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Container, Header, Input, Link } from "@awsui/components-react";
import { BaseNavigationDetail } from "@awsui/components-react/internal/events";
import React, { FC } from "react";

interface GreetingComponentProps {
    setExperienceGreeting: (value: string) => void;
    setToolsContent: (tools: any) => void;
}

const toolsContent = {
    title: "Greeting",
    content: (
        <div>
            <p>Greeting your customers approriately is important to deliver good customer experience. This is first message your customers will hear when calling your contact centre.</p>
        </div>
    )
};


const GreetingComponent: FC<GreetingComponentProps> = (props) => {
    const [greeting, setGreeting] = React.useState("");

    const setExperienceGreeting = (value: string) => {
        setGreeting(value);
        props.setExperienceGreeting(value);
    };

    const setToolsContent = (event: CustomEvent<BaseNavigationDetail>) => {
        event.preventDefault();
        props.setToolsContent(toolsContent);
    };

    return (
        <Container
            header={
                <Header variant="h2" description="How would you like to greet your customers ?">
                    Greeting{" "}
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
                    onChange={({ detail }) => setExperienceGreeting(detail.value)}
                    value={greeting}
                    placeholder="Enter a greeting message for your contact centre"
                />
            </div>
        </Container>
    );
};

export default GreetingComponent;
