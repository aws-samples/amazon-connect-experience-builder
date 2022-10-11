// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Alert, Container, Header, RadioGroup, Select, Spinner } from "@awsui/components-react";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import "./PhoneNumberComponent.css";

interface PhoneNumberComponentProps {
    selectedInstance: string;
    selectPhoneNumber: (value: string) => void;
}

const PhoneNumberComponent: FC<PhoneNumberComponentProps> = (props) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState({ label: "Select a country", value: "" });
    const [availablePhoneNumbers, setAvailablePhoneNumbers] = useState(Array<{ value: string; label: string }>());
    const [isLoading, setIsLoading] = useState(false);

    const setExperiencePhoneNumber = (value: string) => {
        setPhoneNumber(value);
        props.selectPhoneNumber(value);
    };

    const setExperiencePhoneNumberCountry = (value: any) => {
        setSelectedCountry(value);
    };

    const retrievePhoneNumbers = async () => {
        let phoneNumbers: any[] = [];
        setIsLoading(true);
        const result = await axios.post<any>(process.env.REACT_APP_API_PATH + "/dev/phone-numbers", { instanceArn: props.selectedInstance, countryCode: selectedCountry.value }, { headers: { "Authorization": sessionStorage.getItem("key") !== null ? sessionStorage.getItem("key") as string : ""} });

        console.log(result);
        
        result.data.forEach((number: any) => {
            phoneNumbers.push({
                label: number,
                value: number
            });
        });

        setAvailablePhoneNumbers(phoneNumbers);

        setIsLoading(false);
    }

    useEffect(() => {
        if (selectedCountry.value !== "") {
            retrievePhoneNumbers();
        }

    }, [selectedCountry])

    return (
        <Container
            header={
                <Header variant="h2" description="Which phone number do you want to associate with this experience ?">
                    Phone Number
                </Header>
            }
        >
            <div className="phone-number-container">
            {Object.keys(props.selectedInstance).length === 0 && (
                <Alert onDismiss={() => {}} visible={true} dismissAriaLabel="Close alert" header="Select an instance">
                    To see the phone numbers available, please select one of your Amazon Connect instance.
                </Alert>
            )}
            {Object.keys(props.selectedInstance).length !== 0 && selectedCountry.value === "" && (
                <Alert onDismiss={() => {}} visible={true} dismissAriaLabel="Close alert" header="Select a country">
                    Please choose the country where you wish to claim a number.
                </Alert>
            )}
            {Object.keys(props.selectedInstance).length !== 0 && (
                
                    <Select
                        selectedOption={selectedCountry}
                        onChange={({ detail }) => setExperiencePhoneNumberCountry(detail.selectedOption)}
                        options={[
                            {
                                label: "Australia",
                                value: "AU",
                            },
                            {
                                label: "New Zealand",
                                value: "NZ",
                            },
                        ]}
                        selectedAriaLabel="Selected country"
                    />
                
            )}
            {isLoading && (
                <Spinner />
            )}
            {Object.keys(props.selectedInstance).length !== 0 && selectedCountry.value !== "" && (
                <div>
                    <RadioGroup
                        onChange={({ detail }) => setExperiencePhoneNumber(detail.value)}
                        value={phoneNumber}
                        items={availablePhoneNumbers}
                    />
                </div>
            )}

            </div>
        </Container>
    );
};

export default PhoneNumberComponent;
