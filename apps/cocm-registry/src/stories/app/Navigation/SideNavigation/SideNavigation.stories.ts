import type { Meta, StoryObj } from '@storybook/react';

import { SideNavigation } from './SideNavigation';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'App/Navigation/Navigation',
    component: SideNavigation,
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CareManager: Story = {
    args: {
        role: 'Care Manager',
        activeRoute: '/team'
    },
};

export const PrimaryCarePhysician: Story = {
    args: {
        role: 'Primary Care Physician',
        activeRoute: '/team'
    },
};

export const ConsultingPsychiatrist: Story = {
    args: {
        role: 'Consulting Psychiatrist',
        activeRoute: '/team'

    },
};

export const ClinicalOps: Story = {
    args: {
        role: 'Clinical Ops',
        activeRoute: '/team'
    },
};

export const Finance: Story = {
    args: {
        role: 'Finance',
        activeRoute: '/team'
    },
};

export const Admin: Story = {
    args: {
        role: 'Admin',
        activeRoute: '/team'
    },
};