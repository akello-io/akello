import React from 'react'
import { HeaderComponent, HeaderComponentProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderComponent> = {
  title: 'Molecules/Core/HeaderComponent',
  component: HeaderComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof HeaderComponent> = (args: HeaderComponentProps) => <HeaderComponent {...args} />


export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    title: 'Header Component',
    isLoading: false,
    is_admin: false,
    role: 'admin',
    titleToolTip: 'This is a tooltip',
    buttons: [(<button className="btn btn-primary">Button</button>)]
}
