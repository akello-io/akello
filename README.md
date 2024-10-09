<a href="https://akello.io" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/akello-logo-white.png" style="max-width: 100%; height: 50px; margin-bottom: 20px">
    <img src="/assets/akello-logo.png" alt="Akello Logo" height="50"/>
  </picture>
</a>
<h3></h3>

> ✨ Join our Discord [here](https://discord.gg/WSqNrWBKKw)


**Akello** – A modular, secure platform to simplify healthcare service integration using microservices.

Akello is an open-source platform designed to streamline the integration of diverse healthcare services via microservices. It offers **flexibility** and **scalability**, empowering developers and organizations to build robust infrastructures quickly and securely.

At the heart of Akello’s service integration is a **secure message bus** that enables seamless communication between microservices. The message bus automates workflows and event handling, allowing services to trigger actions across the platform while ensuring security and data integrity. This is particularly critical in healthcare, where sensitive data and complex systems need to interoperate without compromising safety.

## Why Akello?

Akello is not just a development framework—it's a comprehensive solution to unify disparate healthcare services. Designed to support everything from patient management systems to AI-driven diagnostics, Akello places interoperability and security at the forefront, ensuring:

- **Security**: With centralized identity and access management, token-based authentication, encryption for both data at rest and in transit, and a zero-trust architecture, Akello ensures robust protection of sensitive healthcare data. Service-level access control allows microservices to define their data accessibility rules within this secure framework.
- **Interoperability**: Easily integrate healthcare standards such as FHIR, SNOMED, LOINC, and DICOM, ensuring seamless communication across systems.
- **Scalability**: Akello's modular, flexible architecture allows your system to grow without compromise, adapting to the evolving needs of healthcare infrastructure.
- **Message-Driven Architecture**: Akello's message bus acts as the backbone of service interaction, enabling services to connect effortlessly, monitor events, and automate workflows based on triggers—making your system responsive and dynamic.
- **Community-Driven**: Akello thrives through community involvement, inviting contributions from developers, healthcare professionals, and enthusiasts to continually enhance the platform.

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
├── microservices
│   ├── account       # account service
│   ├── auth          # supertoken auth service
│   ├── huggingface   # microservice integrating huggingface models
│   ├── neurology     # BCI, eye tracking data services
│   ├── registry      # Run a clinical trial across a patient population
├── packages
│   ├── core          # core python lbiraries
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
