import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReactSelectRow from './RegistrySelectRow';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Atoms/Core/ReactSelectRow',
    component: ReactSelectRow,
} as ComponentMeta<typeof ReactSelectRow>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReactSelectRow> = (args) => <ReactSelectRow {...args} />;

export const DefaultExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultExample.args = {
    logo: 'https://meta-q.cdn.bubble.io/f1594029159904x549427590432479040/logo.svg',
    name: 'Registry:Moderate Depression',
    members: 3,
    patients: 5,
    onClick: () => { console.log('click')}
};
