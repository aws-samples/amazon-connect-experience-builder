// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

import logo from "./ico_connect.svg";
import "./App.css";

import { AppLayout, HelpPanel, Icon, Link, TopNavigation } from "@awsui/components-react";

import HomeComponent from "./components/HomeComponent/HomeComponent";
import ResourcesComponent from "./components/ResourcesComponent/ResourcesComponent";
import FinishComponent from "./components/FinishComponent/FinishComponent";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import axios from "axios";

const tools = {
    title: "Experience Builder for Amazon Connect",
    content: 
        <div>
            <p>Welcome to the Experience Builder for Amazon Connect!</p>
            <p>This application will help you create your first customer experience with Amazon Connect. In a few clicks, you will be able to define and deploy an experience, without any prior knowledge of how things work in Amazon Connect.</p>
            <p>While the application will create all the necessary contact flows and resources automatically, we encourage you to familiarize yourself with the concepts by clicking on the <b>"Info"</b> link in each section.</p>
        </div>,
    links: [
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/",
            text: "Amazon Connect Administration Guide"
        }
    ],
};

const getDefaultToolsContent = () => tools;

const getFormattedToolsContent = (tools: any) => (
    <HelpPanel
        header={<h2>{tools.title}</h2>}
        footer={ tools.links && (
            <>
                <h3>
                    Learn more{" "}
                    <span role="img" aria-label="Icon external Link">
                        <Icon name="external" />
                    </span>
                </h3>
                <ul>
                    {tools.links.map((link: any, i: any) => (
                        <li key={i}>
                            <Link href={link.href} target="_blank">
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </>
            )
        }
    >
        {tools.content}
    </HelpPanel>
);

const useTools = () => {
    const [toolsContent, setToolsContent] = useState(getFormattedToolsContent(getDefaultToolsContent()));
    const [isToolsOpen, setIsToolsOpen] = useState(false);

    const setFormattedToolsContent = (tools: any) => {
        setToolsContent(getFormattedToolsContent(tools));
    };

    const openTools = (tools: any) => {
        if (tools) {
            setFormattedToolsContent(tools);
        }
        setIsToolsOpen(true);
    };
    const closeTools = () => setIsToolsOpen(false);

    const onToolsChange = (evt: any) => {
        setIsToolsOpen(evt.detail.open);

        if (!evt.detail.open) {
            setFormattedToolsContent(getDefaultToolsContent());
        }
    };

    return {
        toolsContent,
        isToolsOpen,
        openTools,
        closeTools,
        setFormattedToolsContent,
        onToolsChange,
    };
};

function App({}) {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [user, setUser] = useState("");
    const [ apiKey, setApiKey ] = useState("");
    const { toolsContent, isToolsOpen, openTools, onToolsChange } = useTools();
    const [exectutionArn, setExecutionArn] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const setExecution = (value: string) => {
        setExecutionArn(value);
    }

    useEffect(() => {
        const testApi = async () => {
            let result = await axios.get(process.env.REACT_APP_API_PATH + "/dev/hello");
            
            console.log(result);

            if (result.status == 200) {
                console.log("API is up and running");
            }
        };

        testApi();
    }, [])

    return (
        <div className="App">
            <AppLayout
                navigationHide={true}
                tools={toolsContent}
                toolsOpen={isToolsOpen}
                onToolsChange={onToolsChange}
                content={
                    <div>
                        <div className="navigation-container">
                            <TopNavigation
                                identity={{
                                    href: "/",
                                    title: "Experience Builder for Amazon Connect",
                                    logo: {
                                        src: logo,
                                    },
                                }}
                                i18nStrings={{
                                    searchIconAriaLabel: "Search",
                                    searchDismissIconAriaLabel: "Close search",
                                    overflowMenuTriggerText: "More",
                                    overflowMenuTitleText: "More",
                                    overflowMenuBackIconAriaLabel: "Back",
                                    overflowMenuDismissIconAriaLabel: "Close menu",
                                }}
                            />
                        </div>
                        <Router>
                            <Provider store={store}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                {isAuthenticated &&
                                                <HomeComponent
                                                    setAppToolsContent={openTools}
                                                />
                                                }
                                                {!isAuthenticated &&
                                                <AuthComponent
                                                    setAuthenticated={setisAuthenticated}
                                                    setUser={setUser}
                                                    setApiKey={setApiKey}
                                                />}
                                            </>
                                            
                                        }
                                    ></Route>
                                    <Route
                                        path="/resources"
                                        element={<ResourcesComponent setPhoneNumber={setPhoneNumber} setExecutionId={setExecution}/>}
                                    ></Route>
                                    <Route
                                        path="/finish"
                                        element={<FinishComponent phoneNumber={phoneNumber} executionArn={exectutionArn}/>
                                    }
                                    ></Route>
                                </Routes>
                            </Provider>
                        </Router>
                    </div>
                }
            />
        </div>
    );
}

export default App;
