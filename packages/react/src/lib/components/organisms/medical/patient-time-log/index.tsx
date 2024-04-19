import { useAkello } from '@akello/react-hook';
import { Table } from '@mantine/core';
import { useEffect } from 'react';
import React from 'react';


export interface PatientTimeLogProps {
}



export const PatientTimeLog:React.FC<PatientTimeLogProps> = () => {

  const akello = useAkello();
  const [logs, setLogs] = React.useState<any[]>([]);
  const registry_id = akello.getSelectedRegistry()!.id;
  const user_id = akello.getSelectedPatientRegistry()!.user_id;

  useEffect(() => {
    akello.measurementService.getTimeLogs(registry_id, user_id, (data: any) => {
      setLogs(data);
    })

  }, [user_id])


    const rows = logs.map((log) => (
        <Table.Tr key={log['timestamp']}>
          <Table.Td>{log['timestamp']}</Table.Td>
          <Table.Td>{log['measure']}</Table.Td>
          <Table.Td>{log['value']}</Table.Td>
        </Table.Tr>
      ));


    return (
        <>
            <Table stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Activity</Table.Th>
                    <Table.Th>Duration</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
                <Table.Caption>Scroll page to see sticky thead</Table.Caption>
            </Table>
        </>
    )
}


