import {Auth} from "aws-amplify";
import PageContainer from "../containers/PageContainer";

const RegistryPage = () => {
    return (
        <>
            <PageContainer>
                Registry Page

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

export default RegistryPage