import React from 'react'
import { TopNavigation, TopNavigationProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TopNavigation> = {
  title: 'Molecules/Core/TopNavigation',
  component: TopNavigation,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { 
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TopNavigation> = (args: TopNavigationProps) => <TopNavigation {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    signIn: () => {},
    signOut: () => {},
    logo: (<></>),
    signed_in: true,
    menu_items: [],
    theme_swapper: (<></>)    
}
