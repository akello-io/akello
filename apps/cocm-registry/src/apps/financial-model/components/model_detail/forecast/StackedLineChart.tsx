import React from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Bar, ResponsiveContainer } from 'recharts';

import ForecastComponent from "./ForecastComponent";
import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";
import {Forecast} from "../../../aims_model/forecast";

interface StackedLineChartProps {
    aims: Clinic
    setAIMS: (model: Clinic) => void
    showDetails?: boolean
}


const StackedLineChart:React.FC<StackedLineChartProps> = ({aims, setAIMS, showDetails}) => {
    let forecast = new Forecast()
    let months = forecast.run(aims.copy(), 24)

    const DataFormater = (number: number) => {
        if(number > 1000000000){
            return '$' + (number/1000000000).toString() + 'B';
        }else if(number > 1000000){
            return '$' +(number/1000000).toString() + 'M';
        }else if(number > 1000){
            return '$' +(number/1000).toString() + 'K';
        }else{
            return '$' +number.toString();
        }
    }

    const data = months.map((month, idx) => {
        let careManager = month.staffCollection.getStaffMember(StaffType.CareManager)
        let psychiatrist = month.staffCollection.getStaffMember(StaffType.Psychiatrist)

        let cocm_eligible_pct = aims.payerCollection.pct_total_cocm_eligible
        let caseload_monthly = aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
        let monthlyAvgRate = aims.billingRatesCollection.average_monthly_rate(cocm_eligible_pct * caseload_monthly)

        let cocm_reimbursement = month.payerCollection.total_annualized_reimbursement_monthly(month.caseLoadCapacity.projected_annual_monthly_case_potential(month.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager), monthlyAvgRate)
        let individual_reimbursement = month.payerCollection.total_annualized_billable_individual_reimbursement(month.staffCollection) as number
        let total_reimbursement = cocm_reimbursement + individual_reimbursement

        return {
            "name": idx,
            "cost": month.staffCollection.total_cost,
            "bhms": careManager!.fte,
            "reimbursement": total_reimbursement,
            "caseload": month.caseLoadCapacity.override_monthly_capacity,
            "net": (total_reimbursement/12 - month.staffCollection.total_cost/12),
            "cp_hrs": psychiatrist!.total_hours_per_week(month.staffCollection.hours_per_fte),
        }
    })


    return (
        <>

            <div className={"z-0 h-auto bg-base-100 p-4 flex flex-col"}>
                <div className={"h-32 md:h-48 lg:h-64"}>
                    <ResponsiveContainer  >
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid stroke="#eee" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={DataFormater}/>
                            <Tooltip  formatter={(value) => {
                                return (<NumericFormat prefix={"$"} value={value as number} displayType={"text"} thousandSeparator={","} decimalScale={2} />)
                            }}/>
                            <Bar isAnimationActive={false} dataKey="net" fill="#8884d8" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                {showDetails && (
                    <>
                        {ForecastComponent(months)}
                    </>

                )}
            </div>

        </>
    )
}

export default StackedLineChart

