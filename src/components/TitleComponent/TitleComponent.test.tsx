// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TitleComponent from './TitleComponent';

describe('<TitleComponent />', () => {
  test('it should mount', () => {
    render(<TitleComponent setExperienceTitle={function test(value: string) {}} setToolsContent={ function test() {} }/>);
    
    const titleComponent = screen.getByTestId('TitleComponent');

    expect(titleComponent).toBeInTheDocument();
  });
});