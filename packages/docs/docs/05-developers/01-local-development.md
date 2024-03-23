---
sidebar_position: 1
---

# Local Development

### Setting up your local environment using the cli tool

Install the cli
```shell
python3 -m venv .venv
source .venv/bin/activate
pip install packages/cli
```

Get the environment variables and set it
```shell
akellocli setup
```

Start the server in one terminal
```shell
akellocli start server
```

Run the registry in another
```shell
akellocli start cocm
```


When you signup as a new user, the local SMS confirmation code is set to `1234` for local development

