<img src="/assets/akello-logo.png" alt="Akello Logo" height="100"/>


[![](https://dcbadge.vercel.app/api/server/WSqNrWBKKw)](https://discord.gg/WSqNrWBKKw)

## What's Akello?

Akello enables clinical services to run and bill for Collaborative Care (CoCM). It's an open-source platform that features:

- A streamlined Patient Registry.
- Easy management of multiple registries.
- Customizable tools for population assessment.
- Efficient time tracking for billing.
- Easy to customize styles and branding.
- AWS Infrastructure scripts to host and run your own registry.


## Overview of the Repo

### Folder structure

```sh
akello/
├── agent                  # automated workflows / AI enablement
├── cloudstack         # AWS CDK scripts to setup akello infra
├── examples               # end-to-end examples using akello packages
├── packages   
│   ├── app                # app code for app.akello.io
│   ├── cdk                # app code for app.akello.io
│   ├── cli                # app code for app.akello.io
│   ├── core               # data models and API utilities
│   ├── docs               # docs hosted under docs.akello.io
│   ├── react              # React components and storybook
│   ├── react-hook         # React components and storybook
│   ├── server             # Fast API Server

```


### Setting up your local environment

> :warning: **You shouldn't need to use aws for local install**: Make sure you have Docker installed, there will be two Docker Containers running after you run the dev-setup script


REQUIRED SOFTWARE
- Python
- Node
- Docker
  

```shell
python3 -m venv .venv
source .venv/bin/activate
pip install packages/cli
akellocli setup
akellocli start server
akellocli start cocm
```


## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2024

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
