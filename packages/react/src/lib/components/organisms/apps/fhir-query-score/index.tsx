
import { Select, NumberInput, Button, Text } from '@mantine/core';
import { TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';

export interface FhirQueryScoreProps {
    onSubmit?: (data: FHIRQuery[]) => void
}

interface FHIRQuery {
    query: string,
    codes: string,
    score: number
}

export const FhirQueryScore: React.FC<FhirQueryScoreProps> = ({
    onSubmit
}) => {
    const [newRow, setNewRow] = useState<FHIRQuery>({query: '', codes: '', score: 0})
    const [rows, setRows] = useState<FHIRQuery[]>([]);    
    const [scoreTotal, setScoreTotal] = useState<number>(0);

    useEffect(() => {
        let total = 0;
        for (const row of rows) {
            total += row.score;
        }
        setScoreTotal(total);
    }, [rows])

    return (
        <>
            <div className='flex flex-col space-y-4'>
                <div className='text-3xl'>
                    SBIRT Configuration
                </div>      
                <div>
                    <Text fw={800}>Query Name</Text>
                    <TextInput />
                </div>
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
                            setNewRow({ ...newRow, score: parseInt(String(event), 10) });
                        }                        
                    }/>  
                    <Button
                        variant="filled"
                        color="green"
                        disabled={!newRow.query || !newRow.codes || !newRow.score}
                        onClick={() => {
                            setRows((prevRows) => [...prevRows, newRow]);
                            setNewRow({ query: '', codes: '', score: 0 });
                        }}
                    >
                        Add
                    </Button>
                </div>          
                <div className='text-3xl'>
                    Score [0 to {scoreTotal}] 
                </div>      
                <div className='grid grid-cols-3'>
                    <div>                        
                    </div>
                    <div className='font-semibold text-xl'>
                        Min
                    </div>
                    <div className='font-semibold text-xl'>
                        Max
                    </div>

                    <div>
                        Minimal or none
                    </div>
                    <NumberInput />  
                    <NumberInput />  

                    <div>
                        Mild
                    </div>
                    <NumberInput />  
                    <NumberInput />  

                    <div>
                        Moderately severe
                    </div>
                    <NumberInput />  
                    <NumberInput />  

                    <div>
                        Severe
                    </div>
                    <NumberInput />  
                    <NumberInput />  
                </div>
                
                <div className='text-3xl'>
                    Screener
                </div>                         
                <div>
                    <Select  data={['PHQ-9','GAD-7']}/>
                </div>
                <div className='text-3xl'>
                    Referral Registry
                </div>
                <div>
                    <Select  data={['Depression Registry','Anxiety Registry']}/>
                </div>
                <div className='flex justify-end space-x-4'>                    
                    <Button variant="filled"
                        onClick={() => {                            
                            onSubmit && onSubmit(rows);                            
                        }}
                    >Save</Button>
                </div>                      
            </div>
                
            
        </>
    )
}