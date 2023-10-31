<h1 align="center">Foo CoCM Registry</h1>
<p align="center">A free and open-source healthcare webapp to run Collaborative Care from the Akello team.</p>
<p align="center">
  <a href="https://github.com/medplum/foomedical/actions">
    <img src="https://github.com/medplum/foomedical/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="https://github.com/medplum/foomedical/blob/main/LICENSE.txt">
    <img src="https://img.shields.io/badge/license-Apache-blue.svg" />
  </a>
  <a href="https://sonarcloud.io/project/overview?id=medplum_foomedical">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=medplum_foomedical&metric=alert_status&token=3760929adde88ce7da87782be8d811f8b5cec0f4" />
  </a>
</p>

![Foo Medical Screenshot](screenshot.png)

### What is Foo Medical?

### Features

- patient referrals
- measurement based care

Foo Medical is designed to be forked and customized for your business' needs. Register on [foomedical.com](https://foomedical.com/) to see it in action.

### Getting Started

First, fork and clone the repo.

Next, install the server from your terminal

```bash
cd packages/server 
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
The server will be running on `http://localhost:8000/`

Then, run the app!

```bash
cd packages/apps/cocm-registry
npm install
npm run start
```

This app should run on `http://localhost:3000/`

Log into the app on localhost using the same credentials you created on [foomedical.com](https://foomedical.com/) and you are ready to start customizing.

