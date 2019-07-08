import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser, signClaim } from '../userManager'
import message from '../messages/create_new_claim'
import newClaimMessage from '../messages/new_claim'
import newSkillClaimDialog from '../messages/new_skill_claim_dialog'
import { prisma } from '../generated/prisma-client'
import axios from 'axios'
import { uniqBy } from 'lodash'
import { getWebClientForTeamId } from '../installationManager'

slackInteractions.action({ blockId: 'index_actions', actionId: 'create_new_skill'}, async (payload, respond) => {
  respond({
    replace_original: true
  })

  const web = await getWebClientForTeamId(payload.team.id)

  try {
    // Open dialog
    const response = await web.dialog.open({ 
      trigger_id: payload.trigger_id,
      dialog: newSkillClaimDialog,
    });
  } catch (error) {
    console.log(error)
  }
})





slackInteractions.action({ callbackId: 'new_skill_claim_submit'}, async (payload, respond) => {

  // try {
  //   await respond({
  //     replace_original: true
  //   })

  // } catch( e){
  //   console.log(e)
  // }

  console.log({payload})
  const firstMessage = {
    response_type: 'in_channel',
    channel: payload.channel.id,
    blocks: [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `<@${payload.user.id}> has made this statement:`
          }
        ]
      },
			// {
			// 	"type": "divider"
			// },
    ]
  }

  const {web, response} = await signAndCreatePostResponseNewClaimToChannel({
    issuerUserId: payload.user.id,
    subjectUserId: payload.submission.user,
    teamId: payload.team.id,
    responseUrl: payload.response_url,
    claimType: 'skill',
    claimValue: payload.submission.skill,
    channelId: payload.channel.id,
  })

  console.log({firstMessage, response})

  await web.chat.postMessage(firstMessage)
  await web.chat.postMessage(response)
  
})

slackInteractions.action({ actionId: 'sign_existing_claim'}, async (payload, respond) => {

  console.log({payload})
  console.log(payload.actions)

  const data = JSON.parse(payload.actions[0].value)
  // respond({delete_original: true})

  const {response} = await signAndCreatePostResponseNewClaimToChannel({
    issuerUserId: payload.user.id,
    subjectUserId: data.subject,
    responseUrl: payload.response_url,
    teamId: payload.team.id,
    claimType: data.claimType,
    claimValue: data.claimValue,
    channelId: payload.channel.id,
  })
  response['replace_original'] = true

  respond(response)
})

const signAndCreatePostResponseNewClaimToChannel = async ({issuerUserId, subjectUserId, responseUrl, teamId, channelId, claimType, claimValue}) => {


  const issuer = await getOrCreateUser(issuerUserId, teamId)
  const subject = await getOrCreateUser(subjectUserId, teamId)
  console.log({issuer, subject})

  const jwt = await signClaim(issuer, {
    sub: subject.default_did,
    claim: {
      skill: claimValue
    }
  })

  const issuerDid = await prisma.did({did: issuer.default_did})
  const subjectDid = await prisma.did({did: subject.default_did})

  const web = await getWebClientForTeamId(teamId)

  try {

    const userInfo = await web.users.profile.get({user: issuerUserId})

    const claim = await prisma.createClaim({
      issuer: {connect: {id: issuerDid.id}},
      subject: {connect: {id: subjectDid.id}},
      user_id: issuerUserId,
      team_id: teamId,
      image_url: userInfo.profile.image_24,
      name: userInfo.profile.real_name_normalized,
      response_url: responseUrl,
      channel_id: channelId,
      jwt,
      claimType,
      claimValue,
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

  
  try {

    const subjectDids = await prisma.user({id: subject.id}).dids()
    const claims = await prisma.claims({
        where: {
          claimType,
          claimValue,
          subject: {did_in: subjectDids.map(did => did.did)}
        }
    })

    const uniqueSigners = uniqBy(claims, 'user_id')

    const signers = uniqueSigners.map((claim) => {
      return ({
        image_url: claim.image_url,
        name: claim.name,
      })
    })



    const response = newClaimMessage(issuer, subject, channelId, claimType, claimValue, signers, uniqueSigners.length, claims.length)
    // console.log(JSON.stringify(response))
    // const result = await web.chat.postMessage(response);
    return {web, response}
  } catch (e) {
    console.log('EEEOEOEOEOEOEOEOPRRORRRORAas')
    console.log(e)
  }

}