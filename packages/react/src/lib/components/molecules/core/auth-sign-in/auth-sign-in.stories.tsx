import React from 'react'
import { SignIn, SignInProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import {AkelloProvider} from '@akello/react-hook'
import {AkelloClient} from '@akello/core'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SignIn> = {
  title: 'Molecules/Auth/SignIn',
  component: SignIn,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

const akello = new AkelloClient({})

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SignIn> = (args: SignInProps) => (
  <AkelloProvider akello={akello}><SignIn {...args} /></AkelloProvider>  
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
}
