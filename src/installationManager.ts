import { prisma } from './generated/prisma-client'
const { WebClient } = require('@slack/web-api')


export const getWebClientForTeamId = async (teamId: string) => {
  const installations = await prisma.installations({where: {team_id: teamId}})
  const web = new WebClient(installations[installations.length - 1].access_token)
  return web
}