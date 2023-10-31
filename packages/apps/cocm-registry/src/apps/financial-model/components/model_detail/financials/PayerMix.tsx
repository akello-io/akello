import React, {Fragment} from "react";
import {NumericFormat} from "react-number-format";
import classNames from "classnames";
import {Clinic} from "../../../aims_model/clinic";


export const PayerMix = (aims: Clinic) => {


    let payermix = aims.payerCollection.payers.map((payer) => {
        return {
            name: payer.name,
            patients_per_payer: payer.patients_per_payer * 100,
            patients_per_payer_cocm_expected: payer.patients_per_payer_cocm_expected * 100,
            adjusted_patients_eligible_cocm: payer.adjusted_patients_eligible_cocm * 100
        }
    })

    return (
        <>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow ">
                <div className="px-4 py-5 sm:px-6 font-bold">
                    PAYER MIX
                </div>
                <div className="px-4 py-5 sm:p-6">

                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="table-fixed">
                                    <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Primary Payers

                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Primary Payers
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            % of Patients per Payer expected <br/> to  bill via BHI/CoCM codes
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Adjusted % of Patients eligible <br/> to bill via BHI/ CoCM codes
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">

                                    <Fragment key="Services">
                                        {
                                            payermix.map((payer, idx) => {
                                                return (
                                                    <tr
                                                        key={payer!.name}
                                                        className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                    >
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                            {payer!.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} suffix={"%"} decimalScale={2} value={payer!.patients_per_payer}/>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} suffix={"%"}  decimalScale={2} value={payer!.patients_per_payer_cocm_expected}/>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <NumericFormat type={"text"} displayType={"text"} suffix={"%"} decimalScale={2} value={payer!.adjusted_patients_eligible_cocm}/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </Fragment>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}