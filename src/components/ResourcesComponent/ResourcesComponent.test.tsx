// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResourcesComponent from './ResourcesComponent';

describe('<ResourcesComponent />', () => {
  test('it should mount', () => {
    render(<ResourcesComponent setPhoneNumber={function test() {}} setExecutionId={ function test() {} }/>);
    
    const resourcesComponent = screen.getByTestId('ResourcesComponent');

    expect(resourcesComponent).toBeInTheDocument();
  });
});