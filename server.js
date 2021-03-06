"use strict";

//require the express module
const express = require("express");

// require the router object (with all of the defined routes) to be used in this file
const routes = require("./routes");

//require the cors module
const cors = require("cors");

//create instance of express server
const app = express();

//Enable Cross Origin Resource Sharing so this API can be used from web apps on other domains
app.use(cors());

//allow POST and PUT requests to use JSON bodies
app.use(express.json());

//use the router object (with all the defined routes)
app.use("/", routes);

//define the port
const port = 3001;

//run the server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
