import {ModelInputProps} from "./inputs_interface";
import {DollarInput, PercentInput} from "../formatted_numbers";
import {InputGroupMiniHeader} from "./input_group";
import LayoutInputDetail from "./layouts/layout_input_detail";
import {StaffType} from "../../../aims_model/staff";

const StaffingCosts:React.FC<ModelInputProps> = ({layout, model, setModel}) => {
    let careManager = model.staffCollection.getStaffMember(StaffType.CareManager)
    let psychiatrist = model.staffCollection.getStaffMember(StaffType.Psychiatrist)

    if(layout=="detail") {

        return (
            <>
                <LayoutInputDetail title={"Staffing Costs"}>
                    <div>
                        <p className={"font-medium"}>Care Manager</p>
                        <div>
                            <div>
                                <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"bhm-salary"} />
                                <DollarInput
                                    value={ careManager!.annual_salary }
                                    setValue={(value) => {
                                        careManager!.annual_salary = value
                                        model.staffCollection.setStaffMember(careManager!)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                            <div>
                                <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"bhm-benefits"} />
                                <PercentInput
                                    value={ careManager!.fringe_benefits_percent_of_salary }
                                    setValue={ (value) => {
                                        careManager!.fringe_benefits_percent_of_salary = value
                                        model.staffCollection.setStaffMember(careManager!)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div >
                        <p className={"font-medium"}>Consulting Psychiatrist</p>
                        <div>
                            <div>
                                <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"cp-salary"} />
                                <DollarInput
                                    value={ psychiatrist!.annual_salary }
                                    setValue={(value) => {
                                        psychiatrist!.annual_salary = value
                                        model.staffCollection.setStaffMember(psychiatrist!)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                            <div>
                                <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"cp-benefits"} />
                                <PercentInput
                                    value={ psychiatrist!.fringe_benefits_percent_of_salary }
                                    setValue={ (value) => {
                                        psychiatrist!.fringe_benefits_percent_of_salary = value
                                        model.staffCollection.setStaffMember(psychiatrist!)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </LayoutInputDetail>

            </>
        )
    }
    return (
        <>
            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ">

                <div className="px-4 py-6 sm:p-8">
                    <p className={"font-medium"}>Care Manager</p>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"bhm-salary"} />
                            <div className="mt-2">
                                <DollarInput
                                    value={ careManager!.annual_salary }
                                    setValue={(value) => {
                                        careManager!.annual_salary = value
                                        model.staffCollection.setStaffMember(careManager!)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"bhm-benefits"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={ careManager!.fringe_benefits_percent_of_salary }
                                    setValue={ (value) => {
                                        careManager!.fringe_benefits_percent_of_salary = value
                                        model.staffCollection.setStaffMember(careManager!)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ">
                <div className="px-4 py-6 sm:p-8">
                    <p className={"font-medium"}>Consulting Psychiatrist</p>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"cp-salary"} />
                            <div className="mt-2">
                                <DollarInput
                                    value={ psychiatrist!.annual_salary }
                                    setValue={(value) => {
                                        psychiatrist!.annual_salary = value
                                        model.staffCollection.setStaffMember(psychiatrist!)
                                        setModel(model.copy())
                                    }}
                                />

                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"staffing-costs"} input_id={"cp-benefits"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={ psychiatrist!.fringe_benefits_percent_of_salary }
                                    setValue={ (value) => {
                                        psychiatrist!.fringe_benefits_percent_of_salary = value
                                        model.staffCollection.setStaffMember(psychiatrist!)
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

export default StaffingCosts
