import Datepicker from "react-tailwindcss-datepicker";
import BillingReportDataGrid from "./BillingReportDataGrid";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {getBillingReport} from "../../../api/reports";
import moment from "moment";
import classNames from "classnames";
import AppContainer from "../../../stories/app/Container/AppContainer";


const BillingReport = () => {
    const token = useSelector((state: RootState) => state.app.token)
    const selectedRegistry = useSelector((state: RootState) => state.app.selectedRegistry)
    const [statData, setStatData] = useState([])

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }


    useEffect(() => {
        if(value.startDate && value.endDate) {
            getBillingReport(token, selectedRegistry.id, moment(value.startDate).unix(), moment(value.endDate).unix(), (data) => {
                setStatData(data)
            })
        }
    }, [value])

    return (
        <>
            <AppContainer title={"Billing Report"}>

                <div className={"p-4 space-y-6"}>
                    <div className={"w-full border border-1 bg-white "}>
                        <div className={"font-semibold border-b border-1 p-2"}>
                            <p className={"text-xl"}>
                                Billing Report
                            </p>
                        </div>
                        <div className={"bg-white p-2  pb-6"}>
                            <div>
                                Generate and download your billing report                            
                            </div>
                                                    
                            <div className="w-96 border border-1  rounded-md">
                                <Datepicker
                                    value={value}
                                    onChange={handleValueChange}
                                    showShortcuts={true}
                                />
                            </div>
                            

                            <BillingReportDataGrid data={statData}/>                                                        
                        </div>
                    </div>
                </div>

            </AppContainer>


        </>
    )
}

export default BillingReport