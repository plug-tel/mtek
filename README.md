<h1 align="center">
 Mtek
  <br>
</h1>

<h4 align="center">Application de Gestion de Tâches pour M. TEK</h4>



<p align="center">
 <a href="#what is the Use of This Repo">What is the Use of This Repo</a> •
  <a href="#what is the project about?">What is the project about?</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#references">References</a> •
</p>

![screenshot](https://github.com/GmachMariem/mtek/blob/master/mtekdemo.gif)

# What is the Use of This Repo
This App is a Simple ReactJS and Springboot 2 App which uses

1. ReactJS
 * React Functional Components
 * HTTP Client using axios Library
 * Basic react Routing
 * React MaterielUi
2. SpringBoot 2
 * Springboot RestController
 * Service, Repository from Spring Framework
 * Autowiring is used as well to inject the Dependencies

# What is the project about?

A custom web application that would help better organize and manage daily tasks.

# How To Use

## Clone this repository
$ git clone https://github.com/GmachMariem/mtek

## Go into the repository
$ cd mtek

In the master branch, you have two different folders, client (the React app) and server (an SpringBoot application offering REST API endpoints).

The applications can be examined separately. 

## create a database in phpmyadmin with name: mtek

## Run the server app in intellijIde

You may run the React client:

## Install dependencies
$ npm install

## Run the client app
$ npm start

## Go to http://localhost:3000/Signup 
create a new user with username, email and a password
after creation done with success you will redirect to /home , where you can add new task, update you tasks or delete them.

## To run Unit testing
go to the  server-app\src\test\java\com\m\tek\controller\TacheControllerTest.java
and run the tests.

# References

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**React MaterialUi** : Refer to https://mui.com/material-ui/getting-started/ to understand how to use React Mui

**Springboot** : Refer to https://spring.io/guides/gs/rest-service/ to build REST service using Springboot

**axios** : Refer to https://www.npmjs.com/package/axios to know more about how to use axios library to make http requests



