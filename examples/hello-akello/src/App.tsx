import {
  LoginPage,
  ReportsPage,
  CreateRegistryPage,
  ForgotPasswordPage,
  RegistrySecurityPage,
  ReferPatientStepper,
  PatientDetail,
  PatientReferralPage,
  SignUpPage,
  RegistryShell,
  PatientSession,
  NothingFoundBackground,
  ChangePasswordPage,
  PaymentCompleted,
  MeasurementsPage
} from '@akello/react';
import { SignUpConfirmPage } from '@akello/react';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { RegistryPage } from '@akello/react';
import { useNavigate } from 'react-router';



export default function App() {
  const [_, drawerHandlers] = useDisclosure();
  const akello = useAkello();
  const {pathname} = useLocation();
  const patient_id = akello.getSelectedPatientRegistry()?.id;
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  }

  if(akello.accessToken == undefined) {
    return (
      <Routes>
        <Route path={"/"} element={<LoginPage onNavigate={onNavigate}  />} />
        <Route path={"/forgot-password"} element={<ForgotPasswordPage  onNavigate={onNavigate}/>} />
        <Route path={"/signup"} element={<SignUpPage onNavigate={onNavigate}/>} />
        <Route path={"/signup/confirm"} element={<SignUpConfirmPage onNavigate={onNavigate} />} />
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    )
  }


  return (
    <>
      <Routes>
        {
          akello.getSelectedRegistry() == undefined && (
            <Route path={"/create-registry"} element={<CreateRegistryPage onNavigate={onNavigate}  />} />
          )
        }
        <Route path="/" element={<RegistryShell onNavigate={onNavigate}  pathname={pathname} Outlet={Outlet} />}>
          <Route index element={<RegistryPage drawerHandlers={drawerHandlers} onNavigate={onNavigate} patient_id={patient_id} />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/payment-completed" element={<PaymentCompleted />} />
          <Route path="/registry" element={<RegistryPage drawerHandlers={drawerHandlers} onNavigate={onNavigate} patient_id={patient_id} />} />
          <Route path="/security" element={<RegistrySecurityPage onNavigate={(path: string) => navigate(path)} />} />
          <Route path="/measurements" element={<MeasurementsPage />} />
          <Route path='/first-patient' element={<ReferPatientStepper onNavigate={onNavigate} />} />
          <Route path="/registry/:patient_id" element={<RegistryPage drawerHandlers={drawerHandlers} onNavigate={onNavigate} patient_id={patient_id} />} />
          <Route path={"/reports"} element={<ReportsPage />} />
          <Route path={"/patient-referral"} element={<PatientReferralPage onNavigate={onNavigate}  />} />
          <Route path={"/patient/:patient_id/treatment-session"} element={<PatientSession onNavigate={onNavigate}  />} />
          <Route path={"/patient/:patient_id"} element={<PatientDetail onStartSession={() => navigate('/patient/' + (akello.getSelectedPatientRegistry()?.id ?? '') + '/treatment-session')} />} />
        </Route>
        <Route path={"/signup"} element={<Navigate to={"/"} />}  />
        <Route path={"*"} element={<NothingFoundBackground  onBackToHome={() => navigate('/')} />} />
      </Routes>
    </>
  )

}