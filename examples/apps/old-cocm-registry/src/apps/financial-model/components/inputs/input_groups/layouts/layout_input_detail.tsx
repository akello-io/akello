import {InputGroupMiniHeader} from "../input_group";
import {PercentInput} from "../../formatted_numbers";
import {ReactNode} from "react";



interface LayoutInputDetailProps {
    title: string
    children: ReactNode
}



const LayoutInputDetail:React.FC<LayoutInputDetailProps> = ({title, children}) => {
    return (
        <>
            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-sm ">
                <div className="px-4 py-6">
                    <p className={"text-lg font-semibold"}>{title}</p>
                    <div className="grid grid-cols-1 space-y-1">
                        { children }
                    </div>
                </div>
            </form>
        </>
    )
}

export default LayoutInputDetail