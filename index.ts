const http = require('http')
const express = require('express')
import * as ngrok from 'ngrok'
const bodyParser = require('body-parser')
const morganBody = require('morgan-body')
const request = require('request')
import slashCommand from './slashCommand'
import {
  prisma
} from './generated/prisma-client'
import slackInteractions from './actions'
import * as oauth from './oauth'
const app = express()

app.use('/slack/actions', slackInteractions.expressMiddleware())

// bodyParser needs to be used after slackInteractions
app.use(bodyParser.json())
morganBody(app)
app.post('/slack/commands', bodyParser.urlencoded({extended: false}), slashCommand)

app.get('/auth', oauth.authPage)
app.get('/auth/redirect', oauth.redirect)

const port = process.env.PORT || 3000

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
  ngrok.connect({
    subdomain: 'i227',
    addr: port
  }).then(url => console.log('Server running at: ' + url))
});