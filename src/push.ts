const transports = require('uport-transports')
import axios from 'axios'

// THIS IS TAKEN FROM `transports`
const PUTUTU_URL = 'https://api.uport.me/pututu/sns'

const padMessage = message => {
  const INTERVAL_LENGTH = 50
  const padLength = INTERVAL_LENGTH - (message.length % INTERVAL_LENGTH)
  return message + ' '.repeat(padLength)
}

const send = (token, pubEncKey, pushServiceUrl = PUTUTU_URL) => {
  if (!token) throw new Error('Requires push notification token')
  if (!pubEncKey) throw new Error('Requires public encryption key of the receiver')

  return (message, { alert, type, redirectUrl } = {}) =>
    new Promise((resolve, reject) => {
      if (!message) return reject(new Error('Requires message request to send'))
      message = transports.message.util.getURLJWT(message)
      const reqObj = { message }
      const plaintext = padMessage(JSON.stringify(reqObj))
      const enc = transports.crypto.encryptMessage(plaintext, pubEncKey)
      
      // THIS IS THE ONLY DIFF FROM ORIGINAL `send` METHOD: { alert }
      const payload = { alert, message: JSON.stringify(enc) }
      console.log({payload})
      axios.post(pushServiceUrl, payload, 
        {
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    })
}

module.exports = {
  send
}