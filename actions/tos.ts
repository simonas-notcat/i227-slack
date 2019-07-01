import { slackInteractions } from './adapter'
const { WebClient } = require('@slack/web-api')
import { prisma } from '../generated/prisma-client'

slackInteractions.action('accept_tos', async (payload, respond) => {
  console.log({payload})
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);

  respond({
    text: 'Thank you for selecting: ' + payload.actions[0].value
  })

  const installations = await prisma.installations({where: {team_id: payload.team.id}})
  console.log({installations})
  const web = new WebClient(installations[installations.length - 1].access_token)
  try {
    const result = await web.chat.postMessage({
      text: 'Hello worldas!',
      channel: payload.channel.id,
    });
  } catch (e) {
    console.log(e)
  }

  respond({
    delete_original: true
  })

})