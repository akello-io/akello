import React from "react";

interface NavigationProps {
    logo: string
    top_navigation: any[]
    bottom_navigation: any[]
}

const SideNavigation:React.FC<NavigationProps> = ({logo, top_navigation, bottom_navigation}) => {

    return (
        <>
            <div>
                {/* Static sidebar for desktop */}

                <div className="drawer">
                    <input id="reports-drawer" type="checkbox" className="drawer-toggle" checked={false} />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <div className="fixed inset-y-0 left-0 z-50 block w-20 overflow-y-auto bg-gray-900 pb-4">
                            <div className="flex h-16 shrink-0 items-center justify-center bg-ak-light-blue">
                                <a href={"/"}>
                                    <img
                                        className=""
                                        src={logo}
                                        alt="Akello Health"
                                    />
                                </a>
                            </div>
                            <nav className="mt-4">
                                <ul role="list" className="flex flex-col space-y-3">
                                    {
                                        top_navigation.map((item: any) => {
                                            return <>{item}</>
                                        })
                                    }
                                </ul>
                            </nav>
                            <div className={""}>
                                <nav className="absolute bottom-0 left-0 right-0">
                                    <ul role="list" className="">
                                        {
                                            bottom_navigation.map((item: any) => {
                                                return <>{item}</>
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default SideNavigation