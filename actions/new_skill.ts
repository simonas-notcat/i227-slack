import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser } from '../userManager'
import message from '../messages/create_new_claim'
import newClaimMessage from '../messages/new_claim'
import newSkillClaimDialog from '../messages/new_skill_claim_dialog'
import { prisma } from '../generated/prisma-client'
import axios from 'axios'

slackInteractions.action({ blockId: 'index_actions', actionId: 'create_new_skill'}, async (payload, respond) => {

  const installations = await prisma.installations({where: {team_id: payload.team.id}})
  const web = new WebClient(installations[installations.length - 1].access_token)
  try {
    try {
      // Open dialog
      const response = await web.dialog.open({ 
        trigger_id: payload.trigger_id,
        dialog: newSkillClaimDialog,
      });
    } catch (error) {
      axios.post(payload.response_url, {
        text: `An error occurred while opening the dialog: ${error.message}`,
      }).catch(console.error);
    }
  } catch (e) {
    console.log(e)
  }
 
})




slackInteractions.action({ callbackId: 'new_skill_claim_submit'}, async (payload, respond) => {


  console.log({payload})

  const issuer = await getOrCreateUser(payload.user.id, payload.team.id)
  const subject = await getOrCreateUser(payload.submission.user, payload.team.id)
  console.log({issuer, subject})



  const installations = await prisma.installations({where: {team_id: payload.team.id}})
  const web = new WebClient(installations[installations.length - 1].access_token)
  try {
    const response = newClaimMessage
    response.blocks[0].text.text = `<@${issuer.user_id}> has created new claim`
    response.blocks[2].text.text = `<@${subject.user_id}> \n Skill *${payload.submission.skill}*`
    response['channel'] = payload.channel.id
    const result = await web.chat.postMessage(response);
  } catch (e) {
    console.log('EEEOEOEOEOEOEOEOPRRORRRORAas')
    console.log(e)
  }




  // console.log({payload})
  // // console.log('2ACTIONS', payload.actions)


  // // const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  // // console.log({user})
  // const response = newClaimMessage
  // // response.blocks[1].elements[0]['selected_user'] = payload.actions[0]['selected_user']
  // // console.log('AAAAAAAAA\n\n\n\n\n\n', response.blocks[1].elements[0])
  // respond(response)

})

// slackInteractions.action({ blockId: 'create_new_claims', actionId: 'select_skill'}, async (payload, respond) => {
//   // console.log({payload})
//   console.log('3ACTIONS', payload.actions)


//   // const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
//   // console.log({user})
//   const response = message
//   response.blocks[1].elements[1]['selected_option'] = payload.actions[0]['selected_option']
//   // console.log('AAAAAAAAA\n\n\n\n\n\n', response.blocks[1].elements[0])
//   respond(response)

// })