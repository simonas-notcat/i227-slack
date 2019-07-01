const { createMessageAdapter } = require('@slack/interactive-messages')
export const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)
