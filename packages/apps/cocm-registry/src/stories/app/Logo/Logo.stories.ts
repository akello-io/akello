import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from './Logo';
import discord from '../../assets/discord.svg'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'App/Logo',
    component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        src: discord
    },
};