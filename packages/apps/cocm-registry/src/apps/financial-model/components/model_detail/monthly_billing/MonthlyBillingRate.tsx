import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


interface MonthlyBillingRateProps {
    clinic: Clinic
    setClinic: (clinic: Clinic) => void
}

const MonthlyBillingRate:React.FC<MonthlyBillingRateProps> = ({clinic, setClinic}) => {



     let careManager = clinic.staffCollection.getStaffMember(StaffType.CareManager)
     let cocm_eligible_pct = clinic.payerCollection.pct_total_cocm_eligible
     let caseload_monthly = clinic.caseLoadCapacity.projected_annual_monthly_case_potential(clinic.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
     let monthlyAvgRate = clinic.billingRatesCollection.average_monthly_rate(cocm_eligible_pct * caseload_monthly)


    return (
        <div className="px-4 sm:px-6 lg:px-8 bg-white pt-4">
            <div className={"grid grid-cols-2 min-w-full"}>
                <div>Projected Monthly</div>
                <div>{caseload_monthly}</div>

                <div>% eligible</div>
                <div>{cocm_eligible_pct * 100}%</div>

                <div>Total number patients billable</div>
                <div>
                    <NumericFormat
                        type={"text"}
                        displayType={"text"}
                        decimalScale={2}
                        value={cocm_eligible_pct * caseload_monthly}
                    />

                </div>

                <div>Average Monthly Reimbursement per Eligible Patient</div>
                <div>
                    <NumericFormat
                        type={"text"}
                        displayType={"text"}
                        decimalScale={2}
                        prefix={"$"}
                        value={monthlyAvgRate}
                    />
                </div>

            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr className="divide-x divide-gray-200">
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Minutes/Month
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    % of Eligible Patients
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Avg. Number of Patients
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                                    Avg Reimbursement Amount
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                                    Total
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                                    Medicare Benchmark Payments 2023
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {
                                clinic.billingRatesCollection.billing_rates.map((rate) => {
                                    return (
                                        <>
                                            <tr className="divide-x divide-gray-200">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {rate.name}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                                    <NumericFormat
                                                        className={"border border-info rounded-md py-2 pl-2"}
                                                        suffix={"%"}
                                                        value={rate.percent_of_eligible_patients * 100}
                                                        decimalScale={2}
                                                        onChange={(e) => {
                                                            rate.percent_of_eligible_patients = parseFloat(e.target.value)/100
                                                            clinic.billingRatesCollection.setBillingRate(rate)
                                                            setClinic(clinic.copy())

                                                        }}
                                                    />

                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                                    <NumericFormat
                                                        type={"text"} displayType={"text"}
                                                        value={rate.avg_number_of_patients(cocm_eligible_pct * caseload_monthly)}
                                                        decimalScale={2}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                                    <NumericFormat
                                                        className={"border border-info rounded-md py-2 pl-2"}
                                                        prefix={"$"}
                                                        value={rate.avg_reimbursement_amount}
                                                        decimalScale={2}
                                                        onChange={(e) => {
                                                            rate.avg_reimbursement_amount = parseFloat(e.target.value.replace('$',''))
                                                            clinic.billingRatesCollection.setBillingRate(rate)
                                                            setClinic(clinic.copy())

                                                        }}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                                    <NumericFormat
                                                        prefix={"$"}
                                                        type={"text"} displayType={"text"}
                                                        value={rate.total(cocm_eligible_pct * caseload_monthly)}
                                                        decimalScale={2}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                                                    {rate.medicare_benchmark}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MonthlyBillingRate
