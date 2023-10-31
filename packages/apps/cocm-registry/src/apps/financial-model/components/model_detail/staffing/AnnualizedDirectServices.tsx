import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import classNames from "classnames";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


export const AnnualizedDirectServices = (aims: Clinic) => {
    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)
    let psychiatrist = aims.staffCollection.getStaffMember(StaffType.Psychiatrist)

    let services = [
            {
                name: 'BH Provider/Care Manager',
                direct_treatment_assessment: careManager?.services.direct_activities[0].direct_treatment_assessment(aims.staffCollection.working_weeks_per_year, careManager!.fte),
                direct_treatment_ongoing: careManager?.services.direct_activities[0].direct_treatment_ongoing(aims.staffCollection.working_weeks_per_year, careManager!.fte),
                group_treatment: careManager?.services.direct_activities[0].group_treatment(aims.staffCollection.working_weeks_per_year, careManager!.fte),
                total_direct_annualized_services: careManager?.services.direct_activities[0].total_direct_annualized_services(aims.staffCollection.working_weeks_per_year, careManager!.fte)
            },
            {
                name: 'Psychiatric Consultant',
                direct_treatment_assessment: psychiatrist?.services.direct_activities[0].direct_treatment_assessment(aims.staffCollection.working_weeks_per_year, careManager!.fte),
                direct_treatment_ongoing: psychiatrist?.services.direct_activities[0].direct_treatment_ongoing(aims.staffCollection.working_weeks_per_year, careManager!.fte),
                group_treatment: psychiatrist?.services.direct_activities[0].group_treatment(aims.staffCollection.working_weeks_per_year, careManager!.fte),
                total_direct_annualized_services: psychiatrist?.services.direct_activities[0].total_direct_annualized_services(aims.staffCollection.working_weeks_per_year, careManager!.fte)
            },

        ]


    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    ANNUALIZED REIMBURSABLE DIRECT CARE SERVICES
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div>
                        {aims.staffCollection.working_weeks_per_year} Working weeks
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            {/*Annualized Reimbursable Direct Care Service Units * billable  as Psychotherapy CPT codes*/}

                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Direct Treatment: Assessment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Direct Treatment: Ongoing
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Group Treatment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Total Service Units
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                    <Fragment key="Services">
                                        {
                                            services.map((service, idx) => {
                                                return (
                                                    <tr
                                                        key={service!.name}
                                                        className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                    >
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                            {service!.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={service!.direct_treatment_assessment}/>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={service!.direct_treatment_ongoing}/>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={service!.group_treatment}/>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={service!.total_direct_annualized_services}/>
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
