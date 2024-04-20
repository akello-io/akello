import { useAkello } from '@akello/react-hook';
import { Table } from '@mantine/core';
import { useEffect } from 'react';
import React from 'react';
import moment from 'moment';
import { MeasureTypes } from '@akello/core';

export interface PatientTimeLogProps {
}



export const PatientTimeLog:React.FC<PatientTimeLogProps> = () => {

  const akello = useAkello();
  const [logs, setLogs] = React.useState<any[]>([]);
  const registry_id = akello.getSelectedRegistry()!.id;
  const user_id = akello.getSelectedPatientRegistry()!.user_id;


  const measure_name = {
    "patient_caseload_review_minutes": "Caseload Review",
    "patient_session_minutes": "Patient Session",
    "patient_assessment_session_minutes": "Assessment Session"
  } as any;

  useEffect(() => {
    akello.measurementService.getTimeLogs(registry_id, user_id, (data: any) => {
      setLogs(data);
    })
  }, [user_id])


  // group by date, measure and sum the values
  const logs_map = new Map();
  for (const log of logs) {
    const key = `${moment.unix(log['date']).format("YY-MM-DD")}::${log['measure']}`;
    if (logs_map.has(key)) {
      logs_map.set(key, logs_map.get(key) + log['value']);
    } else {
      logs_map.set(key, log['value']);
    }
  }

  const log_values = Array.from(logs_map.keys()).map((key) => {
    const [date, measure] = key.split("::");
    return {
      date: moment(date, "YY-MM-DD").unix(),
      measure: measure,
      value: logs_map.get(key)
    }
  });

  const rows = log_values.map((log) => (
      <Table.Tr key={log['date']}>
        <Table.Td>{moment.unix(log['date']).format("YY-MM-DD")}</Table.Td>
        <Table.Td>{measure_name[log['measure']]}</Table.Td>
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
                <Table.Caption></Table.Caption>
            </Table>
        </>
    )
}


