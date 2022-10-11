// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Checkbox, Grid, Icon, Select } from "@awsui/components-react";
import React, { FC, useEffect } from "react";

import selections from "./Selections";
import "./HoursOfOperationSelectorComponent.css";

interface HoursOfOperationSelectorComponentProps {
    setHoursOfOperation: (value: {}) => void;
}

const HoursOfOperationSelectorComponent: FC<HoursOfOperationSelectorComponentProps> = (props) => {
    const [hours, setHours] = React.useState({});

    const [mondayChecked, setMondayChecked] = React.useState(false);
    const [selectedMondayFromHoursOption, setSelectedMondayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedMondayFromMinutesOption, setSelectedMondayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedMondayToHoursOption, setSelectedMondayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedMondayToMinutesOption, setSelectedMondayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const [tuesdayChecked, setTuesdayChecked] = React.useState(false);
    const [selectedTuesdayFromHoursOption, setSelectedTuesdayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedTuesdayFromMinutesOption, setSelectedTuesdayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedTuesdayToHoursOption, setSelectedTuesdayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedTuesdayToMinutesOption, setSelectedTuesdayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const [wednesdayChecked, setWednesdayChecked] = React.useState(false);
    const [selectedWednesdayFromHoursOption, setSelectedWednesdayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedWednesdayFromMinutesOption, setSelectedWednesdayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedWednesdayToHoursOption, setSelectedWednesdayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedWednesdayToMinutesOption, setSelectedWednesdayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const [thursdayChecked, setThursdayChecked] = React.useState(false);
    const [selectedThursdayFromHoursOption, setSelectedThursdayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedThursdayFromMinutesOption, setSelectedThursdayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedThursdayToHoursOption, setSelectedThursdayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedThursdayToMinutesOption, setSelectedThursdayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const [fridayChecked, setFridayChecked] = React.useState(false);
    const [selectedFridayFromHoursOption, setSelectedFridayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedFridayFromMinutesOption, setSelectedFridayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedFridayToHoursOption, setSelectedFridayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedFridayToMinutesOption, setSelectedFridayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const [saturdayChecked, setSaturdayChecked] = React.useState(false);
    const [selectedSaturdayFromHoursOption, setSelectedSaturdayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedSaturdayFromMinutesOption, setSelectedSaturdayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedSaturdayToHoursOption, setSelectedSaturdayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedSaturdayToMinutesOption, setSelectedSaturdayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const [sundayChecked, setSundayChecked] = React.useState(false);
    const [selectedSundayFromHoursOption, setSelectedSundayFromHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedSundayFromMinutesOption, setSelectedSundayFromMinutesOption] = React.useState<any>({
        value: "00",
    });
    const [selectedSundayToHoursOption, setSelectedSundayToHoursOption] = React.useState<any>({
        value: "00",
    });
    const [selectedSundayToMinutesOption, setSelectedSundayToMinutesOption] = React.useState<any>({
        value: "00",
    });

    const setHoursOfOperation = (day: string, type: string, value: {}) => {
        switch (day) {
            case "monday":
                if (type === "from-hours") {
                    setSelectedMondayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedMondayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedMondayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedMondayToMinutesOption(value);
                }

                break;

            case "tuesday":
                if (type === "from-hours") {
                    setSelectedTuesdayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedTuesdayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedTuesdayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedTuesdayToMinutesOption(value);
                }

                break;

            case "wednesday":
                if (type === "from-hours") {
                    setSelectedWednesdayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedWednesdayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedWednesdayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedWednesdayToMinutesOption(value);
                }

                break;

            case "thursday":
                if (type === "from-hours") {
                    setSelectedThursdayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedThursdayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedThursdayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedThursdayToMinutesOption(value);
                }

                break;

            case "friday":
                if (type === "from-hours") {
                    setSelectedFridayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedFridayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedFridayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedFridayToMinutesOption(value);
                }

                break;

            case "saturday":
                if (type === "from-hours") {
                    setSelectedSaturdayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedSaturdayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedSaturdayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedSaturdayToMinutesOption(value);
                }

                break;

            case "sunday":
                if (type === "from-hours") {
                    setSelectedSundayFromHoursOption(value);
                } else if (type === "from-minutes") {
                    setSelectedSundayFromMinutesOption(value);
                } else if (type === "to-hours") {
                    setSelectedSundayToHoursOption(value);
                } else if (type === "to-minutes") {
                    setSelectedSundayToMinutesOption(value);
                }

                break;
        }
    };

    const updateHours = () => {
        let hours = {
            monday: !mondayChecked ? {} : {
                fromHours: selectedMondayFromHoursOption.value,
                fromMinutes: selectedMondayFromMinutesOption.value,
                toHours: selectedMondayToHoursOption.value,
                toMinutes: selectedMondayToMinutesOption.value
            },
            tuesday: !tuesdayChecked ? {} : {
                fromHours: selectedTuesdayFromHoursOption.value,
                fromMinutes: selectedTuesdayFromMinutesOption.value,
                toHours: selectedTuesdayToHoursOption.value,
                toMinutes: selectedTuesdayToMinutesOption.value
            },
            wednesday: !wednesdayChecked ? {} : {
                fromHours: selectedWednesdayFromHoursOption.value,
                fromMinutes: selectedWednesdayFromMinutesOption.value,
                toHours: selectedWednesdayToHoursOption.value,
                toMinutes: selectedWednesdayToMinutesOption.value
            },
            thursday: !thursdayChecked ? {} : {
                fromHours: selectedThursdayFromHoursOption.value,
                fromMinutes: selectedThursdayFromMinutesOption.value,
                toHours: selectedThursdayToHoursOption.value,
                toMinutes: selectedThursdayToMinutesOption.value
            },
            friday: !fridayChecked ? {} : {
                fromHours: selectedFridayFromHoursOption.value,
                fromMinutes: selectedFridayFromMinutesOption.value,
                toHours: selectedFridayToHoursOption.value,
                toMinutes: selectedFridayToMinutesOption.value
            },
            saturday: !saturdayChecked ? {} : {
                fromHours: selectedSaturdayFromHoursOption.value,
                fromMinutes: selectedSaturdayFromMinutesOption.value,
                toHours: selectedSaturdayToHoursOption.value,
                toMinutes: selectedSaturdayToMinutesOption.value
            },
            sunday: !sundayChecked ? {} : {
                fromHours: selectedSundayFromHoursOption.value,
                fromMinutes: selectedSundayFromMinutesOption.value,
                toHours: selectedSundayToHoursOption.value,
                toMinutes: selectedSundayToMinutesOption.value
            },
        }

        props.setHoursOfOperation(hours);
    }

    useEffect(() => {
        updateHours();
    }, [selectedMondayFromHoursOption, selectedMondayFromMinutesOption, selectedMondayToHoursOption, selectedMondayToMinutesOption,
        selectedTuesdayFromHoursOption, selectedTuesdayFromMinutesOption, selectedTuesdayToHoursOption, selectedTuesdayToMinutesOption,
        selectedWednesdayFromHoursOption, selectedWednesdayFromMinutesOption, selectedWednesdayToHoursOption, selectedWednesdayToMinutesOption,
        selectedThursdayFromHoursOption, selectedThursdayFromMinutesOption, selectedThursdayToHoursOption, selectedThursdayToMinutesOption,
        selectedSaturdayFromHoursOption, selectedSaturdayFromMinutesOption, selectedSaturdayToHoursOption, selectedSaturdayToMinutesOption,
        selectedSundayFromHoursOption, selectedSundayFromMinutesOption, selectedSundayToHoursOption, selectedSundayToMinutesOption]);

    return (
        <div className="grid-container">
            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setMondayChecked(detail.checked);
                        }}
                        checked={mondayChecked}
                    >
                        Monday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedMondayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("monday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!mondayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedMondayFromMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("monday", "from-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!mondayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedMondayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("monday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!mondayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedMondayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("monday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!mondayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        mondayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>

            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setTuesdayChecked(detail.checked);
                        }}
                        checked={tuesdayChecked}
                    >
                        Tuesday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedTuesdayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("tuesday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!tuesdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedTuesdayFromMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("tuesday", "from-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!tuesdayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedTuesdayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("tuesday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!tuesdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedTuesdayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("tuesday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!tuesdayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        tuesdayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>

            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setWednesdayChecked(detail.checked);
                        }}
                        checked={wednesdayChecked}
                    >
                        Wednesday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedWednesdayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("wednesday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!wednesdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedWednesdayFromMinutesOption}
                        onChange={({ detail }) =>
                            setHoursOfOperation("wednesday", "from-minutes", detail.selectedOption)
                        }
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!wednesdayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedWednesdayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("wednesday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!wednesdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedWednesdayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("wednesday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!wednesdayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        wednesdayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>

            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setThursdayChecked(detail.checked);
                        }}
                        checked={thursdayChecked}
                    >
                        Thursday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedThursdayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("thursday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!thursdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedThursdayFromMinutesOption}
                        onChange={({ detail }) =>
                            setHoursOfOperation("thursday", "from-minutes", detail.selectedOption)
                        }
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!thursdayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedThursdayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("thursday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!thursdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedThursdayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("thursday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!thursdayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        thursdayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>

            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setFridayChecked(detail.checked);
                        }}
                        checked={fridayChecked}
                    >
                        Friday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedFridayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("friday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!fridayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedFridayFromMinutesOption}
                        onChange={({ detail }) =>
                            setHoursOfOperation("friday", "from-minutes", detail.selectedOption)
                        }
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!fridayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedFridayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("friday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!fridayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedFridayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("friday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!fridayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        fridayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>

            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setSaturdayChecked(detail.checked);
                        }}
                        checked={saturdayChecked}
                    >
                        Saturday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedSaturdayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("saturday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!saturdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedSaturdayFromMinutesOption}
                        onChange={({ detail }) =>
                            setHoursOfOperation("saturday", "from-minutes", detail.selectedOption)
                        }
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!saturdayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedSaturdayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("saturday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!saturdayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedSaturdayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("saturday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!saturdayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        saturdayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>

            <Grid gridDefinition={[{ colspan: 2 }, { colspan: 4 }, { colspan: 4 }, { colspan: 2 }]}>
                <div className="day-container">
                    <Checkbox
                        onChange={({ detail }) => {
                            setSundayChecked(detail.checked);
                        }}
                        checked={sundayChecked}
                    >
                        Sunday
                    </Checkbox>
                </div>
                <div className="time-container">
                    <p>From:</p>
                    <Select
                        selectedOption={selectedSundayFromHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("sunday", "from-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!sundayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedSundayFromMinutesOption}
                        onChange={({ detail }) =>
                            setHoursOfOperation("sunday", "from-minutes", detail.selectedOption)
                        }
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!sundayChecked}
                    />
                </div>
                <div className="time-container">
                    <p>To:</p>
                    <Select
                        selectedOption={selectedSundayToHoursOption}
                        onChange={({ detail }) => setHoursOfOperation("sunday", "to-hours", detail.selectedOption)}
                        options={selections.hoursOptions}
                        selectedAriaLabel="Selected"
                        disabled={!sundayChecked}
                    />
                    <p>:</p>
                    <Select
                        selectedOption={selectedSundayToMinutesOption}
                        onChange={({ detail }) => setHoursOfOperation("sunday", "to-minutes", detail.selectedOption)}
                        options={selections.minutesOptions}
                        selectedAriaLabel="Selected"
                        disabled={!sundayChecked}
                    />
                </div>
                <div className="day-container align-end">
                    {
                        sundayChecked ? (
                                <Icon name="status-positive" variant="success" />
                            ) : (
                                <Icon name="status-stopped" variant="error" />
                            )
                    }
                </div>
            </Grid>
        </div>
    );
};

export default HoursOfOperationSelectorComponent;
