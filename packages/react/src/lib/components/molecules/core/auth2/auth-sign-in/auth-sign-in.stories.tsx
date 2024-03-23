import React from 'react'
import { LoginPage, LoginPageProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { AkelloProvider } from '@akello/react-hook'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { AkelloClient } from '@akello/core'

const config = {
    baseUrl: '',
    cognitoUserPoolId: '',
    cognitoClientId: '',
    onUnauthenticated: () => {
        window.location.href = '/login'
    }
}
export const akello = new AkelloClient(config)


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoginPage> = {
  title: 'Molecules/Core/AuthSignIn',
  component: LoginPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof LoginPage> = (args: LoginPageProps) => {
  return (
    <AkelloProvider akello={akello}>
      <LoginPage {...args} />
    </AkelloProvider>
  )

}


export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {    
}
