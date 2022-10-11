// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HoursOfOperationComponent from './HoursOfOperationComponent';

describe('<HoursOfOperationComponent />', () => {
  test('it should mount', () => {
    render(<HoursOfOperationComponent setToolsContent={ function test() {} } setExperienceTimezone={ function test() {} } setExperienceCheckHours={ function test(value: boolean) {} } setExperienceHoursOfOperation={function test(value: {}) {}}/>);
    
    const hoursOfOperationComponent = screen.getByTestId('HoursOfOperationComponent');

    expect(hoursOfOperationComponent).toBeInTheDocument();
  });
});