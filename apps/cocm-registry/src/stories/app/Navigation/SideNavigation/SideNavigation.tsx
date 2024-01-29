import classNames from "classnames";
import AkelloLogo from "../../../../images/logos/akello/akello-corner-logo.svg";
import {SideNavigationButton} from "./SideNavigationButton";
import {useLocation} from "react-router-dom";
import {ArrowLeftIcon, ChartPieIcon} from "@heroicons/react/20/solid";
import {useState} from "react";

interface NavigationProps {
    role: string
    activeRoute: string
    navigate: (route: string) => void
}

export const SideNavigation:React.FC<NavigationProps> = ({role, activeRoute, navigate}) => {
    let dashboard = { name: 'Dashboard', short_name: 'Dashboard', href: '/dashboard', icon: "chart", toolTip: 'some title tool tip'}
    let registry = { name: 'Registry', short_name: 'Registry', href: '/registry', icon: "table", toolTip: 'some title tool tip'}
    let team = { name: 'Team', short_name: 'Team', href: '/team', icon: "team"}
    const { pathname } = useLocation()
    const [drawerToggle, setDrawerToggle] = useState(false)



    let top_navigation = []
    let bottom_navigation = [] as any[]
    let is_registry_create = pathname.indexOf('create') != -1

    if(!is_registry_create) {
        top_navigation.push(dashboard)
        top_navigation.push(registry)
        top_navigation.push(team)
    }

    return (
        <>
            <div>
                {/* Static sidebar for desktop */}

                <div className="drawer">
                    <input id="reports-drawer" type="checkbox" className="drawer-toggle" checked={drawerToggle} />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <div className="fixed inset-y-0 left-0 z-50 block w-20 overflow-y-auto bg-gray-900 pb-4">
                            <div className="flex h-16 shrink-0 items-center justify-center bg-ak-light-blue">
                                <a href={"/"}>
                                    <img
                                        className=""
                                        src={AkelloLogo}
                                        alt="Akello Health"
                                    />
                                </a>
                            </div>
                            <nav className="mt-4">
                                <ul role="list" className="flex flex-col space-y-3">
                                    {top_navigation.map((item, itemIdx) => (
                                        <li key={item.name}>
                                            <SideNavigationButton
                                                name={item.name}
                                                short_name={item.short_name}
                                                href={item.href}
                                                is_active={window.location.href.indexOf(item.href) != -1}
                                                icon={item.icon}
                                                navigate={(route) => {
                                                    navigate(route)
                                                }}
                                            />
                                        </li>
                                    ))}
                                    {
                                        !is_registry_create && (
                                            <label htmlFor="reports-drawer" className="drawer-button">
                                                <SideNavigationButton
                                                    name={"Reports"}
                                                    short_name={"Reports"}
                                                    href={"/reports"}
                                                    is_active={false}
                                                    icon={"chart"}
                                                    navigate={(route) => {
                                                        setDrawerToggle(!drawerToggle)
                                                    }}
                                                />
                                            </label>
                                        )
                                    }
                                </ul>
                            </nav>
                            <div className={""}>
                                <nav className="absolute bottom-0 left-0 right-0">
                                    <ul role="list" className="">
                                        {bottom_navigation.map((item, itemIdx) => (
                                            <li key={item.name}>
                                                {
                                                    item.upgrade && (
                                                        <div className={"bg-crx-red pb-2"}>
                                                            <button
                                                                onClick={() => {
                                                                    navigate(item.href)
                                                                }}
                                                                className={classNames(
                                                                    item.href == activeRoute ? 'text-white' : 'text-white',
                                                                    'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold mx-auto'
                                                                )}
                                                            >
                                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                <span className="sr-only">{item.name}</span>
                                                            </button>
                                                            <p className={"text-xs text-white text-center"}>{item.short_name}</p>
                                                        </div>

                                                    )
                                                }
                                                {
                                                    !item.upgrade && (
                                                        <div className={"bg-neutral"}>
                                                            <button
                                                                onClick={() => {
                                                                    navigate(item.href)
                                                                }}
                                                                className={classNames(
                                                                    item.href == '' ? ' text-white' : 'text-white hover:text-white hover:bg-gray-800',
                                                                    'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold mx-auto'
                                                                )}
                                                            >
                                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                <span className="sr-only">{item.name}</span>
                                                            </button>
                                                            <p className={"text-xs text-white text-center"}>{item.short_name}</p>
                                                        </div>
                                                    )
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {
                        !is_registry_create && (
                            <div className="drawer-side z-50 ml-20">

                                <div className="menu p-4 w-80 min-h-full bg-base-100 shadow-xl">

                                    <label htmlFor="reports-drawer" className="drawer-button cursor-pointer" onClick={()=> {
                                        setDrawerToggle(!drawerToggle)
                                    }}>
                                        <ArrowLeftIcon className={"h-6 w-6"} />
                                    </label>
                                    <div className={"pt-4 text-2xl font-semibold"}>
                                        Reports
                                    </div>
                                    <div className={"pt-5 flex flex-col space-y-4"}>
                                        <label htmlFor="reports-drawer" className="drawer-button text-lg cursor-pointer" onClick={() => {
                                            setDrawerToggle(!drawerToggle)
                                            navigate("/reports/billing")
                                        }}>
                                            Billing Report
                                        </label>
                                    </div>


                                </div>
                            </div>
                        )
                    }
                </div>


            </div>
        </>
    )
}

