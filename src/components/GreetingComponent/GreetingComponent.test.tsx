// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GreetingComponent from './GreetingComponent';

describe('<GreetingComponent />', () => {
  test('it should mount', () => {
    render(<GreetingComponent setToolsContent={function test() {}} setExperienceGreeting={ function test(value: string) {} }/>);
    
    const greetingComponent = screen.getByTestId('GreetingComponent');

    expect(greetingComponent).toBeInTheDocument();
  });
});