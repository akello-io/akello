import React from 'react'
import { FhirQueryScore, FhirQueryScoreProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { MantineProvider } from '@mantine/core'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FhirQueryScore> = {
  title: 'Organisms/apps/FhirQueryScore',
  component: FhirQueryScore,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    htmlFor: { control: 'text' },    
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof FhirQueryScore> = (args: FhirQueryScoreProps) => {
    return (
        <MantineProvider>
            <FhirQueryScore {...args} />
        </MantineProvider>
    )    
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}
