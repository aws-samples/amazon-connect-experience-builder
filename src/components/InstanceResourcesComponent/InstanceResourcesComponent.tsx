// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Alert, Header, Icon, Link, Table } from '@awsui/components-react';
import React, { FC, useState } from 'react';

interface InstanceResourcesComponentProps {
    data: Array<{}>;
    isLoading: boolean;
}

const InstanceResourcesComponent: FC<InstanceResourcesComponentProps> = (props) => {
    const [data, setData] = useState({});

    return (
        <Table
        loading={props.isLoading}
        columnDefinitions={[
          {
            id: "name",
            header: "Name",
            cell: (item: any) => item.name || "-",
            sortingField: "name"
          },
          {
            id: "type",
            header: "Type",
            cell: (item: any) => item.type || "-",
            sortingField: "alt"
          },
          {
            id: "new",
            header: "Status",
            cell: (item: any) => item.arn === '' ? "New" : "Existing"
          }
        ]}
        items={props.data}
        loadingText="Loading resources"
        sortingDisabled
        empty={
            <Alert
            onDismiss={() => {}}
            visible={true}
            dismissAriaLabel="Close alert"
            header="Select an instance"
        >
            To see the resources that will be required for this experience, please select one of your Amazon Connect instance.
        </Alert>
        }
        header={<Header variant="h2" description={ props.data.length === 0 ? "To see the resources that will be required for this experience, please select one of your Amazon Connect instance." : "Summary of the resources necessary to generate this experience" }>
        Resources <Link variant="info">Info</Link>
    </Header>}
      />
    )
}

export default InstanceResourcesComponent;
