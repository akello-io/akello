import PageContainer from "../containers/PageContainer";
import {Auth} from "aws-amplify";

const DashboardPage = () => {


    return (
        <>
            <PageContainer>
                Dashboard Page

                <button className={"btn btn-primary btn-xl"} onClick={() => {
                    Auth.signOut()
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(err => {
                            debugger;
                        });
                }}>sign out</button>
            </PageContainer>

        </>
    )
}

export default DashboardPage