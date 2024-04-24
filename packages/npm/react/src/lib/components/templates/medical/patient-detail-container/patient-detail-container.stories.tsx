import React from 'react'
import { PatientDetailContainer, PatientDetailContainerProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'
import { Notifications } from '@mantine/notifications'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientDetailContainer> = {
  title: 'Templates/Medical/PatientDetailContainer',
  component: PatientDetailContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta



const Template: StoryFn<typeof PatientDetailContainer> = ({}) => {

    return (
        <MantineProvider >
        <Notifications />
          <AkelloProvider akello={akello_client}>
            <PatientDetailContainer selectedPatient={
                {
                    registry_id: '33',
                    user_id: '33',
                    mrn: '1234',
                    status: 'Enrolled',
                    referring_npi: '1234',
                    payer: 'Medicare',
                    flag: 'High Risk',
                    first_name: 'John',
                    last_name: 'Doe',
                    phone_number: '123-456-7890',
                    email: 'j@g.com',
                    date_of_birth: '01/01/1990',
                }
            }/>
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




