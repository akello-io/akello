# [akello](https://www.akello.io)

[![](https://dcbadge.vercel.app/api/server/WSqNrWBKKw)](https://discord.gg/WSqNrWBKKw)

## What's Akello?
Akello is an open-source developer platform dedicated to supporting integrated population health models. Our current focus is on the Collaborative Care (CoCM) clinical model, with the goal of assisting more clinics throughout the United States in adopting this approach.


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
│   ├── cli                # CLI tools to manage running environments
│   ├── docs               # docs hosted under docs.akello.io
│   ├── react-fhir         # React components designed for FHIR resource types
│   ├── react-insights     # React components for anything related to data/charts/insights
│   ├── react-medical      # React components for anything clinical (screeners, registry, etc)
├── scripts                # General helper scripts (placeholder for now)
└── server                 # React Fast API server
```


### Setting up your local environment

Run the setup local script

```shell
sh dev-setup-local.sh    # sets up Local instance of DynamoDB and AWS Cognito
```

Add the generated environment variable exports to the bottom of your environment file (e.g., ~/.zshrc)

![Alt text](/assets/setuplocal.png "local dev")

Run the API server
```shell
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn akello.main:app --reload
```

Run the React app

```shell
cd apps/cocm-registry
npm install
npm run start
```



## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2023

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
