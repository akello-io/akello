import React, {Fragment, useEffect} from "react";
import classNames from "classnames";
import {NumericFormat} from "react-number-format";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";


interface CareManagerServicesProps {
    clinic: Clinic
    setClinic: (clinic: Clinic) => void
}

export const CareManagerServices:React.FC<CareManagerServicesProps> = ({clinic, setClinic}) => {

    let careManager = clinic.staffCollection.getStaffMember(StaffType.CareManager)!
    let warm_connection = careManager.services.direct_activities[0].getActivity("Warm Connection Visit 16 + min")
    let initial_assessment = careManager.services.direct_activities[0].getActivity("Initial Assessment Visit")
    let follow_up_visit = careManager.services.direct_activities[0].getActivity("Follow Up Visit")
    let group_treatment_visit = careManager.services.direct_activities[0].getActivity("Group Treatment Visit")

    let warm_connection_under = careManager.services.other_activities[0].getActivity("Warm Connection visit under 16 minutes")
    let outreach_attempts = careManager.services.other_activities[0].getActivity("Outreach attempts (phone, letter, etc)")
    let telephone = careManager.services.other_activities[0].getActivity("Telephone Visit")
    let caseload_review = careManager.services.other_activities[0].getActivity("Caseload and Patient Review with Psych Consultant")
    let communication = careManager.services.other_activities[0].getActivity("Team Communication")
    let registry_management = careManager.services.other_activities[0].getActivity("Registry Management")

    let charting = careManager.services.other_activities[1].getActivity("Charting")
    let admin_other = careManager.services.other_activities[1].getActivity("Other (Clinical Supervision, Staff Meetings, Training, etc.)")

    let direct_services = [
        warm_connection,
        initial_assessment,
        follow_up_visit,
        group_treatment_visit
    ]

    let other_services = [
        warm_connection_under,
        outreach_attempts,
        telephone,
        caseload_review,
        communication,
        registry_management
    ]

    let admin_services = [
        charting,
        admin_other
    ]


    /*let direct_services = [
        {
            'name': 'Warm Connection Visit 16 + min',
            'hrs': warm_connection?.hrs,
            'service_units_generated': warm_connection?.service_units_generated(careManager!.fte),
            'hrs_per_service_unit': warm_connection?.hrs_per_service_unit
        },
        {
            'name': 'Initial Assessment Visit',
            'hrs': initial_assessment?.hrs,
            'service_units_generated': initial_assessment?.service_units_generated(careManager!.fte),
            'hrs_per_service_unit': initial_assessment?.hrs_per_service_unit
        },
        {
            'name': 'Follow Up Visit',
            'hrs': follow_up_visit?.hrs,
            'service_units_generated': follow_up_visit?.service_units_generated(careManager!.fte),
            'hrs_per_service_unit': follow_up_visit?.hrs_per_service_unit
        },
        {
            'name': 'Group Treatment Visit',
            'hrs': group_treatment_visit?.hrs,
            'service_units_generated': group_treatment_visit?.service_units_generated(careManager!.fte),
            'hrs_per_service_unit': group_treatment_visit?.hrs_per_service_unit
        },
    ]


    let other_services = [
        {
            name: 'Warm Connection visit under 16 minutes',
            hrs: warm_connection_under?.hrs,
        },
        {
            name: 'Outreach attempts (phone, letter, etc)',
            hrs: outreach_attempts?.hrs
        },
        {
            name: 'Telephone Visit',
            hrs: telephone?.hrs
        },
        {
            name: 'Caseload and Patient Review with Psych Consultant',
            hrs: caseload_review?.hrs
        },
        {
            name: 'Team Communication',
            hrs: communication?.hrs
        },
        {
            name: 'Registry Management',
            hrs: registry_management?.hrs
        },
    ]


    let admin_services = [
        {
            name: 'Charting',
            hrs: charting?.hrs
        },
        {
            name: 'Other (Clinical Supervision, Staff Meetings, Training, etc.)',
            hrs: admin_other?.hrs
        }
   ]

     */


    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    BH PROVIDER or BH CARE MANAGER
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            BH Provider / BHCM Service Category
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
                                                    Direct Care Services Reimbursable via CoCM or Counseling CPT codes
                                                </th>
                                            </tr>

                                            {
                                                direct_services.map((direct_service, idx) => {
                                                    return (
                                                        <tr
                                                            key={direct_service!.name}
                                                            className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                        >
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                                {direct_service!.name}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <NumericFormat
                                                                    className={"border border-info rounded-md py-2 pl-2"}
                                                                    type={"text"} displayType={"input"} decimalScale={2} value={direct_service!.hrs}
                                                                    onChange={(e) => {
                                                                        direct_service!.hrs = parseFloat(e.target.value)
                                                                        careManager.services.direct_activities[0].setActivity(direct_service!)
                                                                        clinic.staffCollection.setStaffMember(careManager)
                                                                        setClinic(clinic.copy())

                                                                    }}
                                                                />
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={direct_service!.service_units_generated(careManager!.fte)}/>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <NumericFormat type={"text"} displayType={"text"} decimalScale={2} value={direct_service!.hrs_per_service_unit}/>
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
                                                    Other BH Care Manager Services (reimbursable under CoCM codes)
                                                </th>
                                            </tr>

                                            {
                                                other_services.map((service, idx) => {
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
                                                                    type={"text"}
                                                                    decimalScale={2}
                                                                    value={service!.hrs}
                                                                    onChange={(e) => {
                                                                        service!.hrs = parseFloat(e.target.value)
                                                                        careManager.services.other_activities[0].setActivity(service!)
                                                                        clinic.staffCollection.setStaffMember(careManager)
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
                                                    className="bg-base-300 text-base-content py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3"
                                                >
                                                    Administrative Tasks
                                                </th>
                                            </tr>
                                            {
                                                admin_services.map((service, idx) => {
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
                                                                    type={"text"} decimalScale={2}  value={service!.hrs}
                                                                    onChange={(e) => {
                                                                        service!.hrs = parseFloat(e.target.value)
                                                                        careManager.services.other_activities[0].setActivity(service!)
                                                                        clinic.staffCollection.setStaffMember(careManager)
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
