import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppLogo from './AppLogo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Atoms/AppLogo',
    component: AppLogo,
} as ComponentMeta<typeof AppLogo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppLogo> = (args) => <AppLogo {...args} />;

export const Slack = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Slack.args = {
    src: 'https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg',
};

export const ClickMe = Template.bind({});
ClickMe.args = {
    src: 'Click me!',
};