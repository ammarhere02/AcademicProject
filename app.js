const express = require('express');
const doteenv = require('dotenv');
doteenv.config();
const path = require('path');
const usersRouter = require('./routes/users');
const Port = process.env.PORT
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/translator' , usersRouter);


app.listen(Port , ()=>
{
  console.log(`server running at http://localhost:${Port}/`)
})
