// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Box, Input } from "@awsui/components-react";
import React, { FC, useEffect, useState } from "react";
import DtmfComponent from "../DtmfComponent/DtmfComponent";

import "./MenuComponent.css";

interface MenuComponentProps {
    setMenu: (menu: {}) => void
}

const MenuComponent: FC<MenuComponentProps> = (props) => {
    const [menuPrompt, setMenuPrompt] = React.useState("");
    const [dtmf1Checked, setDtmf1Checked] = useState(false);
    const [dtmf1Param, setDtmf1Param] = React.useState("");
    const [dtmf1Action, setDtmf1Action] = React.useState<any>({});
    const [dtmf2Checked, setDtmf2Checked] = useState(false);
    const [dtmf2Param, setDtmf2Param] = React.useState("");
    const [dtmf2Action, setDtmf2Action] = React.useState<any>({});
    const [dtmf3Checked, setDtmf3Checked] = useState(false);
    const [dtmf3Param, setDtmf3Param] = React.useState("");
    const [dtmf3Action, setDtmf3Action] = React.useState<any>({});
    const [dtmf4Checked, setDtmf4Checked] = useState(false);
    const [dtmf4Param, setDtmf4Param] = React.useState("");
    const [dtmf4Action, setDtmf4Action] = React.useState<any>({});
    const [dtmf5Checked, setDtmf5Checked] = useState(false);
    const [dtmf5Param, setDtmf5Param] = React.useState("");
    const [dtmf5Action, setDtmf5Action] = React.useState<any>({});
    const [dtmf6Checked, setDtmf6Checked] = useState(false);
    const [dtmf6Param, setDtmf6Param] = React.useState("");
    const [dtmf6Action, setDtmf6Action] = React.useState<any>({});
    const [dtmf7Checked, setDtmf7Checked] = useState(false);
    const [dtmf7Param, setDtmf7Param] = React.useState("");
    const [dtmf7Action, setDtmf7Action] = React.useState<any>({});
    const [dtmf8Checked, setDtmf8Checked] = useState(false);
    const [dtmf8Param, setDtmf8Param] = React.useState("");
    const [dtmf8Action, setDtmf8Action] = React.useState<any>({});
    const [dtmf9Checked, setDtmf9Checked] = useState(false);
    const [dtmf9Param, setDtmf9Param] = React.useState("");
    const [dtmf9Action, setDtmf9Action] = React.useState<any>({});
    const [dtmf0Checked, setDtmf0Checked] = useState(false);
    const [dtmf0Param, setDtmf0Param] = React.useState("");
    const [dtmf0Action, setDtmf0Action] = React.useState<any>({});
    const [dtmfStarChecked, setDtmfStarChecked] = useState(false);
    const [dtmfStarParam, setDtmfStarParam] = React.useState("");
    const [dtmfStarAction, setDtmfStarAction] = React.useState<any>({});
    const [dtmfHashChecked, setDtmfHashChecked] = useState(false);
    const [dtmfHashParam, setDtmfHashParam] = React.useState("");
    const [dtmfHashAction, setDtmfHashAction] = React.useState<any>({});

    const setJourneyMenuPrompt = (value: string) => {
        setMenuPrompt(value);
    };

    const setJourneyDtmf1Checked = (value: boolean) => {
        setDtmf1Checked(value);
    };
    const setJourneyDtmf1Param = (value: string) => {
        setDtmf1Param(value);
    };
    const setJourneyDtmf1Action = (value: {}) => {
        setDtmf1Action(value);
    };

    const setJourneyDtmf2Checked = (value: boolean) => {
        setDtmf2Checked(value);
    };
    const setJourneyDtmf2Param = (value: string) => {
        setDtmf2Param(value);
    };
    const setJourneyDtmf2Action = (value: {}) => {
        setDtmf2Action(value);
    };

    const setJourneyDtmf3Checked = (value: boolean) => {
        setDtmf3Checked(value);
    };
    const setJourneyDtmf3Param = (value: string) => {
        setDtmf3Param(value);
    };
    const setJourneyDtmf3Action = (value: {}) => {
        setDtmf3Action(value);
    };

    const setJourneyDtmf4Checked = (value: boolean) => {
        setDtmf4Checked(value);
    };
    const setJourneyDtmf4Param = (value: string) => {
        setDtmf4Param(value);
    };
    const setJourneyDtmf4Action = (value: {}) => {
        setDtmf4Action(value);
    };

    const setJourneyDtmf5Checked = (value: boolean) => {
        setDtmf5Checked(value);
    };
    const setJourneyDtmf5Param = (value: string) => {
        setDtmf5Param(value);
    };
    const setJourneyDtmf5Action = (value: {}) => {
        setDtmf5Action(value);
    };

    const setJourneyDtmf6Checked = (value: boolean) => {
        setDtmf6Checked(value);
    };
    const setJourneyDtmf6Param = (value: string) => {
        setDtmf6Param(value);
    };
    const setJourneyDtmf6Action = (value: {}) => {
        setDtmf6Action(value);
    };

    const setJourneyDtmf7Checked = (value: boolean) => {
        setDtmf7Checked(value);
    };
    const setJourneyDtmf7Param = (value: string) => {
        setDtmf7Param(value);
    };
    const setJourneyDtmf7Action = (value: {}) => {
        setDtmf7Action(value);
    };

    const setJourneyDtmf8Checked = (value: boolean) => {
        setDtmf8Checked(value);
    };
    const setJourneyDtmf8Param = (value: string) => {
        setDtmf8Param(value);
    };
    const setJourneyDtmf8Action = (value: {}) => {
        setDtmf8Action(value);
    };

    const setJourneyDtmf9Checked = (value: boolean) => {
        setDtmf9Checked(value);
    };
    const setJourneyDtmf9Param = (value: string) => {
        setDtmf9Param(value);
    };
    const setJourneyDtmf9Action = (value: {}) => {
        setDtmf9Action(value);
    };

    const setJourneyDtmf0Checked = (value: boolean) => {
        setDtmf0Checked(value);
    };
    const setJourneyDtmf0Param = (value: string) => {
        setDtmf0Param(value);
    };
    const setJourneyDtmf0Action = (value: {}) => {
        setDtmf0Action(value);
    };

    const setJourneyDtmfStarChecked = (value: boolean) => {
        setDtmfStarChecked(value);
    };
    const setJourneyDtmfStarParam = (value: string) => {
        setDtmfStarParam(value);
    };
    const setJourneyDtmfStarAction = (value: {}) => {
        setDtmfStarAction(value);
    };

    const setJourneyDtmfHashChecked = (value: boolean) => {
        setDtmfHashChecked(value);
    };
    const setJourneyDtmfHashParam = (value: string) => {
        setDtmfHashParam(value);
    };
    const setJourneyDtmfHashAction = (value: {}) => {
        setDtmfHashAction(value);
    };

    const validateMenu = (dtmf: string, valid: boolean) => {

    }

    const dtmfSupport = [
        {
            dtmf: "1",
            check: setJourneyDtmf1Checked,
            action: setJourneyDtmf1Action,
            param: setJourneyDtmf1Param,
        },
        {
            dtmf: "2",
            check: setJourneyDtmf2Checked,
            action: setJourneyDtmf2Action,
            param: setJourneyDtmf2Param,
        },
        {
            dtmf: "3",
            check: setJourneyDtmf3Checked,
            action: setJourneyDtmf3Action,
            param: setJourneyDtmf3Param,
        },
        {
            dtmf: "4",
            check: setJourneyDtmf4Checked,
            action: setJourneyDtmf4Action,
            param: setJourneyDtmf4Param,
        },
        {
            dtmf: "5",
            check: setJourneyDtmf5Checked,
            action: setJourneyDtmf5Action,
            param: setJourneyDtmf5Param,
        },
        {
            dtmf: "6",
            check: setJourneyDtmf6Checked,
            action: setJourneyDtmf6Action,
            param: setJourneyDtmf6Param,
        },
        {
            dtmf: "7",
            check: setJourneyDtmf7Checked,
            action: setJourneyDtmf7Action,
            param: setJourneyDtmf7Param,
        },
        {
            dtmf: "8",
            check: setJourneyDtmf8Checked,
            action: setJourneyDtmf8Action,
            param: setJourneyDtmf8Param,
        },
        {
            dtmf: "9",
            check: setJourneyDtmf9Checked,
            action: setJourneyDtmf9Action,
            param: setJourneyDtmf9Param,
        },
        {
            dtmf: "0",
            check: setJourneyDtmf0Checked,
            action: setJourneyDtmf0Action,
            param: setJourneyDtmf0Param,
        },
    ];

    const menu = dtmfSupport.map((item, key) => {
        return (
            <DtmfComponent
                key={key}
                dtmf={item.dtmf}
                setDtmfAction={item.action}
                setDtmfChecked={item.check}
                setDtmfParam={item.param}
                setValid={validateMenu}
            />
        );
    });

    const updateMenu = () => {
        let menu = {
            prompt: menuPrompt,
            dtmf1: !dtmf1Checked ? {} : {
                action: dtmf1Action.value,
                param: dtmf1Param
            },
            dtmf2: !dtmf2Checked ? {} : {
                action: dtmf2Action.value,
                param: dtmf2Param              
            },
            dtmf3: !dtmf3Checked ? {} : {
                action: dtmf3Action.value,
                param: dtmf3Param
            },
            dtmf4: !dtmf4Checked ? {} : {
                action: dtmf4Action.value,
                param: dtmf4Param
            },
            dtmf5: !dtmf5Checked ? {} : {
                action: dtmf5Action.value,
                param: dtmf5Param
            },
            dtmf6: !dtmf6Checked ? {} : {
                action: dtmf6Action.value,
                param: dtmf6Param
            },
            dtmf7: !dtmf7Checked ? {} : {
                action: dtmf7Action.value,
                param: dtmf7Param
            },
            dtmf8: !dtmf8Checked ? {} : {
                action: dtmf8Action.value,
                param: dtmf8Param
            },
            dtmf9: !dtmf9Checked ? {} : {
                action: dtmf9Action.value,
                param: dtmf9Param
            },
            dtmf0: !dtmf0Checked ? {} : {
                action: dtmf0Action.value,
                param: dtmf0Param
            },
            dtmfStar: !dtmfStarChecked ? {} : {
                action: dtmfStarAction.value,
                param: dtmfStarParam
            },
            dtmfHash: !dtmfHashChecked ? {} : {
                action: dtmfHashAction.value,
                param: dtmfHashParam
            },
        }

        props.setMenu(menu);
    };

    useEffect(() => {
        updateMenu();
    }, [
        menuPrompt,
        dtmf1Checked,
        dtmf1Param,
        dtmf1Action,
        dtmf2Checked,
        dtmf2Param,
        dtmf2Action,
        dtmf3Checked,
        dtmf3Param,
        dtmf3Action,
        dtmf4Checked,
        dtmf4Param,
        dtmf4Action,
        dtmf5Checked,
        dtmf5Param,
        dtmf5Action,
        dtmf6Checked,
        dtmf6Param,
        dtmf6Action,
        dtmf7Checked,
        dtmf7Param,
        dtmf7Action,
        dtmf8Checked,
        dtmf8Param,
        dtmf8Action,
        dtmf9Checked,
        dtmf9Param,
        dtmf9Action,
        dtmf0Checked,
        dtmf0Param,
        dtmf0Action,
        dtmfStarChecked,
        dtmfStarParam,
        dtmfStarAction,
        dtmfHashChecked,
        dtmfHashParam,
        dtmfHashAction,
    ]);

    return (
        <div className="menu-container">
            <div className="prompt-container">
                <Box variant="p">How do you want to prompt your customer for input ?</Box>
                <Input
                    onChange={({ detail }) => setJourneyMenuPrompt(detail.value)}
                    value={menuPrompt}
                    placeholder="Enter a prompt for your menu"
                />
            </div>
            <div className="grid-container">
                {menu}
            </div>
        </div>
    );
};

export default MenuComponent;
