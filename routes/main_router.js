const router = require('../routes/users_route/users')
const google_route = require('../routes/google_route/google_route')
const express = require('express');
const mainRouter = express()

mainRouter.use('/' , router)
mainRouter.use('/' , google_route)

module.exports = mainRouter;