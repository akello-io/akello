import React from 'react';


export interface PageFooterProps {
    terms_of_service_link: string
    privacy_policy_link: string
}


const PageFooter = (props: PageFooterProps) => {
    return (
        <>
            <div className={"pl-6 pt-24 flex flex-row space-x-4"}>
                <div className={"font-bold"}>
                    © 2023 akello.io
                </div>
                <a href={"https://akello.io/terms"} target="_blank" className={"text-ak-light-blue underline font-semibold cursor-pointer"}>
                    Terms of Service
                </a>
                <a href={"https://akello.io/privacy"} target="_blank" className={"text-ak-light-blue underline font-semibold cursor-pointer"}>
                    Privacy Policy
                </a>
            </div>
        </>
    )
}

export default PageFooter