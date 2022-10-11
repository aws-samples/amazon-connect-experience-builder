// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Button, Container, Header, Link, Select } from "@awsui/components-react";
import React, { FC } from "react";
import "./VoiceComponent.css";

import selections from "./Selections";
import { BaseNavigationDetail } from "@awsui/components-react/internal/events";

interface VoiceComponentProps {
    setExperienceVoice: (voice: any) => void;
    setToolsContent: (tools: any) => void;
}

const toolsContent = {
    title: "Voice",
    content: (
        <div>
            <p>Amazon Connect directly integrates with Amazon Polly, a service that turns text into lifelike speech.</p>
            <p>You can choose the voice that will be used to deliver messages and prompts to your customers amongst the Neural Text-to-Speech (NTTS) voices offered by Polly, at no additional cost.</p>
        </div>
    ),
    links: [
        {
            href: "https://docs.aws.amazon.com/connect/latest/adminguide/text-to-speech.html",
            text: "Delivering messages or prompting customers in Amazon Connect",
        },
        {
            href: "https://aws.amazon.com/polly/",
            text: "More about Amazon Polly"
        }
    ],
};


const VoiceComponent: FC<VoiceComponentProps> = (props) => {

    const setToolsContent = (event: CustomEvent<BaseNavigationDetail>) => {
        event.preventDefault();
        props.setToolsContent(toolsContent);
    };

    let audio = new Audio();

    const [voice, setVoice] = React.useState<any>({ label: "Select a voice", value: "" });
    const [language, setLanguage] = React.useState<any>({ label: "Select a language", value: "" });
    const [audioPlaying, setAudioPlaying] = React.useState(false);

    const setExperienceVoice = (value: any) => {
        setVoice(value);
        props.setExperienceVoice({ voice: value.value, language: language.value});
    };

    const playAudioSample = () => {
        let sample: any = selections.voices.find(o => (o.language === language.value))?.voices.find(p => p.value === voice.value);
        audio = new Audio(process.env.PUBLIC_URL + sample.sample);
        setAudioPlaying(true);
        audio.addEventListener('ended', () => {
            setAudioPlaying(false);
        });

        audio.play();
    }

    return (
        <Container
            header={
                <Header variant="h2" description="Which voice would you like to use for your experience ?">
                    Voice{" "}
                    <Link
                        variant="info"
                        onFollow={(event) => {
                            setToolsContent(event);
                        }}
                    >
                        Info
                    </Link>
                </Header>
            }
        >
            <div className="container-content">
                <Select
                    selectedOption={language}
                    onChange={({ detail }) => { setLanguage(detail.selectedOption); setExperienceVoice({ label: "Select a voice", value: "" })}}
                    options={selections.languages}
                    selectedAriaLabel="Selected language"
                    placeholder="Select a language"
                />
                <div className="voice-container">
                    <div className="voice-selector">
                        <Select
                            selectedOption={voice}
                            onChange={({ detail }) => setExperienceVoice(detail.selectedOption)}
                            options={selections.voices.find((o) => o.language === language.value)?.voices}
                            selectedAriaLabel="Selected voice"
                            placeholder="Select a voice"
                            disabled={Object.keys(language).length === 0 || language.value === ""}
                        />
                    </div>
                    <Button disabled={voice.value === "" || audioPlaying} iconName="caret-right-filled" onClick={playAudioSample}>Hear a sample</Button>
                </div>
            </div>
        </Container>
    );
};

export default VoiceComponent;
