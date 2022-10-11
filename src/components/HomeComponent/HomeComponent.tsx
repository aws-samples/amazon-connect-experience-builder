// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { FC, useEffect, useState } from "react";

import { Button } from "@awsui/components-react";

import TitleComponent from "../TitleComponent/TitleComponent";
import GreetingComponent from "../GreetingComponent/GreetingComponent";
import HoursOfOperationComponent from "../HoursOfOperationComponent/HoursOfOperationComponent";
import CustomerJourneyComponent from "../CustomerJourneyComponent/CustomerJourneyComponent";
import FeaturesComponent from "../FeaturesComponent/FeaturesComponent";

import "./HomeComponent.css";
import VoiceComponent from "../VoiceComponent/VoiceComponent";
import { setExperienceTitle, setExperienceFeatures, setExperienceGreeting, setExperienceTimezone, setExperienceHoursOfOperation, setExperienceJourney, setExperienceVoice, setExperienceCheckHours } from "../../experienceSlice";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router";
import axios from "axios";

interface HomeComponentProps {
    setAppToolsContent: (tools: any) => void;
}

const HomeComponent: FC<HomeComponentProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState("");
    const [greeting, setGreeting] = useState("");
    const [recording, setRecording] = useState(false);
    const [checkHours, setCheckHours] = useState(false);
    const [hours, setHours] = useState({});
    const [journey, setJourney] = useState<{inHours: any, outHours: any}>({inHours: {}, outHours: {}});
    const [voice, setVoice] = useState<{language: string, voice: string}>({language: "", voice: ""});
    const [realtimeAnalytics, setRealtimeAnalytics] = useState(false);
    const [postcallAnalytics, setPostcallAnalytics] = useState(false);
    const [timezone, setTimezone] = useState("");

    const openTools = (tools: any) => {
        props.setAppToolsContent(tools);
    }

    const onContinueClick = () => {
        dispatch(setExperienceTitle(title));
        dispatch(setExperienceFeatures({ callRecording: recording, postcallAnalytics: postcallAnalytics, realtimeAnalytics: realtimeAnalytics }));
        dispatch(setExperienceVoice(voice));
        dispatch(setExperienceGreeting(greeting));
        dispatch(setExperienceCheckHours(checkHours));
        dispatch(setExperienceHoursOfOperation(hours));
        dispatch(setExperienceJourney(journey));
        dispatch(setExperienceTimezone(timezone));

        navigate('/resources');
    }

    const validateJourney = () => {
        return true;
    }

    const validExperience = () => {
        if (title == "") {
            return false;
        }

        if (voice.voice == "") {
            return false;
        }

        if (greeting == "") {
            return false;
        }

        if (checkHours && timezone == "") {
            return false;
        }

        return true && validateJourney();
    }

    return (
        <div className="app-container">
            <TitleComponent setExperienceTitle={setTitle} setToolsContent={openTools} />
            <FeaturesComponent setToolsContent={openTools} setExperienceRecording={setRecording} setExperiencePostcallAnalytics={setPostcallAnalytics} setExperienceRealtimeAnalytics={setRealtimeAnalytics}/>
            <VoiceComponent setToolsContent={openTools} setExperienceVoice={setVoice} />
            <GreetingComponent setToolsContent={openTools} setExperienceGreeting={setGreeting} />
            <HoursOfOperationComponent
                setToolsContent={openTools}
                setExperienceCheckHours={setCheckHours}
                setExperienceHoursOfOperation={setHours}
                setExperienceTimezone={setTimezone}
            />
            <CustomerJourneyComponent
                setToolsContent={openTools}
                hasOperatingHours={checkHours}
                setExperienceJourney={setJourney}
            />
            <div className="main-actions-container">
                <Button onClick={onContinueClick} disabled={!validExperience()} variant="primary">Continue</Button>
            </div>
        </div>
    );
};

export default HomeComponent;
