import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppHeaderSection from './AppHeaderSection';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/Navigation/AppHeaderSection',
    component: AppHeaderSection,
} as ComponentMeta<typeof AppHeaderSection>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppHeaderSection> = (args) => <AppHeaderSection {...args}/>;

export const DefaultOptions = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultOptions.args = {
};
