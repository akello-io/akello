
import React, {Fragment} from "react";
import classNames from "classnames";
import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


interface PsychiatristServicesProps {
    clinic: Clinic
    setClinic: (clinic: Clinic) => void
}

export const PsychiatristServices:React.FC<PsychiatristServicesProps> = ({clinic, setClinic}) => {
    let psychiatrist = clinic.staffCollection.getStaffMember(StaffType.Psychiatrist)!

    let registry_review = psychiatrist.services.other_activities[0].getActivity("Registry Review")
    let direct_pcp = psychiatrist.services.other_activities[0].getActivity("Direct PCP Communication")
    let caseload_review = psychiatrist.services.other_activities[0].getActivity("Caseload and Patient Review with BH Care Manager")
    let charting = psychiatrist.services.other_activities[0].getActivity("Charting")
    let other = psychiatrist.services.other_activities[0].getActivity("Other (Research, Staff Meetings, Training, etc.)")
    let other_activities = [registry_review, direct_pcp, caseload_review, charting, other]

    let direct_assessment_visit = psychiatrist.services.direct_activities[0].getActivity("Direct Treatment: Assessment Visit")
    let direct_follow_up = psychiatrist.services.direct_activities[0].getActivity("Direct Treatment: Follow-up Visits")
    let direct_activities = [direct_assessment_visit, direct_follow_up]

    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    PSYCHIATRIC CONSULTANT
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Psychiatric Consultant Service Category
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Hours per Week
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Service Units Generated
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Hours per Service Unit
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                    <Fragment key="Services">

                                        <tr className="border-t border-gray-200">
                                            <th
                                                colSpan={5}
                                                scope="colgroup"
                                                className="bg-base-300 text-base-content py-2 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-3"
                                            >
                                                Indirect Care and Administrative Tasks
                                            </th>
                                        </tr>
                                        {
                                            other_activities.map((service, idx) => {
                                                return (
                                                    <tr
                                                        key={service!.name}
                                                        className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                    >
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                            {service!.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm  text-gray-500">
                                                            <NumericFormat
                                                                className={"border border-info rounded-md py-2 pl-2"}
                                                                type={"text"} displayType={"input"} decimalScale={2} value={service!.hrs}
                                                                onChange={(e) => {
                                                                    service!.hrs = parseFloat(e.target.value)
                                                                    psychiatrist.services.other_activities[0].setActivity(service!)
                                                                    clinic.staffCollection.setStaffMember(psychiatrist)
                                                                    setClinic(clinic.copy())

                                                                }}
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className="border-t border-gray-200">
                                            <th
                                                colSpan={5}
                                                scope="colgroup"
                                                className="bg-base-300 text-base-content py-2 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-3"
                                            >
                                                Direct Care Services Reimbursable via Psych CPT codes
                                            </th>
                                        </tr>
                                        {
                                            direct_activities.map((direct_service, idx) => {
                                                console.log(direct_activities)
                                                console.log(direct_service)
                                                return (
                                                    <tr
                                                        key={direct_service!.name}
                                                        className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                    >
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                            {direct_service!.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm  text-gray-500">
                                                            <NumericFormat
                                                                className={"border border-info rounded-md py-2 pl-2"}
                                                                type={"text"} displayType={"input"} decimalScale={2} value={direct_service!.hrs}
                                                                onChange={(e) => {
                                                                    direct_service!.hrs = parseFloat(e.target.value)
                                                                    psychiatrist.services.direct_activities[0].setActivity(direct_service!)
                                                                    clinic.staffCollection.setStaffMember(psychiatrist)
                                                                    setClinic(clinic.copy())

                                                                }}
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={direct_service!.service_units_generated(psychiatrist!.fte)}/>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={direct_service!.hrs_per_service_unit}/>
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
