// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VoiceComponent from './VoiceComponent';

describe('<VoiceComponent />', () => {
  test('it should mount', () => {
    render(<VoiceComponent setToolsContent={function test() {}} setExperienceVoice={ function test() {} }/>);
    
    const voiceComponent = screen.getByTestId('VoiceComponent');

    expect(voiceComponent).toBeInTheDocument();
  });
});