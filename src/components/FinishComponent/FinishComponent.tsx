// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { FC, useEffect, useState } from "react";
import { Box, Flashbar, Link } from "@awsui/components-react";
import "./FinishComponent.css";
import axios from "axios";

interface FinishComponentProps {
    executionArn: string;
    phoneNumber: string;
}

const FinishComponent: FC<FinishComponentProps> = (props) => {
    const [executionResult, setExecutionResult] = useState("");

    useEffect(() => {

        console.log(props.executionArn)

        const executionProgress = async () => {
            let result = await axios.post<any>(process.env.REACT_APP_API_PATH + "/dev/experience", { executionArn: props.executionArn }, { headers: { "Authorization": sessionStorage.getItem("key") !== null ? sessionStorage.getItem("key") as string : ""} });
            
            console.log(result)

            setExecutionResult(result.data);
        }

        executionProgress();

        let interval = setInterval(() => {
            if (executionResult === "SUCEEDED" || executionResult === "FAILED") {
                clearInterval(interval);
            } else {
                executionProgress(); 
            }
        }, 3000);
    }, [])

    

    return (
        <div className="app-container">
            <div className="flashbar">
                <Flashbar
                    items={[
                        {
                            type: executionResult == "FAILED" ? "error" : "success",
                            loading: executionResult == "RUNNING",
                            content: executionResult == "FAILED" ? "Unfortunately, we are not able to create the experience right now." : (executionResult == "SUCCEEDED" ? "The experience was successfully created!" : "The experience is being created in your Amazon Connect instance"),
                        },
                    ]}
                />
            </div>
            <Box variant="p">
                It should take approximately 90 seconds to create the experience in your Amazon Connect instance. Once
                complete, you can start receiving your customers calls on the number you have claimed ({props.phoneNumber}).
            </Box>
            <Box variant="h1">Next steps</Box>
            <Box variant="p">
                In order to handle the calls, you will need to create agents, and assign them a routing profile that
                will enable them to answer the calls.
            </Box>
            <Link external externalIconAriaLabel="Opens in a new tab" href="https://docs.aws.amazon.com/connect/latest/adminguide/connect-agents.html">
                Creating agents in Amazon Connect
            </Link>
            <Link external externalIconAriaLabel="Opens in a new tab" href="https://docs.aws.amazon.com/connect/latest/adminguide/routing-profiles.html">
                Creating routing profiles in Amazon Connect
            </Link>
        </div>
    );
};

export default FinishComponent;
