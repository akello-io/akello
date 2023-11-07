import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HamburgerMenuButton from './HamburgerMenuButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Atoms/HamburgerMenu',
    component: HamburgerMenuButton,
} as ComponentMeta<typeof HamburgerMenuButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HamburgerMenuButton> = (args) => <HamburgerMenuButton {...args}/>;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
    htmlFor: 'nav-drawer'
};
