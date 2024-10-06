import React from 'react'
import { PatientStatusSelector, PatientStatusSelectorProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'
import { RegistryTreatment } from '@akello/core'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientStatusSelector> = {
  title: 'Molecules/Medical/PatientStatusSelector',
  component: PatientStatusSelector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

const Template: StoryFn<typeof PatientStatusSelector> = ({}) => {

    const patient: RegistryTreatment = {
        mrn: '1234',
        first_name: 'John',
        last_name: 'Doe',
        status: 'Enrolled'
    }

    return (
        <MantineProvider >
          <AkelloProvider akello={akello_client}>
            <PatientStatusSelector selectedPatient={patient} registry_id='333'/>
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




