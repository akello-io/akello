# Akello FHIR Type Definitions

This library contains [TypeScript](https://www.typescriptlang.org/) type definitions for all [R4 types](https://www.hl7.org/fhir/valueset-resource-types.html).

## Installation

Add as a dependency:

```bash
npm install --save-dev @akello/fhirtypes
```

## Basic Usage

Consider the following untyped code:

```ts
const myPatient = {
  resourceType: 'Patient',
  name: 'George Washington',
};
```

Keen observers will note that `Patient.name` should not be a string. Instead, it should be an array of `HumanName` objects.

Let's add the type definition and see what happens:

```ts
import { Patient } from '@akello/fhirtypes';

const myPatient: Patient = {
  resourceType: 'Patient',
  name: 'George Wasington',
};
```
It should show an error on your IDE. Here is a well-formed example:

```ts
import { Patient } from '@akello/fhirtypes';

const myPatient: Patient = {
  resourceType: 'Patient',
  name: [
    {
      given: ['George'],
      family: 'Washington',
    },
  ],
};
```
