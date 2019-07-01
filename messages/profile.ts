const blocks = (user) => [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Here is your profile summary from all available sources." + user.data.dids[0].did
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Skill *Developer*"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
        "alt_text": "Michael Scott"
      },
      {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
        "alt_text": "Dwight Schrute"
      },
      {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
        "alt_text": "Pam Beasely"
      },
      {
        "type": "plain_text",
        "emoji": true,
        "text": "3 signers"
      }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Skill *UX Designer*"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
        "alt_text": "Michael Scott"
      },
      {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
        "alt_text": "Dwight Schrute"
      },
      {
        "type": "plain_text",
        "emoji": true,
        "text": "2 signers"
      }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "actions",
    "block_id": "profile_actions",
    "elements": [
      {
        "type": "button",
        "action_id": "share_my_claims",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Share my claims"
        },
        "value": "share_my_claims"
      },
      {
        "type": "button",
        "action_id": "connect_uport",
        "url": "https://id.uport.me/req/JWT",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Connect uPort ID"
        },
        "value": "connect_uport"
      }

    ]
  }
]

  module.exports = {
    blocks
  }