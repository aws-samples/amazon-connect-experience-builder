// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeComponent from './HomeComponent';

describe('<HomeComponent />', () => {
  test('it should mount', () => {
    render(<HomeComponent setAppToolsContent={ function test() {} } />);
    
    const homeComponent = screen.getByTestId('HomeComponent');

    expect(homeComponent).toBeInTheDocument();
  });
});