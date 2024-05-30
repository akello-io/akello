

# Microservices


## Account

Stores all information about the user account. This includes the user's name, email, password, and other information. The account service is responsible for creating, updating, and deleting user accounts.

* Organization
* User

## Authorizer

This service is called for every request to the API Gateway. It is responsible for verifying the token and checking if the user has the necessary permissions to access the requested resource.

* Verify the token
* Verify the user
 

## Clinical Billing

This service is responsible for managing the billing process for the clinic. It generates billing reports, sends alerts when billing thresholds are not met, and generates CPT codes for billing.

Teams: `Finance`, `Billing`, and `Clinical Operations`

* Build billing reports
* Generate CPT Codes for billing
* Send alerts related billing thresholds not met

## Measurement Based Care

This service is responsible for managing the measurement-based care process. It tracks patient progress, generates alerts when patients are not meeting treatment goals, and provides recommendations for treatment adjustments.

Teams: `Care Manager`, `Consulting Psychatrist`, and sometimes `Primary Care`

* Run Population Health Models
* Treat to Target
* Population Health Management

## Messages

This service is responsible for managing the messaging system. It allows users to send and receive messages, create message templates, and schedule messages to be sent at a later time.


* Send messages
* Receive messages

## Questionnaires

This service is responsible for managing the questionnaire system. It allows users to create, edit, and delete questionnaires, store questionnaire responses, and sync data to the EHR.

* Library of registered Questionnaires
* Stores Questionnaire Responses
* Syncs data to EHR
* Stores in FHIR data format

--------
Template for the microservices structure

```
service/  # application code
|--- adapters/  # implementation of the ports defined in the domain
     |--- tests/  # adapter unit tests
|--- entrypoints/  # primary adapters, entry points
     |--- api/  # api entry point
          |--- model/  # api model
          |--- tests/  # end to end api tests
|--- domain/  # domain to implement business logic using hexagonal architecture
     |--- command_handlers/  # handlers used to execute commands on the domain
     |--- commands/  # commands on the domain
     |--- exceptions/  # exceptions defined on the domain
     |--- model/  # domain model
     |--- ports/  # abstractions used for external communication
     |--- tests/  # domain tests
|--- libraries/  # 3rd party libraries used by the Lambda function
infra/  # infrastructure code
```

## Unit Test
```mermaid
export AKELLO_UNIT_TEST=True
poetry shell
python -m unittest
```


* [Hexagonal Architecture](https://www.arnaudlanglade.com/hexagonal-architecture-by-example/)
* [Project structure reference](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/structure-a-python-project-in-hexagonal-architecture-using-aws-lambda.html)
* [Understanding Commands and Command Handler Pattern](https://www.arnaudlanglade.com/command-handler-patterns/#:~:text=A%20command%20is%20an%20object,behavior%20(a%20data%20structure))

