

1. Setup environment variables

From the root of this repository run

```console
pip install  -r requirements.txt
python scripts/akello.py setup
```

Add the environment vairables from the setup

```
Add the following to your .env file
-----------------------------------
export AWS_COGNITO_USERPOOL_ID=<userpool id>
export AWS_COGNITO_APP_CLIENT_ID=<app client id>
export AWS_DYNAMODB_TABLE='akello-local'
export AKELLO_API_URL=http://127.0.0.1:8000/v1
export AKELLO_COGNITO_URL=http://localhost:9229
export AKELLO_DYNAMODB_LOCAL_URL=http://localhost:8001
```

2. Run the server

From the server folder
```
pip install -r requirements.txt
uvicorn main:app --reload
```

3. Start the app

From the app folder

```
pnpm i
pnpm dev
```