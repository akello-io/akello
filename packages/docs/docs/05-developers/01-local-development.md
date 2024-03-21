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



### Local Development

Once you have your environment up and running you want to make sure packages in your local packages/* are being built such as `@akello/core`, `@akello/react`, `@akello-medical`, `@akello-insights` so that your project is using the latest version of code for your branch. 

The `dev-build.sh` script fround at the root of the repo can be used as a quick tool to help build all the modules for you. This isn't currently automated, and will be in the near future.

```shell
sh dev-build.sh   # run this script to have all the local packages built
```
