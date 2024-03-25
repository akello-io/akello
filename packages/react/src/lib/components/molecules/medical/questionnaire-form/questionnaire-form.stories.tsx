
import React from 'react'
import { QuestionnaireForm, QuestionnaireFormProps } from '.'
import { Questionnaire } from '@akello/core'
import { objectValuesToControls } from '../../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { MantineProvider} from '@mantine/core';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuestionnaireForm> = {
  title: 'Atoms/QuestionnaireForm',
  component: QuestionnaireForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    questionnaire: {}
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof QuestionnaireForm> = (args: QuestionnaireFormProps) => (
  <MantineProvider>
    <QuestionnaireForm {...args} />
  </MantineProvider>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  questionnaire: {
    'name': 'Questionnaire',

    'measurements': [
      {
        "question": "Qeustion 1",
        "responses": [
          {
            "response": "Response 1",
            "score": 1
          },
          {
            "response": "Response 2",
            "score": 2
          }
        ],        
        "score": 0
      }
    ]
  },
  onSelectedResponsesChange: (responses: {}) => {}
}
