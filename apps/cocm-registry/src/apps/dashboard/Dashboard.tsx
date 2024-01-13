import AppContainer from "../../stories/app/Container/AppContainer";
import * as React from "react";
import {BarChart, PieChart} from "@mui/x-charts";
import {ReactNode, useEffect, useState} from "react";
import {getRegistryStats} from "../../api/reports";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Datepicker from "react-tailwindcss-datepicker";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface ScreeningComponentProps {
    title: string
    children: ReactNode
}
const ScreeningComponent:React.FC<ScreeningComponentProps> = ({title, children}) => {
    return (
        <div className={"w-full border border-1 bg-white"}>
            <div className={"font-regular border-b border-1 p-2"}>
                <p className={"text-xl"}>
                    {title}
                </p>
            </div>
            {
                children
            }
        </div>
    )
}



const Dashboard = () => {

    const token = useSelector ((state: RootState) => state.app.token)
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)
    const [stats, setStats] = useState({} as any)
    const [payerDistribution, setPayerDistribution] = useState([] as any[])
    const [isLoading, setIsLoading] = useState(true)
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }
    const [statusDistribution, setStatusDistribution] = useState({
        'status': ['n/a'] as any,
        'values': [0] as any
    } as any)
    const [treatment, setTreatment] = useState({} as any)
    const [screening, setScreening] = useState({
        'phq9': {}, 'gad7': {},
    } as any)


    useEffect(() => {
        if(token && selectedRegistry.id && value.startDate && value.endDate) {
            setIsLoading(true)
            getRegistryStats(selectedRegistry.id, new Date(value.startDate).getTime(), new Date(value.endDate).getTime(), token, (data) => {
                setPayerDistribution(data['payer_distribution'])
                setScreening(data['screening'])
                setTreatment(data['treatment'])
                setStatusDistribution(data['patient_status_distribution'])
                setIsLoading(false)
            })
        }

    }, [token, selectedRegistry.id, value])


    return (
        <>
            <AppContainer title={"Dashboard"} isLoading={isLoading}>


                {/*
                <div className={"w-64"}>
                    <Datepicker
                        primaryColor={"blue"}
                        value={value}
                        onChange={handleValueChange}
                        showShortcuts={true}
                    />
                </div>
                */}


                <div className={"p-4 grid grid-cols-2 gap-4"}>

                    {(!isLoading && stats) && (
                        <>
                            <ScreeningComponent title={"Treatment Performance"}>
                                <div className={"bg-white p-12 w-full pb-6 flex flex-row space-x-12"}>
                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>1</div>
                                        <div>Avg. Weeks in treatment</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>1</div>
                                        <div>Median Weeks in treatment</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>1</div>
                                        <div>Max Weeks in treatment</div>
                                    </div>
                                </div>
                            </ScreeningComponent>
                            <ScreeningComponent title={"PHQ-9/GAD7-9 Screening Avg"}>
                                <div className={"bg-white p-12 w-full pb-6 flex flex-row space-x-12"}>
                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>1</div>
                                        <div>Initial</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>1</div>
                                        <div>Current</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>1</div>
                                        <div>Weekly Change</div>
                                    </div>
                                </div>
                            </ScreeningComponent>
                            <ScreeningComponent title={"Payer Distribution"}>
                                <div className={"w-auto h-96 bg-white"}>
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: 10, label: 'series A' },
                                                    { id: 1, value: 15, label: 'series B' },
                                                    { id: 2, value: 20, label: 'series C' },
                                                ],
                                            },
                                        ]}
                                    />
                                </div>

                            </ScreeningComponent>

                            <ScreeningComponent title={"Patient Status Distribution"}>

                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                    width={500}
                                    height={300}
                                />
                            </ScreeningComponent>
                            {/*
                            <ScreeningComponent title={"Treatment Performance"}>
                                <div className={"bg-white p-12 w-full pb-6 flex flex-row space-x-12"}>
                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{treatment['avg_weeks']}</div>
                                        <div>Avg. Weeks in treatment</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{treatment['median_weeks']}</div>
                                        <div>Median Weeks in treatment</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{treatment['max_weeks']}</div>
                                        <div>Max Weeks in treatment</div>
                                    </div>
                                </div>
                            </ScreeningComponent>
                            <ScreeningComponent title={"PHQ-9/GAD7-9 Screening Avg"}>
                                <div className={"bg-white p-12 w-full pb-6 flex flex-row space-x-12"}>
                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{screening['phq9']['initial']} / {screening['gad7']['initial']}</div>
                                        <div>Initial</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{screening['phq9']['current']} / {screening['gad7']['current']}</div>
                                        <div>Current</div>
                                    </div>

                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{screening['phq9']['weekly_delta']} / {screening['gad7']['weekly_delta']}</div>
                                        <div>Weekly Change</div>
                                    </div>
                                </div>
                            </ScreeningComponent>

                            <ScreeningComponent title={"Payer Distribution"}>
                                <div className={"w-auto h-96 bg-white"}>
                                    <PieChart
                                        series={[
                                            {
                                                data: payerDistribution,
                                            },
                                        ]}
                                    />
                                </div>

                            </ScreeningComponent>

                            <ScreeningComponent title={"Patient Status Distribution"}>

                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: statusDistribution['status'] }]}
                                    series={[{ data: statusDistribution['values'] }]}
                                    width={500}
                                    height={300}
                                />
                            </ScreeningComponent>
                            */}
                        </>
                    )}



                </div>
            </AppContainer>
        </>
    )
}







export default Dashboard