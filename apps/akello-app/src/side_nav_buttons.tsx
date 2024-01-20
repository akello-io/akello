import * as React from "react";
import {SideNavigationButton} from '@akello/react'
import {Auth} from "aws-amplify";
import {useLocation, useNavigate} from "react-router";
import AppLogo from './images/logos/akello/akello-corner-logo.svg'
import {
    ChartBarSquareIcon,
    TableCellsIcon,
    UserGroupIcon,
    Cog8ToothIcon
} from '@heroicons/react/24/outline'


const icon_size = 'w-6 h-auto'


export const LogoButton= () => {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate('/')}>
            <img
                className=""
                src={AppLogo}
                alt="Akello Health"
            />
        </button>
    )
}

const DashboardButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <SideNavigationButton
            name={'Dashboard'}
            short_name={'Dashboard'}
            is_active={location.pathname.includes('dashboard')}
            icon={<ChartBarSquareIcon className={icon_size}/>}
            navigate={() => navigate('/dashboard')}
        />
    )
}


const RegistryButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <SideNavigationButton
            name={'Registry'}
            short_name={'Registry'}
            is_active={location.pathname.includes('registry')}
            icon={<TableCellsIcon className={icon_size}/>}
            navigate={() => navigate('/registry')}
        />
    )
}


const TeamButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <SideNavigationButton
            name={'Team'}
            short_name={'Team'}
            is_active={location.pathname.includes('team')}
            icon={<UserGroupIcon className={icon_size}/>}
            navigate={() => navigate('/team')}
        />
    )
}

const ReportsButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <SideNavigationButton
            name={'Reports'}
            short_name={'Reports'}
            is_active={location.pathname.includes('reports')}
            icon={<ChartBarSquareIcon className={icon_size}/>}
            navigate={() => navigate('/reports')}
        />
    )
}


const SettingsButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    return (
        <SideNavigationButton
            name={'Settings'}
            short_name={'Settings'}
            is_active={location.pathname.includes('settings')}
            icon={<Cog8ToothIcon className={icon_size}/>}
            navigate={() => navigate('/settings')}
        />
    )
}


export const top_nav_buttons = [
    (<DashboardButton />),
    (<RegistryButton />),
    (<TeamButton />),
    (<ReportsButton />)
]

export const bottom_nav_buttons = [
    (<SettingsButton />)    
]