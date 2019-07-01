export default {
  blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Here are your options "
      }
    },
    {
      "type": "actions",
      "block_id": "profile_actions",
      "elements": [
        {
          "type": "button",
          "action_id": "create_new_skill",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Create skill claim"
          },
          "style": "primary",
          "value": "create_new_skill"
        },
        {
          "type": "button",
          "action_id": "my_profile",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "My profile"
          },
          "value": "my_profile"
        },
        {
          "type": "button",
          "action_id": "create_sdr",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Find users by claims"
          },
          "value": "create_sdr"
        }
      ]
    }
]}
