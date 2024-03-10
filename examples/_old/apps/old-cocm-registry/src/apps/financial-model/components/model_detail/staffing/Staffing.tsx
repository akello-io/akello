import React, {Fragment} from "react";
import classNames from "classnames";
import {Staff} from "../../../aims_model/staff";
import {Clinic} from "../../../aims_model/clinic";


interface StaffingDeliveryTabProps {
    careManager: Staff
    psychiatrist: Staff
    aims: Clinic
}


export const Staffing:React.FC<StaffingDeliveryTabProps> = ({careManager, psychiatrist, aims}) => {
    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    STAFFING
                </div>
                <div className="px-4 py-5 sm:p-6">

                    <div className={"grid grid-cols-2"}>
                        <div className={"text-base-content"}>
                            Hours per week per 1.0 FTE at your organization
                        </div>
                        <div className={"text-base-content"}>
                            {aims.staffCollection.hours_per_fte}
                        </div>
                    </div>


                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Team Member
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            FTE
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Total Hours per Week
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Suggested Hrs per week (40:3 ratio)
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                    <Fragment key="Services">

                                        <tr
                                            className={classNames(0 === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                BH Provider(s) or BH Care Manager(s)
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {careManager?.fte}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {careManager?.total_hours_per_week(aims.staffCollection.hours_per_fte)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            </td>
                                        </tr>

                                        <tr
                                            className={classNames(0 === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                Psychiatric Provider/Consultant
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {psychiatrist?.fte}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {psychiatrist?.total_hours_per_week(aims.staffCollection.hours_per_fte)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                NOT IMPLEMENTED
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



