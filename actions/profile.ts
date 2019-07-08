import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { getOrCreateUser } from '../userManager'
import message from '../messages/profile'
import { prisma } from '../generated/prisma-client'
import { uniqBy, groupBy } from 'lodash'
import newClaimMessage from '../messages/new_claim'
import { getWebClientForTeamId } from '../installationManager'


slackInteractions.action({ blockId: 'index_actions', actionId: 'my_profile'}, async (payload, respond) => {
  console.log({payload})
  console.log(payload.actions)
  // respond({
  //   delete_original: true
  // })

  const user = await getOrCreateUser(payload.user.id, payload.user.team_id)
  
  const web = await getWebClientForTeamId(payload.team.id)
  try {

    const subjectDids = await prisma.user({id: user.id}).dids()
    const claims = await prisma.claims({
        where: {
          subject: {did_in: subjectDids.map(did => did.did)}
        }
    })

    const groupedClaims = groupBy(claims, (claim) => claim.claimType + claim.claimValue)

    console.log({groupedClaims})

    for (const key in groupedClaims) {
      if (groupedClaims.hasOwnProperty(key)) {
        const claims = groupedClaims[key];
        
        const uniqueSigners = uniqBy(claims, 'user_id')

        const signers = uniqueSigners.map((claim) => {
          return ({
            image_url: claim.image_url,
            name: claim.name,
          })
        })


        const response = newClaimMessage(null, user, payload.channel.id, claims[0].claimType, claims[0].claimValue, signers, uniqueSigners.length, claims.length)
        // response['response_type'] = 'ephemeral'
        console.log('SENDING RESPONSE')
        console.log(JSON.stringify(response))
        const a = await respond(response);
        console.log('RESPONSE SENT')

      }
    }




    // return {web, response}
  } catch (e) {
    console.log('EEEOEOEOEOEOEOEOPRRORRRORAas')
    console.log(e)
  }


  // console.log({user})
  // const response = message(user)
  
  // respond(response)

 
})

