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



### Run local dev

```shell
sh dev-build.sh   # run this script to have all the local packages built
```
