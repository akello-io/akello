import React from 'react'
import { SideNavigation, SideNavigationProps } from '.'
import { SideNavigationButton } from '../side-nav-btn'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SideNavigation> = {
  title: 'Molecules/SideNavigation',
  component: SideNavigation,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {    
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SideNavigation> = (args: SideNavigationProps) => <SideNavigation {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    logo: (<><div className="bg-red-500 w-24 h-24"></div></>),
    top_navigation: [
        (<SideNavigationButton name="Dashboard" short_name="Dashboard" icon={<div className="bg-red-500 w-6 h-6"></div>} is_active={true} navigate={() => {}}/>),  
        (<SideNavigationButton name="Reports" short_name="Reports" icon={<div className="bg-red-500 w-6 h-6"></div>} is_active={true} navigate={() => {}}/>),  
    ],
    bottom_navigation: [
        (<SideNavigationButton name="Settings" short_name="Settings" icon={<div className="bg-red-500 w-6 h-6"></div>} is_active={true} navigate={() => {}}/>),  
    ]
}
