import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageFooter from './PageFooter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Molecules/Core/PageFooter',
    component: PageFooter,
} as ComponentMeta<typeof PageFooter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageFooter> = (args) => <PageFooter {...args} />;

export const DefaultExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultExample.args = {

};
