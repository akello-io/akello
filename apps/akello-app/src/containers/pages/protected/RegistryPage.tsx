import {Auth} from "aws-amplify";
import PageContainer from "../../PageContainer";
import {RegistryDataGrid} from "@akello/react-medical";

const RegistryPage = () => {
    return (
        <>
            <PageContainer title={'Registry'}>
                <RegistryDataGrid patients={[]} questionnaires={[]} handlePatientClickEvent={()=> {}}/>
            </PageContainer>
        </>
    )
}

export default RegistryPage