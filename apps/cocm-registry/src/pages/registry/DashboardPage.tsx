import { useAkello } from "@akello/react-hook";
import * as React from "react";
import {BarChart, PieChart} from "@mui/x-charts";
import {ReactNode, useEffect, useState} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';


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

const DashboardPage = () => {
    const akello = useAkello()
    const [payerDistribution, setPayerDistribution] = useState([] as any[])
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    })
    
    const [statusDistribution, setStatusDistribution] = useState({
        'status': ['n/a'] as any,
        'values': [0] as any
    } as any)
    const [treatment, setTreatment] = useState({} as any)
    const [screening, setScreening] = useState({} as any)

    useEffect(() => {                
        if(akello.getSelectedRegistry()?.id && value.startDate && value.endDate) {
            const registryId = akello.getSelectedRegistry()?.id ?? '';
            akello.reportsService.getRegistryStats(registryId, new Date(value.startDate).getTime(), new Date(value.endDate).getTime(), (data) => {                            
                if(data) {
                    setPayerDistribution(data['payer_distribution'])
                    setScreening(data['screening'])
                    setTreatment(data['treatment'])
                    setStatusDistribution(data['patient_status_distribution'])
                }
            })
        }

    }, [value])

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

    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                <ScreeningComponent title={"Treatment Performance"}>
                    <div className={" p-12 w-full pb-6 flex flex-row space-x-12"}>
                        <div className={"text-center space-y-4"}>
                            <div className={"font-black text-5xl"}>{Math.round(treatment['avg_weeks'])}</div>
                            <div>Avg. Weeks in treatment</div>
                        </div>

                        <div className={"text-center space-y-4"}>
                            <div className={"font-black text-5xl"}>{Math.round(treatment['median_weeks'])}</div>
                            <div>Median Weeks in treatment</div>
                        </div>

                        <div className={"text-center space-y-4"}>
                            <div className={"font-black text-5xl"}>{Math.round(treatment['max_weeks'])}</div>
                            <div>Max Weeks in treatment</div>
                        </div>
                    </div>
                </ScreeningComponent>
                <ScreeningComponent title={"Avg Measurements"}>
                    <div className={" p-12 w-full pb-6 flex flex-row space-x-12"}>
                        {
                            Object.keys(screening).map((key) => {
                                return (
                                    <div className={"text-center space-y-4"}>
                                        <div className={"font-black text-5xl"}>{Math.round(screening[key]['avg'])}</div>
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
                            xAxis={[{ scaleType: 'band', data: statusDistribution['status'] }]}
                            series={[{ data: statusDistribution['values'] }]}
                            width={500}
                            height={300}
                        />
                    </ThemeProvider>                                
                </ScreeningComponent> 
                
            </div>
        </>
    )
}

export default DashboardPage

