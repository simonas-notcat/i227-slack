import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser } from '../userManager'
import message from '../messages/create_new_claim'

slackInteractions.action({ blockId: 'index_actions', actionId: 'create_new_skill'}, async (payload, respond) => {
  console.log({payload})
  console.log('1ACTIONS', payload.actions)


  // const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  // console.log({user})
  const response = message
  console.log({response})
  try {
    respond(response)
  } catch(e) {
    console.log(e)
  }

 
})

slackInteractions.action({ blockId: 'create_new_claims', actionId: 'select_user'}, async (payload, respond) => {
  // console.log({payload})
  // console.log('2ACTIONS', payload.actions)


  // const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  // console.log({user})
  const response = message
  response.blocks[1].elements[0]['selected_user'] = payload.actions[0]['selected_user']
  // console.log('AAAAAAAAA\n\n\n\n\n\n', response.blocks[1].elements[0])
  respond(response)

})

slackInteractions.action({ blockId: 'create_new_claims', actionId: 'select_skill'}, async (payload, respond) => {
  // console.log({payload})
  console.log('3ACTIONS', payload.actions)


  // const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  // console.log({user})
  const response = message
  response.blocks[1].elements[1]['selected_option'] = payload.actions[0]['selected_option']
  // console.log('AAAAAAAAA\n\n\n\n\n\n', response.blocks[1].elements[0])
  respond(response)

})