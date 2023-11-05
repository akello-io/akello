import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HomePage from './HomePage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Pages/HomePage',
    component: HomePage,
} as ComponentMeta<typeof HomePage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HomePage> = (args) => <HomePage {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
    app_logo: '/images/logos/akello/akello-white-logo.png',
    profile_photo: 'https://pbs.twimg.com/profile_images/679362003652055040/e3WMaSAs_400x400.jpg',
    first_name: 'Vijay',
    email: 'vijay@akello.io'
};
