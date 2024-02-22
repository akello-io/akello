"""
* Schedule / Create an appointment
* Reschedule an appointment
* Cancel an appointment
* Get all appointments
* Get all appointments for a specific user
* Attach a questionnaire to an appointment


1. Schedule / Create an appointment with a patient
- Attach a service type for the appointment which includes the screeners (PHQ-9, GAD-7, etc)
- Update Appointment if the patient shows up
- Update Appointment if the patient does not show up


Use a Service Request to get a patient to complete a screener:

{
  "resourceType": "ServiceRequest",
  "id": "service-request-phq9",
  "status": "active",
  "intent": "order",
  "code": {
    "coding": [
      {
        "system": "http://example.org/service-code",
        "code": "PHQ9",
        "display": "PHQ-9 Depression Screening"
      }
    ]
  },
  "subject": {
    "reference": "Patient/example-patient",
    "display": "Jane Doe"
  },
  "encounter": {
    "reference": "Encounter/example-encounter"
  },
  "occurrenceDateTime": "2024-03-01T09:00:00Z",
  "requester": {
    "reference": "Practitioner/example-practitioner",
    "display": "Dr. Smith"
  }
}


Use an Extenion on an Episode of care to attach screening progress
* EncounterHistroy can be attached to an episode of care


"""
