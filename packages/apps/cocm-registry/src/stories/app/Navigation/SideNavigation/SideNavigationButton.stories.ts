import type { Meta, StoryObj } from '@storybook/react';

import { SideNavigationButton } from './SideNavigationButton';
import {ReactNode} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'App/Navigation/Button',
    component: SideNavigationButton,
} satisfies Meta<typeof SideNavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Button: Story = {
    args: {
        name: "string",
        short_name: "string",
        href: "",
        icon: "calendar",
        is_active: true
    },
};