var session = require('express-session')

let app = require('express')();
let cors = require('cors');
let server = require('http').createServer(app);
const express = require('express');
const bodyParser = require('body-parser')
app.use(session({
    name: 'user_sid',
    secret: '00a2152372fa8e0e62edbb45dd82831a',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        maxAge: 3000000,
        sameSite: true,
        secure: true,
        httpOnly: true
    }
}))

app.use(cors())
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3300
server.listen(port, function () {
    console.log('http://localhost:' + port);
});
let routes = require('./api/router') //importing route

// Initializes passport and passport sessions
const passport = require('passport')
app.use(passport.initialize());
app.use(passport.session());
routes(app)