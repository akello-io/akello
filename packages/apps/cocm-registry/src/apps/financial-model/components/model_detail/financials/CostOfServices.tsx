import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


export const CostOfServices = (aims: Clinic) => {
    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)
    let psychiatrist = aims.staffCollection.getStaffMember(StaffType.Psychiatrist)

    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    COST OF SERVICES
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Personnel
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Annual Salary per 1.0 FTE
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            FTE
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            FTE Salary Cost Per FTE
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Fringe Benefits % of Salary
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Fringe Benefits Cost
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Personnel Subtotal
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="bg-white">

                                    <Fragment key="Services">
                                        <tr  className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Care Manager
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"}  prefix={"$"} value={careManager?.annual_salary} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div>{careManager?.fte}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={careManager?.salary_per_fte} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} suffix={"%"} value={careManager?.fringe_benefits_percent_of_salary!  * 100} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={careManager?.fringe_benefits_cost} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={careManager?.total_cost} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>

                                        <tr  className={'border-gray-200'}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                <div>Psychiatric Consultant</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={psychiatrist?.annual_salary} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div>{psychiatrist?.fte}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={psychiatrist?.salary_per_fte} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} suffix={"%"} value={psychiatrist?.fringe_benefits_percent_of_salary! * 100} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={psychiatrist?.fringe_benefits_cost} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={psychiatrist?.total_cost} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>


                                        <tr className={"col-span-7 border-t-2 border-neutral"} />

                                        <tr  className={'border-gray-200'}>
                                            <td colSpan={6} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                <div>Subtotal: Personnel Cost</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.staffCollection.subtotal_personal_cost} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>

                                        <tr  className={'border-gray-200'}>
                                            <td colSpan={5} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                <div>Organizational Overhead</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.staffCollection.operational_overhead} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.staffCollection.subtotal_personal_cost * aims.staffCollection.operational_overhead} thousandSeparator={","} decimalScale={2} />
                                            </td>
                                        </tr>

                                        <tr className={"col-span-7 border-t-2 border-neutral"} />

                                        <tr  className={'border-gray-200'}>
                                            <td colSpan={6} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                <div>Total Cost: Personnel + Overhead</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <NumericFormat type={"text"} displayType={"text"} prefix={"$"} value={aims.staffCollection.total_cost} thousandSeparator={","} decimalScale={2} />
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