---
sidebar_position: 1
---

# Local Development

### Setting up your local environment

Run the setup local script and add the environment variables into your environment file (e.g., ~/.zshrc)

```shell
sh dev-setup-local.sh    # sets up Local instance of DynamoDB and AWS Cognito
```


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

When you signup as a new user, the local SMS confirmation code is set to `1234` for local development



### Local Development

Once you have your environment up and running you want to make sure packages in your local packages/* are being built such as `@akello/core`, `@akello/react`, `@akello-medical`, `@akello-insights` so that your project is using the latest version of code for your branch. 

The `dev-build.sh` script fround at the root of the repo can be used as a quick tool to help build all the modules for you. This isn't currently automated, and will be in the near future.

```shell
sh dev-build.sh   # run this script to have all the local packages built
```
