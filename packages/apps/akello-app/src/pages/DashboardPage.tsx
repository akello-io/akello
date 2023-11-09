import PageContainer from "../containers/PageContainer";
import {DashboardComponent, Metric} from '@akello/react-insights';
import {TestComponent} from 'typescript-npm-package-template';

const DashboardPage = () => {

    return (
        <>
            <PageContainer>
                <TestComponent />
                <div className={"p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                    <DashboardComponent title={"Treatment Performance"}>
                        <div className={"bg-base-100 p-12 w-full pb-6 flex flex-row space-x-12"}>
                            <Metric value={'3'} description={'Avg. Weeks in treatment'}/>
                            <Metric value={'3'} description={'Median Weeks in treatment'}/>
                            <Metric value={'3'} description={'Max Weeks in treatment'}/>
                        </div>
                    </DashboardComponent>

                    <DashboardComponent title={"PHQ-9/GAD7-9 Screening Avg"}>
                        <div className={"bg-base-100 p-12 w-full pb-6 flex flex-row space-x-12"}>
                            <Metric value={'0/0'} description={'Initial'}/>
                            <Metric value={'0/0'} description={'Current'}/>
                            <Metric value={'-1/-1'} description={'Weekly Change'}/>
                        </div>
                    </DashboardComponent>


                    <DashboardComponent title={"Payer Distribution"}>
                        <div className={"bg-base-100 p-12 w-full pb-6 flex flex-row space-x-12"}>
                            <Metric value={'3'} description={'Avg. Weeks in treatment'}/>
                            <Metric value={'3'} description={'Median Weeks in treatment'}/>
                            <Metric value={'3'} description={'Max Weeks in treatment'}/>
                        </div>
                    </DashboardComponent>

                    <DashboardComponent title={"Patient Status Distribution"}>
                        <div className={"bg-base-100 p-12 w-full pb-6 flex flex-row space-x-12"}>
                            <Metric value={'3'} description={'Avg. Weeks in treatment'}/>
                            <Metric value={'3'} description={'Median Weeks in treatment'}/>
                            <Metric value={'3'} description={'Max Weeks in treatment'}/>
                        </div>
                    </DashboardComponent>
                </div>




            </PageContainer>
        </>
    )
}

export default DashboardPage