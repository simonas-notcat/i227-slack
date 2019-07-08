import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser } from '../userManager'
import message from '../messages/profile'
import { prisma } from '../generated/prisma-client'
import { uniqBy, groupBy } from 'lodash'
import claimMessage from '../messages/profile_claim'
import newClaimMessage from '../messages/new_claim'
import { getWebClientForTeamId } from '../installationManager'
import axios from 'axios'
const S = require('string')

export const getProfileResponse = async (userId, teamId) => {
  const subject = await getOrCreateUser(userId, teamId)
  
  try {

    const subjectDids = await prisma.user({id: subject.id}).dids()
    const claims = await prisma.claims({
        where: {
          subject: {did_in: subjectDids.map(did => did.did)}
        }
    })

    const groupedClaims = groupBy(claims, (claim) => claim.claimType + claim.claimValue)

    // console.log({groupedClaims})

    const response = {
      replace_original: true,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `<@${subject.user_id}> profile:`
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `${subject.default_did}`
            }
          ]
        },
      ]
    }

    for (const key in groupedClaims) {
      if (groupedClaims.hasOwnProperty(key)) {
        const claims = groupedClaims[key]
        
        const uniqueSigners = uniqBy(claims, 'user_id')

        const signers = uniqueSigners.map((claim) => {
          return ({
            image_url: claim.image_url,
            name: claim.name,
          })
        })


        const messageBlocks = claimMessage({subject, claimType: claims[0].claimType, claimValue: claims[0].claimValue, signers, signersCount: uniqueSigners.length, claimCount: claims.length})
        response.blocks = response.blocks.concat(messageBlocks)

      }
    }




    return response
  } catch (e) {
    console.log(e)
  }
}

export const sendProfileForRequest = async (request: any) => {
  const found = request.text.match(/@\w+/g)

  const userId = (found[0] && found[0].substring(1)) || request.user_id
  const response = await getProfileResponse(userId, request.team_id)
  try {
    await axios.post(request.response_url, response)
  } catch (e) {
    console.log(e)
  }
  
}

slackInteractions.action({ blockId: 'index_actions', actionId: 'my_profile'}, async (payload, respond) => {
  console.log({payload})
  console.log(payload.actions)

  const response = await getProfileResponse(payload.user.id, payload.user.team_id)
  respond(response)

})

slackInteractions.action({ actionId: 'share_existing_claim'}, async (payload, respond) => {

  // console.log({payload})
  // console.log(payload.actions)

  const data = JSON.parse(payload.actions[0].value)


  const response = {
    replace_original: true,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Share: <@${data.subject}> - ${S(data.claimType).humanize().titleCase().s} *${data.claimValue}*`
        }
      },
      {
        "type": "actions",
        "block_id": "share_existing_claim_submit",
        "elements": [
          {
            action_id: JSON.stringify(data),
            "type": "conversations_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select a conversation",
              "emoji": true
            }
          }
        ]
      }
    ]
  }

  respond(response)
})


slackInteractions.action({ blockId: 'share_existing_claim_submit'}, async (payload, respond) => {

  console.log('HERE')
  // console.log({payload})
  // console.log(payload.actions)

  const data = JSON.parse(payload.actions[0].action_id)

  const subject = await getOrCreateUser(data.subject, payload.user.team_id) // TODO: fix team_id here
  
  try {

    const subjectDids = await prisma.user({id: subject.id}).dids()
    const claims = await prisma.claims({
        where: {
          subject: {did_in: subjectDids.map(did => did.did)},
          claimType: data.claimType,
          claimValue: data.claimValue,
        }
    })


    const response = {
      channel: payload.actions[0].selected_conversation,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `<@${payload.user.id}> shared:`
          }
        },
      ]
    }
       
    const uniqueSigners = uniqBy(claims, 'user_id')

    const signers = uniqueSigners.map((claim) => {
      return ({
        image_url: claim.image_url,
        name: claim.name,
      })
    })


    const messageBlocks = newClaimMessage({channelId: null, subject, claimType: claims[0].claimType, claimValue: claims[0].claimValue, signers, signersCount: uniqueSigners.length, claimCount: claims.length})
    response.blocks = response.blocks.concat(messageBlocks.blocks)

    console.log(response)
    const web = await getWebClientForTeamId(payload.user.team_id)
    await web.chat.postMessage(response)

  } catch (e) {
    console.log(e)
  }






  const response = {
    replace_original: true,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Success!`
        }
      },
    ]
  }

  respond(response)

})