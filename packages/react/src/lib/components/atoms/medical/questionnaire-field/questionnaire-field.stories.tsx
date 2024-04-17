import React from 'react'
import { QuestionnaireField } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { MantineProvider } from '@mantine/core'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuestionnaireField> = {
  title: 'Atoms/Medical/QuestionnaireField',
  component: QuestionnaireField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

const Template: StoryFn<typeof QuestionnaireField> = () => {


    return (
        <MantineProvider>
            <QuestionnaireField
                question='What is your favorite framework?'
                description='Choose your favorite front-end framework'
                options={[{
                    value: 'react',
                    label: 'React'
                },
                {
                    value: 'angular',
                    label: 'Angular'
                },
                {
                    value: 'vue',
                    label: 'Vue'
                }]}
                onSelect={(value) => console.log(value)}
            />
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




