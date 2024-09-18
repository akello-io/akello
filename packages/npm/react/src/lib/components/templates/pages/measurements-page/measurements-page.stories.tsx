import React from 'react'
import { MeasurementsPage, MeasurementsPageProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { AkelloProvider } from '@akello/react-hook'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { AkelloClient } from '@akello/core'
import { MantineProvider } from '@mantine/core'
import { akello_client } from '../../../../../../storybook_akello_client'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MeasurementsPage> = {
  title: 'Pages/MeasurementsPage',
  component: MeasurementsPage,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta


const Template: StoryFn<typeof MeasurementsPage> = () => {
  return (
      <MantineProvider >
        <AkelloProvider akello={akello_client}>
          <MeasurementsPage registry_id='33'/>
        </AkelloProvider>
      </MantineProvider>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args



const responses = [
    {
        "id": "0",
        "response": "Not at all",
        "score": 0
    },
    {
        "id": "1",
        "response": "Several days",
        "score": 1
    },
    {
        "id": "2",
        "response": "More than half the days",
        "score": 2
    },
    {
        "id": "3",
        "response": "Nearly every day",
        "score": 3
    }
]

const PHQ9 = {
    "name": "PHQ-9",
    "uid": "phq9",
    "type": "survey",
    "active": true,
    "measurements": [
        {
            "id": "1",
            "question": "Little interest or pleasure in doing things?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "2",
            "question": "Feeling down, depressed, or hopeless?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "3",
            "question": "Trouble falling or staying asleep, or sleeping too much?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "4",
            "question": "Feeling tired or having little energy?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "5",
            "question": "Poor appetite or overeating?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "6",
            "question": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "7",
            "question": "Trouble concentrating on things, such as reading the newspaper or watching television?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "8",
            "question": "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
            "responses": responses,
            "score": 0
        },
        {
            "id": "9",
            "question": "Thoughts that you would be better off dead, or of hurting yourself in some way?",
            "responses": responses,
            "score": 0
        }
    ]
}

const measurements = [
  PHQ9
]


const selected_measurements = {
  "id": "70c335cc-38f6-4b4c-a0bb-d6cc8365d2d3",
  "organization_id": null,
  "name": null,
  "logo": null,
  "measurements": [
    PHQ9
  ],
  "created_at": "1713643675.0038158893585205078125",
  "modified_at": "1713643675.00383090972900390625"
}

Primary.parameters = {
  mockData: [
      {
          url: '/undefined/measurement',
          method: 'GET',
          status: 200,
          response: measurements,
      },
      {
        url: '/undefined/registry/33',
        method: 'GET',
        status: 200,
        response: selected_measurements,
    },
  ],
},

Primary.args = {
}
