import React from 'react'
import { PatientSessionStepper, PatientSessionStepperProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'
import { RegistryTreatment } from '@akello/core'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientSessionStepper> = {
  title: 'Molecules/Medical/PatientSessionStepper',
  component: PatientSessionStepper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

const Template: StoryFn<typeof PatientSessionStepper> = ({}) => {


    return (
        <MantineProvider >
          <AkelloProvider akello={akello_client}>
            <PatientSessionStepper />
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




