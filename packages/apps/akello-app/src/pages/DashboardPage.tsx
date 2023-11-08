import PageContainer from "../containers/PageContainer";
import {Auth} from "aws-amplify";
import {DashboardComponent} from '@akello/react';

const DashboardPage = () => {

    return (
        <>
            <PageContainer>
                <div className={"p-4 grid grid-cols-2 gap-4"}>
                    <DashboardComponent title={"test"}>
                        <div className={"bg-white p-12 w-full pb-6 flex flex-row space-x-12"}>
                            <div className={"text-center space-y-4"}>
                                <div className={"font-black text-5xl"}>3</div>
                                <div>Avg. Weeks in treatment</div>
                            </div>

                            <div className={"text-center space-y-4"}>
                                <div className={"font-black text-5xl"}>3</div>
                                <div>Median Weeks in treatment</div>
                            </div>

                            <div className={"text-center space-y-4"}>
                                <div className={"font-black text-5xl"}>3</div>
                                <div>Max Weeks in treatment</div>
                            </div>
                        </div>
                    </DashboardComponent>

                    <DashboardComponent title={"test"}>
                        <div className={"bg-white p-12 w-full pb-6 flex flex-row space-x-12"}>
                            <div className={"text-center space-y-4"}>
                                <div className={"font-black text-5xl"}>3</div>
                                <div>Avg. Weeks in treatment</div>
                            </div>

                            <div className={"text-center space-y-4"}>
                                <div className={"font-black text-5xl"}>3</div>
                                <div>Median Weeks in treatment</div>
                            </div>

                            <div className={"text-center space-y-4"}>
                                <div className={"font-black text-5xl"}>3</div>
                                <div>Max Weeks in treatment</div>
                            </div>
                        </div>
                    </DashboardComponent>
                </div>

            </PageContainer>
        </>
    )
}

export default DashboardPage