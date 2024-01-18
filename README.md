![Alt text](/assets/banner.jpg "Akello Banner")

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
├── apps                   # client web and mobile apps
├── aws_cloudstack         # AWS CDK scripts to setup akello infra
├── examples               # end-to-end examples using akello packages
├── packages   
│   ├── cdk                # AWS CDK scripts to setup infrastructure
│   ├── docs               # docs hosted under docs.akello.io
│   ├── react-fhir         # React components designed for FHIR resource types
│   ├── react-insights     # React components for anything related to data/charts/insights
│   ├── react-medical      # React components for anything clinical (screeners, registry, etc)
├── scripts                # General helper scripts (placeholder for now)
└── servers                 
│   ├── api-server         # Fast API server
│   ├── fhir-server        # FHIR Server

```


### Setting up your local environment

> :warning: **You shouldn't need to use aws for local install**: Make sure you have Docker installed, there will be two Docker Containers running after you run the dev-setup script


REQUIRED SOFTWARE
- Python
- Node
  

Run the setup local script and add the environment variables into your environment file (e.g., ~/.zshrc)

```shell
sh dev-setup-local.sh    # sets up Local instance of DynamoDB and AWS Cognito
```


Run the API server
```shell
cd servers/api-server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn akello.main:app --reload
```

Run the React app

```shell
cd apps/cocm-registry
npm install
npm run start
```

When you signup as a new user, the local SMS confirmation code is set to `1234` for local development


## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2024

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
