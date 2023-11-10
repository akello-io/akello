import {Auth} from "aws-amplify";
import PageContainer from "../../PageContainer";

const RegistryCreate = () => {
    return (
        <>
            <PageContainer title={'New Registry'}>
                Registry Create

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

export default RegistryCreate