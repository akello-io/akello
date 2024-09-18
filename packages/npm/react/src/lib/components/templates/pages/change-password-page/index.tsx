import { Container, Text, Button, Paper, TextInput, Stack } from '@mantine/core';
import { useAkello } from '@akello/react-hook';
import { useState } from 'react';

export const ChangePasswordPage = () => {
    
    const akello = useAkello();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <>
        <div>
                <Container>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Text fw={600}>Change Passowrd</Text>
                        <Stack>
                            <TextInput value={oldPassword} onChange={(e: any) => setOldPassword(e.target.value) } placeholder="Old Password" />
                            <TextInput value={newPassword} onChange={(e: any) => setNewPassword(e.target.value) } placeholder="New Password" />
                            <TextInput value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value) } placeholder="Confirm Password" />
                            <Button className={'bg-primary'}
                                onClick={() => {

                                    akello.changePassword(oldPassword, newPassword, (data: any) => {
                                            console.log(data)
                                            akello.logout();
                                        },
                                        (error: any) => {
                                            console.log(error)
                                        });
                                    
                                }}
                            >Change password</Button>                        
                        </Stack>
                        
                    </Paper>
                </Container>
        </div>
        </>
    )
}

