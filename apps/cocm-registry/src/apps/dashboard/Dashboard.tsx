import AppContainer from "../../stories/app/Container/AppContainer";
import * as React from "react";
import {BarChart, PieChart} from "@mui/x-charts";
import {ReactNode, useEffect, useState} from "react";
import {getRegistryStats} from "../../api/reports";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Datepicker from "react-tailwindcss-datepicker";
import {Simulate} from "react-dom/test-utils";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



import input = Simulate.input;

interface ScreeningComponentProps {
    title: string
    children: ReactNode
}
const ScreeningComponent:React.FC<ScreeningComponentProps> = ({title, children}) => {
    return (
        <div className={"w-full border border-1 "}>
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
    const [screening, setScreening] = useState({} as any)

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      
    const lightTheme = createTheme({
      palette: {
        mode: 'light'
      }
    })

    let muiTheme = lightTheme

    const theme = document.querySelector('html')?.getAttribute('data-theme');
    if(theme == 'dark') {
        muiTheme = darkTheme
    }


    useEffect(() => {                
        if(token && selectedRegistry.id && value.startDate && value.endDate) {
            setIsLoading(true)
            getRegistryStats(selectedRegistry.id, new Date(value.startDate).getTime(), new Date(value.endDate).getTime(), token, (data) => {                
                setIsLoading(false)
                if(data) {
                    setPayerDistribution(data['payer_distribution'])
                    setScreening(data['screening'])
                    setTreatment(data['treatment'])
                    setStatusDistribution(data['patient_status_distribution'])
                }
            })
        }

    }, [token, selectedRegistry.id, value])


    return (
        <>
            <AppContainer title={"Dashboard"} isLoading={isLoading}>
               

                <div className={"p-4 grid grid-cols-2 gap-4 "}>

                    {(!isLoading && stats) && (
                        <>
                            <ScreeningComponent title={"Treatment Performance"}>
                                <div className={" p-12 w-full pb-6 flex flex-row space-x-12"}>
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
                            <ScreeningComponent title={"Avg Measurements"}>
                                <div className={" p-12 w-full pb-6 flex flex-row space-x-12"}>
                                    {
                                        Object.keys(screening).map((key, index) => {
                                            return (
                                                <div className={"text-center space-y-4"}>
                                                    <div className={"font-black text-5xl"}>{screening[key]['avg']}</div>
                                                    <div>{key}</div>
                                                </div>
                                            )
                                        })
                                    }                                    
                                </div>
                            </ScreeningComponent>
                            <ScreeningComponent title={"Payer Distribution"}>
                                <div className={"w-auto h-96 "}>
                                    <ThemeProvider theme={muiTheme}>
                                        <PieChart
                                            series={[
                                                {
                                                    data: payerDistribution,
                                                },
                                            ]}
                                        />
                                    </ThemeProvider>
                                </div>

                            </ScreeningComponent>

                            <ScreeningComponent title={"Patient Status Distribution"}>

                                <ThemeProvider theme={muiTheme}>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                        width={500}
                                        height={300}
                                    />
                                </ThemeProvider>                                
                            </ScreeningComponent>                            
                        </>
                    )}



                </div>
            </AppContainer>
        </>
    )
}







export default Dashboard