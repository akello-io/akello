import type { Meta, StoryObj } from '@storybook/react';

import { RegistryDataGrid } from './RegistryDataGrid';
import {PatientRegistry} from "@akello/core";
import {GridEventListener} from "@mui/x-data-grid";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Patient Registry/Registry Data Grid',
    component: RegistryDataGrid,

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof RegistryDataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

let x = new PatientRegistry(
    "mrn",
    "a",
    "a",
    "33",
    "va@v.com",
    "10/20/233"
)
export const Primary: Story = {
    args: {
        patients: [x, x, x],
        questionnaires: []
    },
};
