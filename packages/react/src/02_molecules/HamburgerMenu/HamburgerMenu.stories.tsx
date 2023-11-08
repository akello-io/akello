import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HamburgerMenu from './HamburgerMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/HamburgerMenu',
    component: HamburgerMenu,
} as ComponentMeta<typeof HamburgerMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HamburgerMenu> = (args) => <HamburgerMenu {...args}/>;

export const DefaultOptions = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultOptions.args = {
    children: (<>
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
    </>)
};

export const AdminOptions = Template.bind({});
AdminOptions.args = {
    children: (<>
        <li><a>Admin</a></li>
    </>)
};
