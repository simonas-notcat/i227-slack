const S = require('string')

export default ({subject, claimType, claimValue, signers, signersCount, claimCount}): any[] => {

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
	return [


			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `${S(claimType).humanize().titleCase().s} *${claimValue}*`
				},
				"accessory": {
					"type": "button",
					"action_id": "share_existing_claim",
					"text": {
						"type": "plain_text",
						"emoji": true,
						"text": "Share"
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