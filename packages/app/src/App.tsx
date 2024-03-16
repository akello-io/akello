import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistryPage from './pages/registry/RegistryPage';
import { useEffect } from 'react';
import PatientDetail from './components/PatientDetail';
import ReportsPage from './pages/registry/ReportsPage';
import PatientReferralPage from './pages/registry/PatientReferralPage';
import CreateRegistryPage from './pages/CreateRegistryPage';
import RegistryShell from './components/RegistryShell';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PatientSession from './pages/registry/PatientSession';
import RegistrySecurityPage from './pages/registry/RegistrySecurityPage';
import NothingFoundBackground from './pages/404';
import ChangePasswordPage from './pages/registry/ChangePasswordPage';
import MeasurementsPage from './pages/registry/MeasurementsPage';
import PayerSettings from './pages/registry/PayerSettings';
import ProviderSettings from './pages/registry/ProviderSettings';



export default function App() {
  const [_, drawerHandlers] = useDisclosure();  
  const akello = useAkello();

  useEffect(() => {        
    if(akello.getSelectedRegistry() != undefined) {              
      // navigate(`/registry/${akello.getSelectedRegistry().id}`)                                           
    }
  }, [akello]);

    
  if(akello.accessToken == undefined) {
    return (
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/forgot-password"} element={<ForgotPasswordPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/signup/confirm"} element={<SignUpConfirm />} />
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    )
  }
 

  return (
    <>
      <Routes>        
      <Route path={"/create-registry"} element={<CreateRegistryPage />} />
        <Route path="/" element={<RegistryShell />}>          
          <Route index element={<RegistryPage drawerHandlers={drawerHandlers} />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/registry" element={<RegistryPage drawerHandlers={drawerHandlers} />} />                    
          <Route path="/security" element={<RegistrySecurityPage />} />
          <Route path="/registry/:patient_id" element={<RegistryPage drawerHandlers={drawerHandlers} />} />
          <Route path={"/reports"} element={<ReportsPage />} />                              
          <Route path={"/patient-referral"} element={<PatientReferralPage />} />
          <Route path={"/patient/:patient_id/treatment-session"} element={<PatientSession />} />
          <Route path={"/patient/:patient_id"} element={<PatientDetail />} />
        </Route>        
        <Route path={"*"} element={<NothingFoundBackground  />} />
      </Routes>      
    </>
  )

}