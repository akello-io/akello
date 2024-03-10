import {useNavigate} from "react-router";
import {useState} from "react";
import {Clinic} from "./aims_model/clinic";
import {getClinicInstance} from "./aims_model/init/init_models";
import CreateModelInformation
    from "./components/create_model/CreateModelInformation";
import {validate_model} from "./aims_model/model_validation";
import Breadcrumb from "../components/Breadcrumb";
import {Auth} from "aws-amplify";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { useAkello } from "@akello/react-hook";

const FinancialModelCreate = () => {
    const [model, setModel] = useState<Clinic>(getClinicInstance())
    const [errors, setErrors] = useState<string[]>([])
    const akello = useAkello()

    return (
        <div className="pt-24 space-y-10 divide-y divide-gray-900/10 px-4 shadow-sm sm:px-6 lg:px-8 mb-24">
            <Breadcrumb name={"Create model"} />
            <CreateModelInformation model={model} setModel={setModel} />
            {
                errors.length > 0 && (
                    <ul className={"text-xs text-error bg-neutral p-3 space-y-1"}>
                        <div className={"text-lg"}>Please correct the following errors:</div>
                        {
                            errors.map((error) => {
                                return (<li>- {error}</li>)
                            })
                        }
                    </ul>
                )
            }
            <div className={"flex justify-end w-full"}>
                <button className={"btn btn-primary"} onClick={() => {
                    let errors = validate_model(model.copy())
                    setErrors(errors)

                    if(errors.length == 0) {
                        akello.financialService.createFinancialModel(model, (data) => {
                            console.log('saved data: ' + data)
                        })
                    }
                }}>Create Model</button>
            </div>
        </div>

    )
}

export default FinancialModelCreate