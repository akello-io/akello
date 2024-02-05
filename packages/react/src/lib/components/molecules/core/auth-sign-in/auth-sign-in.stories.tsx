import React from 'react'
import { SignIn, SignInProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { StoryFn } from '@storybook/react'
import {AkelloProvider} from '@akello/react-hook'
import {AkelloClient} from '@akello/core'
import { Meta } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SignIn> = {
  title: 'Molecules/Auth/SignIn',
  component: SignIn,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {        
    baseUrl: {
      description: 'Base URL for Akello API',
      control: 'text'
    }    
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
export default meta

interface SignInStoryProps extends SignInProps {
  signInProps: typeof SignIn
  baseUrl: string
  cognitoUserPoolId: string
  cognitoClientId: string
  cognitoEndpoint: string
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<SignInStoryProps> = (props) => {
  
  const akello = new AkelloClient({
    baseUrl: props.baseUrl,
    cognitoUserPoolId: props.cognitoUserPoolId,
    cognitoClientId: props.cognitoClientId,
    cognitoEndpoint: props.cognitoEndpoint,
  })
  
  
  return (
    <AkelloProvider akello={akello}><SignIn {...props.signInProps} onSignupClick={() => {}} /></AkelloProvider>  
  )

}


export const Primary = Template.bind({})
//   More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {  
  baseUrl: 'https://api.akello.dev',
  cognitoUserPoolId: 'us-east-1_2X3X4X5X6X',
  cognitoClientId: '2X3X4X5X6X7X8X9X0X',
  cognitoEndpoint: 'https://cognito-idp.us-east-1.amazonaws.com',
}
