// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FinishComponent from './FinishComponent';

describe('<FinishComponent />', () => {
  test('it should mount', () => {
    render(<FinishComponent  phoneNumber='' executionArn='' />);
    
    const finishComponent = screen.getByTestId('FinishComponent');

    expect(finishComponent).toBeInTheDocument();
  });
});