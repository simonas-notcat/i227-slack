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
    const identity = naclDid.loadIdentity({did: did.did, privateKey: did.privateKey})
    const jwt = identity.createJWT(claim)
    return jwt
  } catch (e) {
    console.log(e)
  }
  
}