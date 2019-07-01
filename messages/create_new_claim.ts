export default {
	blocks: [

	{
		"type": "section",
		"text": {
			"type": "plain_text",
			"text": "Create new skill claim",
			"emoji": true
		}
	},
	{
    "type": "actions",
    "block_id": "create_new_claims",
		"elements": [
			{
        "type": "users_select",
				"action_id": "select_user",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a user",
					"emoji": true
				}
			},
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
    "block_id": "create_claim",
		"elements": [
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Create",
					"emoji": true
				},
                "style": "primary",
				"value": "create_claim"
			}
		]
	}    
]

}