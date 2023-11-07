import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WelcomeTemplate from './WelcomeTemplate';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Templates/WelcomeTemplate',
    component: WelcomeTemplate,
} as ComponentMeta<typeof WelcomeTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WelcomeTemplate> = (args) => <WelcomeTemplate {...args} />;

export const defaultExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
defaultExample.args = {
    first_name: 'Joe'
};
