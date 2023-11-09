import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PatientRegistry } from '@akello/core';

import RegistryDataGrid from './RegistryDataGrid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/Navigation/RegistryDataGrid',
    component: RegistryDataGrid,
} as ComponentMeta<typeof RegistryDataGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RegistryDataGrid> = (args) => <RegistryDataGrid {...args}/>;

export const DefaultOptions = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultOptions.args = {
    patients:[
        new PatientRegistry('mrn', 'Vijay', 'Selvaraj' ,'4444','vijay@g.com', '10/10/2024'),
        new PatientRegistry('mrn', 'Vijay', 'Selvaraj' ,'4444','vijay@g.com', '10/10/2024'),
        new PatientRegistry('mrn', 'Vijay', 'Selvaraj' ,'4444','vijay@g.com', '10/10/2024'),
        new PatientRegistry('mrn', 'Vijay', 'Selvaraj' ,'4444','vijay@g.com', '10/10/2024'),
        new PatientRegistry('mrn', 'Vijay', 'Selvaraj' ,'4444','vijay@g.com', '10/10/2024'),
    ],
    handlePatientClickEvent: () => {}
};

DefaultOptions.parameters = {
    dark: 'test'
}