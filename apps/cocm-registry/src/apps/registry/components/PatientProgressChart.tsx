import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {PatientRegistry, TreatmentLog} from "../../../data/schemas/RegistryModel";



interface PatientProgressChartProps {
    selectedPatient: PatientRegistry
}

const PatientProgressChart:React.FC<PatientProgressChartProps> = ({selectedPatient}) => {

    let copy = [...selectedPatient.treatment_logs!]
    copy.sort((a, b) => a.weeks_in_treatment > b.weeks_in_treatment ? 1 : -1)
    selectedPatient.treatment_logs = copy

    return (
        <ResponsiveContainer>
            <LineChart
                width={500}
                height={300}
                data={selectedPatient.treatment_logs}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weeks_in_treatment" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="phq9_score" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="gad7_score" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default PatientProgressChart
