import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DashboardComponent from './DashboardComponent';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Organisms/Insights/DashboardComponent',
    component: DashboardComponent,
} as ComponentMeta<typeof DashboardComponent>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const EmptyTemplateTemplate: ComponentStory<typeof DashboardComponent> = (args) => <DashboardComponent {...args}>Test</DashboardComponent>

export const EmptyTemplate = EmptyTemplateTemplate.bind({});