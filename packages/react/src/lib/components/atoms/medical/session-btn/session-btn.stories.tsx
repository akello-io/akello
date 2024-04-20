import React from 'react'
import { SessionBtn, SessionBtnPros } from '.'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { akello_client } from '../../../../../../storybook_akello_client'
import { MantineProvider } from '@mantine/core'
import { AkelloProvider, useAkello } from '@akello/react-hook'
import { Notifications } from '@mantine/notifications';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SessionBtn> = {
  title: 'Atoms/Medical/SessionBtn',
  component: SessionBtn,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta





const Template: StoryFn<typeof SessionBtn> = ({}) => {

    return (
        <MantineProvider >
          <Notifications />
          <AkelloProvider akello={akello_client}>
            <SessionBtn  onRunning={() => {}} onReviewTypeSelect={() => {}}/>
          </AkelloProvider>
        </MantineProvider>
    )
  }

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}




