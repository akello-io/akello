import AppContainer from "../../../stories/app/Container/AppContainer";


const RegistryReport = () => {
    return (
        <>
            <AppContainer title={"Registry Report"}>

                <div className={"grid grid-cols-1"}>
                    <div>Avg PHQ9 on entry</div>
                    <div>Avg PHQ9 on relapse</div>
                </div>
            </AppContainer>
        </>
    )
}

export default RegistryReport