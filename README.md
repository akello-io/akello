<a href="https://akello.io" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/akello-logo-white.png" style="max-width: 100%; height: 50px; margin-bottom: 20px">    
    <img src="/assets/akello-logo.png" alt="Akello Logo" height="50"/>
  </picture>
</a>

<h3></h3>

> ✨ Join our Discord [here](https://discord.gg/WSqNrWBKKw) and checkout [akello.io](https://akello.io)

Full open source code to run akello.io's infrastructure and apps. The backend services code is written in Python and all front-end code is built suing React and Typescript.


## Overview of the Repo

```sh
akello/
├── agent                  # automated workflows / AI enablement
├── examples               # end-to-end examples using akello packages
├── packages
│   ├── cdk                # scripts to deploy to AWS
│   ├── cli                # cli tool to manage akello infra and apps
│   ├── core               # data models and API utilities
│   ├── docs               # docs hosted under docs.akello.io
│   ├── react              # React components and storybook
│   ├── react-hook         # React hooks
│   ├── server             # Fast API Server
```

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
