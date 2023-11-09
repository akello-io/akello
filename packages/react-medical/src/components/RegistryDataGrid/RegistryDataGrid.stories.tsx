import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
    patients:[],
    handlePatientClickEvent: () => {}
};

DefaultOptions.parameters = {
    dark: 'test'
}