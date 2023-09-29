const express = require("express");
const app = express();

require('dotenv').config(); // loading data from env file
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

// import route
const user = require('./routes/user');
// mount the route -> Mount simply means it prepends the path to your routes.
app.use("/api/v1", user);

// activate the server
app.listen(PORT, () => {
    console.log(`App is listing at ${PORT}`);
})