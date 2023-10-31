import {ModelInputProps} from "./inputs_interface";
import {InputGroupMiniHeader} from "./input_group";
import {PercentInput} from "../formatted_numbers";
import LayoutInputDetail from "./layouts/layout_input_detail";

const CaseloadComplexity:React.FC<ModelInputProps> = ({layout, model, setModel}) => {

    if(layout == "detail") {
        return (
            <>
                <LayoutInputDetail title={"Caseload Complexity"}>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"suicidality-risk"} />
                        <PercentInput
                            value={model.caseLoadCapacity.pct_patients_with_suicidality_risk!}
                            setValue={(value) => {
                                model.caseLoadCapacity.pct_patients_with_suicidality_risk = value
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"prior-ed-visit"} />
                        <PercentInput
                            value={model.caseLoadCapacity.pct_of_patients_with_prior_mental_health_ED_visit!}
                            setValue={(value) => {
                                model.caseLoadCapacity.pct_of_patients_with_prior_mental_health_ED_visit = value
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"substance-abuse"} />
                        <PercentInput
                            value={model.caseLoadCapacity.pct_of_patients_with_substance_abuse!}
                            setValue={(value) => {
                                model.caseLoadCapacity.pct_of_patients_with_substance_abuse = value
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"above-moderate-level"} />
                        <PercentInput
                            value={model.caseLoadCapacity.pct_of_patients_with_moderate!}
                            setValue={(value) => {
                                model.caseLoadCapacity.pct_of_patients_with_moderate = value
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
                            <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"suicidality-risk"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.caseLoadCapacity.pct_patients_with_suicidality_risk!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.pct_patients_with_suicidality_risk = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"prior-ed-visit"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.caseLoadCapacity.pct_of_patients_with_prior_mental_health_ED_visit!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.pct_of_patients_with_prior_mental_health_ED_visit = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"substance-abuse"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.caseLoadCapacity.pct_of_patients_with_substance_abuse!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.pct_of_patients_with_substance_abuse = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"caseload-complexity"} input_id={"above-moderate-level"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={model.caseLoadCapacity.pct_of_patients_with_moderate!}
                                    setValue={(value) => {
                                        model.caseLoadCapacity.pct_of_patients_with_moderate = value
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
export default CaseloadComplexity