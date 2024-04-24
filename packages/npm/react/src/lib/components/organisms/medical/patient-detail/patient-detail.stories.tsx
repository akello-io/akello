import React from 'react'
import { PatientDetail, PatientDetailProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientDetail> = {
  title: 'Organisms/Medical/PatientDetail',
  component: PatientDetail,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

const Template: StoryFn<typeof PatientDetail> = ({}) => {

    const patient: RegistryTreatment = {
        mrn: '1234',
        first_name: 'John',
        last_name: 'Doe',
        status: 'Enrolled'
    }

    return (
        <MantineProvider >
          <AkelloProvider akello={akello_client}>
            <PatientDetail registry_id={'33'}  selectedPatient={patient}/>
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




