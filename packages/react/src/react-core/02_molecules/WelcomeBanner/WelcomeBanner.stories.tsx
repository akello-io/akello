import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WelcomeBanner from './WelcomeBanner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/Core/WelcomeBanner',
    component: WelcomeBanner,
} as ComponentMeta<typeof WelcomeBanner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WelcomeBanner> = (args) => <WelcomeBanner {...args} />;

export const defaultExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
defaultExample.args = {
    first_name: 'Joe'
};
