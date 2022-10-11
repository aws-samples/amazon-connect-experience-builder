// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Button, Container, Header, Input } from '@awsui/components-react';
import axios from 'axios';
import React, { FC } from 'react';

import './AuthComponent.css';

interface AuthComponentProps {
    setAuthenticated: (isAuthenticated: boolean) => void
    setUser: (user: string) => void
    setApiKey: (apiKey: string) => void 
}

const AuthComponent: FC<AuthComponentProps> = (props) => {
    const [ apiKey, setApiKey ] = React.useState("");
    const [ isUnauthorized, setIsUnauthorized ] = React.useState(false);
    const [ verifying, setVerifying ] = React.useState(false);

    const verifyKey = async () => {
        setVerifying(true);
        setIsUnauthorized(false);

        const result = await axios.post<any>(process.env.REACT_APP_API_PATH + "/dev/auth", {apiKey: apiKey});
        console.log(result)
        if(result.status == 200) {
            sessionStorage.setItem("key", apiKey);
            
            props.setAuthenticated(true);
            props.setUser(result.data.body);
            props.setApiKey(apiKey);
        } else {
            setVerifying(false);
            setApiKey("");
            setIsUnauthorized(true);
            props.setAuthenticated(false);
        }
    }

    return (
        <Container
            header={
                <Header variant="h2" description="The API key obtained when deploying the solution">
                    API Key{" "}
                </Header>
            }
        >
            <div className="auth-container">
                <div className="api-input">
                    <Input
                        onChange={({ detail }) => setApiKey(detail.value)}
                        value={apiKey}
                        placeholder="Enter your API key"
                        disabled={verifying}
                    />
                </div>
                <Button variant="primary" onClick={verifyKey} disabled={apiKey.length == 0 || verifying}>Submit</Button>
            </div>
            { isUnauthorized && <p>Invalid API key !</p> }
        </Container>
    )
}

export default AuthComponent;
