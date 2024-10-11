# Microservices


### Naming Convention: **Orchestrator** vs **Service** vs **Manager**

- **Orchestrator**: Used for microservices that **coordinate workflows**, especially when leveraging systems like Temporal. These services manage the flow and execution of tasks across multiple components.
  - Example: `care_navigator_orchestrator`

- **Service**: Used for microservices that **perform specific tasks** or provide discrete functionality, such as data processing or external interactions. These are focused on execution rather than managing state or entities.
  - Example: `auth_service`, `notification_service`

- **Manager**: Used for microservices that **manage the lifecycle of entities** or resources, handling CRUD operations and maintaining state for those entities.
  - Example: `user_account_manager`, `patient_manager`

This naming convention ensures consistency by clearly reflecting each microservice's role in the architecture.
