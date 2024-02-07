import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import classNames from "classnames";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


export const CaseloadMonthly = (aims: Clinic) => {
    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)
    let psychiatrist = aims.staffCollection.getStaffMember(StaffType.Psychiatrist)

    let caseload = [
            {
                name: 'Average  (or Mean) Weeks  Between First and Last Patient Contacts',
                value: aims.caseLoadCapacity.avg_weeks_first_and_last
            },
            {
                name: 'Average (or Mean) Count of Patient Care Services Provided',
                value: aims.caseLoadCapacity.avg_count_patient_services
            },
            {
                name: 'Single Point in Time Caseload Capacity',
                value: aims.caseLoadCapacity.case_load_capacity(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
            },
            {
                name: 'Projected Annual Caseload Capacity',
                value: aims.caseLoadCapacity.annual_caseload_capacity(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
            },
            {
                name: 'Projected Average Monthly Caseload Turnover',
                value: aims.caseLoadCapacity.monthly_turnover(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
            },
            {
                name: 'Projected Number of Patients Served per Calendar Month',
                value: aims.caseLoadCapacity.patients_served_per_month(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
            },
            {
                name: 'Projected Annualized Monthly Case Rate Potential',
                value: aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
            }
    ]

    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    CASELOAD AND MONTHLY CASE VOLUME CAPACITY
                </div>
                <div className="px-4 py-5 sm:p-6">

                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">

                                    <tbody className="bg-white">

                                    <Fragment key="Services">
                                        {
                                            caseload.map((service, idx) => {
                                                return (
                                                    <tr
                                                        key={service!.name}
                                                        className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                    >
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                            {service!.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={service!.value} thousandSeparator={","}/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

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
