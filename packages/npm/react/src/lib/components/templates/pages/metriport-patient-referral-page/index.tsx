import { useFormik } from "formik";
import * as Yup from "yup";
import { RegistryTreatment } from "@akello/core";
import { useAkello } from '@akello/react-hook'
import { Input, Button, Center, Container, Select, Tooltip } from "@mantine/core"
import { Notification } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from "react";

interface MetriportPatientReferralPageProps {
        onNavigate: (path: string) => void;
}

export const MetriportPatientReferralPage:React.FC<MetriportPatientReferralPageProps> = ({onNavigate}) => {
    const akello = useAkello();
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            mrn: '',
            referring_npi: '',
        },
        validationSchema: Yup.object({
            mrn: Yup.string()
                .required('Required'),
            referring_npi: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            akello.registryService.referPatient(akello.getSelectedRegistry()?.id ?? '', {
                'registry_id': akello.getSelectedRegistry()!.id ,
                'mrn': values['mrn'],
                'referring_npi': values['referring_npi'],
            }, (data) => {
                console.log(data);
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
                                        {formik.touched.referring_npi && formik.errors.referring_npi ? (
                                            <div className={"text-error"}>{formik.errors.referring_npi}</div>
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
