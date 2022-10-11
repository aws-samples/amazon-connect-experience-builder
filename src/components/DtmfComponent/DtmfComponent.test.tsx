// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DtmfComponent from './DtmfComponent';

describe('<DtmfComponent />', () => {
  test('it should mount', () => {
    render(<DtmfComponent dtmf='0' setDtmfAction={ function test({}) {} } setDtmfChecked={ function test(value: boolean) {} } setDtmfParam={ function test(value: string) {} } setValid={ function test() {}}/>);
    
    const dtmfComponent = screen.getByTestId('DtmfComponent');

    expect(dtmfComponent).toBeInTheDocument();
  });
});