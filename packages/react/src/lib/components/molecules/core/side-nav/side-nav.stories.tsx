import React from 'react'
import { SideNavigation, SideNavigationProps } from '.'
import { SideNavigationButton } from '../side-nav-btn'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import {
    CalendarDaysIcon,
    ChartBarSquareIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    TableCellsIcon,
    UserGroupIcon,
    Cog8ToothIcon
} from '@heroicons/react/24/outline'


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


let size = 'w-6 h-auto'

const iconMap = new Map<string, any>()
iconMap.set("table",  <TableCellsIcon className={size} /> )
iconMap.set("calendar", <CalendarDaysIcon className={size} />)
iconMap.set("chart", <ChartBarSquareIcon className={size} /> )
iconMap.set("chat", <ChatBubbleLeftRightIcon className={size} /> )
iconMap.set("heart", <HeartIcon className={size} /> )
iconMap.set("team", <UserGroupIcon className={size} /> )
iconMap.set("gear", <Cog8ToothIcon className={size} /> )

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const logo = (
    <a href={"/"}>

    </a>
)



Primary.args = {
    logo: (<>{logo}</>),
    top_navigation: [
        {name: "Dashboard", short_name: "Dashboard", icon: <>{iconMap.get('calendar')}</>, is_active: false, navigate: () => {}},
        {name: "Registry", short_name: "Registry", icon: <>{iconMap.get('table')}</>, is_active: false, navigate: () => {}},
        {name: "Team", short_name: "Patients", icon: <>{iconMap.get('team')}</>, is_active: false, navigate: () => {}},
        {name: "Reports", short_name: "Reports", icon: <>{iconMap.get('chart')}</>, is_active: false, navigate: () => {}, toggle_drawer: true},
    ],
    bottom_navigation: [
        {name: "Settings", short_name: "Settings", icon: <>{iconMap.get('gear')}</>, is_active: false, navigate: () => {}},
    ]
}
