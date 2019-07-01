const request = require('request')
import {
  prisma
} from '../generated/prisma-client'

export const authPage = (req, res) => {
res.sendFile(__dirname + '/add_to_slack.html')
}

export const redirect = async (req, res) => {
  var options = {
    uri: 'https://slack.com/api/oauth.access?code=' +
      req.query.code +
      '&client_id=' + process.env.CLIENT_ID +
      '&client_secret=' + process.env.CLIENT_SECRET +
      '&redirect_uri=' + process.env.REDIRECT_URI,
    method: 'GET'
  }
  request(options, async (error, response, body) => {
    var response = JSON.parse(body)
    if (!response.ok) {
      console.log(response)
      res.send("Error encountered: \n" + JSON.stringify(response)).status(200).end()
    } else {

      console.log(response)
      const installation = await prisma.createInstallation({
        scope: response.scope,
        user_id: response.user_id,
        team_id: response.team_id,
        team_name: response.team_name,
        access_token: response.access_token
      })
      console.log({installation})
      res.send("Success!")
      
    }
  })
}
