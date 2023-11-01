# [akello](https://www.akello.io) &middot; [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=akello-io_akello&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=akello-io_akello)

![Alt text](/assets/banner.png "akello")

Akello is a developer platform that enables flexible and rapid development of population health apps

- **Akello Registry** - Complete platform to run Measurement Based Care (MBC) programs.
- **Akello Insights** - Tools for analytics and insights into population models.
- **Akello API** - API's to help build personalized workflows
- **Akello SDK** - Client libraries that simplify the process of interacting with the **Akello API**.
- **Akello App** - Web application where you can view your data and perform basic editing tasks. You can also use the Akello App to manage basic workflows.


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
│   ├── apps               # On-premise agent
│   ├── cdk                # AWS CDK
│   ├── cli                # cli
│   ├── docs               # docs
│   ├── examples           # run examples
│   ├── react-components   # react components
│   ├── react-core         # react core
│   ├── server             # api's
└── scripts                # scripts
```

## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2023

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
