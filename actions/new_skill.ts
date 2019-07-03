import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser, signClaim } from '../userManager'
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

  const jwt = await signClaim(issuer, {
    sub: subject.default_did,
    claim: {
      skill: payload.submission.skill
    }
  })


  const subjectDid = await prisma.did({did: subject.default_did})

  try {


    const issuerDid = await prisma.did({did: issuer.default_did})

    const claim = await prisma.createClaim({
      issuer: issuer.default_did,
      subject: subject.default_did,
      team_id: payload.team.id,
      channel_id: payload.channel.id,
      jwt,
      issuedAt: new Date(),
      claimFields: {
        create: {
          claimType: 'skill',
          claimValue: payload.submission.skill,
          subject: {
            connect: {id: subjectDid.id}
          },
        }
      }
    })



    await prisma.updateDid({
      where:{ did: issuer.default_did},
      data: {
        issuedClaims: {
          connect: {id: claim.id}
        }
      }
    })
    
    await prisma.updateDid({
      where:{ did: subject.default_did},
      data: {
        receivedClaims: {
          connect: {id: claim.id}
        }
      }
    })
  } catch(e) {
    console.log(e)
  }

  
  const installations = await prisma.installations({where: {team_id: payload.team.id}})
  const web = new WebClient(installations[installations.length - 1].access_token)
  try {
    let signers = []
    try{
      const userInfo = await web.users.profile.get({user: payload.user.id})
      signers.push({
        image_url: userInfo.profile.image_24,
        name: userInfo.profile.real_name_normalized,
      })
      // console.log({userInfo})
    } catch(e) {
      console.log(e)
    }
    const fragment = `
      fragment UserWithPosts on User {
        id
        subject {
          did
          users {
            user_id
            team_id
          }
        }
      }
`
    const data: [] = await prisma.claimFields({
        where: {
          claimType: 'skill',
          claimValue: payload.submission.skill,
          subject: {id: subjectDid.id}
        }
    }).$fragment(fragment)

    let countSigners = data.length

    // data.forEach(element => {
      
    // });

    console.log(JSON.stringify(data))
    const response = newClaimMessage(issuer, subject, payload, signers, countSigners)
    // console.log(JSON.stringify(response))
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