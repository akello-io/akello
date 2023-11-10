import { Authenticator, useTheme, Button, View, Image, Text, Heading, ThemeProvider, useAuthenticator } from '@aws-amplify/ui-react';

import AkelloLogo from "./images/logos/akello/akello-logo.png";


export const cognito_auth_components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <div className={"flex justify-center w-full"}>
                    <img
                        alt="Akello logo" src={AkelloLogo} className={"h-24 "}
                    />
                </div>
            </View>
        );
    },

    Footer() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>

                <div className={"bg-crx-red text-black p-3 text-center"}>
                    <div className={"font-semibold"}>This is a demo version of Akello.</div>
                    <div>All data will be cleared once a week, this site is only for demo and testing purposes</div>
                </div>


                <div className={"h-10"}/>

                <div className={"text-xs font-semibold"}>
                    By signing up or using our system you agree to our
                    <a className={"text-blue-400"} href={"/terms.html"}> terms and service</a> and have read our privacy <a className={"text-blue-400"} href={"/privacy.html"}>policy</a>.
                </div>
                <div className={"h-10"}/>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; Akello Health Inc., All Rights Reserved
                </Text>
            </View>
        );
    },

    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Sign in to your account
                </Heading>
            );
        },
        Footer() {
            const { toResetPassword } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toResetPassword}
                        size="small"
                        variation="link"
                    >
                        Reset Password
                    </Button>
                </View>
            );
        },
    },


    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Create a new account
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Back to Sign In
                    </Button>
                </View>
            );
        },
    },


    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        /*
        Footer() {
          return <Text>Footer Information</Text>;
        },
        */
    },

    /*
    SetupTOTP: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },

        Footer() {
          return <Text>Footer Information</Text>;
        },

    }, */
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Auth Code:
                </Heading>
            );
        },
        /*
        Footer() {
          return <Text>Footer Information</Text>;
        },
        */
    },
    ResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Reset password:
                </Heading>
            );
        },
        /*
        Footer() {
          return <Text>Footer Information</Text>;
        },
         */
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Reset Password:
                </Heading>
            );
        },
        /*
        Footer() {
          return <Text>Footer Information</Text>;
        },
        */
    },
};

export const cognito_auth_formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your email',
        },
    },
    signUp: {
        username: {
            label: 'Enter your email',
            placeholder: 'Enter your email:',
            isRequired: true,
            order: 1
        },
        given_name: {
            label: 'Enter your first name',
            placeholder: 'First name:',
            isRequired: true,
            order: 2
        },
        family_name: {
            label: 'Enter your last name',
            placeholder: 'Last name:',
            isRequired: true,
            order: 3
        },
        /*
        picture: {
            label: 'Upload your profile photo',
            placeholder: 'Set your profile photo:',
            isRequired: true,
            order: 4
        },
        */
    },
    /*
    signUp: {
        username: {
            label: 'Enter your email',
            placeholder: 'Enter your email:',
            isRequired: false,
            order: 1
        },
        phone_number: {
            label: 'Enter your phone number',
            placeholder: 'Enter your phone number:',
            isRequired: false,
            order: 2
        },
        password: {
            label: 'Password:',
            placeholder: 'Enter your Password:',
            isRequired: false,
            order: 3,
        },
        confirm_password: {
            label: 'Confirm Password:',
            order: 4,
        },
    },

     */
    forceNewPassword: {
        password: {
            placeholder: 'Enter your Password:',
        },
    },
    resetPassword: {
        username: {
            placeholder: 'Enter your email:',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: 'Enter your Confirmation Code:',
            label: 'Confirmation Code',
            isRequired: false,
        },
        confirm_password: {
            placeholder: 'Enter your Password Please:',
        },
    },
    /*
    setupTOTP: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            label: 'Confirmation Code',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },

    confirmSignIn: {
        confirmation_code: {
            label: 'Enter Code from TOTP Authenticator App',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
     */
};
