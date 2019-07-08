import { slackInteractions } from './adapter'
import { getOrCreateUser, signClaim } from '../userManager'
import newClaimMessage from '../messages/new_claim'
import newSkillClaimDialog from '../messages/new_skill_claim_dialog'
import { prisma } from '../generated/prisma-client'
import { uniqBy } from 'lodash'
import { getWebClientForTeamId } from '../installationManager'
import axios from 'axios'

slackInteractions.action({ actionId: 'create_new_skill'}, async (payload, respond) => {
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


export const sendVoteForRequest = async (request: any) => {
  const arr = request.text.split(' ')
  const found = request.text.match(/@\w+/g)
  // /bot vote @Simonas skill Typescript Developer
  const claimType = arr.length > 1 && arr[2]
  const claimValue = arr.length > 2 && arr.slice(3).join(' ')
  
  const subjectUserId = (found && found[0] && found[0].substring(1)) || request.user_id

  if (!claimType || !claimValue || !subjectUserId) {
    await axios.post(request.response_url, {
      text: 'Usage: `/wot vote @User skill Developer`'
    })
  } else {

      const firstMessage = {
        response_type: 'in_channel',
        channel: request.channel_id,
        blocks: [
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": `<@${request.user_id}> has made this statement:`
              }
            ]
          },
        ]
      }
    
      const {web, response} = await signAndCreatePostResponseNewClaimToChannel({
        issuerUserId: request.user_id,
        subjectUserId: subjectUserId,
        teamId: request.team_id,
        responseUrl: request.response_url,
        claimType,
        claimValue,
        channelId: request.channel_id,
      })
    
    
      await web.chat.postMessage(firstMessage)
      await web.chat.postMessage(response)
      

  }
}

slackInteractions.action({ callbackId: 'new_skill_claim_submit'}, async (payload, respond) => {

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


  await web.chat.postMessage(firstMessage)
  await web.chat.postMessage(response)
  
})

slackInteractions.action({ actionId: 'sign_existing_claim'}, async (payload, respond) => {

  // console.log({payload})
  // console.log(payload.actions)

  const data = JSON.parse(payload.actions[0].value)

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



    const response = newClaimMessage({subject, channelId, claimType, claimValue, signers, signersCount: uniqueSigners.length, claimCount: claims.length})
    return {web, response}
  } catch (e) {
    console.log(e)
  }

}