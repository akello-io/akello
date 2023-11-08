import React, {ReactNode} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SideNavigation from './SideNavigation';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/Navigation/SideNavigation',
    component: SideNavigation,
} as ComponentMeta<typeof SideNavigation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SideNavigation> = (args) => <SideNavigation {...args} />;

export const DefaultExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultExample.args = {
};
