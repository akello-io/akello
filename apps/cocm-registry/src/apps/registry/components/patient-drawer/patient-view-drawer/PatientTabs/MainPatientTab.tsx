import * as React from "react";
import {useNavigate} from "react-router";
import {PatientProgressChart} from "@akello/react";
import {PatientTreatmentHistoryDataGrid} from "@akello/react";
import {PatientRegistry, Questionnaire} from "@akello/core";
import moment from "moment";
import Dropdown from "../../../Dropdown";
import {setFlag, setStatus} from "../../../../../../api/registry";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store";

interface MainTabProps {
    setSelectedTab: (tab: string) => void
    selectedPatient: PatientRegistry
    questionnaires: Questionnaire[]
    setSelectedPatient: (patient: PatientRegistry) => void
}
const MainPatientTab:React.FC<MainTabProps> = ({setSelectedTab, selectedPatient, questionnaires, setSelectedPatient}) => {

    const token = useSelector ((state: RootState) => state.app.token)
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)

    console.log(selectedPatient?.flag)
    const getWeeksSince = (date: number) => {
        var today = moment(date);
        var ia = moment();
        var diff = moment.duration(ia.diff(today));
        return diff.weeks()
    }
    
    return (
        <>
            <div className={"space-y-4"}>
                <div className={"w-full border border-1"}>
                    <div className={"flex flex-row justify-between font-semibold border-b border-1 p-2"}>
                        <p className={"text-xl"}>
                            Patient Information
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setSelectedTab('Session')}
                        >
                            Start a session
                        </button>
                    </div>
                    <div className={"p-2"}>
                        <div className={"grid grid-cols-2"}>                               
                            <div className={"font-semibold "}>Name</div>
                            <div>{selectedPatient.first_name} {selectedPatient.last_name}</div>

                            <div className={"font-semibold"}>Phone Number</div>
                            <div>{selectedPatient.phone_number}</div>

                            <div className={"font-semibold"}>Treatment Week</div>
                            <div>
                                {
                                    selectedPatient.initial_assessment != undefined && (
                                        <div>{getWeeksSince(selectedPatient.initial_assessment!)}</div>
                                    )
                                }
                            </div>

                            <div className={"font-semibold"}>Flag</div>
                            <div>
                                <Dropdown
                                    placeholder={ 'Flag Patient'  }
                                    options={[
                                        { id: '1', value: 'Needs Discussion'},
                                        { id: '2', value: 'Review with Psychiatrist'},
                                        { id: '3', value: 'Safety Risk'}
                                    ]} setSelectedOption={(option) => {
                                        setFlag(selectedRegistry.id, token, selectedPatient.patient_mrn, option, (data) => {
                                            // setSelectedPatient({...selectedPatient, flag: option})
                                        })
                                    // setFlag(option)
                                }}/>
                            </div>
                            <div className={"font-semibold"}>Status</div>
                            <div>
                                <Dropdown
                                    placeholder={ selectedPatient.status!  }
                                    options={[
                                        { id: '1', value: 'Enrolled'},
                                        { id: '2', value: 'Treatment'},
                                        { id: '3', value: 'Relapse Prevention Plan'},
                                        { id: '4', value: 'Deactivated'},
                                    ]} setSelectedOption={(option) => {
                                        setStatus(selectedRegistry.id, token, selectedPatient.patient_mrn, option, (data) => {
                                            // setSelectedPatient({...selectedPatient, flag: option})
                                        })

                                    // setFlag(option)
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    selectedPatient.treatment_logs!.length > 0 && (
                        <>
                            <div className={"w-full border border-1"}>
                                <div className={"font-semibold border-b border-1 p-2"}>
                                    <p className={"text-xl"}>
                                        Patient Progress Chart
                                    </p>
                                </div>
                                <div className={"p-2 h-64 w-full"}>
                                    <PatientProgressChart selectedPatient={selectedPatient} questionnaires={questionnaires} />
                                </div>
                            </div>

                            <div className={"w-full border border-1"}>
                                <div className={"font-semibold border-b border-1 p-2"}>
                                    <p className={"text-xl"}>
                                        Treatment History
                                    </p>
                                </div>
                                <div className={"p-2"}>
                                    <PatientTreatmentHistoryDataGrid selectedPatient={selectedPatient} questionnaires={questionnaires} />
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default MainPatientTab