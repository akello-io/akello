import PageContainer from "../containers/PageContainer";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import LandingPage from "./LandingPage";

interface HomePageProps {
}


const HomePage:React.FC<HomePageProps> = () => {
    const token = useSelector((state: RootState) => state.app.token)

    return (
        <>
            <PageContainer>
                {token && (
                    <>logged in</>
                )}
                {!token && (
                    <LandingPage />
                )}
            </PageContainer>
        </>
    )
}

export default HomePage