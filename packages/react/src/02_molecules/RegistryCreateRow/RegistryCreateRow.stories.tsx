import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegistryCreateRow from './RegistryCreateRow';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Atoms/RegistryCreateRow',
    component: RegistryCreateRow,
} as ComponentMeta<typeof RegistryCreateRow>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RegistryCreateRow> = (args) => <RegistryCreateRow {...args} />;

export const DefaultExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultExample.args = {

};
