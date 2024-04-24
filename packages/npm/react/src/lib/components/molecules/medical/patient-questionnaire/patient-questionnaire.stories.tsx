import React from 'react'
import { PatientQuestionnaire, PatientQuestionnaireProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { MantineProvider } from '@mantine/core'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientQuestionnaire> = {
  title: 'Molecules/Medical/PatientQuestionnaire',
  component: PatientQuestionnaire,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta


const Template: StoryFn<typeof PatientQuestionnaire> = () => {

    const questions : PatientQuestionnaireProps = {
        questions: [{
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
        },
        {
            question: 'Feeling down, depressed, or hopeless?',
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
        },
        {
            question: 'Trouble falling or staying asleep, or sleeping too much?',
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
        },
        {
            question: 'Feeling tired or having little energy?',
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
        },
        {
            question: 'Poor appetite or overeating?',
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
        },
        {
            question: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
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
        },
        {
            question: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
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
        },
        {
            question: 'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
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
        },
        {
            question: 'Thoughts that you would be better off dead, or of hurting yourself in some way?',
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
        }
        ]
    }




    return (
        <MantineProvider>
            <PatientQuestionnaire
                questions={questions.questions}
            />
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




