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
const app = express()

app.use('/slack/actions', slackInteractions.expressMiddleware())

// bodyParser needs to be used after slackInteractions
app.use(bodyParser.json())
morganBody(app)
app.post('/slack/commands', bodyParser.urlencoded({
  extended: false
}), slashCommand)

app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect', (req, res) => {
  var options = {
    uri: 'https://slack.com/api/oauth.access?code=' +
      req.query.code +
      '&client_id=' + process.env.CLIENT_ID +
      '&client_secret=' + process.env.CLIENT_SECRET +
      '&redirect_uri=' + process.env.REDIRECT_URI,
    method: 'GET'
  }
  request(options, (error, response, body) => {
    var response = JSON.parse(body)
    if (!response.ok) {
      console.log(response)
      res.send("Error encountered: \n" + JSON.stringify(response)).status(200).end()
    } else {

      console.log(response)
      prisma.createInstallation({
        scope: response.scope,
        user_id: response.user_id,
        team_id: response.team_id,
        team_name: response.team_name,
        access_token: response.access_token
      }).then(installation => {
        console.log({installation})
        res.send("Success!")
      })
      .catch(e => {
        console.log(e)
        res.send("Error: " + e.message)
      })
    }
  })
})

const port = process.env.PORT || 3000

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
  ngrok.connect({
    subdomain: 'i227',
    addr: port
  }).then(url => console.log('Server running at: ' + url))
});