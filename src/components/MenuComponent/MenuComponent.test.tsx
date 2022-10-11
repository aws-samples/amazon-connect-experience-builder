// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MenuComponent from './MenuComponent';

describe('<MenuComponent />', () => {
  test('it should mount', () => {
    render(<MenuComponent setMenu={ function test () {} }/>);
    
    const menuComponent = screen.getByTestId('MenuComponent');

    expect(menuComponent).toBeInTheDocument();
  });
});