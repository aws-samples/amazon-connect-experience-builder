// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { configureStore } from "@reduxjs/toolkit";
import experienceReducer from "./experienceSlice"

export const store = configureStore({
    reducer: {
        experience: experienceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;