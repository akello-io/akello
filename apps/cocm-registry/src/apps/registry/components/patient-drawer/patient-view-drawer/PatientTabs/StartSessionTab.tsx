import * as React from "react";
import StopWatch from "./components/stopwatch/StopWatch";
import {useEffect, useState} from "react";
import classNames from "classnames";
import Dropdown from "../../../Dropdown";
import {saveTreatmentSession} from "../../../../../../api/registry";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store";
import {
    PatientRegistry,
    Questionnaire,
    QuestionnaireQuestion,
    QuestionnaireResponse
} from "@akello/core";


interface SelectorProps {
    selectedId?: number
    question: QuestionnaireQuestion
    onSelection: (response: QuestionnaireResponse) => void
}
const Selector:React.FC<SelectorProps> = ({selectedId, onSelection, question}) => {
    const [selectedResponseId, setSelectedResponseId] = useState('')
    return (
        <>
            <div className={"rounded w-full border border-1"}>
                {
                    question.responses.map((response) => {
                        return (
                            <div className={ classNames ("flex flex-row justify-between cursor-pointer py-1 px-2 text-xs font-semibold", {"bg-indigo-200": response.id==selectedResponseId})}
                                 onClick={() => {
                                     onSelection(response)
                                     setSelectedResponseId(response.id)
                                 }}>
                                <div>{response.response}</div><div className={classNames("p-1")}>{response.score}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

interface StartSessionTabProps {
    setSelectedTab: (tab: string) => void
    selectedPatient: PatientRegistry
    questionnaires: Questionnaire[]
    setSelectedPatient: (patient: PatientRegistry) => void
}
const StartSessionTab:React.FC<StartSessionTabProps> = ({setSelectedTab, selectedPatient, questionnaires, setSelectedPatient}) => {

    const [visitType, setVisitType] = useState('')
    const [contactType, setContactTye] = useState('')
    const [flag, setFlag] = useState<string>()

    const [mm, setMM] = useState(0)
    const [ss, setSS] = useState(0)
    const [ms, setMS] = useState(0)

    const token = useSelector ((state: RootState) => state.app.token)
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)
    const [noShow, setNoShow] = useState(false)

    type ScoreDictionary = {
        [question: string]: any;
    };
    const [questionnaire_responses, setQuestionnaireResponses] = useState<{ [questionnaire: string] : ScoreDictionary }>({})

    return (
        <>
            <div className={"space-y-4"}>
                <div className={"w-full border border-1"}>
                    <div className={"flex flex-row justify-between font-semibold border-b border-1 p-2"}>
                        <p className={"text-xl"}>
                            <StopWatch timeCallback={(mm, ss, ms) => {
                                setMM(mm)
                                setSS(ss)
                                setMS(ms)
                            }}/>
                        </p>
                        <div className={"flex flex-row space-x-4"}>
                            <button className={"btn btn-secondary"} onClick={() => setSelectedTab("Main")}>
                                cancel
                            </button>
                            <button className={"btn btn-primary"} onClick={() => {
                                
                                let scores = []                                   
                                for (let questionnaire_uid in questionnaire_responses) {
                                    let responses = questionnaire_responses[questionnaire_uid]["responses"];                                                               
                                    let score = 0
                                    for(let response_id in responses) {
                                        score += questionnaire_responses[questionnaire_uid]["responses"][response_id]
                                    }                                    
                                    scores.push({
                                        score_questionnaire: questionnaire_uid,
                                        score_name: questionnaire_responses[questionnaire_uid]['name'],
                                        score_value: score
                                    })
                                    
                                }

                                saveTreatmentSession(selectedRegistry.id, token, {
                                    patient_mrn: selectedPatient.patient_mrn,
                                    contact_type: contactType,
                                    flag: flag,
                                    weeks_in_treatment: 0,
                                    visit_type: visitType,
                                    scores: scores,
                                    minutes: mm,
                                    no_show: noShow,
                                    date: Date.now() // UTC time
                                }, (data) => {
                                    let treatment_logs = [...selectedPatient.treatment_logs!, data]
                                    selectedPatient.treatment_logs = treatment_logs
                                    setSelectedPatient({...selectedPatient})
                                    setSelectedTab("Main")
                                })

                            }}>
                                save session
                            </button>
                        </div>
                    </div>
                    <div className={"flex bg-white p-2"}>
                        <div className={"grid grid-cols-2 w-full gap-y-2"}>
                            <div className={"font-semibold "}>Flag</div>
                            <div className={"text-right"}>
                                <Dropdown
                                    placeholder={'Flag Patient'}
                                    options={[
                                        { id: '1', value: 'Needs Discussion'},
                                        { id: '2', value: 'Review with Psychiatrist'},
                                        { id: '3', value: 'Safety Risk'}
                                    ]} setSelectedOption={(option) => {
                                    setFlag(option)
                                }}/>
                            </div>
                            <div className={"font-semibold "}>Visit Type</div>
                            <div className={"text-right"}>
                                <Dropdown
                                    placeholder={'Select Visit Type'}
                                    options={[
                                    { id: '1', value: 'Clinic'},
                                    { id: '2', value: 'Phone'},
                                    { id: '3', value: 'In-person w/ Patient'}
                                ]} setSelectedOption={(option) => {
                                    setVisitType(option)
                                }}/>
                            </div>
                            <div className={"font-semibold"}>Contact Type</div>
                            <div className={"text-right"}>
                                <Dropdown
                                    placeholder={'Select Contact Type'}
                                    options={[
                                        { id: '1', value: 'Initial Assessment'},
                                        { id: '2', value: 'Follow Up'},
                                        { id: '3', value: 'Psychiatric Consultation'},
                                        { id: '4', value: 'Relapse Prevention Plan'},
                                    ]} setSelectedOption={(option) => {
                                    setContactTye(option)
                                }}/>
                            </div>
                            <div className={"font-semibold"}>No Show</div>
                            <div className={"text-right"}>
                                <input
                                    type="checkbox"
                                    checked={noShow}
                                    className="checkbox"
                                    onChange={()=> {
                                        setNoShow(!noShow)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    questionnaires.map((questionnaire) => {
                        return (
                            <>
                                <div className={"w-full border border-1"}>
                                    <div className={"font-semibold border-b border-1 p-2"}>
                                        <p className={"text-xl"}>
                                            {questionnaire.name}
                                        </p>
                                    </div>
                                    <div className={"bg-white p-2"}>
                                        <div className={"grid grid-cols-3 gap-y-2"}>
                                            {
                                                questionnaire.questions.map((questionnaire_question) => {
                                                    return (
                                                        <>
                                                            <div className={"col-span-2 text-sm font-semibold"}> {questionnaire_question.question}</div>
                                                            <div>
                                                                <Selector question={questionnaire_question}  onSelection={(selectedResponse: QuestionnaireResponse) => {
                                                                    if(questionnaire_responses[questionnaire.uid] == undefined) {
                                                                        questionnaire_responses[questionnaire.uid] = {
                                                                            "responses": {},
                                                                            "name": questionnaire.name
                                                                        }
                                                                    }
                                                                    questionnaire_responses[questionnaire.uid]["responses"][questionnaire_question.id] = selectedResponse.score
                                                                    setQuestionnaireResponses({...questionnaire_responses})
                                                                    console.log(questionnaire_responses)
                                                                }}/>

                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }


            </div>
        </>
    )
}

export default StartSessionTab