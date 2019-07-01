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
  }
}