// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerJourneyComponent from './CustomerJourneyComponent';

describe('<CustomerJourneyComponent />', () => {
  test('it should mount', () => {
    render(<CustomerJourneyComponent setToolsContent={function test() {}} hasOperatingHours={true} setExperienceJourney={ function test(value) {} }/>);
    
    const customerJourneyComponent = screen.getByTestId('CustomerJourneyComponent');

    expect(customerJourneyComponent).toBeInTheDocument();
  });
});