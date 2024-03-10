import {
    TextInput,    
    Paper,
    Title,    
    Container,    
    Button,
    Center,
    Group,
    Anchor,
    Box,
    rem
  } from '@mantine/core';
import {IconArrowLeft} from '@tabler/icons-react';

interface ForgotPasswordPageProps {
    onSuccess?: (token: string) => void;
    onFail?: (error: any) => void;    
    onLoginClick: () => void;
}

export const ForgotPasswordPage:React.FC<ForgotPasswordPageProps> = ({onSuccess, onFail, onLoginClick}) => {    
    
    return (
        <div className='w-screen'>
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center">
                        Reset your password
                    </Title>                    
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="Email" placeholder="you@mantine.dev" required />                                                                        
                        <Group justify="space-between" mt="lg" >
                            <Anchor c="dimmed" size="sm" onClick={() => onLoginClick()}>
                                <Center inline>
                                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                <Box ml={5}>Back to the login page</Box>
                                </Center>
                            </Anchor>
                            <Button className={'bg-primary'}>Reset password</Button>
                        </Group>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};
