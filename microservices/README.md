# Microservices




### Naming Convention: **Service** vs **Manager**

- **Service**: Used for microservices that **perform specific tasks** or provide functionality, such as processing, external interactions, or task execution. These do not manage the lifecycle of entities.
  - Example: `auth_service`, `notification_service`

- **Manager**: Used for microservices that **manage entities or resources**, handling CRUD operations and maintaining state for those entities.
  - Example: `user_account_manager`, `patient_manager`
