import React, {ReactNode, useState} from "react";
import {Clinic} from "../../aims_model/clinic";

/*
import {Clinic} from "../../../../../core/aims_model/clinic";
import CurrentCoCMParticipation from "../../inputs/input_groups/current_cocm_participation";
import CaseloadComplexity from "../../inputs/input_groups/caseload_complexity";
import PayerMixInputGroup from "../../inputs/input_groups/payer_mix";
import StaffingCosts from "../../inputs/input_groups/staffing_costs";
import ModelInfo from "../../inputs/input_groups/model_info";
import FacilityLocation from "../../inputs/input_groups/facility_location";
import BHMServiceUnits from "../../inputs/input_groups/service_units_bhm";
import PsychServiceUnits from "../../inputs/input_groups/service_units_psych";

 */


interface ModelInputSideBarProps {
    model: Clinic
    setModel: (model: Clinic) => void
}

interface InputSectionProps {
    checked: boolean
    setChecked: (checked: boolean) => void
    title: string
    element: ReactNode
}

const InputSection:React.FC<InputSectionProps> = ({checked, setChecked, title, element}) => {
    return (
        <>
            <div>
                <div className="font-bold text-lg py-1 bg-base-200 text-base-content px-4">
                    {title}
                </div>
                <div className="bg-base-100 text-base-content p-4">
                    {element}
                </div>
            </div>
        </>
    )

}

export const ModelInputSideBar:React.FC<ModelInputSideBarProps> = ({model, setModel}) => {
    const [modelInfo, setModelInfo] = useState(true)
    const [facilityLocation, setFacilityLocation] = useState(true)
    const [cocmParticipation, setCoCMParticipation] = useState(true)
    const [caseloadComplexity, setCaseloadComplexity] = useState(true)
    const [payerMix, setPayerMix] = useState(true)
    const [staffingCosts, setStaffingCosts] = useState(true)
    const [bhmServiceUnits, setBHMServiceUnits] = useState(true)
    const [cpServiceUnits, setCPServiceUnits] = useState(true)

    return (
        <div className={"space-y-1"}>
            {/*
            <InputSection checked={modelInfo} setChecked={setModelInfo} title={"Model Info"} element={(<ModelInfo layout={"detail"} model={model} setModel={setModel} />)} />
            <InputSection checked={facilityLocation} setChecked={setFacilityLocation} title={"Facility Location"} element={(<FacilityLocation layout={"detail"} model={model} setModel={setModel} />)} />
            <InputSection checked={cocmParticipation} setChecked={setCoCMParticipation} title={"Current CoCM Participation"} element={(<CurrentCoCMParticipation layout={"detail"} model={model} setModel={setModel} />)} />
            <InputSection checked={caseloadComplexity} setChecked={setCaseloadComplexity} title={"Caseload Complexity"} element={(<CaseloadComplexity layout={"detail"} model={model} setModel={setModel} />)} />
            <InputSection checked={payerMix} setChecked={setPayerMix} title={"Payer Mix"} element={(<PayerMixInputGroup layout={"detail"} model={model} setModel={setModel} />)} />

            <InputSection checked={staffingCosts} setChecked={setStaffingCosts} title={"Staffing Costs"} element={(<StaffingCosts layout={"detail"} model={model} setModel={setModel} />)} />
            <InputSection checked={bhmServiceUnits} setChecked={setBHMServiceUnits} title={"BHM Service Units"} element={(<BHMServiceUnits layout={"detail"} model={model} setModel={setModel} />)} />
            <InputSection checked={cpServiceUnits} setChecked={setCPServiceUnits} title={"Psychiatrist Service Units"} element={(<PsychServiceUnits layout={"detail"} model={model} setModel={setModel} />)} />
            */}

        </div>
    )
}
