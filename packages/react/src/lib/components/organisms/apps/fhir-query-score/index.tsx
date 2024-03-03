
import { Select, NumberInput, Button, Text } from '@mantine/core';
import { TextInput } from '@mantine/core';
import React, { useState } from 'react';

export interface FhirQueryScoreProps {

}

interface FHIRQuery {
    query: string,
    codes: string,
    score: number
}

export const FhirQueryScore: React.FC<FhirQueryScoreProps> = ({
}) => {
    const [newRow, setNewRow] = useState<FHIRQuery>({query: '', codes: '', score: 0})
    const [rows, setRows] = useState<FHIRQuery[]>([]);    

    return (
        <>
            <div className='flex flex-col space-y-4'>
                <div className='grid grid-cols-4 gap-4'>
                    <Text fw={600}>Query</Text>
                    <Text fw={600}>Codes</Text>
                    <Text fw={600}>Score</Text>
                    <Text></Text>
                    {rows.map((row, index) => (
                        <>
                            <Text>{row.query}</Text>
                            <Text>{row.codes}</Text>
                            <Text>{row.score}</Text>                                                        
                            <Button variant="filled" color="gray"
                                onClick={() => {                                               
                                    setRows((prevRows) => prevRows.filter((_, i) => i !== index))
                                }}
                            >Delete</Button>              
                        </>                                                
                    ))}       
                    <Select  data={['Family History', 'Condition', 'Related Person', 'Medication Request']} value={newRow.query} onChange={(event)=> {                                                                
                        setNewRow({ ...newRow, query: event! });
                    }}/>
                    <TextInput value={newRow.codes} 
                        onChange={(event) => {
                            setNewRow({ ...newRow, codes: event.target.value });
                        }}
                    />
                    <NumberInput value={newRow.score} onChange={
                        (event) => {
                            setNewRow({ ...newRow, score: event! });
                        }                        
                    }/>  
                    <Button
                        variant="filled"
                        color="pink"
                        onClick={() => {
                            setRows((prevRows) => [...prevRows, newRow]);
                            setNewRow({ query: '', codes: '', score: 0 });
                        }}
                    >
                        Add
                    </Button>

                    <div></div>
                    <div></div>
                    <div></div>
                    <Button variant="filled">Save</Button>
                </div>                     
            </div>
                
            
        </>
    )
}