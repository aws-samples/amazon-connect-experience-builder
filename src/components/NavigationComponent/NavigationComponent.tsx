// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { SideNavigation } from "@awsui/components-react";
import React, { FC } from "react";

interface NavigationComponentProps {}

const NavigationComponent: FC<NavigationComponentProps> = (props) => {

    const onFollowHandler = (ev: any) => {
        ev.preventDefault();
    };

    const onChangeHandler = (ev: any) => {
        (ev);
    }

    return (
        <SideNavigation
            header={{
                text: "Simple Experience Builder",
                href: "/#",
            }}
            items={[{ type: "link", text: "Experience Builder", href: "/#" }]}
            onFollow={onFollowHandler.bind(this)}
            activeHref={"/#"}
            onChange={onChangeHandler.bind(this)}
        />
    );
};

export default NavigationComponent;
