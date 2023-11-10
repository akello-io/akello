import * as React from "react";
import DrawerLayout from "../DrawerLayout";
import {useFormik} from "formik";
import * as Yup from "yup";
import {referPatient} from "../../../../../api/registry";
import {PatientRegistry} from "../../../../../data/schemas/RegistryModel";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";


interface AddPatientDrawer {
    checked: boolean
    setChecked: (checked: boolean) => void
    patients: any[]
    setPatients: (patients: any[]) => void
}

const AddPatientDrawer: React.FC<AddPatientDrawer> = ({checked, setChecked, patients, setPatients}) => {

    const token = useSelector((state: RootState) => state.app.token)
    const selectedRegistry = useSelector((state: RootState) => state.app.selectedRegistry)

    const formik = useFormik({
        initialValues: {
            mrn: '',
            payer: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            dob: '',
        },
        validationSchema: Yup.object({
            mrn: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            payer: Yup.string()
                .max(15, 'Must be 15 characters or less'),
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            dob: Yup.date().required('Required'),
            phoneNumber: Yup.string().required('Required')
        }),
        onSubmit: values => {
            setChecked(false)

            let new_patient = new PatientRegistry(
                values['mrn'],
                values['firstName'],
                values['lastName'],
                values['phoneNumber'],
                values['email'],
                values['dob'],
            )
            new_patient.treatment_logs =  []
            new_patient.payer = values['payer']
            referPatient(selectedRegistry.id, token, new_patient, (data) => {
                setPatients([...patients, data])
            })
        },
    });

    return (
        <>
            <DrawerLayout id={'add-patient'} checked={checked} setChecked={setChecked}>
                <div className={"space-y-4"}>
                    <div className={"w-full border border-1"}>
                        <div className={"font-semibold border-b border-1 p-2"}>
                            <p className={"text-xl"}>
                                Add Patient
                            </p>
                        </div>
                        <div className={"bg-white p-2 space-y-4"}>
                            <div className="w-full max-w-xs">
                                <form className="bg-white rounded px-2 pt-6 pb-8 mb-4"
                                      onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="mrn">
                                            MRN
                                        </label>
                                        <input
                                            id="mrn"
                                            type="text"
                                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            {...formik.getFieldProps('mrn')}
                                        />
                                        {formik.touched.mrn && formik.errors.mrn ? (
                                            <div className={"text-error"}>{formik.errors.mrn}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="payer">
                                            Payer
                                        </label>
                                        <input
                                            id="payer"
                                            type="text"
                                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            {...formik.getFieldProps('payer')}
                                        />
                                        {formik.touched.payer && formik.errors.payer ? (
                                            <div className={"text-error"}>{formik.errors.payer}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            {...formik.getFieldProps('firstName')}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <div className={"text-error"}>{formik.errors.firstName}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input id="lastName"
                                               type="text"
                                               className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               {...formik.getFieldProps('lastName')}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <div className={"text-error"}>{formik.errors.lastName}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="dob">
                                            Date of Birth
                                        </label>
                                        <input id="dob"
                                               type="date"
                                               className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               {...formik.getFieldProps('dob')}
                                        />
                                        {formik.touched.dob && formik.errors.dob ? (
                                            <div className={"text-error"}>{formik.errors.dob}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="phoneNumber">
                                            email
                                        </label>
                                        <input id="lastName"
                                               type="email"
                                               className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className={"text-error"}>{formik.errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input id="lastName"
                                               type="text"
                                               className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               {...formik.getFieldProps('phoneNumber')}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                            <div className={"text-error"}>{formik.errors.phoneNumber}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Add Patient
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerLayout>
        </>
    )
}

export default AddPatientDrawer