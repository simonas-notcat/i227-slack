const blocks = [
	{
		"type": "section",
		"text": {
			"type": "plain_text",
			"text": "@simonas is requesting claims:",
			"emoji": true
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
		"type": "divider"
	},
	{
		"type": "actions",
		"block_id": "respond_to_sdr",
		"elements": [
			{
				"type": "button",
				"action_id": "respond_to_sdr",
				"text": {
					"type": "plain_text",
					"text": "Respond",
					"emoji": true
				},
        "style": "primary",
				"value": "click_me_123"
			}
		]
	}
]

  module.exports = {
    blocks
  }