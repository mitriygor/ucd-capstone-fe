# React Serverless ToDo application

The application is a simple cloud based ToDo application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, create a todo items, and process them.

The project is split into two parts:
1. [The Simple Frontend](https://github.com/mitriygor/ucd-capstone-fe):
basic React client web application which consumes the RestAPI Backend based on AWS Lambdas. 
2. [The serverless RestAPI](https://github.com/mitriygor/ucd-capstone-backend): a Node-Express feed microservice.

## Getting Setup

### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

### Installing React Cli
The React Command Line Interface is required to serve and build the frontend. Instructions for installing the CLI can be found in the:
1. [NPM create-react-app repo](https://www.npmjs.com/package/create-react-app)
2. [Official documentation](https://create-react-app.dev/docs/getting-started/)

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```
>_tip_: **npm i** is shorthand for **npm install**


### Building the Static Frontend Files
The application uses AWS Amplify as delivery pipeline. In order to build the app, the command is
```bash
npm run build
```
