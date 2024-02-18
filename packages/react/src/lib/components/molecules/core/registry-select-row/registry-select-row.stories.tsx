import React from 'react'
import { RegistrySelectRow, RegistrySelectRowProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RegistrySelectRow> = {
  title: 'Molecules/RegistrySelectRow',
  component: RegistrySelectRow,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {    
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof RegistrySelectRow> = (args: RegistrySelectRowProps) => <RegistrySelectRow {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    id: '',
    name: 'Test',
    members: 4,
    logo_url: (<>Test</>),
    patients: 5,
    screeners: 5,
    onClick: () => {}
}
