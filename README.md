# Playwright Automation Framework with TypeScript

## Overview

SauceLabAutomation has provided user a demo shopping experience where a user will login, add/remove some product into the cart and complete the order.

This project is an automation framework built with Playwright, Mocha, and TypeScript. we have adopted the page object model approach which has focused on chaining all the pages in the E2E flow, initialize the locators and declare methods for individual actions.

It is designed to facilitate end-to-end testing for both web applications and Mobile, providing a scalable and maintainable structure.

## Features

- **TypeScript:** Strongly typed language to catch errors early and improve code quality.
- **Playwright:** Provides a robust and flexible automation tool.
- **Page Object Model:** Design pattern to enhance code reusability and maintainability.
- **Cross-Browser Testing:** Configuration to run tests across different browsers.
- **Mobile-Device Testing:** Configuration to run tests across Mobile emulators.
- **Reports:** Detailed test execution reports using the Spec reporter.

## Folder Structure

|-- test

| |-- pageobjects

|   |-- ApplicationHomePage.ts

|   |-- UserHomePage.ts

|   |-- UserCart.ts

|   |-- YourInformationPage.ts

|   |-- CheckoutInformationPage.ts

|   |-- CheckOutCompletePage.ts

| |-- base
|   |-- baseFixture.ts

|   |-- registrationsystemtest.ts

|   |-- webcasteventcreation.ts

| |-- testData

|   |-- ApplicationHome_Data.json

|   |-- CheckOutComplete_Data.json

|   |-- CheckOutInformation_Data.json

|   |-- UserCart_Data.json

|   |-- UserHome_Data.json

|   |-- YourInformation_Data.json

| |-- tests

|   |-- E2E Test

|   	|-- 01_Validate_StandardUser_E2E.spec.ts

|   	|-- 02_Validate_LockedUser_E2E.spec.ts

|   	|-- 03_Validate_ProblemUser_E2E.spec.ts

|   	|-- 04_Validate_PerformanceGlitch_User_E2E.spec.ts

|   	|-- 05_Validate_ErrorUser_E2E.spec.ts

|   	|-- 06_Validate_VisualUser_E2E.spec.ts

|-- .env

|   |-- .env.uat

|-- reports

|-- package.json

|-- tsconfig.json

|-- README.md




## Getting Started

In order to get started, you will need to have Node.js, Typescript, npm, 
Playwright libraries installed.

 - Node.js: Download and install from Node.js official site.
  
 - npm: Comes bundled with Node.js. Verify installation by running: **npm -v**
  
 - TypeScript: Install globally by running **npm install -g typescript**
  
 - Playwright Libraries: Install the necessary Playwright packages
  
 - **npm install --save-dev @playwright/test**
  
  Source - This project is out on GIT

### Prerequisites

- Node.js (v12 or higher)
- npm 

### Installation

1. **Clone the repository:**

   git clone "repo path"
   cd your-repo

2. **install Dependencies:**
   Run `npm install` from either the command line/terminal window in that project, 
   or from the terminal within VS Code when the project is open.
   npm install

3. **Configuration:**
   The main configuration file is located at playwright.config.ts You can modify the following sections as per your requirements:

    Project: Add or remove services like Browser, Device, etc.
    Reporters: Configure test reporters for generating reports.

4. **Running Tests:**
     Switch-into your Workspace **cd yourworkspacepath**

   run cmd **npm run <defined test script>**
