const blocks = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "@simonas is looking for users with claim: Skill *UX Designer*\n \n Responses:"
		}
	},
	{
		"type": "divider"
	},
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "@Ziggy Skill *UX Designer*"
		}
	},
{
		"type": "context",
		"elements": [

			{
				"type": "plain_text",
				"emoji": true,
				"text": "Signed by @Andrejus | Yesterday | #random"
			}
		]
	},        

	{
		"type": "divider"
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
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