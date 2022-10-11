// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationModalComponent from './ConfirmationModalComponent';

describe('<ConfirmationModalComponent />', () => {
  test('it should mount', () => {
    render(<ConfirmationModalComponent visible={false} />);
    
    const confirmationModalComponent = screen.getByTestId('ConfirmationModalComponent');

    expect(confirmationModalComponent).toBeInTheDocument();
  });
});