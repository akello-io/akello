import React from 'react'
import { QuestionnaireField } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { QuestionnaireFieldProps } from '.'

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

    const question_props : QuestionnaireFieldProps = {
        question: 'Little interest or pleasure in doing things?',
        description: '',
        options: [{
            label: 'None at all',
            value: '0'
        },
        {
            label: 'Several days',
            value: '1'
        },
        {
            label: 'More than half the days',
            value: '2'
        },
        {
            label: 'Nearly every day',
            value: '3'
        }],
        onSelect: (value) => console.log(value)
    }




    return (
        <MantineProvider>
            <QuestionnaireField
                question={question_props.question}
                description={question_props.description}
                options={question_props.options}
                onSelect={(value) => console.log(value)}
            />
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




