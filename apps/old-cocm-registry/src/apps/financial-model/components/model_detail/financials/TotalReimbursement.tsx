import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";



export const TotalReimbursement = (aims: Clinic) => {
    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)

    let cocm_eligible_pct = aims.payerCollection.pct_total_cocm_eligible
    let caseload_monthly = aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
    let monthlyAvgRate = aims.billingRatesCollection.average_monthly_rate(cocm_eligible_pct * caseload_monthly)

    let cocm = aims.payerCollection.total_annualized_reimbursement_monthly(aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager), monthlyAvgRate)
    let individual = aims.payerCollection.total_annualized_billable_individual_reimbursement(aims.staffCollection)
    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    TOTAL REIMBURSEMENT
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">

                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Total Reimbursement
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            CoCM Reimbursement
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Billable Individual Services Reimbursement
                                        </th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                    <Fragment key="Services">



                                        <tr className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                CoCM Monthly Reimbursement + Billable Individual Services Reimbursement
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={cocm} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={individual} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={cocm + individual} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>
                                    </Fragment>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}