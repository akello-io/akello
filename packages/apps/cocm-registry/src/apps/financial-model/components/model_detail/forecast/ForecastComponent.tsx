import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


const ForecastComponent = (forecast: Clinic[]) => {

    let data = forecast.map((model, idx) => {
        let careManager = model.staffCollection.getStaffMember(StaffType.CareManager)

        let cocm_eligible_pct = model.payerCollection.pct_total_cocm_eligible
        let caseload_monthly = model.caseLoadCapacity.projected_annual_monthly_case_potential(model.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
        let monthlyAvgRate = model.billingRatesCollection.average_monthly_rate(cocm_eligible_pct * caseload_monthly)

        let cocm_reimbursement = model.payerCollection.total_annualized_reimbursement_monthly(model.caseLoadCapacity.projected_annual_monthly_case_potential(model.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager), monthlyAvgRate)
        let individual_reimbursement = model.payerCollection.total_annualized_billable_individual_reimbursement(model.staffCollection)
        let total_reimbursement = cocm_reimbursement + individual_reimbursement

        return {
            month: idx,
            bhms: model.staffCollection!.getStaffMember(StaffType.CareManager)!.fte,
            cp_hrs: model.staffCollection!.getStaffMember(StaffType.Psychiatrist)!.total_hours_per_week(model.staffCollection.hours_per_fte),
            caseload: model.caseLoadCapacity.override_monthly_capacity,
            costs: model.staffCollection.total_cost / 12,
            revenue: total_reimbursement / 12,
            net: total_reimbursement/12 - model.staffCollection.total_cost/12
        }
    })
    return (
        <>
            <div className="mt-8 flow-root ">
                <div className=" -my-2 overflow-x-auto ">
                    <div className="inline-block min-w-full py-2 align-middle ">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-base-300">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-base-content sm:pl-6 lg:pl-8"
                                    >
                                        Months
                                    </th>
                                    {
                                        data.map((item) => {
                                            return (
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-base-content">
                                                    Month {item.month}
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-base-100">
                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-base-content sm:pl-6 lg:pl-8">
                                        FTE Care Manager(s)
                                    </td>
                                    {
                                        data.map((item) => {
                                            return (
                                                <td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content">{item.bhms}</td>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-base-content sm:pl-6 lg:pl-8">
                                        Psych hrs /week
                                    </td>
                                    {
                                        data.map((item) => {
                                            return (
                                                <td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content">{item.cp_hrs} hrs</td>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-base-content sm:pl-6 lg:pl-8">
                                        Caseload
                                    </td>
                                    {
                                        data.map((item) => {
                                            return (
                                                <td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content">{item.caseload?.toFixed()}</td>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-base-content sm:pl-6 lg:pl-8">
                                        Costs
                                    </td>
                                    {
                                        data.map((item) => {
                                            return (
                                                <td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content">
                                                        <NumericFormat prefix={"$"} value={item.costs} displayType={"text"} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-base-content sm:pl-6 lg:pl-8">
                                        Revenue
                                    </td>
                                    {
                                        data.map((item) => {
                                            return (
                                                <td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content">
                                                        <NumericFormat prefix={"$"} value={item.revenue} displayType={"text"} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>

                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-base-content sm:pl-6 lg:pl-8">
                                        Net
                                    </td>
                                    {
                                        data.map((item) => {
                                            return (
                                                <td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content">
                                                        <NumericFormat prefix={"$"} value={item.net} displayType={"text"} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForecastComponent