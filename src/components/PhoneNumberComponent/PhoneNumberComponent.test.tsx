// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PhoneNumberComponent from './PhoneNumberComponent';

describe('<PhoneNumberComponent />', () => {
  test('it should mount', () => {
    render(<PhoneNumberComponent selectedInstance={""} selectPhoneNumber={ function test() {} }/>);
    
    const phoneNumberComponent = screen.getByTestId('PhoneNumberComponent');

    expect(phoneNumberComponent).toBeInTheDocument();
  });
});