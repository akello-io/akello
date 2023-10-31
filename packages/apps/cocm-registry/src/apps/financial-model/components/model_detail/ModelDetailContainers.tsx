import {ReactNode} from "react";


interface ModelDetailSectionParams {
    title?: string
    children: ReactNode
    className?: string
}

const ModelDetailSection:React.FC<ModelDetailSectionParams> = ({title, className, children}) => {
    return (
        <>
            <div className={"bg-base-100 my-1"}>
                {
                    title && (
                        <div className={"text-2xl font-semibold p-4"}>
                            {title}
                        </div>
                    )
                }
                <div className={className}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModelDetailSection