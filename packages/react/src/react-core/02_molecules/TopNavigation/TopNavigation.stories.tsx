import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TopNavigation from './TopNavigation';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/Core/Navigation/TopNavigation',
    component: TopNavigation,
} as ComponentMeta<typeof TopNavigation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopNavigation> = (args) => <TopNavigation {...args} />;

export const BasicExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicExample.args = {
    menu_items: []
};

export const SingedInMenuItemsExample = Template.bind({});
SingedInMenuItemsExample.args = {
    signed_in: true,
    menu_items: [(<li><button onClick={()=> {}}>Create a Registry</button></li>)]
}

export const SingedInMenuItemsExampleEmpty = Template.bind({});
SingedInMenuItemsExampleEmpty.args = {
    signed_in: true,
    menu_items: []
}
