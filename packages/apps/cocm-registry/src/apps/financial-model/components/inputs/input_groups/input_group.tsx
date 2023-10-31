import {ReactNode} from "react";
import {group_input_content} from "../../../input_content";


interface TooltipProps {
    message: string
    children: ReactNode
}

export const Tooltip:React.FC<TooltipProps> = ({ message, children }) => {
    return (
        <div className="tooltip" data-tip={message}>
            {children}
        </div>
    )
}


type InputContentType = typeof group_input_content

interface InputGroupHeaderProps {
    input_group_id: keyof InputContentType
    input_id: string
}

export const InputGroupMiniHeader:React.FC<InputGroupHeaderProps> = (
    {
        input_group_id,
        input_id}
) => {
    let inputs = group_input_content[input_group_id]["inputs"]

    type inptutType = typeof inputs
    let tooltip = inputs[input_id as keyof inptutType]["tooltip"] // e.g., input_id == full-time-pcp
    let short_description = inputs[input_id as keyof inptutType]["short-description"] // e.g., input_id == full-time-pcp

    return (
        <div className={"flex flex-row w-full justify-between"}>
            <Tooltip message={tooltip}>
                <div className={"flex flex-row"}>
                    <label htmlFor="facility-name" className="block text-xs font-medium leading-6 text-base-content">
                        {short_description}
                    </label>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 my-auto ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </div>

            </Tooltip>

        </div>
    )
}


