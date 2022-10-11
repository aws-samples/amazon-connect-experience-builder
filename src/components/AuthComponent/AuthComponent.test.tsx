// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthComponent from './AuthComponent';

describe('<AuthComponent />', () => {
  test('it should mount', () => {
    render(<AuthComponent setAuthenticated={ function test () {}} setUser={ function test () {} } setApiKey={ function test () {} }/>);
    
    const authComponent = screen.getByTestId('AuthComponent');

    expect(authComponent).toBeInTheDocument();
  });
});