import {ModelInputProps} from "./inputs_interface";
import {InputGroupMiniHeader} from "./input_group";
import {IntegerInput} from "../formatted_numbers";
import {StaffType} from "../../../aims_model/staff";

const BHMServiceUnits:React.FC<ModelInputProps> = ({layout, model, setModel}) => {

    let careManager = model.staffCollection.getStaffMember(StaffType.CareManager)!

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


    return (
        <>
            <div className="grid grid-cols-1">
                <p className={"mb-4"}>Direct Care Services Reimbursable via CoCM or Counseling CPT codes</p>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"direct-warm-connection-over-16"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={warm_connection?.hrs!}
                            setValue={(value) => {
                                warm_connection!.hrs = value
                                careManager.services.direct_activities[0].setActivity(warm_connection!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"direct-initial-assessment-visit"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={initial_assessment?.hrs!}
                            setValue={(value) => {
                                initial_assessment!.hrs = value
                                careManager.services.direct_activities[0].setActivity(initial_assessment!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"direct-follow-up-visit"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={follow_up_visit?.hrs!}
                            setValue={(value) => {
                                follow_up_visit!.hrs = value
                                careManager.services.direct_activities[0].setActivity(follow_up_visit!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"direct-group-treatment"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={group_treatment_visit?.hrs!}
                            setValue={(value) => {
                                group_treatment_visit!.hrs = value
                                careManager.services.direct_activities[0].setActivity(group_treatment_visit!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>

                <p>OTHER</p>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"other-warm-connection"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={warm_connection_under?.hrs!}
                            setValue={(value) => {
                                warm_connection_under!.hrs = value
                                careManager.services.other_activities[0].setActivity(warm_connection_under!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"other-outreach-attempts"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={outreach_attempts?.hrs!}
                            setValue={(value) => {
                                outreach_attempts!.hrs = value
                                careManager.services.other_activities[0].setActivity(outreach_attempts!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"other-telephone-visit"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={telephone?.hrs!}
                            setValue={(value) => {
                                telephone!.hrs = value
                                careManager.services.other_activities[0].setActivity(telephone!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />

                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"other-caseload-and-patient-review-psych"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={caseload_review?.hrs!}
                            setValue={(value) => {
                                caseload_review!.hrs = value
                                careManager.services.other_activities[0].setActivity(caseload_review!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"other-team-communication"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={communication?.hrs!}
                            setValue={(value) => {
                                communication!.hrs = value
                                careManager.services.other_activities[0].setActivity(communication!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"other-registry-management"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={registry_management?.hrs!}
                            setValue={(value) => {
                                registry_management!.hrs = value
                                careManager.services.other_activities[0].setActivity(registry_management!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </div>
                <p>ADMIN</p>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"admin-charting"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={charting?.hrs!}
                            setValue={(value) => {
                                charting!.hrs = value
                                careManager.services.other_activities[0].setActivity(charting!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <InputGroupMiniHeader input_group_id={"bhm-service-units"} input_id={"admin-other"} />
                    <div className="mt-2">
                        <IntegerInput
                            value={admin_other?.hrs!}
                            setValue={(value) => {
                                admin_other!.hrs = value
                                careManager.services.other_activities[0].setActivity(admin_other!)
                                model.staffCollection.setStaffMember(careManager)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </div>

            </div>
        </>
    )

}
export default BHMServiceUnits