import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WelcomeBanner from './WelcomeBanner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Organisms/WelcomeBanner',
    component: WelcomeBanner,
} as ComponentMeta<typeof WelcomeBanner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WelcomeBanner> = (args) => <WelcomeBanner {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
    first_name: 'Vijay',
};

