// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { createSlice } from "@reduxjs/toolkit";

interface ExperienceModel {
    title: string;
    features: {};
    voice: {};
    greeting: string;
    checkHours: boolean;
    timezone: string;
    hoursOfOperation: {};
    journey: {
        inHours: {
            type: string;
            journey: any;
        },
        outHours: {}
    };
    instance: string;
}

const initialState: ExperienceModel = {
    title: "",
    features: {},
    voice: {},
    greeting: "",
    checkHours: false,
    timezone: "",
    hoursOfOperation: {},
    journey: {
        inHours: {
            type: "",
            journey: {}
        },
        outHours: {}
    },
    instance: ""
};

export const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        setExperienceTitle: (state, action) => {
            state.title = action.payload;
        },
        setExperienceFeatures: (state, action) => { state.features = action.payload },
        setExperienceGreeting: (state, action) => { state.greeting = action.payload },
        setExperienceCheckHours: (state, action) => { state.checkHours = action.payload },
        setExperienceHoursOfOperation: (state, action) => { state.hoursOfOperation = action.payload },
        setExperienceJourney: (state, action) => { state.journey = action.payload },
        setExperienceVoice: (state, action) => { state.voice = action.payload },
        setExperienceInstance: (state, action) => { state.instance = action.payload },
        setExperienceTimezone: (state, action) => { state.timezone = action.payload }
    },
});

export const { setExperienceTitle, setExperienceFeatures, setExperienceGreeting, setExperienceTimezone, setExperienceCheckHours, setExperienceHoursOfOperation, setExperienceJourney, setExperienceVoice, setExperienceInstance } = experienceSlice.actions;
export default experienceSlice.reducer;
