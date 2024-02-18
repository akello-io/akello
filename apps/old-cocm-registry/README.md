# CoCM Registry


## Run the local mockserver

Create your .env files under the env folder with the following environment variables
```shell
REACT_APP_TEST_AWS_API=http://localhost:8000/v1
REACT_APP_TEST_AWS_REGION=xx
REACT_APP_TEST_AWS_COGNITO_USERPOOL_ID=xx
REACT_APP_TEST_AWS_COGNITO_USER_POOL_APP_CLIENT_ID=xx
```

> **Note**
<span style="color:red">⚠️ In LOCAL environment, the email confirmation for new sign up will always be 1234.</span>


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