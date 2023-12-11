# Patient Record API

- [Patient Record API]
    - [Create Patient Record]
        - [Create Patient Record Request]
        - [Create Patient Record Response]
    - [Get Patient Record]
            - [Get Patient Record Request]
        - [Get Patient Record Response]
    - [Update Patient Record]
            - [Update Patient Record Request]
        - [Update Patient Record Response]
    - [Delete Patient Record]
            - [Delete Patient Record Request]
        - [Delete Patient Record Response]

<div align="center">

<img src="assets/BuberBreakfastUiUx.png" alt="drawing" width="1000"/>

 [![GitHub Stars](https://img.shields.io/github/stars/amantinband/buber-breakfast.svg)](https://github.com/amantinband/buber-breakfast/stargazers) [![GitHub license](https://img.shields.io/github/license/amantinband/buber-breakfast)](https://github.com/amantinband/buber-breakfast/blob/main/LICENSE)

---

### This is the source code of the [CRUD REST API from scratch using .NET 6 tutorial](https://youtu.be/PmDJIooZjBE)

</div>

- [Overview](#overview)
- [Service Architecture](#service-architecture)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Usage](#usage)
- [API Definition](#api-definition)
  - [Create Patient Record](#create-patientrecord)
    - [Create Patient Record Request](#create-patientrecord-request)
    - [Create Patient Record Response](#create-patientrecord-response)
  - [Get Patient Record](#get-patientrecord)
    - [Get Patient Record Request](#get-patientrecord-request)
    - [Get Patient Record Response](#get-patientrecord-response)
  - [Update Patient Record](#update-patientrecord)
    - [Update Patient Record Request](#update-patientrecord-request)
    - [Update Patient Record Response](#update-patientrecord-response)
  - [Delete Patient Record](#delete-patientrecord)
    - [Delete Patient Record Request](#delete-patientrecord-request)
    - [Delete Patient Record Response](#delete-patientrecord-response)
- [Credits](#credits)
- [VSCode Extensions](#vscode-extensions)
- [Disclaimer](#disclaimer)
- [License](#license)

---

# Overview

In the API, a CRUD REST API from scratch using .NET 6 is created.
As you would expect, the backend system supports Creating, Reading, Updating and Deleting patient Records.

# Service Architecture

<div align="center">

<img src="assets/BackendServiceArchitecture.png" alt="drawing" width="700px"/>

</div>

# Technologies

<div align="center">

<img src="assets/Technologies.png" alt="drawing" width="700px"/>

</div>

# Architecture

<div align="center">

<img src="assets/Architecture.png" alt="drawing" width="700px"/>

</div>

# Usage

Simply `git clone project link` and `dotnet run --project project sln name`.

# API Definition


## Create Patient Record

### Create Patient Record

```js
POST /patientrecords
```

```json
{
    "patientId": "P00001",
    "firstName": "Peter",
    "lastName": "Chan",
    "dateOfBirth": "1980-05-15",
    "gender": "Male",
    "contactInformation": 
    {
      "email": "peterchan@gmail.com",
      "phone": "111-1111-1111",
      "address": 
      {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postalCode": "A1A1A1"
      }
    },
    "medicalHistory": 
    {
    "allergies": ["Penicillin"],
    "conditions": ["Hypertension"],
    "medications": ["Aspirin"]
    },
    "appointments": [
    {
      "date": "2023-11-10",
      "doctor": "Dr. Smith",
      "notes": "Follow-up appointment"
    },
    {
      "date": "2024-02-22",
      "doctor": "Dr. Johnson",
      "notes": "Annual check-up"
    }
  ]
}
```

### Create Patient Record Response

```js
201 Created
```

```yml
Location: {{host}}/patientrecords/{{id}}
```

```json
{
    "patientId": "P00001",
    "firstName": "Peter",
    "lastName": "Chan",
    "dateOfBirth": "1980-05-15",
    "gender": "Male",
    "contactInformation": 
    {
      "email": "peterchan@gmail.com",
      "phone": "111-1111-1111",
      "address": 
      {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postalCode": "A1A1A1"
      }
    },
    "medicalHistory": 
    {
    "allergies": ["Penicillin"],
    "conditions": ["Hypertension"],
    "medications": ["Aspirin"]
    },
    "appointments": [
    {
      "date": "2023-11-10",
      "doctor": "Dr. Smith",
      "notes": "Follow-up appointment"
    },
    {
      "date": "2024-02-22",
      "doctor": "Dr. Johnson",
      "notes": "Annual check-up"
    }
  ]
}
```

## Get Patient Record

### Get Patient Record Request

```js
GET /patientrecords/{{id}}
```

### Get Patient Record Response

```js
200 Ok
```

```json
{
    "patientId": "P00001",
    "firstName": "Peter",
    "lastName": "Chan",
    "dateOfBirth": "1980-05-15",
    "gender": "Male",
    "contactInformation": 
    {
      "email": "peterchan@gmail.com",
      "phone": "111-1111-1111",
      "address": 
      {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postalCode": "A1A1A1"
      }
    },
    "medicalHistory": 
    {
    "allergies": ["Penicillin"],
    "conditions": ["Hypertension"],
    "medications": ["Aspirin"]
    },
    "appointments": [
    {
      "date": "2023-11-10",
      "doctor": "Dr. Smith",
      "notes": "Follow-up appointment"
    },
    {
      "date": "2024-02-22",
      "doctor": "Dr. Johnson",
      "notes": "Annual check-up"
    }
  ]
}
```

## Update Patient Record

### Update Patient Record Request

```js
PUT /patientrecords/{{id}}
```

```json
{
    "patientId": "P00001",
    "firstName": "Peter",
    "lastName": "Chan",
    "dateOfBirth": "1980-05-15",
    "gender": "Male",
    "contactInformation": 
    {
      "email": "peterchan@gmail.com",
      "phone": "111-1111-1111",
      "address": 
      {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postalCode": "A1A1A1"
      }
    },
    "medicalHistory": 
    {
    "allergies": ["Penicillin"],
    "conditions": ["Hypertension"],
    "medications": ["Aspirin"]
    },
    "appointments": [
    {
      "date": "2023-11-10",
      "doctor": "Dr. Smith",
      "notes": "Follow-up appointment"
    },
    {
      "date": "2024-02-22",
      "doctor": "Dr. Johnson",
      "notes": "Annual check-up"
    }
  ]
}
```

### Update Patient Record Response

```js
204 No Content
```

or

```js
201 Created
```

```yml
Location: {{host}}/patientrecords/{{id}}
```

## Delete Patient Record

### Delete Patient Record Request

```js
DELETE /patientrecords/{{id}}
```

### Delete Patient Record Response

```js
204 No Content
```

# VSCode Extensions

- [VSCode Rest Client](https://github.com/Huachao/vscode-restclient) - REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.

- [VSCode Markdown Preview Enhanced](https://github.com/shd101wyy/vscode-markdown-preview-enhanced) - Markdown Preview Enhanced is an extension that provides you with many useful functionalities for previewing markdown files.
