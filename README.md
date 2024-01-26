![Alt text](/assets/banner.png "Akello Banner")

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
  

```shell
sh run-setup.sh   # use the output to set your environment variables
sh run-local.sh   # new local users created will have a SMS code of `1234``
```


## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2024

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
