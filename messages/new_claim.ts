export default (issuer, subject, payload, signers, signersCount) => {
	console.log({signers})
	const elements = signers.map(signer => ({
		"type": "image",
		"image_url": signer.image_url,
		"alt_text": signer.name
	}))

	elements.push({
		"type": "plain_text",
		"emoji": true,
		"text": signersCount + " signers"
	})


	const signersBlock = {
		"type": "context",
		elements
	}
	return {
		channel: payload.channel.id,
		blocks: [

			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `<@${issuer.user_id}> has created new claim`
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `<@${subject.user_id}> \n Skill *${payload.submission.skill}*`
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
			signersBlock,
			{
				"type": "divider"
			}

		]
	}
}