import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {PatientRegistry, TreatmentLog, Questionnaire} from "@akello/core";



interface PatientProgressChartProps {
    selectedPatient: PatientRegistry,
    questionnaires: Questionnaire[]
}

const PatientProgressChart:React.FC<PatientProgressChartProps> = ({selectedPatient, questionnaires}) => {

    let copy = [...selectedPatient.treatment_logs!]
    copy.sort((a, b) => a.weeks_in_treatment > b.weeks_in_treatment ? 1 : -1)
    selectedPatient.treatment_logs = copy

    let scores:any = []

    let score_names = questionnaires.map((questionnaire) => { return questionnaire.name})


    selectedPatient.treatment_logs.map((treatment_log) => {

        let treatment_log_score:any = {
            "weeks_in_treatment" : treatment_log.weeks_in_treatment
        }

        // make sure we set all values to 0
        score_names.map((score_name) => {
            treatment_log_score[score_name] = 0
        })

        treatment_log.scores.map((score) => {
            treatment_log_score[score.score_name] = score.score_value
        })


        scores.push(treatment_log_score)
    })


    console.log(scores)
    console.log(score_names)

    //TODO: Need to handle the case when a registry might have more than 5 measurements
    let colors = [
        "#6fe520",
        "#cc553b",
        "#06825f",
        "#ce6808",
        "#2313f9"
    ]

    return (
        <ResponsiveContainer>
            <LineChart
                width={500}
                height={300}
                data={scores}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weeks_in_treatment" />
                <YAxis  />
                <Tooltip />
                <Legend />
                {
                    score_names.map((score_key: any, index) => {
                        //TODO: Need to handle the case when a registry might have more than 5 measurements
                        return (
                            <>
                                <Line type="monotone" dataKey={score_key} stroke={colors[index]}  />
                            </>
                        )
                    })
                }
            </LineChart>
        </ResponsiveContainer>
    );
}

export default PatientProgressChart
