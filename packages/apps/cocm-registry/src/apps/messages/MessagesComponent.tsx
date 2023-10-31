import AppContainer from "../../stories/app/Container/AppContainer";
import * as React from "react";


const MessagesComponent = () => {
    return (
        <>
            <AppContainer title={"Messages"}>
                <div className={"p-4"}>
                    <div className={"w-full border border-1 bg-white max-w-3xl"}>
                        <div className={"font-semibold border-b border-1 p-2"}>
                            <p className={"text-xl"}>
                                Coming soon
                            </p>
                        </div>
                        <div className={"bg-white p-2 max-w-3xl pb-6"}>
                            The messages feature will be coming in future releases. With Akello we hope create a
                            seamless collaborative experience between CoCM teams and patients.
                            <br/>
                            <br/>
                            If you would like to learn more about our roadmap please feel free to reach me directly at
                            <a href={"mailto: vijay@akellohealth.com"} className={"text-blue-500 font-semibold"}> vijay@akellohealth.com </a>.
                        </div>
                    </div>
                </div>
            </AppContainer>
        </>
    )
}

export default MessagesComponent