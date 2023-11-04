import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputGroup from './InputGroup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/InputGroup',
    component: InputGroup,
} as ComponentMeta<typeof InputGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputGroup> = (args) => <InputGroup {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
    label: 'Hello world!',
};

export const ClickMe = Template.bind({});
ClickMe.args = {
    label: 'Click me!',
};