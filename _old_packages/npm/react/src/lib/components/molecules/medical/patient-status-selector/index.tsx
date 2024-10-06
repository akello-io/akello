import React, { useEffect } from 'react';
import { useAkello } from "@akello/react-hook";
import { SegmentedControl } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { RegistryTreatment } from "@akello/core";

export interface PatientStatusSelectorProps {
    registry_id: string;
    selectedPatient: RegistryTreatment
}

export const PatientStatusSelector: React.FC<PatientStatusSelectorProps> = ({registry_id, selectedPatient}) => {
    const akello = useAkello();
    const [status, setStatus] = React.useState(selectedPatient.status);

    useEffect(() => {
        setStatus(selectedPatient.status);
    }, [selectedPatient.status])

    return (
        <SegmentedControl fullWidth data={[
            'Accepted',
            'Enrolled',
            'Treatment',
            'Relapse Prevention Plan',
            'Deactivated'
        ]}
            className='col-span-2'
            defaultValue={status}
            value={status}
            onChange={(value) => {
                setStatus(value);
                const previousSelectedStatusValue = status;
                selectedPatient.status = value;
                akello.selectPatient(selectedPatient);
                akello.dispatchEvent({ type: 'change' });
                akello.registryService.setStatus(registry_id, selectedPatient.user_id, value, () => {
                        notifications.show({
                            color: 'green',
                            title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Status Changed',
                            message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' has been moved to ' + value,
                        })
                    },  (error: any) => {
                        setStatus(previousSelectedStatusValue);
                        console.error(error);
                        selectedPatient.status = previousSelectedStatusValue;
                        akello.selectPatient(selectedPatient);
                        akello.dispatchEvent({ type: 'change' });
                        notifications.show({
                            color: 'red',
                            title: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' Error',
                            message: selectedPatient.first_name + ' ' + selectedPatient.last_name + ' unable to change status',
                        })
                    }
                );
            }}
        />
    )
}


