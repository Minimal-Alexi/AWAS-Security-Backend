# AWAS Course Insecure Backend

## Introduction
This is the backend API made for the AWAS course at Metropolia. The goal is to make an insecure web application, in order to learn about the vulnerabilities you need to keep an eye for during web development. For the purposes of the project, we will cover the following vulnerabilities:

* Bypassing client side controls - The frontend will allow hackers to gain admin privilleges using hidden forms in the website.
* Session Management Attacks - The backend will only return the users ID,instead of a JSONWebToken, meaning that users can edit their own tokens in order to access other users valuable data.
* XSS Attacks - A support forum will be used in order to allow for XSS attacks.

This is the backend repository, the frontend repository is [here](https://github.com/VitaliiVIP/AWAS-frontend).

## Tech Stack

Backend - <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  /> <br>
Frontend - 
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" /> <br>
Database - 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo"  />

## Setup
1. Clone the git repository
2. Run npm install and npm build
3. Install postgreSQL.
4. Run the ./db/init.sql schema.
5. Edit .env.template with the required PostgreSQL credentials, then rename the file to .env

All done, should be good to go!
