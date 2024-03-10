import {ModelInputProps} from "./inputs_interface";
import {IntegerInput, PercentInput} from "../formatted_numbers";
import {InputGroupMiniHeader} from "./input_group";
import LayoutInputDetail from "./layouts/layout_input_detail";




const CurrentCoCMParticipation:React.FC<ModelInputProps> = ({layout, model, setModel}) => {

    if(layout == "detail" ) {
        return (
            <>
                <LayoutInputDetail title={"Caseload Size"}>
                    <div>
                        <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"full-time-pcp"} />
                        <IntegerInput
                            value={model.staffCollection.full_time_pcps!}
                            setValue={(value) => {
                                model.setFullTimePCP(value)
                                setModel(model.copy())
                            }}
                        />
                    </div>

                    <div>
                        <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"pct-pcp-cocm"} />
                        <PercentInput
                            value={model.staffCollection.full_time_pcps_cocm_percent!}
                            setValue={(value) => {
                                model.setPCPParticipation(value)
                                setModel(model.copy())
                            }}
                        />
                    </div>

                    <div>
                        <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"referrals-per-pcp"}/>
                        <IntegerInput
                            value={model.caseLoadCapacity.pcpReferrals!}
                            setValue={(value) => {
                                model.setPCPReferrals(value)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className={"col-span-1"}>
                        <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"pct_patients_accepting"}/>
                        <PercentInput
                            value={model.caseLoadCapacity.patientCVR!}
                            setValue={(value) => {
                                model.setPatientCVR(value)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div>
                        <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"pct_patients_graduating"} />
                        <PercentInput
                            value={model.caseLoadCapacity.graduationRate!}
                            setValue={(value) => {
                                model.setPatientGraduation(value)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </LayoutInputDetail>
            </>
        )
    }

    return (
        <>
            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"full-time-pcp"} />
                            <div className="mt-2">
                                <IntegerInput
                                    value={model.staffCollection.full_time_pcps!}
                                    setValue={(value) => {
                                        model.staffCollection.full_time_pcps = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-span-3">
                            <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"pct-pcp-cocm"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.staffCollection.full_time_pcps_cocm_percent!}
                                    setValue={(value) => {
                                        model.staffCollection.full_time_pcps_cocm_percent = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-span-3">
                            <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"referrals-per-pcp"} />
                            <div className="mt-2">
                                <IntegerInput
                                    value={model.caseLoadCapacity.pcpReferrals!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.pcpReferrals = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"pct_patients_accepting"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.caseLoadCapacity.patientCVR!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.patientCVR = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <InputGroupMiniHeader input_group_id={"cocm-participation"} input_id={"pct_patients_graduating"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.caseLoadCapacity.graduationRate!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.graduationRate = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )

}

export default CurrentCoCMParticipation
