import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppSidebarLayout from './AppSidebarLayout';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Templates/AppSidebarLayout',
    component: AppSidebarLayout,
} as ComponentMeta<typeof AppSidebarLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppSidebarLayout> = (args) => <AppSidebarLayout {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
};
