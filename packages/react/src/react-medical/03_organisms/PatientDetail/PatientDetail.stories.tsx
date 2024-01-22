import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PatientDetail from './PatientDetail';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Organisms/Medical/PatientDetail',
    component: PatientDetail,
} as ComponentMeta<typeof PatientDetail>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PatientDetail> = (args) => <PatientDetail {...args}/>;

export const DefaultOptions = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultOptions.args = {

};

