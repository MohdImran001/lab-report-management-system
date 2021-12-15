# Reports Management App for Pathology Lab

This project is developed for a client who runs a pathology lab in Delhi, India. Although there are softwares available in the market for this purpose but they are bulky, difficult to use, hard on the eyes and they don't offer customizations. The client wanted a software which fulfill his requirements, easy to use, and can be accessed from anywhere without the hassle of any installation process.

This pathology lab conducts full body examination of candidates who are migrating to other countries.
This project is being used by the lab, they create and manage 30-40 reports per day. In the past six months, this project helped them in generating more than 3000 reports.

## Overview

## [15th Dec 2021] New Updates

1. On some smartphones the QR code url for downloading reports was showing an error occured message. It was a cache related issue. Now whenever the report templates are updated, the app will ask user to reload the page to keep the Cache storage in sync.
2. Minor Design changes in report templates.

### [27th Nov 2021] New Updates

1. **QR Code Support** - Reports will now have a QR Code. This QR Code allows users to easily download the reports in thier smart phones. Thus, also verifying the integrity of the reports.
2. **Multi-user support** - Thanks to Firebase ACID Transactions, now multiple staff members of the lab can generate reports at the same time without any data conflict.
3. **Adhaar Card field**
4. **Age field is auto calculated using Date of Birth** -

### Features

- :bulb: Easy to use interface
- :lock: Secured with Firebase Authentication
- :star2: Generate reports directly in the browser
- :rocket: Perform all CRUD operations on reports. (Create, Read, Update, Delete)
- :pencil: Automatically increments the Serial number and Reference numbers of reports
- :fire: Find reports quickly using Real Time Search feature
- :v: Supports uploading candidate's photo with preview
- :zap: It stores report templates in cache storage of browser for faster access.

### How it works

- First of all, candidates basic information is entered in the app and a _Test Report_ is generated.
- _Test Report_ is filled by the doctor during examination process.
- After the examination process, the results are updated in the app and then _Final Report_ is generated.
- In case, some tests are pending the lab can easily switch between _Test Report_ and _Final Report_ using a checkbox.
- The lab can edit reports by finding them using the search bar. The reports page also provides quick actions buttons such as **edit**, **delete** and **download**.
- **Test** and **Final** reports templates are basically PDF Forms created with the help of Adobe Acrobat DC. An amazing library `pdflib.js` is used to fill these templates in the browser with the desired data.

### Try it out

You can play with this project here - https://lab-report-management-system.vercel.app/. This is a development version of the app. It already contains some prefilled reports for testing purposes.

Use the following credentials to access the dashboard-
**Email** - test@test.com
**Password** - test123

First time load is a little bit slow because it fetches the report templates and stores them in the Cache Storage. When the reports are cached, the pdf generation time reduces by **40%**.

## Upcoming Features

1.  **Generating a unique QR Code for every report.** - This feature is suggested by the lab to make it easy to verify the integrety of the report.

## Getting Started

### Running on your local machine

1. Clone this Github Repository
   `git clone https://github.com/MohdImran001/lab-report-management-system.git`
2. Run the following command in the project directory. This will install all the required dependencies.
   `npm install`
3. Create a new Firebase project and configure a web app in this project.
4. Add your firebase credentials to `.env.sample`.
5. Rename `.env.sample` this file to `.env.local`
6. Now run `npm start` to run the project.

## Understanding Code Structure

![](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Code Style

This Project uses ESLint with [Airbnb Style Guide for React.js and JavaScript](https://airbnb.io/javascript/)

### Backend

This project uses the following Firebase Services -

1. Firestore
2. Media Storage
3. Authentication

Firebase Media Storage is used to upload and manage photos of Candidates

### Frontend

This project is built entirely in **React.js** and is developed with `create-react-app` cli.

- All the source code is present inside `src` direcotry
- All the assets are present inside `public/assets` directory

### `src`

- `components` - all the reusable components reside here
- `contexts` - it stores the authentication context created with React Context API
- `pages` - It contains all the pages
- `services` - It contains the code that talks to firebase
- `utils` - It houses all the helper functions used in the app
- `constants.js` - This file stores all the constants values used in the app
- `firebase.config.js` - Firebase configuration file

### Dependencies

These are the additional dependencies used in the project other than default dependencies of `create-react-app`

1. **Craco** - _Create React App Configuration Override_, an easy and comprehensible configuration layer for create-react-app. It is used to setup Aliases for different paths in this project.
2. **Bootstrap** - Component based CSS framework
3. **Date-fns** - It provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript _dates_ in a browser & Node.js.
4. **Download.js** - For downloading files on client side.
5. **Firebase** - Officical javascript client for Google's Firebase
6. **Formik** - An easy to use library for building forms in React.js, without the tears.
7. **Pdf-lib** - It is a popular library to create and modify PDF documents in any JavaScript environment.
8. **React-bootstrap** - Bootstrap 4 components built with React
9. **Prop-Types** - It provides runtime type checking for React props
10. **React-hot-toast** - It creates lightweight, customizable and beautiful toast messages.
11. **React-router-dom** - Used for routing in React.js

### Hosting

![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
The project is deployed on **Vercel** and report templates are hosted on **Github Pages**

## License
