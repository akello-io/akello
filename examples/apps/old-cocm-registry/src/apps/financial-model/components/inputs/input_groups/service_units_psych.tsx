import {ModelInputProps} from "./inputs_interface";
import {InputGroupMiniHeader} from "./input_group";
import {IntegerInput} from "../formatted_numbers";
import {StaffType} from "../../../aims_model/staff";

const PsychServiceUnits:React.FC<ModelInputProps> = ({layout, model, setModel}) => {

    let psychiatrist = model.staffCollection.getStaffMember(StaffType.Psychiatrist)!

    let registry_review = psychiatrist.services.other_activities[0].getActivity("Registry Review")
    let direct_pcp = psychiatrist.services.other_activities[0].getActivity("Direct PCP Communication")
    let caseload_review = psychiatrist.services.other_activities[0].getActivity("Caseload and Patient Review with BH Care Manager")
    let charting = psychiatrist.services.other_activities[0].getActivity("Charting")
    let other = psychiatrist.services.other_activities[0].getActivity("Other (Reseach, Staff Meetings, Training, etc.)")

    let direct_assessment_visit = psychiatrist.services.direct_activities[0].getActivity("Direct Treatment: Assessment Visit")
    let direct_follow_up = psychiatrist.services.direct_activities[0].getActivity("Direct Treatment: Follow-up Visits")



    return (
        <>
            <div className="grid grid-cols-1">
                <p className={"mb-4"}>Indirect Care and Administrative Tasks</p>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"indirect-registry-review"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={registry_review?.hrs!}
                            setValue={(value) => {
                                registry_review!.hrs = value
                                psychiatrist.services.other_activities[0].setActivity(registry_review!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"indirect-pcp-communication"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={direct_pcp?.hrs!}
                            setValue={(value) => {
                                direct_pcp!.hrs = value
                                psychiatrist.services.other_activities[0].setActivity(direct_pcp!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"indirect-bhm-review"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={caseload_review?.hrs!}
                            setValue={(value) => {
                                caseload_review!.hrs = value
                                psychiatrist.services.other_activities[0].setActivity(caseload_review!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"indirect-charting"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={charting?.hrs!}
                            setValue={(value) => {
                                charting!.hrs = value
                                psychiatrist.services.other_activities[0].setActivity(charting!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"indirect-other"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={other?.hrs!}
                            setValue={(value) => {
                                other!.hrs = value
                                psychiatrist.services.other_activities[0].setActivity(other!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

                <p>Direct Care Services Reimbursable via Psych CPT codes</p>

                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"direct-treatment-assessment"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={direct_assessment_visit?.hrs!}
                            setValue={(value) => {
                                direct_assessment_visit!.hrs = value
                                psychiatrist.services.direct_activities[0].setActivity(direct_assessment_visit!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"psych-service-units"} input_id={"direct-treatment-follow-up"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={direct_follow_up?.hrs!}
                            setValue={(value) => {
                                direct_follow_up!.hrs = value
                                psychiatrist.services.direct_activities[0].setActivity(direct_follow_up!)
                                model.staffCollection.setStaffMember(psychiatrist)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

            </div>
        </>
    )

}
export default PsychServiceUnits