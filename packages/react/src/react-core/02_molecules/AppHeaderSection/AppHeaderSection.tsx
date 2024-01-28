import '../../../index.css';

import {ReactNode} from "react";
import * as React from "react";


export interface HeaderComponentProps {
    title: string
    buttons?: ReactNode[]
    isLoading?: boolean
}

const AppHeaderSection:React.FC<HeaderComponentProps> = ({title, isLoading, buttons}) => {

    return (
        <>

            <div className={"flex bg-base-100 h-40 w-full px-7"}>
                <div className={"flex flex-row my-auto justify-between w-full"}>
                    <div className={"flex flex-col sm:flex-row space-x-4"}>
                        <div className={"flex flex-row space-x-4 my-auto text-2xl sm:text-4xl font-semibold"}>
                            {isLoading && (
                                <>
                                    <span className="loading bg-base-content loading-ring loading-lg"></span>
                                </>
                            )}
                            <div>
                                {title}
                            </div>

                        </div>
                    </div>
                    <div className={"space-x-4"}>

                        { buttons }

                    </div>

                </div>



            </div>
        </>
    )
}

export default AppHeaderSection