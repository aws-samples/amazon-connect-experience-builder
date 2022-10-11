// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Box, Button, Input, Modal, SpaceBetween } from "@awsui/components-react";
import axios from "axios";
import React, { FC, useState } from "react";
import { useAppSelector } from "../../hooks";

interface ConfirmationModalComponentProps {
    visible: boolean;
}

const ConfirmationModalComponent: FC<ConfirmationModalComponentProps> = (props) => {
    const experience = useAppSelector((state) => state.experience);

    const [visible, setVisible] = useState(props.visible);
    const [experienceName, setExperienceName] = useState("");
    const [valid, setValid] = useState(false);

    const validateExperienceName = (value: string) => {
        setExperienceName(value);
        console.log(value)
        if (value === experience.title) {
            setValid(true)
        } else {
            setValid(false);
        }
    }

    const confirm = async () => {
        const result = await axios.put(process.env.REACT_APP_API_PATH + "/dev/experience/", { experience: {}, resources: [] }, { headers: { "Authorization": sessionStorage.getItem("key") !== null ? sessionStorage.getItem("key") as string : ""} });
    }

    return (
        <Modal
            onDismiss={() => setVisible(false)}
            visible={visible}
            closeAriaLabel="Close modal"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
                        <Button disabled={!valid} onClick={confirm} variant="primary">Confirm</Button>
                    </SpaceBetween>
                </Box>
            }
            header="Do you want to generate the experience ?"
        >
            <Box variant="p">
                To confirm the creation of the experience in the Amazon Connect instance (instanceAlias),
                type "" in the following box:
            </Box>
            <Input
                    onChange={({ detail }) => validateExperienceName(detail.value)}
                    value={experienceName}
                    placeholder={experience.title}
                />
        </Modal>
    );
};

export default ConfirmationModalComponent;
