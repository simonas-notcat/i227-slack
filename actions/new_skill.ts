import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser, signClaim } from '../userManager'
import message from '../messages/create_new_claim'
import newClaimMessage from '../messages/new_claim'
import newSkillClaimDialog from '../messages/new_skill_claim_dialog'
import { prisma } from '../generated/prisma-client'
import axios from 'axios'
import { uniqBy } from 'lodash'

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
  await signAndPostNewClaimToChannel({
    issuerUserId: payload.user.id,
    subjectUserId: payload.submission.user,
    teamId: payload.team.id,
    claimType: 'skill',
    claimValue: payload.submission.skill,
    channelId: payload.channel.id,
  })

  
})

slackInteractions.action({ actionId: 'sign_existing_claim'}, async (payload, respond) => {

  console.log({payload})
  console.log(payload.actions)

  const data = JSON.parse(payload.actions[0].value)

  await signAndPostNewClaimToChannel({
    issuerUserId: payload.user.id,
    subjectUserId: data.subject,
    teamId: payload.team.id,
    claimType: data.claimType,
    claimValue: data.claimValue,
    channelId: payload.channel.id,
  })
})

const signAndPostNewClaimToChannel = async ({issuerUserId, subjectUserId, teamId, channelId, claimType, claimValue}) => {


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

  try {

    const claim = await prisma.createClaim({
      issuer: {connect: {id: issuerDid.id}},
      subject: {connect: {id: subjectDid.id}},
      user_id: issuerUserId,
      team_id: teamId,
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

  
  const installations = await prisma.installations({where: {team_id: teamId}})
  const web = new WebClient(installations[installations.length - 1].access_token)
  try {

    const subjectDids = await prisma.user({id: subject.id}).dids()
    console.log('\n\n', {subjectDids})
    const claims = await prisma.claims({
        where: {
          claimType,
          claimValue,
          subject: {did_in: subjectDids.map(did => did.did)}
        }
    })

    const uniqueSigners = uniqBy(claims, 'user_id')

    const promises = uniqueSigners.map(async (claim) => {
      try{
        const userInfo = await web.users.profile.get({user: claim.user_id})
        return ({
          image_url: userInfo.profile.image_24,
          name: userInfo.profile.real_name_normalized,
        })
      } catch(e) {
        console.log(e)
      }
    })

    const signers = await Promise.all(promises)

    console.log('\n\n\n', {signers})

    const response = newClaimMessage(issuer, subject, channelId, claimType, claimValue, signers, uniqueSigners.length, claims.length)
    // console.log(JSON.stringify(response))
    const result = await web.chat.postMessage(response);
  } catch (e) {
    console.log('EEEOEOEOEOEOEOEOPRRORRRORAas')
    console.log(e)
  }

}