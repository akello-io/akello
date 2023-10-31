import {ModelInputProps} from "./inputs_interface";
import {TextAreaInput, TextInput} from "../formatted_text";


const ModelInfo:React.FC<ModelInputProps> = ({layout, model, setModel}) => {


    if(layout== "detail") {
        return (
            <>
                <div className="grid grid-cols-1">
                    <div>
                        <label htmlFor="facility-name" className="block text-sm font-medium leading-6 text-base-content">
                            Model Name
                        </label>
                        <div className="mt-2">
                            <TextInput
                                value={model.name!}
                                setValue={(value) => {
                                    model.name = value
                                    setModel(model.copy())
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-base-content">
                            Description
                        </label>
                        <div className="mt-2">
                            <TextAreaInput
                                value={model.description!}
                                setValue={(value) => {
                                    model.description = value
                                    setModel(model.copy())
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="facility-name" className="block text-sm font-medium leading-6 text-base-content">
                                Model Name
                            </label>
                            <div className="mt-2">
                                <TextInput
                                    value={model.name!}
                                    setValue={(value) => {
                                        model.name = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-base-content">
                                Description
                            </label>
                            <div className="mt-2">
                                <TextAreaInput
                                    value={model.description!}
                                    setValue={(value) => {
                                        model.description = value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ModelInfo