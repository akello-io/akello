import { useFormik } from "formik";
import * as Yup from "yup";
import { RegistryTreatment } from "@akello/core";
import { useAkello } from '@akello/react-hook'
import { Input, Button, Center, Container, Select, Tooltip } from "@mantine/core"
import { Notification } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from "react";

interface PatientReferralPageProps {
        onNavigate: (path: string) => void;
}

export const PatientReferralPage:React.FC<PatientReferralPageProps> = ({onNavigate}) => {
    const akello = useAkello();
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            mrn: '',
            payer: '',
            referring_npi: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            dob: '',
        },
        validationSchema: Yup.object({
            mrn: Yup.string()
                .required('Required'),
            payer: Yup.string()
                .required('Required'),
            referring_npi: Yup.string()
                .required('Required'),
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
            // registry_id: string, mrn: string, referring_npi: string, status: string
            let new_patient = new RegistryTreatment(
                akello.getSelectedRegistry()?.id ?? '',
                values['mrn'],
                values['referring_npi']
            );
            // new_patient.treatment_logs = [];
            new_patient.payer = values['payer'];
            new_patient.referring_npi = values['referring_npi'];
            new_patient.first_name = values['firstName'];
            new_patient.last_name = values['lastName'];
            new_patient.phone_number = values['phoneNumber'];
            new_patient.email = values['email'];
            new_patient.date_of_birth = values['dob'];

            akello.registryService.referPatient(akello.getSelectedRegistry()?.id ?? '', new_patient, (data) => {
                console.log(data);
                onNavigate('/registry/' + new_patient.mrn);
                akello.selectPatient(new_patient);
            }, (error: any) => {
                console.log(error);
                setError(true);
            });
        },
    });

    return (
        <div>
            {error && <Notification onClose={() => { setError(false) }} color="red" title="Something went wrong"> We had a problem adding this patient. Make sure you have their information correct. </Notification>}
            <Center>
                <Container>
                    <div className={"border border-1 min-w-96"}>
                        <div className={"font-semibold border-b border-1 p-2"}>
                            <p className={"text-xl"}>
                                Refer Patient
                            </p>
                        </div>
                        <div className={"p-2 space-y-4"}>
                            <div className="max-w-xs">
                                <form className="rounded px-2 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <div className='flex flex-row justify-between'>
                                            <label className="block  text-xs font-bold mb-2" htmlFor="npi">
                                                Referring Provider NPI
                                            </label>
                                            <Tooltip
                                                label="NPI of the physician who referred the patient."
                                                position="top-end"
                                                withArrow
                                                transitionProps={{ transition: 'pop-bottom-right' }}
                                            >
                                                <IconInfoCircle style={{ height: '15px' }} />
                                            </Tooltip>
                                        </div>
                                        <Input
                                            id="referring_npi"
                                            type="text"
                                            {...formik.getFieldProps('referring_npi')}
                                        />
                                        {formik.touched.payer && formik.errors.payer ? (
                                            <div className={"text-error"}>{formik.errors.payer}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <div className='flex flex-row justify-between'>
                                            <label className="block text-xs font-bold mb-2" htmlFor="mrn">
                                                MRN
                                            </label>
                                            <Tooltip
                                                label="Medical record number (MRN) of the patient."
                                                position="top-end"
                                                withArrow
                                                transitionProps={{ transition: 'pop-bottom-right' }}
                                            >
                                                <IconInfoCircle style={{ height: '15px' }} />
                                            </Tooltip>
                                        </div>
                                        <Input
                                            id="mrn"
                                            type="text"
                                            {...formik.getFieldProps('mrn')}
                                        />
                                        {formik.touched.mrn && formik.errors.mrn ? (
                                            <div className={"text-error"}>{formik.errors.mrn}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <div className='flex flex-row justify-between'>
                                            <label className="block  text-xs font-bold mb-2" htmlFor="payer">
                                                Payer
                                            </label>
                                            <Tooltip
                                                label="The insurnace provider of the patient."
                                                position="top-end"
                                                withArrow
                                                transitionProps={{ transition: 'pop-bottom-right' }}
                                            >
                                                <IconInfoCircle style={{ height: '15px' }} />
                                            </Tooltip>
                                        </div>
                                        <Select
                                            id="payer"
                                            searchValue={formik.values.payer}
                                            onSearchChange={(value) => formik.setFieldValue('payer', value)}
                                            data={[
                                                'UnitedHealth Group',
                                                'Anthem, Inc.',
                                                'Aetna (CVS Health)',
                                                'Cigna',
                                                'Humana',
                                                'Centene Corporation',
                                                'Molina Healthcare',
                                                'Blue Cross Blue Shield',
                                                'Independence Blue Cross',
                                                'Other'
                                            ]}
                                        />
                                        {formik.touched.payer && formik.errors.payer ? (
                                            <div className={"text-error"}>{formik.errors.payer}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            {...formik.getFieldProps('firstName')}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <div className={"text-error"}>{formik.errors.firstName}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <Input id="lastName"
                                            type="text"
                                            {...formik.getFieldProps('lastName')}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <div className={"text-error"}>{formik.errors.lastName}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2" htmlFor="dob">
                                            Date of Birth
                                        </label>
                                        <Input id="dob"
                                            type="date"
                                            {...formik.getFieldProps('dob')}
                                        />
                                        {formik.touched.dob && formik.errors.dob ? (
                                            <div className={"text-error"}>{formik.errors.dob}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2" htmlFor="phoneNumber">
                                            email
                                        </label>
                                        <Input id="lastName"
                                            type="email"
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className={"text-error"}>{formik.errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <Input id="lastName"
                                            type="text"
                                            {...formik.getFieldProps('phoneNumber')}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                            <div className={"text-error"}>{formik.errors.phoneNumber}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="submit"
                                            variant="filled"
                                        >
                                            Refer Patient
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </Center>
        </div>
    )
}
