import React from 'react'
import { HamburgerMenuButton, HamburgerMenuButtonProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HamburgerMenuButton> = {
  title: 'Atoms/HamburgerMenuButton',
  component: HamburgerMenuButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    htmlFor: { control: 'text' },    
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof HamburgerMenuButton> = (args: HamburgerMenuButtonProps) => <HamburgerMenuButton {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  htmlFor: '-'  
}
