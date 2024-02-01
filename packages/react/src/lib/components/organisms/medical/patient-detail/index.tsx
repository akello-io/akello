import * as React from "react";

import {PatientResource} from "@akello/core"

import {Patient, ContactPoint, HumanName, Period, Element} from "fhir/r4";

interface PatientDetailProps {
    patient: Patient
}

export const PatientDetail:React.FC<PatientDetailProps> = ({patient}) => {

    let testPatient: Patient = {
        resourceType: "Patient",
        active: true,
        name: [{
            use: "official",
            family: "Selvaraj",
            given: ["Vijay"]
        }],
        telecom: [
            {
                use: "home",
                system: "phone",
                value: "xxx-xxx-xxx",
                rank: 1
            }
        ],
        gender: "male",
        birthDate: "1982-04-14",
        address: [
            {
                use: "home",
                type : "both",
                text : "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
                line : ["534 Erewhon St"],
                city : "PleasantVille",
                district : "Rainbow",
                state : "Vic",
                postalCode : "3999",
                period : {
                    start : "1974-12-25"
                }
            }
        ]
    }

    let pr = new PatientResource(testPatient)

    return (
        <>
            <div className={"space-y-4"}>
                <div className={"bg-white p-2"}>
                    <div className={"grid grid-cols-2"}>
                        <div className={"font-semibold "}>Name</div>
                        <div>{pr.getName().given} {pr.getName().family}</div>

                        <div className={"font-semibold"}>Phone Number</div>
                        <div>{pr.getPhoneNumber().value}</div>

                        <div className={"font-semibold"}>Treatment Week</div>
                        <div>
                            xxx
                        </div>

                        <div className={"font-semibold"}>Flag</div>
                        <div>

                        </div>
                        <div className={"font-semibold"}>Status</div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
