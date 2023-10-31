import CurrentCoCMParticipation from "../current_cocm_participation";
import CaseloadComplexity from "../caseload_complexity";
import PayerMixInputGroup from "../payer_mix";
import StaffingCosts from "../staffing_costs";
import React, {useState} from "react";
import classNames from "classnames";
import {Clinic} from "../../../../aims_model/clinic";


interface OverviewInputGroupProps {
    aims: Clinic
    setAIMS: (clinic: Clinic) => void
}

const OverviewInputGroup:React.FC<OverviewInputGroupProps> = ({aims, setAIMS}) => {

    const [selectedInputIdx, setSelectedInputIdx] = useState(0)

    const inputSections = [
        'Caseload Size',
        'Caseload Complexity',
        'Payer Mix',
        'Staffing Costs'
    ]

    const inputs = [
        (<CurrentCoCMParticipation layout={"detail"}  model={aims} setModel={setAIMS} />),
        (<CaseloadComplexity layout={"detail"}  model={aims} setModel={setAIMS} />),
        (<PayerMixInputGroup layout={"detail"} model={aims} setModel={setAIMS} />),
        (<StaffingCosts layout={"detail"}  model={aims} setModel={setAIMS} />),
    ]


    return (
        <>
            <div className={"flex flex-col rounded-sm space-y-4 pl-2"}>
                <div className={"py-2 px-4 space-y-0 border border-base-300"}>
                    <div className={"font-semibold pb-1"}>Input Groups</div>
                    {
                        inputSections.map((input, idx) => {
                            return (<div
                                className={classNames("p-2 text-xs cursor-pointer",{"bg-indigo-500 text-white font-semibold rounded-lg": idx == selectedInputIdx})}
                                onClick={() =>setSelectedInputIdx(idx)}>{input}</div>)
                        })
                    }
                </div>
                <div>
                    {
                        inputs[selectedInputIdx]
                    }
                </div>

            </div>
        </>
    )
}


export default OverviewInputGroup