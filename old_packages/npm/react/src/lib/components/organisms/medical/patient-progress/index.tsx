import React from "react";
import { LineChart } from "../../../atoms/insights/line-chart";
import { useAkello } from "@akello/react-hook";
import { useEffect, useState } from "react";

export interface PatientProgressProps {
    registry_id: string
}


export const PatientProgress:React.FC<PatientProgressProps> = ({registry_id}) => {

    const akello = useAkello()

    const [_measurements, setMeasurements] = useState([])

    useEffect(() => {
        akello.registryService.getRegistry(registry_id, (data: any) => {
            setMeasurements(data.measurements)
        })
    },[])


    return (
        <div>
            <div>
                {
                    _measurements.map((measurement: any) => {
                        return (
                            <LineChart title={measurement.name} xAxis={[1,2,3]} data={[1,2,3]}/>
                        )
                    })

                }
            </div>
        </div>
    );
}

