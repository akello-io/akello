import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import classNames from "classnames";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


export const ReimbursementAnnualized = (aims: Clinic) => {
    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)
    let cocm_eligible_pct = aims.payerCollection.pct_total_cocm_eligible
    let caseload_monthly = aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
    let monthlyAvgRate = aims.billingRatesCollection.average_monthly_rate(cocm_eligible_pct * caseload_monthly)

    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="m-4 font-bold bg-base-300 w-min whitespace-nowrap ">
                    ANNUALIZED MONTHLY CoCM Billing
                </div>
                <div className="px-4 py-5 sm:p-6">

                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">

                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Primary Payers
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Average Monthly Reimbursement Rate
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Adjusted % of Patients expected to bill via CoCM
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Annualized Count of Cases Eligible for Monthly CoCM Billing
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Annualized Reimbursement via Monthly CoCM Billing
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                    <Fragment key="Services">

                                        { aims.payerCollection.payers.map((payer, idx) =>  {

                                            return (
                                                <tr
                                                    key={payer.name}
                                                    className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                        {payer.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"} prefix={"$"}  thousandSeparator={","} value={monthlyAvgRate} decimalScale={2}/>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"} suffix={"%"} value={payer.adjusted_patients_eligible_cocm * 100} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={payer.annualized_count_eligible_cocm(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={payer.annualized_reimbursment_cocm(aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager), monthlyAvgRate)} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                </tr>

                                            )

                                        })}

                                        <tr className="border-t-2  border-neutral">
                                            <td
                                                colSpan={4}
                                                scope="colgroup"
                                                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                                            >
                                                TOTAL Annualized Count of Cases Eligible for Monthly Case Rate
                                            </td>
                                            <td className={"text-gray-500"}>
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.total_annualized_reimbursement_monthly(aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager), monthlyAvgRate)} thousandSeparator={","} decimalScale={2} />
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