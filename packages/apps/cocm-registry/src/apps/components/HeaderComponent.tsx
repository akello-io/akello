import {forwardRef, ReactNode, useState} from "react";
import 'react-tooltip/dist/react-tooltip.css'
import YouTube from 'react-youtube';



import {
    QuestionMarkCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'
import {Tooltip} from "@mui/material";
import classNames from "classnames";
import * as React from "react";
interface HeaderComponentProps {
    title: string
    is_admin?: boolean
    role?: string
    titleToolTip?: string
    buttons?: ReactNode[]
    isLoading?: boolean
}

const HeaderComponent:React.FC<HeaderComponentProps> = ({title, isLoading, is_admin, role, titleToolTip, buttons}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false)

    return (
        <>

            <div className={"flex bg-white h-40 w-full px-7"}>
                <div className={"flex flex-row my-auto justify-between w-full"}>
                    <div className={"flex flex-col sm:flex-row space-x-4"}>
                        <div className={"flex flex-row space-x-4 my-auto text-2xl sm:text-4xl font-semibold"}>
                            {isLoading && (
                                <>
                                    <span className="loading bg-black loading-ring loading-lg"></span>
                                </>
                            )}
                            <div>
                                {title}
                            </div>

                        </div>
                        {is_admin && (
                            <div>
                                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                            Admin
                                        </span>
                            </div>
                        )}

                        {role && (
                            <div>
                                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                            {role}
                                        </span>
                            </div>
                        )}
                        { titleToolTip && (
                            <div className={"relative "}>
                                <QuestionMarkCircleIcon className={classNames("h-6 w-6 shrink-0 my-auto cursor-pointer", {
                                    "text-ak-light-blue font-semibold" : tooltipOpen == true
                                })}  aria-hidden="true" onClick={() => {
                                    setTooltipOpen(!tooltipOpen)
                                }} />
                                {
                                    tooltipOpen && (
                                        <>
                                            <div className={"absolute p-4 z-50 w-96"}>
                                                <div className={"w-full border border-1 bg-white max-w-3xl"}>
                                                    <div className={"font-semibold border-b border-1 p-2"}>
                                                        <p className={"text-xl"}>
                                                            Coming soon - Visibility into CoCM program
                                                        </p>
                                                    </div>
                                                    <div className={"bg-white p-2 max-w-3xl pb-6"}>
                                                        We will be adding some baseline KPI's to give you better visibility into the health of your
                                                        CoCM program. This will be coming very soon.
                                                        <br/>
                                                        <br/>
                                                        If you would like to learn more about our roadmap please feel free to reach me directly at
                                                        <a href={"mailto: vijay@akellohealth.com"} className={"text-blue-500 font-semibold"}> vijay@akellohealth.com </a>.
                                                    </div>
                                                </div>
                                            </div>
                                            {/*
                                            <div className="absolute flex flex-col left-0 top-10  p-4 w-max h-max bg-white border border-1 z-40 ">
                                                <div>
                                                    <YouTube videoId="iPzZ_17T80s"/>
                                                </div>
                                            </div>
                                            */}
                                        </>
                                    )
                                }

                            </div>
                        )}

                    </div>
                    <div className={"space-x-4"}>

                        { buttons }

                    </div>

                </div>



            </div>
        </>
    )
}

export default HeaderComponent