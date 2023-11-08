import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DashboardComponent from './DashboardComponent';
import RegistryMemberships from "../../../../react/src/03_organisms/RegistryMemberships";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Organisms/DashboardComponent',
    component: DashboardComponent,
} as ComponentMeta<typeof DashboardComponent>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const EmptyTemplateTemplate: ComponentStory<typeof DashboardComponent> = (args) => <DashboardComponent {...args}>Test</DashboardComponent>

export const EmptyTemplate = EmptyTemplateTemplate.bind({});