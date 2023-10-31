import {
    CalendarDaysIcon,
    ChartBarSquareIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    TableCellsIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'

import classNames from "classnames";
import {ReactNode} from "react";

interface NavigationButtonProps {
    name: string
    short_name: string
    href: string
    is_active: boolean
    icon: string
    navigate: (route: string) => void
}

export const SideNavigationButton:React.FC<NavigationButtonProps> = ({
    name, short_name, href, is_active, icon, navigate
}) => {

    let size = 'w-6 h-auto'

    const iconMap = new Map<string, any>()
    iconMap.set("table",  <TableCellsIcon className={size} /> )
    iconMap.set("calendar", <CalendarDaysIcon className={size} />)
    iconMap.set("chart", <ChartBarSquareIcon className={size} /> )
    iconMap.set("chat", <ChatBubbleLeftRightIcon className={size} /> )
    iconMap.set("heart", <HeartIcon className={size} /> )
    iconMap.set("team", <UserGroupIcon className={size} /> )

    return (
        <div className={
            classNames(
                "hover:bg-gray-800 hover:text-white p-2 cursor-pointer")
        } onClick={() => {
            navigate(href)
        }}>
            <button
                className={classNames(
                    is_active ? 'bg-gray-800 text-white' : 'text-gray-600',
                    'flex text-sm font-semibold mx-auto '
                )}
            >
                {iconMap.get(icon)}
                <span className="sr-only">{name}</span>
            </button>
            <p className={
                classNames(
                    {
                        "text-white" :is_active
                    },
                    "text-xs text-gray-600 text-center"
                )

            }>{short_name}</p>
        </div>
    )
}