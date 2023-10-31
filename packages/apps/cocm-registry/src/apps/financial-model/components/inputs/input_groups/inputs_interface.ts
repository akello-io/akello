import {Clinic} from "../../../aims_model/clinic";

export interface ModelInputProps {
    layout?: string
    model: Clinic
    setModel: (model: Clinic) => void
}
