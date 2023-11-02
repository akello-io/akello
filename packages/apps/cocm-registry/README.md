# CoCM Registry


> **Warning**
For local development you will need a free AWS account with cognito pools created. Please reference AWS docs.

## Run the local mockserver

Create your .env files under the env folder with the following environment variables
```shell
REACT_APP_TEST_AWS_API=http://localhost:8000/v1
REACT_APP_TEST_AWS_REGION=xx
REACT_APP_TEST_AWS_COGNITO_USER_POOL_ID=xx
REACT_APP_TEST_AWS_COGNITO_USER_POOL_APP_CLIENT_ID=xx
```

Install the dependencies
```shell
npm install
```

Run the mockserver 
```shell
mockserver -p 8000 -m mockserver/mocks
```

Start the web app with the mockserver
```shell
npm run start:mock
```