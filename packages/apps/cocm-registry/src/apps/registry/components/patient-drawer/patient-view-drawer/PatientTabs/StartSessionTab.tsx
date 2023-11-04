import * as React from "react";
import StopWatch from "./components/stopwatch/StopWatch";
import {useState} from "react";
import classNames from "classnames";
import Dropdown from "../../../Dropdown";
import {saveTreatmentSession} from "../../../../../../api/registry";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store";
import {PatientRegistry} from "../../../../../../data/schemas/RegistryModel";


interface SelectorProps {
    selectedId?: number
    previousValue?: number
    setValue: (selectedId: number) => void
}
const Selector:React.FC<SelectorProps> = ({selectedId, previousValue,  setValue}) => {
    let options = [
        {id: 0, name: 'Not at all', scoreTxt:'0', score: 0},
        {id: 1, name: 'Several days', scoreTxt:'+1', score: 1},
        {id: 2, name: 'More than half the days', scoreTxt:'+2', score: 2},
        {id: 3, name: 'Nearly every day', scoreTxt:'+3', score: 3},
    ]
    return (
        <>
            <div className={"rounded w-full border border-1"}>
                {
                    options.map((option) => {
                        return (
                            <div className={ classNames ("flex flex-row justify-between cursor-pointer py-1 px-2 text-xs font-semibold",
                                {"bg-indigo-200": selectedId==option.id}
                            )}
                                 onClick={() => setValue(option.id)}
                            >
                                <div>{option.name}</div><div className={classNames("p-1", {"border border-2 border-orange-300": previousValue==option.score})}>{option.scoreTxt}</div>
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
    setSelectedPatient: (patient: PatientRegistry) => void
}
const StartSessionTab:React.FC<StartSessionTabProps> = ({setSelectedTab, selectedPatient, setSelectedPatient}) => {

    const [visitType, setVisitType] = useState('')
    const [contactType, setContactTye] = useState('')
    const [flag, setFlag] = useState<string>()

    const [mm, setMM] = useState(0)
    const [ss, setSS] = useState(0)
    const [ms, setMS] = useState(0)

    const token = useSelector ((state: RootState) => state.app.token)
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)

    const [noShow, setNoShow] = useState(false)

    type ScreeningQuestionType = {
        id: number
        question: string
        selected: number
        previous: number
    }

    const [phq9, setPHQ9] = useState<ScreeningQuestionType[]>([
        {
            'id': 1,
            'question': 'Little interest or pleasure in doing things?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 2,
            'question': 'Feeling down, depressed, or hopeless?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 3,
            'question': 'Trouble falling or staying asleep, or sleeping too much?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 4,
            'question': 'Feeling tired or having little energy?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 5,
            'question': 'Poor appetite or overeating?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 6,
            'question': 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 7,
            'question': 'Trouble concentrating on things, such as reading the newspaper or watching television?',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 8,
            'question': 'Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 9,
            'question': 'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?',
            'selected': 0,
            'previous': 2
        },
    ])

    const [gad7, setGad7] = useState<ScreeningQuestionType[]>([
        {
            'id': 1,
            'question': 'Feeling nervous, anxious, or on edge',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 2,
            'question': 'Not being able to stop or control worrying',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 3,
            'question': 'Worrying too much about different things',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 4,
            'question': 'Trouble relaxing',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 5,
            'question': 'Being so restless that it\'s hard to sit still',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 6,
            'question': 'Becoming easily annoyed or irritable',
            'selected': 0,
            'previous': 2
        },
        {
            'id': 7,
            'question': 'Feeling afraid as if something awful might happen',
            'selected': 0,
            'previous': 2
        },
    ])


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

                                let phq9_score = phq9.reduce((accumulator, obj) => accumulator + obj.selected, 0);
                                let gad7_score = gad7.reduce((accumulator, obj) => accumulator + obj.selected, 0);


                                saveTreatmentSession(selectedRegistry.id, token, {
                                    patient_mrn: selectedPatient.patient_mrn,
                                    contact_type: contactType,
                                    flag: flag,
                                    weeks_in_treatment: 0,
                                    visit_type: visitType,
                                    phq9_score: phq9_score,
                                    gad7_score: gad7_score,
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
                <div className={"w-full border border-1"}>
                    <div className={"font-semibold border-b border-1 p-2"}>
                        <p className={"text-xl"}>
                            PHQ-9 Screening
                        </p>
                    </div>
                    <div className={"bg-white p-2"}>
                        <div className={"grid grid-cols-3 gap-y-2"}>
                            {
                                phq9.map((phq9_question) => {
                                    return (
                                        <>
                                            <div className={"col-span-2 text-sm font-semibold"}>{phq9_question.id}. {phq9_question.question}</div>
                                            <div>
                                                <Selector selectedId={phq9_question.selected} previousValue={phq9_question.previous} setValue={(value) => {
                                                    let newArr = [...phq9];
                                                    let idx = phq9.findIndex((question) => question.id == phq9_question.id)
                                                    newArr[idx] = {id: phq9_question.id, question: phq9_question.question, selected: value, previous: phq9_question.previous}
                                                    setPHQ9(newArr);
                                                }} />
                                            </div>
                                        </>

                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                <div className={"w-full border border-1"}>
                    <div className={"font-semibold border-b border-1 p-2"}>
                        <p className={"text-xl"}>
                            GAD-7 Screening
                        </p>
                    </div>
                    <div className={"bg-white p-2"}>
                        <div className={"grid grid-cols-3 gap-y-2"}>
                            {
                                gad7.map((gad7_question) => {
                                    return (
                                        <>
                                            <div className={"col-span-2 text-sm font-semibold"}>{gad7_question.id}. {gad7_question.question}</div>
                                            <div>
                                                <Selector selectedId={gad7_question.selected} previousValue={gad7_question.previous} setValue={(value) => {
                                                    let newArr = [...gad7];
                                                    let idx = gad7.findIndex((question) => question.id == gad7_question.id)
                                                    newArr[idx] = {id: gad7_question.id, question: gad7_question.question, selected: value, previous: gad7_question.previous}
                                                    setGad7(newArr);
                                                }} />
                                            </div>
                                        </>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartSessionTab