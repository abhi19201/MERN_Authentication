# Greendeck : Time Series Visualisation

![Mongo](https://img.shields.io/badge/DB-MongoDB-yellow)
![React](https://aleen42.github.io/badges/src/react.svg)
![npm](https://aleen42.github.io/badges/src/npm.svg)
![vsCode](https://aleen42.github.io/badges/src/visual_studio_code.svg)
![node](https://aleen42.github.io/badges/src/node.svg)


Website Link : [MERN Stack Authentication App](https://havi-project.herokuapp.com/)

---

## Packages Used

- react 
- react-dom 
- redux 
- react-redux 
- redux-thunk
- react-router-dom  
- axios 
- bcryptjs 
- body-parser 
- connect-mongodb-session 
- cors  
- dotenv 
- express 
- express-session 
- mongoose 
- path 
- morgan 

---

## Environmental Variables

We already required and configured dotenv.

```javascript
require("dotenv").config();
```

Create a `.env` file in the root directory of the project. Add
environment-specific variables on new lines in the form of `KEY=VALUE`.
We need these environment variables:

```dosini
MONGODB_URI="url"

PORT=8000
```

`process.env` now has the keys and values you defined in your `.env` file.

---


## How to Build and Run the project

1. Install NPM packages

```sh

cd client && npm install

```

2. Build React production app

```sh

cd client && npm run build

```

3. Run Server

```sh

node server.js

```

4. Run React App

```sh

cd client && npm start

```

---
