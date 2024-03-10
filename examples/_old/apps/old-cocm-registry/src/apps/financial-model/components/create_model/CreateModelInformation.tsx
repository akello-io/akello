import {ReactNode} from "react";
import {Clinic} from "../../aims_model/clinic";
import {group_input_content} from "../../input_content";
import ModelInfo from "../inputs/input_groups/model_info";
import FacilityLocation from "../inputs/input_groups/facility_location";
import CurrentCoCMParticipation from "../inputs/input_groups/current_cocm_participation";
import CaseloadComplexity from "../inputs/input_groups/caseload_complexity";
import PayerMixInputGroup from "../inputs/input_groups/payer_mix";
import StaffingCosts from "../inputs/input_groups/staffing_costs";



interface CreateModelProps {
    model: Clinic
    setModel: (model: Clinic) => void
}


const CreateModelInformation:React.FC<CreateModelProps> = ({model, setModel}) => {
    return (
        <>
            <ModelInformationSection model={model} setModel={setModel} />
            <FacilityLocationSection model={model} setModel={setModel} />
            <FacilityCoCMParticipationSection model={model} setModel={setModel} />

            <CreateModelPayerMixSection model={model} setModel={setModel} />

            {/*
            <CaseloadComplexitySection model={model} setModel={setModel} />

            <StaffingCostsSection model={model} setModel={setModel} />
            */}
        </>
    )
}

export default CreateModelInformation



const ModelInformationSection:React.FC<CreateModelProps> = ({model, setModel}) => {

    return (
        <CreateModelSectionLayout
            header={group_input_content["model-description"]["short-description"]}
            subheader={group_input_content["model-description"]["description"]}>
            <ModelInfo model={model} setModel={setModel} />
        </CreateModelSectionLayout>
    )
}

const FacilityLocationSection:React.FC<CreateModelProps> = ({model, setModel}) => {
    return (
        <CreateModelSectionLayout
            header={group_input_content["facility-location"]["short-description"]}
            subheader={group_input_content["facility-location"]["description"]}>
            <FacilityLocation model={model} setModel={setModel} />
        </CreateModelSectionLayout>
    )
}


const FacilityCoCMParticipationSection:React.FC<CreateModelProps> = ({model, setModel}) => {

    return (
        <>
            <CreateModelSectionLayout
                header={group_input_content["cocm-participation"]["short-description"]}
                subheader={group_input_content["cocm-participation"]["description"]}>
                <CurrentCoCMParticipation model={model} setModel={setModel} />
            </CreateModelSectionLayout>
        </>
    )
}



const CaseloadComplexitySection:React.FC<CreateModelProps> = ({model, setModel}) => {
    return (
        <>
            <CreateModelSectionLayout
                header={group_input_content["caseload-complexity"]["short-description"]}
                subheader={group_input_content["caseload-complexity"]["description"]}>
                <CaseloadComplexity model={model} setModel={setModel} />
            </CreateModelSectionLayout>
        </>
    )
}



const CreateModelPayerMixSection:React.FC<CreateModelProps> = ({model, setModel}) => {
    return (
        <>
            <CreateModelSectionLayout
                header={group_input_content["payer-mix"]["short-description"]}
                subheader={group_input_content["payer-mix"]["description"]}>
                <PayerMixInputGroup model={model} setModel={setModel} />
            </CreateModelSectionLayout>
        </>
    )
}



const StaffingCostsSection:React.FC<CreateModelProps> = ({model, setModel}) => {
    return (
        <>
            <CreateModelSectionLayout
                header={group_input_content["staffing-costs"]["short-description"]}
                subheader={group_input_content["staffing-costs"]["description"]}>
                <StaffingCosts model={model} setModel={setModel} />
            </CreateModelSectionLayout>
        </>
    )
}



interface CreateModelSectionLayoutProps {
    header: string
    subheader: string
    children: ReactNode | ReactNode[]
}

const CreateModelSectionLayout:React.FC<CreateModelSectionLayoutProps> = ({header, subheader, children}) => {

    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 pt-10">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-base-content">{header}</h2>
                    <p className="mt-1 text-sm leading-6 text-base-content/70">
                        {subheader}
                    </p>
                </div>
                <div className={"md:col-span-2 space-y-12"}>
                    {children}
                </div>


            </div>
        </>
    )
}
