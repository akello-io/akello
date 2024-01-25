import React, { useState} from 'react';
import { FhirJsonForm, FhirJsonResp } from 'fhirformjs'
import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';


interface QuestionnaireFormProps {
    questionnaire: any
    score_code: string
}

const QuestionnaireForm = (props: QuestionnaireFormProps) => {

    const [schemaState, setData] = useState(props.questionnaire);
    let formData = {}
    let respData = {}
    const handleSubmit = (data) => {
        respData = FhirJsonResp(FhirJsonForm(schemaState).model, data, FhirJsonForm(schemaState).schema)
    }

    return (
        <div>
            <Form schema={FhirJsonForm(schemaState).schema}
                  uiSchema={FhirJsonForm(schemaState).uiSchema}
                  validator={validator}
                formData={formData}
                onSubmit={e => handleSubmit(e.formData)}
                />
        </div>
    )
}

export default QuestionnaireForm