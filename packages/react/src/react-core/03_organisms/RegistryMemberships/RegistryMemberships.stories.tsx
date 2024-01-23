import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegistryMemberships from './RegistryMemberships';
import {RegistrySelectRow} from "../../02_molecules";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Organisms/Core/RegistryMemberships',
    component: RegistryMemberships,
} as ComponentMeta<typeof RegistryMemberships>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RegistryMemberships> = (args) =>
    <RegistryMemberships {...args}>
        <RegistrySelectRow logo={"https://meta-q.cdn.bubble.io/f1594029159904x549427590432479040/logo.svg"} name={"Registry 1"} members={3} patients={4} onClick={()=> {}} />
        <RegistrySelectRow logo={"https://meta-q.cdn.bubble.io/f1594029159904x549427590432479040/logo.svg"} name={"Registry 2"} members={3} patients={4} onClick={()=> {}} />
        <RegistrySelectRow logo={"https://meta-q.cdn.bubble.io/f1594029159904x549427590432479040/logo.svg"} name={"Registry 3"} members={3} patients={4} onClick={()=> {}} />
    </RegistryMemberships>;

export const BasicExample = Template.bind({});


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const EmptyTemplateTemplate: ComponentStory<typeof RegistryMemberships> = (args) =>
    <RegistryMemberships {...args}>
    </RegistryMemberships>;

export const EmptyTemplate = EmptyTemplateTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
