import AppContainer from "../../stories/app/Container/AppContainer";
import * as React from "react";

const UpgradeComponent = () => {
    return (
        <>
            <AppContainer title={"Upgrade"}>
                <div className={"p-4"}>
                    <div className={"w-full border border-1 bg-white max-w-3xl"}>
                        <div className={"font-semibold border-b border-1 p-2"}>
                            <p className={"text-xl"}>
                                Coming soon
                            </p>
                        </div>
                        <div className={"bg-white p-2 max-w-3xl pb-6"}>
                            The current free version of Akello is what we have now. We want to make sure the free
                            version will be able to fully support care manager to manage their population with a
                            Physician and a Consulting Psychiatrist.
                            <br/>
                            <br/>
                            As we add more advanced capabilities to help CoCM teams optimize their program, we will
                            unlock new upgrade paths here.
                            <br/>
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

export default UpgradeComponent