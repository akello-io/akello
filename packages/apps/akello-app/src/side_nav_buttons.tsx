import * as React from "react";
import {SideNavigationButton} from '@akello/react'
import {useLocation, useNavigate} from "react-router";

import {
    CalendarDaysIcon,
    ChartBarSquareIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    TableCellsIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'


const DashboardButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <SideNavigationButton
            name={'btn'}
            short_name={'button'}
            is_active={location.pathname.includes('dashboard')}
            icon={<TableCellsIcon className={'w-5 h-auto'}/>}
            navigate={() => navigate('/dashboard')}
        />
    )
}

const top_nav_buttons = [
    (<DashboardButton />)
]


export default top_nav_buttons