<a href="https://akello.io" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/akello-logo-white.png" style="max-width: 100%; height: 50px; margin-bottom: 20px">
    <img src="/assets/akello-logo.png" alt="Akello Logo" height="50"/>
  </picture>
</a>
<h3></h3>


**Akello is an open-source modular infrastructure platform designed to simplify healthcare service integration with microservices.** It provides developers with the flexibility, scalability, and security needed to build modern healthcare systems.

- **Secure message bus** for seamless microservice communication and workflow automation
- **Advanced security** features, including identity management, token-based authentication, encryption, and a zero-trust architecture
- **Interoperability** with healthcare standards such as FHIR, SNOMED, LOINC, and DICOM
- **Scalable, modular design** to adapt to growing and evolving healthcare infrastructure requirements
- **Community-driven development** that fosters collaboration and continuous innovation


---

### Get Started with Akello
To get up and running with Akello, clone the repository and launch the development server:

```sh
git clone git@github.com:akello-io/akello.git
cd akello
./dev-server.sh
```


## Overview of the Repo

```sh
akello
.
├── assets                   # Contains static assets such as images, files, or other media.
├── clusters                 # Cluster configuration for different domains and workloads.
│   ├── ai-ml-cluster        # Dedicated to AI/ML services for handling machine learning tasks.
│   ├── common               # Shared infrastructure or services used across multiple clusters.
│   ├── core-services-cluster # Manages core services like authentication, workflows, and essential services.
│   └── iot-cluster          # Handles IoT data and services, focusing on sensor data ingestion and processing.
├── deployment-scripts       # Scripts for deploying services, clusters, and managing infrastructure.
├── environments             # Configuration for different deployment environments.
│   ├── dev                  # Development environment configuration files.
│   └── test                 # Test environment configuration files.
├── microservices            # Collection of microservices that handle distinct features.
│   ├── auth_service         # Authentication service using Supertokens.
│   ├── care_navigator_orchestrator  # Orchestrates workflows for patient care navigation.
│   ├── ml_model_service     # Handles machine learning models, such as AI/ML for health services.
│   ├── patient_manager      # Manages patient-related data and operations.
│   ├── provider_manager     # Manages healthcare provider-related data and operations.
│   ├── sensor_data_service  # Ingests and processes data from sensors (e.g., wearables, medical devices).
│   └── user_account_manager # Manages user accounts, including patients and care providers.
└── packages                 # Core shared libraries and modules.
    └── core                 # Core Python libraries used across services.
```

Each microservice is designed to be self-contained, making it easier to develop, test, and deploy specific functionalities. New microservices can be added without disrupting the existing architecture, making Akello an ideal choice for modular application development.



## Contributing

Akello is a community-driven platform. Whether you're submitting an idea, fixing a typo, adding a new guide, or improving an existing one, your contributions are greatly appreciated!

Before contributing, read through the existing issues and pull requests to see if someone else is already working on something similar. That way you can avoid duplicating efforts.

If there are examples or guides you'd like to see, feel free to suggest them on the [issues page](https://github.com/akello-io/akello/issues).

If you'd like to contribute new content, make sure to read through our [contribution guidelines](https://akello.io/docs/developers/contributing). We welcome high-quality submissions of new examples and guides, as long as they meet our criteria and fit within the scope of the cookbook.


[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=akello-io/akello&machine=basicLinux32gb&location=EastUs)


## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2024

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
