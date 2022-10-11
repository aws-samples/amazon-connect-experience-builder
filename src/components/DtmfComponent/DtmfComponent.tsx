// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Checkbox, Grid, Input, Select } from "@awsui/components-react";
import React, { FC } from "react";
import "./DtmfComponent.css";

import selections from "./Selections";
import countries from "./Countries";

interface DtmfComponentProps {
    setDtmfChecked: (value: boolean) => void;
    setDtmfAction: (value: {}) => void;
    setDtmfParam: (value: string) => void;
    dtmf: string;
    setValid: (dtmf: string, valid: boolean) => void;
}

const DtmfComponent: FC<DtmfComponentProps> = (props) => {
    const [dtmfChecked, setDtmfChecked] = React.useState(false);
    const [dtmfAction, setDtmfAction] = React.useState<any>({});
    const [dtmfParam, setDtmfParam] = React.useState("");
    const [externalCountry, setExternalCountry] = React.useState<any>({});

    const setExperienceDtmfChecked = (value: boolean) => {
        setDtmfChecked(value);
        props.setDtmfChecked(value);
    };

    const setExperienceDtmfAction = (value: {}) => {
        setDtmfAction(value);
        props.setDtmfAction(value);
    };

    const setExperienceDtmfParam = (value: string) => {
        setDtmfParam(value);

        if (dtmfAction.value !== "external") {
            props.setDtmfParam(value);
        } else {
            props.setDtmfParam(externalCountry.value + ";" + externalCountry.label + value);
        }
    };

    React.useEffect(() => {
        if (dtmfChecked) {
            if ((dtmfAction.value === "transfer" || dtmfAction.value === "external") && dtmfParam !== "") {
                props.setValid(props.dtmf, true);
            }
        }
    }, [dtmfChecked, dtmfAction, dtmfParam])

    console.log(externalCountry);

    return (
        <Grid gridDefinition={[{ colspan: 2 }, { colspan: 5 }, { colspan: 5 }]}>
            <div className="dtmf-container">
                <Checkbox
                    onChange={({ detail }) => {
                        setExperienceDtmfChecked(detail.checked);
                    }}
                    checked={dtmfChecked}
                >
                    DTMF {props.dtmf}
                </Checkbox>
            </div>
            <div className="action-container">
                <p>
                    When a customer presses <span>{props.dtmf}</span>,
                </p>
                <Select
                    selectedOption={dtmfAction}
                    onChange={({ detail }) => setExperienceDtmfAction(detail.selectedOption)}
                    options={selections.actions}
                    selectedAriaLabel="Selected"
                    disabled={!dtmfChecked}
                />
            </div>
            {dtmfAction.value === "transfer" && (
                <div className="param-container">
                    <p>Using the following queue:</p>
                    <Input
                        onChange={({ detail }) => setExperienceDtmfParam(detail.value)}
                        value={dtmfParam}
                        placeholder="Enter a name for the queue"
                        disabled={dtmfAction.value !== "transfer" || !dtmfChecked}
                    />
                </div>
            )}
            {dtmfAction.value === "external" && (
                <div className="param-container">
                    <p>Using the following number:</p>
                    <Select
                        className="countries"
                        onChange={({ detail }) => setExternalCountry(detail.selectedOption)}
                        selectedOption={externalCountry}
                        options={countries.countries}
                        disabled={dtmfAction.value !== "external" || !dtmfChecked}
                    />
                    <Input
                        onChange={({ detail }) => setExperienceDtmfParam(detail.value)}
                        value={dtmfParam}
                        placeholder="Enter an external number"
                        disabled={dtmfAction.value !== "external" || !dtmfChecked || !externalCountry.value}
                    />
                </div>
            )}
            {dtmfAction.value === "hangup" && (
                <div className="param-container">
                    <p>Using the following message:</p>
                    <Input
                        onChange={({ detail }) => setExperienceDtmfParam(detail.value)}
                        value={dtmfParam}
                        placeholder="Enter a message"
                        disabled={dtmfAction.value !== "hangup" || !dtmfChecked}
                    />
                </div>
            )}
        </Grid>
    );
};

export default DtmfComponent;
