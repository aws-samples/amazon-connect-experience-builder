// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavigationComponent from './NavigationComponent';

describe('<NavigationComponent />', () => {
  test('it should mount', () => {
    render(<NavigationComponent />);
    
    const navigationComponent = screen.getByTestId('NavigationComponent');

    expect(navigationComponent).toBeInTheDocument();
  });
});