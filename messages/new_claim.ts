export default (issuer, subject, channelId, claimType, claimValue, signers, signersCount, claimCount) => {
	console.log({signers})
	const elements = signers.map(signer => ({
		"type": "image",
		"image_url": signer.image_url,
		"alt_text": signer.name
	}))

	elements.push({
		"type": "plain_text",
		"emoji": true,
		"text": `${signersCount} voters / ${claimCount} votes`
	})


	const signersBlock = {
		"type": "context",
		elements
	}
	return {
		
		channel: channelId,
		blocks: [


			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `<@${subject.user_id}> - ${claimType} *${claimValue}*`
				},
				"accessory": {
					"type": "button",
					"action_id": "sign_existing_claim",
					"text": {
						"type": "plain_text",
						"emoji": true,
						"text": "Vote 👍"
					},
					"value": JSON.stringify({
						subject: subject.user_id,
						claimType,
						claimValue
					})
				}
			},
			signersBlock,
			{
				"type": "divider"
			}

		]
	}
}