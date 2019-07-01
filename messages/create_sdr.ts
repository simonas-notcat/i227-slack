const blocks = [
	{
		"type": "section",
		"text": {
			"type": "plain_text",
			"text": "Create new skill request",
			"emoji": true
		}
	},
	{
		"type": "actions",
		"block_id": "create_sdr",
		"elements": [
			{
				"type": "static_select",
				"action_id": "select_skill",
				"placeholder": {
					"type": "plain_text",
					"text": "Select skill",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Developer",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "UX Designer",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Product manager",
							"emoji": true
						},
						"value": "value-2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Custom ...",
							"emoji": true
						},
						"value": "value-2"
					}
				]
			}
		]
	},
	{
		"type": "actions",
		"block_id": "post_sdr",
		"elements": [
			{
				"type": "button",
				"action_id": "post_sdr",
				"text": {
					"type": "plain_text",
					"text": "Create request",
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