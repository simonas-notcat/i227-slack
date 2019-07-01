import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser } from '../userManager'

slackInteractions.action({ blockId: 'profile_actions', actionId: 'my_profile'}, async (payload, respond) => {
  console.log({payload})
  console.log(payload.actions)

  respond({
    text: 'Fetching profile..'
  })

  const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  console.log({user})

  respond({
    text: 'Here is your profile: ' + user.default_did,
    delete_original: true
  })

})