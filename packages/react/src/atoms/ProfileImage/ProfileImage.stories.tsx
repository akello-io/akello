import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileImage from "./ProfileImage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Atoms/ProfileImage',
    component: ProfileImage,
} as ComponentMeta<typeof ProfileImage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileImage> = (args) => <ProfileImage {...args} />;

export const Test = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Test.args = {
    src: 'https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg',
};
