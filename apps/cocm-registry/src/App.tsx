import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import Header from './components/Header';
import { AppShell, NavLink, Container} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RegistryPage from './pages/registry/RegistryPage';
import AppHomePage from './pages/AppHomePage';
import { useEffect, useState } from 'react';
import { IconHome2, IconTable, IconGauge, IconUserCircle, IconReportAnalytics } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import DashboardPage from './pages/registry/DashboardPage';
import TeamPage from './pages/registry/TeamPage';
import ReportsPage from './pages/registry/ReportsPage';
import PatientReferralPage from './pages/registry/PatientReferralPage';
import PatientDetail from './components/PatientDetail';
import CreateRegistryPage from './pages/CreateRegistryPage';
import RegistryShell from './components/RegistryShell';
import AkelloAppShell from './components/AkelloAppShell';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PatientSession from './pages/registry/PatientSession';



export default function App() {
  const [opened, drawerHandlers] = useDisclosure({ initialOpened: true });  
  const akello = useAkello();
  const navigate = useNavigate();

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
        <Route path={"/"} element={<AkelloAppShell />} >
          <Route path={"/"} element={<AppHomePage drawerHandlers={drawerHandlers} />} />
          <Route path={"/create-registry"} element={<CreateRegistryPage />} />            
        </Route>        
        <Route path="/registry" element={<RegistryShell />}>
          <Route path={":registry_id"} element={<RegistryPage drawerHandlers={drawerHandlers} />} />
          <Route path={":registry_id/dashboard"} element={<DashboardPage />} />
          <Route path={":registry_id/team"} element={<TeamPage />} />
          <Route path={":registry_id/reports"} element={<ReportsPage />} />
          <Route path={":registry_id/patient-referral"} element={<PatientReferralPage />} />
          <Route path={":registry_id/patient/:patient_id/treatment-session"} element={<PatientSession />} />
        </Route>        
      </Routes>
      
    </>
  )

}