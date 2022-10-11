// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HoursOfOperationSelectorComponent from './HoursOfOperationSelectorComponent';

describe('<HoursOfOperationSelectorComponent />', () => {
  test('it should mount', () => {
    render(<HoursOfOperationSelectorComponent setHoursOfOperation={ function test(value: {}) {} }/>);
    
    const hoursOfOperationSelectorComponent = screen.getByTestId('HoursOfOperationSelectorComponent');

    expect(hoursOfOperationSelectorComponent).toBeInTheDocument();
  });
});