const http = require('http')
const express = require('express')
import * as ngrok from 'ngrok'
const bodyParser = require('body-parser')
const morganBody = require('morgan-body')
const request = require('request')
import slashCommand from './slashCommand'

import slackInteractions from './actions'
const app = express()

app.use('/slack/actions', slackInteractions.expressMiddleware())

// bodyParser needs to be used after slackInteractions
app.use(bodyParser.json())
morganBody(app)
app.post('/slack/commands', bodyParser.urlencoded({ extended: false }), slashCommand)

app.get('/auth', (req, res) =>{
  res.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect', (req, res) =>{
  var options = {
      uri: 'https://slack.com/api/oauth.access?code='
          +req.query.code+
          '&client_id='+process.env.CLIENT_ID+
          '&client_secret='+process.env.CLIENT_SECRET+
          '&redirect_uri='+process.env.REDIRECT_URI,
      method: 'GET'
  }
  request(options, (error, response, body) => {
      var JSONresponse = JSON.parse(body)
      if (!JSONresponse.ok){
          console.log(JSONresponse)
          res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      }else{
          console.log(JSONresponse)
          res.send("Success!")
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