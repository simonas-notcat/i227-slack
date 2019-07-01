const blocks = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "@simonas has created new claim about @Ziggy "
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
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"emoji": true,
				"text": "Sign"
			},
			"value": "click_me_123"
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
	}
	
]

module.exports = {
  blocks
}