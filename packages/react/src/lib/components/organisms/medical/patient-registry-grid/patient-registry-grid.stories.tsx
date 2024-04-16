import React from 'react'
import { PatientRegistryGrid, PatientRegistryGridProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientRegistryGrid> = {
  title: 'Organisms/Medical/PatientRegistryGrid',
  component: PatientRegistryGrid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta


const rows = [{
    registry_id: '1',
    user_id: '3',
    mrn: '123456',
    status: 'Active',
    referring_npi: '123',
    payer: 'Med',
    flag: 'High',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '123-456-7890',
    email: '',
    date_of_birth: '01/01/2000',
    initial_assessment: 1,
    last_follow_up: 2,
    last_psychiatric_consult: 3,
    relapse_prevention_plan: 4,
    graduated: 0,
    total_sessions: 5,
    weeks_since_initial_assessment: 6,
    minutes_this_month: 7,
    phq9_initial: 8,
    phq9_last: 9,
}]


const Template: StoryFn<typeof PatientRegistryGrid> = ({rows, measurements}) => {

    return (
        <MantineProvider >
          <AkelloProvider akello={akello_client}>
            <PatientRegistryGrid  rows={rows} measurements={measurements}/>
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    rows: rows,
    measurements: [{
        'field': 'phq9',
        'headerName': 'PHQ9',
    }]
}




