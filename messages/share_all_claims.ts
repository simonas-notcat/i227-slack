const blocks = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Select claims to share"
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
				"text": "Select"
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
				"type": "plain_text",
				"emoji": true,
				"text": "Signed by @simonas | Yesterday | #general"
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
			"text": "Skill *Developer*"
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"emoji": true,
				"text": "Selected"
			},
			"style": "primary",
			"value": "click_me_123"
		}
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "image",
				"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
				"alt_text": "Michael Scott"
			},
			{
				"type": "plain_text",
				"emoji": true,
				"text": "Signed by @ziggy | 3 months ago | #secret-project"
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
			"text": "Skill *Developer*"
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"emoji": true,
				"text": "Select"
			},
			"value": "click_me_123"
		}
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "image",
				"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
				"alt_text": "Michael Scott"
			},
			{
				"type": "plain_text",
				"emoji": true,
				"text": "Signed by @andrejus | Last year | #devs"
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
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"emoji": true,
				"text": "Select"
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
				"type": "plain_text",
				"emoji": true,
				"text": "Signed by @simonas | Just now | #business"
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
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"emoji": true,
				"text": "Selected"
			},
			"style": "primary",
			"value": "click_me_123"
		}
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "image",
				"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
				"alt_text": "Michael Scott"
			},
			{
				"type": "plain_text",
				"emoji": true,
				"text": "Signed by @ziggy | 2 days ago | #random"
			}
		]
	},
	{
		"type": "divider"
	},
	{
    "type": "actions",
    "block_id": "share_all_claims",
		"elements": [
			{
        "type": "button",
        "action_id": "generate_link",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Generate sharable link"
				},
				"value": "generate_link"
			},
			{
        "type": "conversations_select",
        "action_id": "share_in_conversation",
				"placeholder": {
					"type": "plain_text",
					"text": "Share in conversation",
					"emoji": true
				}
			}            
		]
	}
]

  module.exports = {
    blocks
  }