<a href="https://akello.io" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/akello-logo-white.png" style="max-width: 100%; height: 50px; margin-bottom: 20px">
    <img src="/assets/akello-logo.png" alt="Akello Logo" height="50"/>
  </picture>
</a>
<h3></h3>

> ✨ Join our Discord [here](https://discord.gg/WSqNrWBKKw)

Akello is an open-source platform that simplifies healthcare service integration using microservices. It offers flexibility, scalability, and strong security for developers building healthcare infrastructures.

- **Secure message bus** for efficient microservice communication and workflow automation
- **Robust security** with identity management, token-based authentication, encryption, and zero-trust architecture
- **Interoperability** with healthcare standards like FHIR, SNOMED, LOINC, and DICOM
- **Scalable, modular design** to meet evolving infrastructure needs
- **Community-driven** platform encouraging contributions for continuous improvement


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
akello/
├── environments
│   ├── dev
│   └── test
├── microservices
│   ├── account       # Account service
│   ├── auth          # Supertokens auth service
│   ├── huggingface   # Microservice integrating Hugging Face models
│   └── sensor        # Ingest data from sensors (e.g., BCI, blood pressure, wearables)
└── packages
    └── core          # Core Python libraries
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
