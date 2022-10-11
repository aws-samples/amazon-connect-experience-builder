// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Button, Container, Header, Link, Select } from "@awsui/components-react";
import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ConfirmationModalComponent from "../ConfirmationModalComponent/ConfirmationModalComponent";
import InstanceResourcesComponent from "../InstanceResourcesComponent/InstanceResourcesComponent";
import PhoneNumberComponent from "../PhoneNumberComponent/PhoneNumberComponent";
import { setExperienceInstance } from "../../experienceSlice";
import { useNavigate } from "react-router-dom";
import "./ResourcesComponent.css";

interface ResourcesComponentProps {
    setExecutionId : (value: string) => void
    setPhoneNumber : (value: string) => void
}

const ResourcesComponent: FC<ResourcesComponentProps> = (props) => {
    const experience = useAppSelector((state) => state.experience);
    const dispatch = useAppDispatch();

    const [selectedInstance, setSelectedInstance] = useState({ label: "Select an instance", value: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [instanceResources, setInstanceResources] = useState(Array<{}>());
    const [instances, setInstances] = useState(Array<{}>());
    const [experienceResources, setExperienceResources] = useState(Array<{}>());
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        retrieveInstances();
    }, []);

    useEffect(() => {
        if (selectedPhoneNumber != "") {
            if (experienceResources.find((o: any) => o.type === "phoneNumber")) {
                experienceResources.splice(
                    experienceResources.findIndex((o: any) => o.type === "phoneNumber"),
                    1
                );
            }

            experienceResources.push({
                name: selectedPhoneNumber,
                type: "phoneNumber",
                arn: "",
            });

            props.setPhoneNumber(selectedPhoneNumber);
            
            diffResources();
        }
    }, [selectedPhoneNumber]);

    useEffect(() => {
        if (instanceResources.length !== 0) {
            diffResources();
        }
    }, [instanceResources]);

    useEffect(() => {
        if (selectedInstance.value !== "") {
            setIsLoading(true);

            retrieveInstanceData();
            formatExperienceResources();
        }
    }, [selectedInstance]);

    const diffResources = async () => {
        let updatedResources: any[] = [];

        experienceResources.forEach((resource: any) => {
            if (instanceResources.find((r: any) => r.name === resource.name && r.type === resource.type)) {
                updatedResources.push(
                    instanceResources.find((r: any) => r.name === resource.name && r.type === resource.type)
                );
            } else {
                updatedResources.push(resource);
            }
        });

        setExperienceResources(updatedResources);
    };

    const formatExperienceResources = async () => {
        let experienceResources: any[] = [];

        if (experience.journey.inHours.type === "queue") {
            if (experience.journey.inHours.journey.action === "transfer") {
                experienceResources.push({
                    name: experience.journey.inHours.journey.param,
                    type: "queue",
                    arn: "",
                });
            }
        } else {
            Object.keys(experience.journey.inHours.journey).forEach((menuKey) => {
                if (menuKey.startsWith("dtmf")) {
                    Object.keys(experience.journey.inHours.journey[menuKey]).forEach((dtmf) => {
                        if (dtmf === "action" && experience.journey.inHours.journey[menuKey]["action"] === "transfer") {
                            if (
                                !experienceResources.find(
                                    (resource) => resource.name === experience.journey.inHours.journey[menuKey]["param"]
                                )
                            ) {
                                experienceResources.push({
                                    name: experience.journey.inHours.journey[menuKey]["param"],
                                    type: "queue",
                                    arn: "",
                                });
                            }
                        }
                    });
                }
            });
        }

        if (experience.checkHours) {
            experienceResources.push({
                name: experience.title + "_hours",
                type: "hop",
                arn: "",
            });
        } else {
            experienceResources.push({
                name: "default_hours_24_7_" + Date.now().toString(),
                type: "hop",
                arn: "",
            });
        }

        setExperienceResources(experienceResources);
    };

    const setExperienceSelectedInstance = async (data: any) => {
        setSelectedInstance(data);
        dispatch(setExperienceInstance(data.value));
    };

    const retrieveInstanceData = async () => {
        const result = await axios.post<any>(
            process.env.REACT_APP_API_PATH + "/dev/resources",
            { instanceArn: experience.instance }, { headers: { "Authorization": sessionStorage.getItem("key") !== null ? sessionStorage.getItem("key") as string : ""} }
        );

        console.log(result);

        setInstanceResources(result.data);
        setIsLoading(false);
    };

    const retrieveInstances = async () => {
        let instanceList: any[] = [];
        const result = await axios.get<any>(
            process.env.REACT_APP_API_PATH + "/dev/instances", { headers: { "Authorization": sessionStorage.getItem("key") !== null ? sessionStorage.getItem("key") as string : ""} }
        );

        console.log(result);

        result.data.forEach((instance: any) => {
            instanceList.push({
                label: instance.InstanceAlias,
                value: instance.Arn,
            });
        });

        setInstances(instanceList);
    };

    const onConfirmClick = async () => {
        // do the thing and navigate to finish
        setConfirmed(true);
        const result = await axios.put<any>(process.env.REACT_APP_API_PATH + "/dev/experience/", {experience: experience, resources: experienceResources}, { headers: { "Authorization": sessionStorage.getItem("key") !== null ? sessionStorage.getItem("key") as string : ""} });
        
        console.log(result);
        
        props.setExecutionId(result.data);
        navigate("/finish");
    };

    return (
        <div className="app-container">
            <Container
                header={
                    <Header variant="h2" description="Which of your Amazon Connect instances would you like to use ?">
                        Available Instances <Link variant="info">Info</Link>
                    </Header>
                }
            >
                <Select
                    selectedOption={selectedInstance}
                    onChange={({ detail }) => setExperienceSelectedInstance(detail.selectedOption)}
                    options={instances}
                    disabled={instances.length === 0 || isLoading}
                    selectedAriaLabel="Selected instance"
                />
            </Container>
            <PhoneNumberComponent
                selectedInstance={selectedInstance.value}
                selectPhoneNumber={setSelectedPhoneNumber}
            />
            <InstanceResourcesComponent data={experienceResources} isLoading={isLoading} />
            <div className="main-actions-container">
                <Button
                    disabled={Object.keys(selectedInstance).length === 0 || isLoading || confirmed}
                    variant="primary"
                    onClick={onConfirmClick}
                >
                    Continue
                </Button>
            </div>
            {/* <ConfirmationModalComponent visible={modalVisible} /> */}
        </div>
    );
};

export default ResourcesComponent;
