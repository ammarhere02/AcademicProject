const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const mainRouter = require('./routes/main_router');
const {login} = require("./controller/authentication");
const port = 7090
const app = express()

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/' , mainRouter)





app.listen(port , ()=>
{
  console.log(`server running at http://localhost:${port}/`)
})