import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TopNavigation from './TopNavigation';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/TopNavigation',
    component: TopNavigation,
} as ComponentMeta<typeof TopNavigation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopNavigation> = (args) => <TopNavigation {...args} />;

export const BasicExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicExample.args = {
    email: '',
    logo: 'https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg',
    profile_photo: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg',
    classNames: 'bg-black'
};
