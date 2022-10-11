// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeaturesComponent from './FeaturesComponent';

describe('<FeaturesComponent />', () => {
  test('it should mount', () => {
    render(<FeaturesComponent setToolsContent={function test() {} } setExperienceRecording={ function test(value) {} } setExperiencePostcallAnalytics={ function test(value) {} } setExperienceRealtimeAnalytics={ function test(value) {} }/>);
    
    const featuresComponent = screen.getByTestId('FeaturesComponent');

    expect(featuresComponent).toBeInTheDocument();
  });
});