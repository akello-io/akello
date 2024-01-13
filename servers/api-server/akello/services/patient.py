from akello.services import BaseService


class PatientService(BaseService):

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    def refer_patient(self, patient, registry, user):
        pass


class PatientSessionService(BaseService):

    #TODO: We need decorator for permissions
    #TODO: We need to add logging
    def record_session_initial_treatment(self):
        pass

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    def record_session_follow_up(self):
        pass

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    def record_relapse_prevention(self):
        pass


class BillingService(BaseService):

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    def get_monthly(self, registry):
        pass