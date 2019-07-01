import { slackInteractions } from './adapter'

slackInteractions.action('accept_tos', (payload, respond) => {
  console.log({payload})
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);

    respond({
      text: 'Thank you for selecting: ' + payload.actions[0].value
    });

  // Before the work completes, return a message object that is the same as the original but with
  // the interactive elements removed.
  const reply = payload.original_message
  delete reply.attachments[0].actions
  return reply
});