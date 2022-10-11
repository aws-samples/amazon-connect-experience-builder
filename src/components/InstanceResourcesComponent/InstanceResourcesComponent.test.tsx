// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InstanceResourcesComponent from './InstanceResourcesComponent';

describe('<InstanceResourcesComponent />', () => {
  test('it should mount', () => {
    render(<InstanceResourcesComponent data={[]} isLoading={false}/>);
    
    const instanceResourcesComponent = screen.getByTestId('InstanceResourcesComponent');

    expect(instanceResourcesComponent).toBeInTheDocument();
  });
});