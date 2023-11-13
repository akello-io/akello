# [akello](https://www.akello.io)

[![](https://dcbadge.vercel.app/api/server/WSqNrWBKKw)](https://discord.gg/WSqNrWBKKw)

## What is Akello?
Akello is an open-source platform dedicated to supporting integrated population health models. Our current focus is on the Collaborative Care (CoCM) clinical model, with the goal of assisting more clinics throughout the United States in adopting this approach.


## Quick start guide


The best way to start working with akello and seeing how it works is by trying out one of our examples under /examples

Example Docs
 * [Run your own custom API with akello](https://github.com/akello-io/akello/blob/main/examples/foo-api)


## Local Development

![Alt text](/assets/setuplocal.png "local dev")

Run the setup local script

```shell
sh dev-setup-local.sh    # sets up Local instance of DynamoDB and AWS Cognito
```

Add the generated environment variable exports to the bottom of your environment file (e.g., ~/.zshrc)

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

## CoCM Registry App

![Alt text](/assets/app-screenshot.png "akello")

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
│   ├── apps               # Client apps (mobile and web)
│   ├── cdk                # AWS CDK scripts to setup infrastructure
│   ├── cli                # CLI tools to manage running environments
│   ├── docs               # docs hosted under docs.akello.io 
│   ├── server             # REST API's built with Python Fast API
└── scripts                # General helper scripts (placeholder for now)
```


### Local development

#### App Development

Gets all the packages ready to locally import and build apps
```shell
sh dev-build.sh 
```

Try it out with an app under apps/

#### npm package development

- Make sure node_modules are generated for each package dependency
- Use storybook to test module development


## License

[Apache 2.0](LICENSE.txt)

Copyright &copy; Akello Health 2023

FHIR&reg; is a registered trademark of HL7.

SNOMED&reg; is a registered trademark of the International Health Terminology Standards Development Organisation.

LOINC&reg; is a registered trademark of Regenstrief Institute, Inc.

DICOM&reg; is the registered trademark of the National Electrical Manufacturers Association (NEMA).
