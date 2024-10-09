<a href="https://akello.io" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/akello-logo-white.png" style="max-width: 100%; height: 50px; margin-bottom: 20px">
    <img src="/assets/akello-logo.png" alt="Akello Logo" height="50"/>
  </picture>
</a>
<h3></h3>

> ✨ Join our Discord [here](https://discord.gg/WSqNrWBKKw)


**Akello** is an open-source platform designed to streamline the integration of diverse healthcare services via microservices. It offers **flexibility** and **scalability**, empowering developers and organizations to build robust infrastructures quickly and securely.

Through its **secure message bus**, Akello facilitates seamless communication between services, ensuring efficient event handling and action triggers across your applications. This is particularly important for handling healthcare data, where security and data integrity are critical.

### Why Akello?

Akello is not just a development framework—it's a solution to **unify disparate healthcare services**. With an architecture that supports everything from **patient management systems** to **AI-driven diagnostics**, Akello brings interoperability to the forefront, ensuring:

- **Security**: With service-level access control, all microservices define their data accessibility rules.
- **Interoperability**: Easily integrate standards like **FHIR**, **SNOMED**, **LOINC**, and **DICOM**.
- **Scalability**: Modular and flexible, allowing your system to grow without compromise.
- **Community-Driven**: Akello thrives through community involvement, and we invite contributions from developers, healthcare experts, and enthusiasts.

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


## Message Bus
The message bus is the backbone of Akello’s service integration. It allows you to:

- Add new services and connect them effortlessly.
- Monitor and react to events happening across the platform.
- Automate workflows based on these events, making your system responsive and dynamic.
- Each service retains full control over its data by defining secure access for other services through the message bus.


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
