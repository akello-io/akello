import React from 'react'
import { SignUpForm } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { StoryFn } from '@storybook/react'
import {AkelloProvider} from '@akello/react-hook'
import {AkelloClient} from '@akello/core'
import { Meta } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SignUpForm> = {
  title: 'Molecules/Auth/SignUpForm',
  component: SignUpForm,
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


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn = (props) => {
  
    const akello = new AkelloClient({
      baseUrl: props.baseUrl,
      cognitoUserPoolId: props.cognitoUserPoolId,
      cognitoClientId: props.cognitoClientId,
      cognitoEndpoint: props.cognitoEndpoint,
    })
    
    
    return (
      <AkelloProvider akello={akello}><SignUpForm onSiginClick={() => {}} /></AkelloProvider>  
    )
  
  }


export const Primary = Template.bind({})
//   More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {  
  
}
