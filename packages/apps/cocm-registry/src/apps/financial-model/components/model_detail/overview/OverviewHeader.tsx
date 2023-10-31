import React, {Fragment} from "react";
import {useNavigate} from "react-router";
import {BriefcaseIcon, ChevronDownIcon, CurrencyDollarIcon, MapPinIcon} from "@heroicons/react/20/solid";
import {NumericFormat} from "react-number-format";
import {Menu, Transition} from "@headlessui/react";
import classNames from "classnames";
import {Clinic} from "../../../aims_model/clinic";
import {StaffType} from "../../../aims_model/staff";

interface HeaderProps {
    aims: Clinic
    authToken: string
}

const OverviewHeader:React.FC<HeaderProps> = ({aims, authToken}) => {

    let careManager = aims.staffCollection.getStaffMember(StaffType.CareManager)!
    let psychiatrist = aims.staffCollection.getStaffMember(StaffType.Psychiatrist)!

    let navigate = useNavigate()

    let cocm_eligible_pct = aims.payerCollection.pct_total_cocm_eligible
    let caseload_monthly = aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager)
    let monthlyAvgRate = aims.billingRatesCollection.average_monthly_rate(cocm_eligible_pct * caseload_monthly)

    let cocm_reimbursement = aims.payerCollection.total_annualized_reimbursement_monthly(aims.caseLoadCapacity.projected_annual_monthly_case_potential(aims.staffCollection.total_reimbursable_service_units(careManager!.fte).care_manager), monthlyAvgRate)
    let individual_reimbursement = aims.payerCollection.total_annualized_billable_individual_reimbursement(aims.staffCollection)
    let total_reimbursement = cocm_reimbursement + individual_reimbursement
    let net = total_reimbursement - aims.staffCollection.total_cost

    return (
        <div className="lg:flex lg:items-center lg:justify-between bg-neutral px-6 sm:px-12 py-5 py-2">
            <div className="min-w-0 flex-1">
                {/*
                <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <a href="/" className="flex items-center">
                                <ChevronLeftIcon className="h-5 w-5 flex-shrink-0 text-neutral-content" aria-hidden="true" />
                                <div  className="ml-4 text-sm font-medium text-neutral-content hover:text-white">
                                    Back
                                </div>
                            </a>
                        </li>
                    </ol>
                </nav>
                */}
                <h2 className="mt-2 text-sm font-bold leading-7 text-white sm:truncate sm:text-sm sm:tracking-tight">
                    {aims.name}
                </h2>
                <div className="mt-1 flex sm:mt-0 flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-neutral-content">
                        <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-content" aria-hidden="true" />
                        <NumericFormat
                            displayType={"text"}
                            decimalScale={0}
                            value={aims.caseLoadCapacity.override_monthly_capacity}
                            suffix={" patients"}
                            thousandSeparator={","}
                        />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-neutral-content">
                        <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-content" aria-hidden="true" />
                        {careManager.fte} BHM's
                    </div>
                    <div className="mt-2 flex items-center text-sm text-neutral-content">
                        <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-content" aria-hidden="true" />
                        {psychiatrist.total_hours_per_week(aims.staffCollection.hours_per_fte)} hrs per week
                    </div>
                    <div className="mt-2 flex items-center text-sm text-neutral-content">
                        <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-content" aria-hidden="true" />
                        <NumericFormat
                            displayType={"text"}
                            decimalScale={0}
                            value={net}
                            prefix={"$"}
                            thousandSeparator={","}
                        />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-neutral-content">
                        <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-content" aria-hidden="true" />
                        {aims.address_state}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
             <span className="sm:ml-3 space-x-2">
              <button
                  type="button"
                  className="inline-flex btn-xs items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
             </span>

            </div>
        </div>
    )



}

export default OverviewHeader