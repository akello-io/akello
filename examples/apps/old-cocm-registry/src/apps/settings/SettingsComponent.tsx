import AppContainer from "../../stories/app/Container/AppContainer";

interface SettingsComponentProps {
    user?: any
    signOut: (data?: any | undefined) => void
}


const SettingsComponent:React.FC<SettingsComponentProps> = ({signOut, user}) => {
    return (
        <>
            <AppContainer title={"Settings"}>




            </AppContainer>
        </>
    )
}

export default SettingsComponent