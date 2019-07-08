const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util
// var { send } = require('./push')

const naclDid = require('nacl-did')
const blake = require('blakejs')

import { prisma } from './generated/prisma-client'


export const getOrCreateUser = async (user_id: string, team_id: string) => {
  const users = await prisma.users({where: {user_id, team_id}, first: 1})
  if (users.length === 0) {
    //naclDid.createIdentity().toJSON()
    const identity = naclDid.createIdentity().toJSON()
    const user = await prisma.createUser({
      user_id,
      team_id,
      default_did: identity.did,
      dids: {
        create: {
          did: identity.did,
          privateKey: identity.privateKey,
        }
      },
    })
    return user
  } else {
    return users[0]
  }
}

export const signClaim = async (user, claim) => {
  try{    
    const dids = await prisma.user({id: user.id}).dids() 
    const did = dids.find((did) => did.did === user.default_did)
    console.log({did})
    const identity = naclDid.loadIdentity({did: did.did, privateKey: did.privateKey})
    const jwt = identity.createJWT(claim)
    return jwt
  } catch (e) {
    console.log(e)
  }
  
}

export const credentials = new Credentials({
  appName: 'Login Example',
  did: 'did:ethr:0x31486054a6ad2c0b685cd89ce0ba018e210d504e',
  privateKey: 'ef6a01d0d98ba08bd23ee8b0c650076c65d629560940de9935d0f46f00679e01'
})

const endpoint = 'https://i227.ngrok.io'


export const getUportConnectUrl = async (request: any) => {
console.log(request)
  const uportConnect = await prisma.createUportConnect({
    user_id: request.user.id,
    team_id: request.user.team_id,
    channel_id: request.channel.id,
    response_url: request.response_url,
  })

  const requestToken = await credentials.createDisclosureRequest({
    notifications: true,
    callbackUrl: endpoint + '/uport_callback?id=' + encodeURI(uportConnect.id)
  })
  const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
  return uri
}