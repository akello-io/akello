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
    onLoginClick?: () => void;
    onResetPasswordClick: () => void;
}

const handleOnKeyDown = (e: any) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

export const ForgotPasswordPageComponent:React.FC<ForgotPasswordPageProps> = ({onSuccess, onFail, onResetPasswordClick, onLoginClick}) => {

    return (
        <div className='w-screen'>
            <Center>
                <Container size={420} my={40}>
                    <Title ta="center">
                        Reset your password
                    </Title>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput
                            onKeyDown={handleOnKeyDown}
                            label="Email" placeholder="you@mantine.dev" required
                        />
                        <Group justify="space-between" mt="lg" >
                            {
                                onLoginClick &&
                                (
                                    <Anchor c="dimmed" size="sm" onClick={() => onLoginClick()}>
                                        <Center inline>
                                        <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                        <Box ml={5}>Back to the login page</Box>
                                        </Center>
                                    </Anchor>
                                )
                            }
                            <Button className={'bg-primary'} onClick={() => onResetPasswordClick()}>Reset password</Button>
                        </Group>
                    </Paper>
                </Container>
            </Center>
        </div>
    );
};
