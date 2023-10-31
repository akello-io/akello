import React, {Fragment, useEffect, useState} from 'react'
import {useLocation, useParams} from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import classNames from "classnames";

import {useNavigate} from "react-router";
import {Clinic} from "./aims_model/clinic";
import ModelDetailSection from "./components/model_detail/ModelDetailContainers";
import OverviewInputGroup from "./components/inputs/input_groups/overview_input_group/OverviewInputGroup";
import StackedLineChart from "./components/model_detail/forecast/StackedLineChart";
import { CareManagerServices } from "./components/model_detail/staffing/CareManagerServices";
import { PsychiatristServices } from "./components/model_detail/staffing/PsychiatristServices";
import MonthlyBillingRate from "./components/model_detail/monthly_billing/MonthlyBillingRate";
import { ModelInputSideBar } from "./components/model_detail/ModelDetailInputs";
import { AnnualizedDirectServices } from "./components/model_detail/staffing/AnnualizedDirectServices";
import { CaseloadMonthly } from "./components/model_detail/staffing/CaseloadMonthly";
import {PayerMix} from "./components/model_detail/financials/PayerMix";
import { ReimbursementAnnualized } from "./components/model_detail/financials/ReimbursementAnnualized";
import { ReimbursementIndividualServices } from "./components/model_detail/financials/ReimbursementIndividualServices";
import {NetImpact} from "./components/model_detail/financials/NetImpact";
import { TotalReimbursement} from "./components/model_detail/financials/TotalReimbursement";
import { CostOfServices } from "./components/model_detail/financials/CostOfServices";
import {clinic} from "./aims_model/init/init_models";
import Breadcrumb from "../components/Breadcrumb";
// import {FinancialModelDBRecord} from "../../data/models/financial_model";
import {
    createFinancialModel,
    getFinancialModel,
    getFinancialModels,
    saveFinancialModel
} from "../../api/financial_model";
import {Auth} from "aws-amplify";
import FinancialModelDBRecordTypeV1 from "../../data/schemas/FinancialModel";
import AppContainer from "../../stories/app/Container/AppContainer";
import {useSelector} from "react-redux";
import {RootState} from "../../store";


const BetaBanner = () => {
    return (
        <div className="flex items-center gap-x-6 bg-yellow-300 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 my-1">
            <p className="text-sm leading-6 text-base-content">
                <a href="src/apps/financial-model/FinancialModelDetail#">
                    <strong className="font-semibold">You are using the BETA version</strong>
                    <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    Updates are coming in daily. Please use this version only to help with estimations.
                </a>
            </p>
            <div className="flex flex-1 justify-end">

            </div>
        </div>
    )
}


export const FinancialModelDetail = () =>  {

    // const authToken = useSelector((state: RootState) => state.app.authToken)
    let { model_name } = useParams();
    const {state} = useLocation()
    const navigate = useNavigate()

    let model_input: any ;

    if(state && state.model) {
        model_input = state.model as FinancialModelDBRecordTypeV1
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [aims, setAIMS] = useState(clinic.copy())

    const token = useSelector((state: RootState) => state.app.token)


    useEffect(() => {
        getFinancialModel('Financial Model', token, (model_input) => {
            aims.setInputs(model_input)
            setAIMS(aims)
        })
    }, [token])


    useEffect(() => {
        // run once
        if(model_input) {
            aims.setInputs(model_input)
        }

        setAIMS(aims.copy())
    }, [])


    useEffect(()=> {
    }, [aims])

    const [selectedTab, setSelectedTab] = useState(0)


    const tabs = [
        {
            'name': 'Overview'
        },
        {
            'name': 'Service Units'
        },
        {
            'name': 'Caseload'
        },
        {
            'name': 'Reimbursements'
        },
        {
            'name': 'Net Revenue'
        },
        {
            'name': 'Monthly Billing Rate'
        }

    ]

    return (

        <AppContainer title={"Financial Model"}>
            <div>

                <div className={"flex flex-col"}>
                    <div className="tabs tabs-boxed space-x-3 bg-white ">
                        {
                            tabs.map((tab, tabIdx) => {
                                return (
                                    <a className={classNames("tab tab-lifted", {"tab-active": selectedTab == tabIdx})} onClick={() => setSelectedTab(tabIdx)}>
                                        {tab.name}
                                    </a>)
                            })
                        }
                    </div>
                    <div className={"bg-base-300 space-y-4"}>
                        {
                            tabs[selectedTab].name == 'Overview' && (
                                <div className={""}>
                                    {/*
                                    <OverviewHeader aims={aims} authToken={authToken} />
                                    */}
                                    <div className={""}>
                                        <ModelDetailSection title={aims.name}>
                                            <div className={"flex-row flex justify-between pr-4 pb-3"}>

                                                <div className={"px-4"}>
                                                    <p>{aims.description}</p>
                                                </div>
                                                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                                                 <span className="sm:ml-3 space-x-2">
                                                  <button
                                                      type="button"
                                                      className="inline-flex btn-xs items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                                      onClick={() => {
                                                          saveFinancialModel(token, aims, (data) => {

                                                          })
                                                      }}
                                                  >
                                                    Save
                                                  </button>
                                                 </span>
                                                </div>

                                            </div>
                                        </ModelDetailSection>
                                        <ModelDetailSection title={"24-Month Forecast"}>
                                            <div className={"flex flex-col-reverse lg:flex-row"}>
                                                <div className={"w-full lg:w-4/12 "}>
                                                    <OverviewInputGroup aims={aims} setAIMS={setAIMS} />
                                                </div>
                                                <div className="divider divider-horizontal"></div>
                                                <div className={"w-full lg:w-8/12"}>
                                                    <StackedLineChart aims={aims} setAIMS={setAIMS} showDetails={true} />
                                                </div>
                                            </div>
                                        </ModelDetailSection>

                                    </div>
                                </div>
                            )
                        }


                        {
                            tabs[selectedTab].name == 'Service Units' && (
                                <div className={"bg-base-300/70 space-y-1"}>
                                    <ModelDetailSection title={"Weekly Time / Effort Allocation & Service Unit Generation"}>

                                    </ModelDetailSection>
                                    <CareManagerServices clinic={aims} setClinic={setAIMS}/>
                                    <PsychiatristServices clinic={aims} setClinic={setAIMS} />
                                    {AnnualizedDirectServices(aims)}
                                </div>
                            )
                        }

                        {
                            tabs[selectedTab].name == 'Caseload' && (
                                <div className={"bg-base-300/70 space-y-4"}>
                                    {CaseloadMonthly(aims)}
                                </div>
                            )
                        }

                        {
                            tabs[selectedTab].name == 'Reimbursements' && (
                                <div className={"bg-base-300/70 space-y-1"}>
                                    <ModelDetailSection title={"Reimbursements"}>

                                    </ModelDetailSection>
                                    {PayerMix(aims)}
                                    {ReimbursementAnnualized(aims)}
                                    {ReimbursementIndividualServices(aims)}
                                </div>
                            )
                        }

                        {
                            tabs[selectedTab].name == 'Net Revenue' && (
                                <div className={"bg-base-300/70 space-y-1"}>
                                    <ModelDetailSection title={"Net Revenue"}>

                                    </ModelDetailSection>
                                    {NetImpact(aims)}
                                    {TotalReimbursement(aims)}
                                    {CostOfServices(aims)}
                                </div>
                            )
                        }

                        {
                            tabs[selectedTab].name == 'Monthly Billing Rate' && (
                                <div className={"bg-base-300/70 space-y-1"}>
                                    <ModelDetailSection title={"Monthly Billing Rate"}>

                                    </ModelDetailSection>
                                    <MonthlyBillingRate clinic={aims} setClinic={setAIMS} />
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </AppContainer>

    )
}
