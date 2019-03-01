
# Readable App

## Project Overview

This is a content and comment web app. Users can post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users are also able to edit and delete posts and comments. All of the pre-populated posts, comments, and categories are sample data which are provided by the simple API server.

**Note:**  anyone can post, edit or delete or up/down vote posts and comments.

## Installing

### API Server

Before you can run this project, you need to install the local backend API server.

To install the API Server:

* Download or fork and clone the [server repository](https://github.com/udacity/reactnd-project-readable-starter)

* Navigate to the repository directory in your terminal

* Run the following code to install the development dependencies:
```
$ npm install
```

* After you have installed the development dependencies, run:
```
$ node server
```

### Running the App

To run the project in **development mode** in your local machine:

* Download or clone the repository in your computer:
```
$ git clone https://github.com/asaadb/readable-app.git
```

* Navigate to the repository directory in your terminal

* Run the following code to install the development dependencies:
```
$ npm install
```
 or
 ```
 $ yarn install
 ```

* start the development server with
```
$ npm start
```
or
```
$ yarn start
```
* open [http://localhost:3000](http://localhost:3000) to view the site in the browser.

To run the project in the **production mode**:
* Run:
```
$ npm run build
```
or
```
$ yarn build
```
This builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tools & dependencies

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [Redux](https://github.com/reduxjs/redux)
* [React Redux](https://github.com/reduxjs/react-redux)
* [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* [Material-UI](https://material-ui.com/)
* [uuid](https://www.npmjs.com/package/uuid)
