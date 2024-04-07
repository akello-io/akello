# Akello Fast API Server

This package includes all the backend API services needed for Akello. You can extend from the base server and add new endpoints to override any behavior.

## Run local

Make sure the following dependencies are met with your system
* Docker is running
* AWS cli is configured (needed for Cognito and DynamoDB docker containers)

```shell
pip install akello
akello start server
```

After the script completes you will be able to access the API on http://localhost:8000

