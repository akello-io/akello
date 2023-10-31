import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import classNames from "classnames";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";





export const ReimbursementIndividualServices = (aims: Clinic) => {
    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)
    let psychiatrist = aims.staffCollection.getStaffMember(StaffType.Psychiatrist)


    let bhm_direct_treatment_assessment =  careManager?.services.direct_activities[0].direct_treatment_assessment(aims.staffCollection.working_weeks_per_year, careManager!.fte)
    let bhm_direct_treatment_ongoing = careManager?.services.direct_activities[0].direct_treatment_ongoing(aims.staffCollection.working_weeks_per_year, careManager!.fte)
    let bhm_group_treatment = careManager?.services.direct_activities[0].group_treatment(aims.staffCollection.working_weeks_per_year, careManager!.fte)

    let cp_direct_treatment_assessment = psychiatrist?.services.direct_activities[0].direct_treatment_assessment(aims.staffCollection.working_weeks_per_year, psychiatrist!.fte)
    let cp_direct_treatment_ongoing = psychiatrist?.services.direct_activities[0].direct_treatment_ongoing(aims.staffCollection.working_weeks_per_year, psychiatrist!.fte)


    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="m-4 font-bold bg-base-300 w-min whitespace-nowrap ">
                    ANNUALIZED BILLABLE INDIVIDUAL SERVICES
                </div>
                <div className="px-4 py-5 sm:p-6">

                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">

                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Payer
                                        </th>
                                        {/*
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            % of Patients per Payer Eligible for Monthly Service Billing
                                        </th>
                                        */}
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Direct Treatment: Assessment Avg. Payment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Direct Treatment: Ongoing Avg. Payment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Group Treatment Avg. Payment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Direct Treatment: Assessment Avg. Payment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Direct Treatment: Ongoing Avg. Payment
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
                                                    {/*
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        NOT IMPLEMENTED
                                                    </td>
                                                    */}
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={payer.payment_care_manager_direct_assessment} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={payer.payment_care_manager_direct_ongoing} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={payer.payment_care_manager_ongoing} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={payer.payment_psychiatrist_direct_assessment} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={payer.payment_psychiatrist_direct_ongoing} thousandSeparator={","} decimalScale={2} />
                                                    </td>
                                                </tr>

                                            )

                                        })}
                                        <tr className={"col-span-7 border-t-2 border-neutral"} />

                                        <tr className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Weighted Average per Service Unit
                                            </td>
                                            <td />
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={aims.payerCollection.weightedAvgServiceUnit("payment_care_manager_direct_assessment")}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.weightedAvgServiceUnit("payment_care_manager_direct_ongoing")}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={aims.payerCollection.weightedAvgServiceUnit("payment_care_manager_ongoing")}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.weightedAvgServiceUnit("payment_psychiatrist_direct_assessment")}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.weightedAvgServiceUnit("payment_psychiatrist_direct_ongoing")}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>


                                        <tr className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Annualized Service Units
                                            </td>
                                            <td />
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={bhm_direct_treatment_assessment!}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={bhm_direct_treatment_ongoing!}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={bhm_group_treatment!}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={cp_direct_treatment_assessment!}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={cp_direct_treatment_ongoing!}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>

                                        <tr className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Billable Individual Service Units
                                            </td>
                                            <td />
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={aims.payerCollection.billableIndividualServiceUnit(bhm_direct_treatment_assessment!)}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={aims.payerCollection.billableIndividualServiceUnit(bhm_direct_treatment_ongoing!)}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={aims.payerCollection.billableIndividualServiceUnit(bhm_group_treatment!)}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} value={aims.payerCollection.billableIndividualServiceUnit(cp_direct_treatment_assessment!)!}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"}  value={aims.payerCollection.billableIndividualServiceUnit(cp_direct_treatment_ongoing!)}thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>

                                        <tr className={"col-span-7 border-t-2 border-neutral"} />


                                        <tr className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Subtotal: Annualized Billable Individual Services Reimbursement
                                            </td>
                                            <td />
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.subtotal("payment_care_manager_direct_assessment", bhm_direct_treatment_assessment!)} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.subtotal("payment_care_manager_direct_ongoing", bhm_direct_treatment_ongoing!)} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.subtotal("payment_care_manager_ongoing", bhm_group_treatment!)} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.subtotal("payment_psychiatrist_direct_assessment", cp_direct_treatment_assessment!)} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={aims.payerCollection.subtotal("payment_psychiatrist_direct_ongoing", cp_direct_treatment_ongoing!)} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>


                                        <tr className={'border-gray-200'}>
                                            <td  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Across All Individual Service Categories:
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.payerCollection.total_annualized_billable_individual_reimbursement(aims.staffCollection)} thousandSeparator={","} decimalScale={2} />
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
