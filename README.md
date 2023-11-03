# [akello](https://www.akello.io) &middot; [![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/akello-io/akello/blob/main/LICENSE)  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=akello-io_akello&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=akello-io_akello)  [![Coverage Status](https://coveralls.io/repos/github/akello-io/akello/badge.svg?branch=main)](https://coveralls.io/github/akello-io/akello?branch=main) [![demo.akello.io deploy](https://github.com/akello-io/akello/actions/workflows/deploy-fast-api-server.yml/badge.svg?branch=main)](https://github.com/akello-io/akello/actions/workflows/deploy-fast-api-server.yml)

![Alt text](/assets/banner.png "akello")

Akello is a developer platform that enables flexible and rapid development of population health apps

- **Akello Registry** - Complete platform to run Measurement Based Care (MBC) programs.
- **Akello Insights** - Tools for analytics and insights into population models.
- **Akello API** - API's to help build personalized workflows
- **Akello SDK** - Client libraries that simplify the process of interacting with the **Akello API**.
- **Akello App** - Web application where you can view your data and perform basic editing tasks. You can also use the Akello App to manage basic workflows.



## Quick start guide

> **Warning**
For local development you will need a free AWS account with cognito pools created. Please reference AWS docs.


The best way to start working with akello and seeing how it works is by trying out one of our examples under /examples

Example Docs
 * [Run your own custom API with akello](https://github.com/akello-io/akello/blob/main/examples/foo-api)


## CoCM Registry App

![Alt text](/assets/app-screenshot.png "akello")

## Docs
- [Contributing](#contributing)
  - [Ground Rules](#ground-rules)
  - [Codebase](#codebase)
    - [Technologies](#technologies)
    - [Folder Structure](#folder-structure)


## Contributing

### Ground Rules

#### Contributions and discussion guidelines

By making a contribution to this project, you are deemed to have accepted the [Developer Certificate of Origin](https://developercertificate.org/) (DCO).

All conversations and communities on Akello are expected to follow GitHub's [Community Guidelines](https://help.github.com/en/github/site-policy/github-community-guidelines)
and [Acceptable Use Policies](https://help.github.com/en/github/site-policy/github-acceptable-use-policies). We expect
discussions on issues and pull requests to stay positive, productive, and respectful. Remember: there are real people on
the other side of the screen!

#### Reporting a bug or proposing a new feature

### Writing documentation or blog content

#### Fixing a bug or implementing a new feature

### Codebase

#### Technologies

With the ground rules out of the way, let's talk about the coarse architecture of this mono repo:

Here is a list of all the big technologies we use:

- **DynamoDB**: Data storage
- **Python**: For all backend services
- **Fast API**: API server
- **TypeScript**: Type-safe JavaScript
- **React**: Frontend React app


#### Folder structure

```sh
akello/
├── packages
│   ├── apps               # Client apps (mobile and web)
│   ├── cdk                # AWS CDK scripts to setup infrastructure
│   ├── cli                # CLI tools to manage running environments
│   ├── docs               # docs hosted under docs.akello.io 
│   ├── server             # REST API's built with Python Fast API
└── scripts                # General helper scripts (placeholder for now)
```

## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2023

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
