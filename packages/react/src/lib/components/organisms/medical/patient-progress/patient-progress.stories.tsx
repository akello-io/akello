import React from 'react'
import { PatientProgress, PatientProgressProps } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PatientProgress> = {
  title: 'Organisms/Medical/PatientProgress',
  component: PatientProgress,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta



const Template: StoryFn<typeof PatientProgress> = ({}) => {

    return (
        <MantineProvider >
          <AkelloProvider akello={akello_client}>
            <PatientProgress />
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
}




