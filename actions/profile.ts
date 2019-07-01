import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser } from '../userManager'
import message from '../messages/profile'

slackInteractions.action({ blockId: 'index_actions', actionId: 'my_profile'}, async (payload, respond) => {
  console.log({payload})
  console.log(payload.actions)


  const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  console.log({user})
  const response = message(user)
  
  respond(response)

 
})

