import * as React from 'react';
import AppContainer from "../../stories/app/Container/AppContainer";
import TeamTable from "./TeamTable";

export default function TeamComponent() {
    return (
        <AppContainer title={"Team"}>

            <TeamTable />
            {/*
            <TeamCaseloadStats />
            */}
        </AppContainer>


    );
}