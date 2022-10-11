// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Checkbox, Container, Header, Link, Select } from "@awsui/components-react";
import { BaseNavigationDetail } from "@awsui/components-react/internal/events";
import React, { FC } from "react";
import HoursOfOperationSelectorComponent from "../HoursOfOperationSelectorComponent/HoursOfOperationSelectorComponent";
import selections from "./Selections";

interface HoursOfOperationComponentProps {
    setExperienceCheckHours: (value: boolean) => void;
    setExperienceHoursOfOperation: (value: {}) => void;
    setExperienceTimezone: (value: string) => void;
    setToolsContent: (tools: any) => void;
}

const toolsContent = {
    title: "Hours of operation",
    content: (
        <div>
            <p>Hours of operation dictate when your contact centre is opened or closed. Defining hours of operations will allow you to control what happens to customers calling your contact centre when inside and outside operating hours.</p>
            <p>If you choose not to define hours of operation, customers will be placed in queue at any time of the day.</p>
        </div>
    ),
    links: [
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/set-hours-operation.html",
            text: "About Hours of Operation in Amazon Connect"
        }
    ]
};

const HoursOfOperationComponent: FC<HoursOfOperationComponentProps> = (props) => {
    const [checkHours, setCheckHours] = React.useState(false);
    const [timezone, setTimezone] = React.useState<any>({
        value: "",
        label: "Select a time zone"
    });
    const [hours, setHours] = React.useState({});

    const setExperienceCheckHours = (value: boolean) => {
        setCheckHours(value);
        props.setExperienceCheckHours(value);
    };

    const setExperienceHoursOfOperation = (value: {}) => {
        setHours(value);
        props.setExperienceHoursOfOperation(value);
    };

    const setExperienceTZ = (value: any) => {
        setTimezone(value);
        props.setExperienceTimezone(value.value);
    };

    const setToolsContent = (event: CustomEvent<BaseNavigationDetail>) => {
        event.preventDefault();
        props.setToolsContent(toolsContent);
    };

    return (
        <Container
            header={
                <Header
                    variant="h2"
                    description="Would you like to define hours of operation for your contact centre ?"
                >
                    Hours of operation{" "}
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
                        setExperienceCheckHours(detail.checked);
                    }}
                    checked={checkHours}
                >
                    Define hours of operation
                </Checkbox>

                {checkHours && (
                    <>
                        <Select
                            selectedOption={timezone}
                            onChange={({ detail }) =>
                                setExperienceTZ(detail.selectedOption)
                            }
                            options={selections.timzones}
                            selectedAriaLabel="Selected"
                        />
                        <HoursOfOperationSelectorComponent setHoursOfOperation={setExperienceHoursOfOperation} />
                    </>
                )}
            </div>
        </Container>
    );
};

export default HoursOfOperationComponent;
