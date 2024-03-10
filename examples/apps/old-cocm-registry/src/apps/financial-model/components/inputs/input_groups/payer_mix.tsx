import {ModelInputProps} from "./inputs_interface";
import {PercentInput} from "../formatted_numbers";
import {InputGroupMiniHeader} from "./input_group";
import LayoutInputDetail from "./layouts/layout_input_detail";

const PayerMixInputGroup:React.FC<ModelInputProps> = ({layout, model, setModel}) => {
    let medicare = model.payerCollection.getPayer('Medicare')
    let medicaid = model.payerCollection.getPayer('Medicaid')
    let commercial_ok_cocm = model.payerCollection.getPayer('Commercial OK for CoCM')
    let commercial_other = model.payerCollection.getPayer('Commercial other')


    let total = medicare.patients_per_payer
        + medicaid.patients_per_payer
        + commercial_ok_cocm.patients_per_payer
        + commercial_other.patients_per_payer

    if(layout=="detail") {
        return (
            <>
                <LayoutInputDetail title={"Payer Mix"}>
                    <div className="sm:col-span-3">
                        {total !=1 && (
                            <>
                                <div className={"bg-error w-full p-2 text-error-content font-semibold"}>
                                    ERROR: MUST SUM TO 100%
                                </div>
                            </>
                        )}
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"medicare-patients"} />
                        <PercentInput
                            value={ medicare.patients_per_payer! }
                            setValue={ (value) => {
                                let payer = model.payerCollection.getPayer('Medicare')
                                payer.patients_per_payer = value
                                model.payerCollection.setPayer(payer)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"medicaid-patients"} />
                        <PercentInput
                            value={medicaid.patients_per_payer!}
                            setValue={ (value) => {
                                let payer = model.payerCollection.getPayer('Medicaid')
                                payer.patients_per_payer = value
                                model.payerCollection.setPayer(payer)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"commerical-cocm"} />
                        <PercentInput
                            value={commercial_ok_cocm.patients_per_payer!}
                            setValue={ (value) => {
                                let payer = model.payerCollection.getPayer('Commercial OK for CoCM')
                                payer.patients_per_payer = value
                                model.payerCollection.setPayer(payer)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"commerical-no-cocm"} />
                        <PercentInput
                            value={commercial_other.patients_per_payer!}
                            setValue={ (value) => {
                                let payer = model.payerCollection.getPayer('Commercial other')
                                payer.patients_per_payer = value
                                model.payerCollection.setPayer(payer)
                                setModel(model.copy())
                            }}
                        />
                    </div>
                </LayoutInputDetail>
            </>
        )
    }


    return (
        <>
            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"medicare-patients"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={ medicare.patients_per_payer! }
                                    setValue={ (value) => {
                                        let payer = model.payerCollection.getPayer('Medicare')
                                        payer.patients_per_payer = value
                                        model.payerCollection.setPayer(payer)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"medicaid-patients"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={medicaid.patients_per_payer!}
                                    setValue={ (value) => {
                                        let payer = model.payerCollection.getPayer('Medicaid')
                                        payer.patients_per_payer = value
                                        model.payerCollection.setPayer(payer)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"commerical-cocm"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={commercial_ok_cocm.patients_per_payer!}
                                    setValue={ (value) => {
                                        let payer = model.payerCollection.getPayer('Commercial OK for CoCM')
                                        payer.patients_per_payer = value
                                        model.payerCollection.setPayer(payer)
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <InputGroupMiniHeader input_group_id={"payer-mix"} input_id={"commerical-no-cocm"} />
                            <div className="mt-2">
                                <PercentInput
                                    value={commercial_other.patients_per_payer!}
                                    setValue={ (value) => {
                                        let payer = model.payerCollection.getPayer('Commercial other')
                                        payer.patients_per_payer = value
                                        model.payerCollection.setPayer(payer)
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
export default PayerMixInputGroup