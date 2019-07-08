export default {
  blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Reputation built by community"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Endorse skill:\n`/wot vote @User skill Team player`"
      },
      "accessory": {
        "type": "button",
        "action_id": "create_new_skill",
        "style": "primary",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Endorse skill"
        },
        "value": "create_new_skill"
      }      
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "View profile:\n`/wot profile @User`"
      },
      "accessory": {
        "type": "button",
        "action_id": "my_profile",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "My profile"
        },
        "value": "my_profile"
      }  
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Connect your Identity Wallet (uPort)"
      },
      "accessory": {
        "type": "button",
        "action_id": "connect_uport",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Connect"
        },
        "value": "connect_uport"
      }  
    }

]}
