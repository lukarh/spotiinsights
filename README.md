# spotiinsights

## About
A live web-application deployed on Heroku that interacts with Spotify's Web API to allow users to gain insights to their Spotify usage.

## Languages, Tools, and Libraries/Packages
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## [Click Here to View the Live Web-Application](https://spotiinsights-7ca95654505a.herokuapp.com/spotify-overview)

Picture of Website:

![website](https://imgur.com/a/kVew5HD)

## Development

- Code: JavaScript using MERN Stack
- Framework: React.js
- Database: MongoDB
- Back-End: Express.JS, Axios, connect-mongo
- Front-End: Material UI, a React UI component library & NivoCharts
- APIs: Spotify Web API
- Additional: HTML, CSS

## Running the App Locally

This app runs on Node.js and you can find instructions on how to install Node.js on their [website](https://nodejs.org/download/).

After installing Node.js, clone the repository and install the dependencies of the client and server:

`$ cd client` then `$ npm install` then `$ npm start` to run the client

Open `http://localhost:3000` to view the application in your browser.

`$ cd server` then `$ npm install` then `$ nodemon` to run the server

Host the server locally on your computer.

### Application Credentials

This repository does not contain credentials for obvious reasons. To run this app locally, you will have to use your own credentials by registering for Spotify's Web API. Refer to the [Offical Spotify Documentation for Developers](https://developer.spotify.com/).

On the [Spotify Developer's Dashboard](https://developer.spotify.com/dashboard), goto your registered app and register the following Redirect URIs:

- http://localhost:3000/redirect

Once you've registered for Spotify's Developer API, create a .env file in the server folder and put in your following credentials:

`SPOTIFY_CLIENT_ID = "your-spotify-client-id"`

`SPOTIFY_CLIENT_SECRET = "your-spotify-client-secret"`

`SERVER_SECRET_KEY = "your-secret-key"`


