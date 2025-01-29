const express = require('express');
const passport = require('../../config/passportt')
const dotenv = require('dotenv');
const session = require('express-session');
const path = require("path");
// const path = require("path");
dotenv.config()
const google_route = express()

google_route.use(
    session({
        secret: process.env.SESSION,
        saveUninitialized: false,
        resave: true,
        cookie: { secure: false },
        maxAge: 24 * 60 * 60 * 1000,
    })
);



google_route.use(passport.initialize());
google_route.use(passport.session())



google_route.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'] }));

google_route.get('/google/callback', passport.authenticate('google', {

    failureRedirect: '/login',
}),
    (req, res) => {
    res.redirect('/success');
    })
google_route.get('/success'  ,(req, res) => {
    if(req.isAuthenticated()){
        console.log("o authentication is successful")
        res.redirect('/homepage');
    }
    else
    {
        return res.redirect('/login')
    }
})

google_route.get('/login' , (req, res) => {
    res.sendFile(path.join(__dirname ,'..', '..', 'views', 'login.html'));
})



google_route.get('/homepage', (req, res) => {

    if(req.isAuthenticated()){
        res.sendFile(path.join(__dirname , '..', '..','views', 'homepage.html'));
    }
    else
    {
        return res.redirect('/login');
    }

})

google_route.get('/logout', (req, res) => {
 if(req.isAuthenticated()){

     res.status(200).json({message : "Logout successful"})
 }
    res.redirect('/login');
})



module.exports = google_route;
