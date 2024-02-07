import {PatientProgressChart, Dropdown} from "@akello/react";
import {PatientTreatmentHistoryDataGrid} from "@akello/react";
import {PatientRegistry, Questionnaire} from "@akello/core";
import moment from "moment";
import { useAkello } from "@akello/react-hook";

const PatientDetail = () => {
    const selectedPatient: PatientRegistry = {
        id: "",
        patient_mrn: "",
        first_name: "",
        last_name: "",
        phone_number: "", 
        email: "", 
        date_of_birth: "", 
        treatment_logs: []
    };
    const questionnaires: Questionnaire[] = [];
    const akello = useAkello();

    const getWeeksSince = (date: number) => {
        var today = moment(date);
        var ia = moment();
        var diff = moment.duration(ia.diff(today));
        return diff.weeks();
    };

    return (
        <>
            <div className={"space-y-4"}>
                <div className={"w-full border border-1"}>
                    <div className={"flex flex-row justify-between font-semibold border-b border-1 p-2"}>
                        <p className={"text-xl"}>
                            Patient Information
                        </p>                        
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
                                                    akello.registryService.setFlag(akello.getSelectedRegistry(), selectedPatient.patient_mrn, option, () => {
                                                        // setSelectedPatient({...selectedPatient, flag: option})
                                                    })
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
                                                    akello.registryService.setStatus(akello.getSelectedRegistry(), selectedPatient.patient_mrn, option, () => {
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

export default PatientDetail