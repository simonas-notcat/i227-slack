// Code generated by Prisma (prisma@1.23.0-test.3). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateClaim {
  count: Int!
}

type AggregateDid {
  count: Int!
}

type AggregateInstallation {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Claim {
  id: ID!
  user_id: String!
  team_id: String!
  channel_id: String!
  issuer: Did!
  subject: Did!
  createdAt: DateTime!
  jwt: String!
  claimType: String!
  claimValue: String!
}

type ClaimConnection {
  pageInfo: PageInfo!
  edges: [ClaimEdge]!
  aggregate: AggregateClaim!
}

input ClaimCreateInput {
  id: ID
  user_id: String!
  team_id: String!
  channel_id: String!
  issuer: DidCreateOneWithoutIssuedClaimsInput!
  subject: DidCreateOneWithoutReceivedClaimsInput!
  jwt: String!
  claimType: String!
  claimValue: String!
}

input ClaimCreateManyWithoutIssuerInput {
  create: [ClaimCreateWithoutIssuerInput!]
  connect: [ClaimWhereUniqueInput!]
}

input ClaimCreateManyWithoutSubjectInput {
  create: [ClaimCreateWithoutSubjectInput!]
  connect: [ClaimWhereUniqueInput!]
}

input ClaimCreateWithoutIssuerInput {
  id: ID
  user_id: String!
  team_id: String!
  channel_id: String!
  subject: DidCreateOneWithoutReceivedClaimsInput!
  jwt: String!
  claimType: String!
  claimValue: String!
}

input ClaimCreateWithoutSubjectInput {
  id: ID
  user_id: String!
  team_id: String!
  channel_id: String!
  issuer: DidCreateOneWithoutIssuedClaimsInput!
  jwt: String!
  claimType: String!
  claimValue: String!
}

type ClaimEdge {
  node: Claim!
  cursor: String!
}

enum ClaimOrderByInput {
  id_ASC
  id_DESC
  user_id_ASC
  user_id_DESC
  team_id_ASC
  team_id_DESC
  channel_id_ASC
  channel_id_DESC
  createdAt_ASC
  createdAt_DESC
  jwt_ASC
  jwt_DESC
  claimType_ASC
  claimType_DESC
  claimValue_ASC
  claimValue_DESC
}

type ClaimPreviousValues {
  id: ID!
  user_id: String!
  team_id: String!
  channel_id: String!
  createdAt: DateTime!
  jwt: String!
  claimType: String!
  claimValue: String!
}

input ClaimScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user_id: String
  user_id_not: String
  user_id_in: [String!]
  user_id_not_in: [String!]
  user_id_lt: String
  user_id_lte: String
  user_id_gt: String
  user_id_gte: String
  user_id_contains: String
  user_id_not_contains: String
  user_id_starts_with: String
  user_id_not_starts_with: String
  user_id_ends_with: String
  user_id_not_ends_with: String
  team_id: String
  team_id_not: String
  team_id_in: [String!]
  team_id_not_in: [String!]
  team_id_lt: String
  team_id_lte: String
  team_id_gt: String
  team_id_gte: String
  team_id_contains: String
  team_id_not_contains: String
  team_id_starts_with: String
  team_id_not_starts_with: String
  team_id_ends_with: String
  team_id_not_ends_with: String
  channel_id: String
  channel_id_not: String
  channel_id_in: [String!]
  channel_id_not_in: [String!]
  channel_id_lt: String
  channel_id_lte: String
  channel_id_gt: String
  channel_id_gte: String
  channel_id_contains: String
  channel_id_not_contains: String
  channel_id_starts_with: String
  channel_id_not_starts_with: String
  channel_id_ends_with: String
  channel_id_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  jwt: String
  jwt_not: String
  jwt_in: [String!]
  jwt_not_in: [String!]
  jwt_lt: String
  jwt_lte: String
  jwt_gt: String
  jwt_gte: String
  jwt_contains: String
  jwt_not_contains: String
  jwt_starts_with: String
  jwt_not_starts_with: String
  jwt_ends_with: String
  jwt_not_ends_with: String
  claimType: String
  claimType_not: String
  claimType_in: [String!]
  claimType_not_in: [String!]
  claimType_lt: String
  claimType_lte: String
  claimType_gt: String
  claimType_gte: String
  claimType_contains: String
  claimType_not_contains: String
  claimType_starts_with: String
  claimType_not_starts_with: String
  claimType_ends_with: String
  claimType_not_ends_with: String
  claimValue: String
  claimValue_not: String
  claimValue_in: [String!]
  claimValue_not_in: [String!]
  claimValue_lt: String
  claimValue_lte: String
  claimValue_gt: String
  claimValue_gte: String
  claimValue_contains: String
  claimValue_not_contains: String
  claimValue_starts_with: String
  claimValue_not_starts_with: String
  claimValue_ends_with: String
  claimValue_not_ends_with: String
  AND: [ClaimScalarWhereInput!]
  OR: [ClaimScalarWhereInput!]
  NOT: [ClaimScalarWhereInput!]
}

type ClaimSubscriptionPayload {
  mutation: MutationType!
  node: Claim
  updatedFields: [String!]
  previousValues: ClaimPreviousValues
}

input ClaimSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ClaimWhereInput
  AND: [ClaimSubscriptionWhereInput!]
  OR: [ClaimSubscriptionWhereInput!]
  NOT: [ClaimSubscriptionWhereInput!]
}

input ClaimUpdateInput {
  user_id: String
  team_id: String
  channel_id: String
  issuer: DidUpdateOneRequiredWithoutIssuedClaimsInput
  subject: DidUpdateOneRequiredWithoutReceivedClaimsInput
  jwt: String
  claimType: String
  claimValue: String
}

input ClaimUpdateManyDataInput {
  user_id: String
  team_id: String
  channel_id: String
  jwt: String
  claimType: String
  claimValue: String
}

input ClaimUpdateManyMutationInput {
  user_id: String
  team_id: String
  channel_id: String
  jwt: String
  claimType: String
  claimValue: String
}

input ClaimUpdateManyWithoutIssuerInput {
  create: [ClaimCreateWithoutIssuerInput!]
  delete: [ClaimWhereUniqueInput!]
  connect: [ClaimWhereUniqueInput!]
  set: [ClaimWhereUniqueInput!]
  disconnect: [ClaimWhereUniqueInput!]
  update: [ClaimUpdateWithWhereUniqueWithoutIssuerInput!]
  upsert: [ClaimUpsertWithWhereUniqueWithoutIssuerInput!]
  deleteMany: [ClaimScalarWhereInput!]
  updateMany: [ClaimUpdateManyWithWhereNestedInput!]
}

input ClaimUpdateManyWithoutSubjectInput {
  create: [ClaimCreateWithoutSubjectInput!]
  delete: [ClaimWhereUniqueInput!]
  connect: [ClaimWhereUniqueInput!]
  set: [ClaimWhereUniqueInput!]
  disconnect: [ClaimWhereUniqueInput!]
  update: [ClaimUpdateWithWhereUniqueWithoutSubjectInput!]
  upsert: [ClaimUpsertWithWhereUniqueWithoutSubjectInput!]
  deleteMany: [ClaimScalarWhereInput!]
  updateMany: [ClaimUpdateManyWithWhereNestedInput!]
}

input ClaimUpdateManyWithWhereNestedInput {
  where: ClaimScalarWhereInput!
  data: ClaimUpdateManyDataInput!
}

input ClaimUpdateWithoutIssuerDataInput {
  user_id: String
  team_id: String
  channel_id: String
  subject: DidUpdateOneRequiredWithoutReceivedClaimsInput
  jwt: String
  claimType: String
  claimValue: String
}

input ClaimUpdateWithoutSubjectDataInput {
  user_id: String
  team_id: String
  channel_id: String
  issuer: DidUpdateOneRequiredWithoutIssuedClaimsInput
  jwt: String
  claimType: String
  claimValue: String
}

input ClaimUpdateWithWhereUniqueWithoutIssuerInput {
  where: ClaimWhereUniqueInput!
  data: ClaimUpdateWithoutIssuerDataInput!
}

input ClaimUpdateWithWhereUniqueWithoutSubjectInput {
  where: ClaimWhereUniqueInput!
  data: ClaimUpdateWithoutSubjectDataInput!
}

input ClaimUpsertWithWhereUniqueWithoutIssuerInput {
  where: ClaimWhereUniqueInput!
  update: ClaimUpdateWithoutIssuerDataInput!
  create: ClaimCreateWithoutIssuerInput!
}

input ClaimUpsertWithWhereUniqueWithoutSubjectInput {
  where: ClaimWhereUniqueInput!
  update: ClaimUpdateWithoutSubjectDataInput!
  create: ClaimCreateWithoutSubjectInput!
}

input ClaimWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user_id: String
  user_id_not: String
  user_id_in: [String!]
  user_id_not_in: [String!]
  user_id_lt: String
  user_id_lte: String
  user_id_gt: String
  user_id_gte: String
  user_id_contains: String
  user_id_not_contains: String
  user_id_starts_with: String
  user_id_not_starts_with: String
  user_id_ends_with: String
  user_id_not_ends_with: String
  team_id: String
  team_id_not: String
  team_id_in: [String!]
  team_id_not_in: [String!]
  team_id_lt: String
  team_id_lte: String
  team_id_gt: String
  team_id_gte: String
  team_id_contains: String
  team_id_not_contains: String
  team_id_starts_with: String
  team_id_not_starts_with: String
  team_id_ends_with: String
  team_id_not_ends_with: String
  channel_id: String
  channel_id_not: String
  channel_id_in: [String!]
  channel_id_not_in: [String!]
  channel_id_lt: String
  channel_id_lte: String
  channel_id_gt: String
  channel_id_gte: String
  channel_id_contains: String
  channel_id_not_contains: String
  channel_id_starts_with: String
  channel_id_not_starts_with: String
  channel_id_ends_with: String
  channel_id_not_ends_with: String
  issuer: DidWhereInput
  subject: DidWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  jwt: String
  jwt_not: String
  jwt_in: [String!]
  jwt_not_in: [String!]
  jwt_lt: String
  jwt_lte: String
  jwt_gt: String
  jwt_gte: String
  jwt_contains: String
  jwt_not_contains: String
  jwt_starts_with: String
  jwt_not_starts_with: String
  jwt_ends_with: String
  jwt_not_ends_with: String
  claimType: String
  claimType_not: String
  claimType_in: [String!]
  claimType_not_in: [String!]
  claimType_lt: String
  claimType_lte: String
  claimType_gt: String
  claimType_gte: String
  claimType_contains: String
  claimType_not_contains: String
  claimType_starts_with: String
  claimType_not_starts_with: String
  claimType_ends_with: String
  claimType_not_ends_with: String
  claimValue: String
  claimValue_not: String
  claimValue_in: [String!]
  claimValue_not_in: [String!]
  claimValue_lt: String
  claimValue_lte: String
  claimValue_gt: String
  claimValue_gte: String
  claimValue_contains: String
  claimValue_not_contains: String
  claimValue_starts_with: String
  claimValue_not_starts_with: String
  claimValue_ends_with: String
  claimValue_not_ends_with: String
  AND: [ClaimWhereInput!]
  OR: [ClaimWhereInput!]
  NOT: [ClaimWhereInput!]
}

input ClaimWhereUniqueInput {
  id: ID
}

scalar DateTime

type Did {
  id: ID!
  did: String!
  privateKey: String
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  issuedClaims(where: ClaimWhereInput, orderBy: ClaimOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Claim!]
  receivedClaims(where: ClaimWhereInput, orderBy: ClaimOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Claim!]
}

type DidConnection {
  pageInfo: PageInfo!
  edges: [DidEdge]!
  aggregate: AggregateDid!
}

input DidCreateInput {
  id: ID
  did: String!
  privateKey: String
  users: UserCreateManyWithoutDidsInput
  issuedClaims: ClaimCreateManyWithoutIssuerInput
  receivedClaims: ClaimCreateManyWithoutSubjectInput
}

input DidCreateManyWithoutUsersInput {
  create: [DidCreateWithoutUsersInput!]
  connect: [DidWhereUniqueInput!]
}

input DidCreateOneWithoutIssuedClaimsInput {
  create: DidCreateWithoutIssuedClaimsInput
  connect: DidWhereUniqueInput
}

input DidCreateOneWithoutReceivedClaimsInput {
  create: DidCreateWithoutReceivedClaimsInput
  connect: DidWhereUniqueInput
}

input DidCreateWithoutIssuedClaimsInput {
  id: ID
  did: String!
  privateKey: String
  users: UserCreateManyWithoutDidsInput
  receivedClaims: ClaimCreateManyWithoutSubjectInput
}

input DidCreateWithoutReceivedClaimsInput {
  id: ID
  did: String!
  privateKey: String
  users: UserCreateManyWithoutDidsInput
  issuedClaims: ClaimCreateManyWithoutIssuerInput
}

input DidCreateWithoutUsersInput {
  id: ID
  did: String!
  privateKey: String
  issuedClaims: ClaimCreateManyWithoutIssuerInput
  receivedClaims: ClaimCreateManyWithoutSubjectInput
}

type DidEdge {
  node: Did!
  cursor: String!
}

enum DidOrderByInput {
  id_ASC
  id_DESC
  did_ASC
  did_DESC
  privateKey_ASC
  privateKey_DESC
}

type DidPreviousValues {
  id: ID!
  did: String!
  privateKey: String
}

input DidScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  did: String
  did_not: String
  did_in: [String!]
  did_not_in: [String!]
  did_lt: String
  did_lte: String
  did_gt: String
  did_gte: String
  did_contains: String
  did_not_contains: String
  did_starts_with: String
  did_not_starts_with: String
  did_ends_with: String
  did_not_ends_with: String
  privateKey: String
  privateKey_not: String
  privateKey_in: [String!]
  privateKey_not_in: [String!]
  privateKey_lt: String
  privateKey_lte: String
  privateKey_gt: String
  privateKey_gte: String
  privateKey_contains: String
  privateKey_not_contains: String
  privateKey_starts_with: String
  privateKey_not_starts_with: String
  privateKey_ends_with: String
  privateKey_not_ends_with: String
  AND: [DidScalarWhereInput!]
  OR: [DidScalarWhereInput!]
  NOT: [DidScalarWhereInput!]
}

type DidSubscriptionPayload {
  mutation: MutationType!
  node: Did
  updatedFields: [String!]
  previousValues: DidPreviousValues
}

input DidSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DidWhereInput
  AND: [DidSubscriptionWhereInput!]
  OR: [DidSubscriptionWhereInput!]
  NOT: [DidSubscriptionWhereInput!]
}

input DidUpdateInput {
  did: String
  privateKey: String
  users: UserUpdateManyWithoutDidsInput
  issuedClaims: ClaimUpdateManyWithoutIssuerInput
  receivedClaims: ClaimUpdateManyWithoutSubjectInput
}

input DidUpdateManyDataInput {
  did: String
  privateKey: String
}

input DidUpdateManyMutationInput {
  did: String
  privateKey: String
}

input DidUpdateManyWithoutUsersInput {
  create: [DidCreateWithoutUsersInput!]
  delete: [DidWhereUniqueInput!]
  connect: [DidWhereUniqueInput!]
  set: [DidWhereUniqueInput!]
  disconnect: [DidWhereUniqueInput!]
  update: [DidUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [DidUpsertWithWhereUniqueWithoutUsersInput!]
  deleteMany: [DidScalarWhereInput!]
  updateMany: [DidUpdateManyWithWhereNestedInput!]
}

input DidUpdateManyWithWhereNestedInput {
  where: DidScalarWhereInput!
  data: DidUpdateManyDataInput!
}

input DidUpdateOneRequiredWithoutIssuedClaimsInput {
  create: DidCreateWithoutIssuedClaimsInput
  update: DidUpdateWithoutIssuedClaimsDataInput
  upsert: DidUpsertWithoutIssuedClaimsInput
  connect: DidWhereUniqueInput
}

input DidUpdateOneRequiredWithoutReceivedClaimsInput {
  create: DidCreateWithoutReceivedClaimsInput
  update: DidUpdateWithoutReceivedClaimsDataInput
  upsert: DidUpsertWithoutReceivedClaimsInput
  connect: DidWhereUniqueInput
}

input DidUpdateWithoutIssuedClaimsDataInput {
  did: String
  privateKey: String
  users: UserUpdateManyWithoutDidsInput
  receivedClaims: ClaimUpdateManyWithoutSubjectInput
}

input DidUpdateWithoutReceivedClaimsDataInput {
  did: String
  privateKey: String
  users: UserUpdateManyWithoutDidsInput
  issuedClaims: ClaimUpdateManyWithoutIssuerInput
}

input DidUpdateWithoutUsersDataInput {
  did: String
  privateKey: String
  issuedClaims: ClaimUpdateManyWithoutIssuerInput
  receivedClaims: ClaimUpdateManyWithoutSubjectInput
}

input DidUpdateWithWhereUniqueWithoutUsersInput {
  where: DidWhereUniqueInput!
  data: DidUpdateWithoutUsersDataInput!
}

input DidUpsertWithoutIssuedClaimsInput {
  update: DidUpdateWithoutIssuedClaimsDataInput!
  create: DidCreateWithoutIssuedClaimsInput!
}

input DidUpsertWithoutReceivedClaimsInput {
  update: DidUpdateWithoutReceivedClaimsDataInput!
  create: DidCreateWithoutReceivedClaimsInput!
}

input DidUpsertWithWhereUniqueWithoutUsersInput {
  where: DidWhereUniqueInput!
  update: DidUpdateWithoutUsersDataInput!
  create: DidCreateWithoutUsersInput!
}

input DidWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  did: String
  did_not: String
  did_in: [String!]
  did_not_in: [String!]
  did_lt: String
  did_lte: String
  did_gt: String
  did_gte: String
  did_contains: String
  did_not_contains: String
  did_starts_with: String
  did_not_starts_with: String
  did_ends_with: String
  did_not_ends_with: String
  privateKey: String
  privateKey_not: String
  privateKey_in: [String!]
  privateKey_not_in: [String!]
  privateKey_lt: String
  privateKey_lte: String
  privateKey_gt: String
  privateKey_gte: String
  privateKey_contains: String
  privateKey_not_contains: String
  privateKey_starts_with: String
  privateKey_not_starts_with: String
  privateKey_ends_with: String
  privateKey_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  issuedClaims_every: ClaimWhereInput
  issuedClaims_some: ClaimWhereInput
  issuedClaims_none: ClaimWhereInput
  receivedClaims_every: ClaimWhereInput
  receivedClaims_some: ClaimWhereInput
  receivedClaims_none: ClaimWhereInput
  AND: [DidWhereInput!]
  OR: [DidWhereInput!]
  NOT: [DidWhereInput!]
}

input DidWhereUniqueInput {
  id: ID
  did: String
}

type Installation {
  id: ID!
  access_token: String!
  scope: String!
  user_id: String!
  team_name: String!
  team_id: String!
}

type InstallationConnection {
  pageInfo: PageInfo!
  edges: [InstallationEdge]!
  aggregate: AggregateInstallation!
}

input InstallationCreateInput {
  id: ID
  access_token: String!
  scope: String!
  user_id: String!
  team_name: String!
  team_id: String!
}

type InstallationEdge {
  node: Installation!
  cursor: String!
}

enum InstallationOrderByInput {
  id_ASC
  id_DESC
  access_token_ASC
  access_token_DESC
  scope_ASC
  scope_DESC
  user_id_ASC
  user_id_DESC
  team_name_ASC
  team_name_DESC
  team_id_ASC
  team_id_DESC
}

type InstallationPreviousValues {
  id: ID!
  access_token: String!
  scope: String!
  user_id: String!
  team_name: String!
  team_id: String!
}

type InstallationSubscriptionPayload {
  mutation: MutationType!
  node: Installation
  updatedFields: [String!]
  previousValues: InstallationPreviousValues
}

input InstallationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: InstallationWhereInput
  AND: [InstallationSubscriptionWhereInput!]
  OR: [InstallationSubscriptionWhereInput!]
  NOT: [InstallationSubscriptionWhereInput!]
}

input InstallationUpdateInput {
  access_token: String
  scope: String
  user_id: String
  team_name: String
  team_id: String
}

input InstallationUpdateManyMutationInput {
  access_token: String
  scope: String
  user_id: String
  team_name: String
  team_id: String
}

input InstallationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  access_token: String
  access_token_not: String
  access_token_in: [String!]
  access_token_not_in: [String!]
  access_token_lt: String
  access_token_lte: String
  access_token_gt: String
  access_token_gte: String
  access_token_contains: String
  access_token_not_contains: String
  access_token_starts_with: String
  access_token_not_starts_with: String
  access_token_ends_with: String
  access_token_not_ends_with: String
  scope: String
  scope_not: String
  scope_in: [String!]
  scope_not_in: [String!]
  scope_lt: String
  scope_lte: String
  scope_gt: String
  scope_gte: String
  scope_contains: String
  scope_not_contains: String
  scope_starts_with: String
  scope_not_starts_with: String
  scope_ends_with: String
  scope_not_ends_with: String
  user_id: String
  user_id_not: String
  user_id_in: [String!]
  user_id_not_in: [String!]
  user_id_lt: String
  user_id_lte: String
  user_id_gt: String
  user_id_gte: String
  user_id_contains: String
  user_id_not_contains: String
  user_id_starts_with: String
  user_id_not_starts_with: String
  user_id_ends_with: String
  user_id_not_ends_with: String
  team_name: String
  team_name_not: String
  team_name_in: [String!]
  team_name_not_in: [String!]
  team_name_lt: String
  team_name_lte: String
  team_name_gt: String
  team_name_gte: String
  team_name_contains: String
  team_name_not_contains: String
  team_name_starts_with: String
  team_name_not_starts_with: String
  team_name_ends_with: String
  team_name_not_ends_with: String
  team_id: String
  team_id_not: String
  team_id_in: [String!]
  team_id_not_in: [String!]
  team_id_lt: String
  team_id_lte: String
  team_id_gt: String
  team_id_gte: String
  team_id_contains: String
  team_id_not_contains: String
  team_id_starts_with: String
  team_id_not_starts_with: String
  team_id_ends_with: String
  team_id_not_ends_with: String
  AND: [InstallationWhereInput!]
  OR: [InstallationWhereInput!]
  NOT: [InstallationWhereInput!]
}

input InstallationWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createClaim(data: ClaimCreateInput!): Claim!
  updateClaim(data: ClaimUpdateInput!, where: ClaimWhereUniqueInput!): Claim
  updateManyClaims(data: ClaimUpdateManyMutationInput!, where: ClaimWhereInput): BatchPayload!
  upsertClaim(where: ClaimWhereUniqueInput!, create: ClaimCreateInput!, update: ClaimUpdateInput!): Claim!
  deleteClaim(where: ClaimWhereUniqueInput!): Claim
  deleteManyClaims(where: ClaimWhereInput): BatchPayload!
  createDid(data: DidCreateInput!): Did!
  updateDid(data: DidUpdateInput!, where: DidWhereUniqueInput!): Did
  updateManyDids(data: DidUpdateManyMutationInput!, where: DidWhereInput): BatchPayload!
  upsertDid(where: DidWhereUniqueInput!, create: DidCreateInput!, update: DidUpdateInput!): Did!
  deleteDid(where: DidWhereUniqueInput!): Did
  deleteManyDids(where: DidWhereInput): BatchPayload!
  createInstallation(data: InstallationCreateInput!): Installation!
  updateInstallation(data: InstallationUpdateInput!, where: InstallationWhereUniqueInput!): Installation
  updateManyInstallations(data: InstallationUpdateManyMutationInput!, where: InstallationWhereInput): BatchPayload!
  upsertInstallation(where: InstallationWhereUniqueInput!, create: InstallationCreateInput!, update: InstallationUpdateInput!): Installation!
  deleteInstallation(where: InstallationWhereUniqueInput!): Installation
  deleteManyInstallations(where: InstallationWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  claim(where: ClaimWhereUniqueInput!): Claim
  claims(where: ClaimWhereInput, orderBy: ClaimOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Claim]!
  claimsConnection(where: ClaimWhereInput, orderBy: ClaimOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ClaimConnection!
  did(where: DidWhereUniqueInput!): Did
  dids(where: DidWhereInput, orderBy: DidOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Did]!
  didsConnection(where: DidWhereInput, orderBy: DidOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DidConnection!
  installation(where: InstallationWhereUniqueInput!): Installation
  installations(where: InstallationWhereInput, orderBy: InstallationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Installation]!
  installationsConnection(where: InstallationWhereInput, orderBy: InstallationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): InstallationConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  claim(where: ClaimSubscriptionWhereInput): ClaimSubscriptionPayload
  did(where: DidSubscriptionWhereInput): DidSubscriptionPayload
  installation(where: InstallationSubscriptionWhereInput): InstallationSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  user_id: String!
  team_id: String!
  default_did: String!
  dids(where: DidWhereInput, orderBy: DidOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Did!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  user_id: String!
  team_id: String!
  default_did: String!
  dids: DidCreateManyWithoutUsersInput
}

input UserCreateManyWithoutDidsInput {
  create: [UserCreateWithoutDidsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateWithoutDidsInput {
  id: ID
  user_id: String!
  team_id: String!
  default_did: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  user_id_ASC
  user_id_DESC
  team_id_ASC
  team_id_DESC
  default_did_ASC
  default_did_DESC
}

type UserPreviousValues {
  id: ID!
  user_id: String!
  team_id: String!
  default_did: String!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user_id: String
  user_id_not: String
  user_id_in: [String!]
  user_id_not_in: [String!]
  user_id_lt: String
  user_id_lte: String
  user_id_gt: String
  user_id_gte: String
  user_id_contains: String
  user_id_not_contains: String
  user_id_starts_with: String
  user_id_not_starts_with: String
  user_id_ends_with: String
  user_id_not_ends_with: String
  team_id: String
  team_id_not: String
  team_id_in: [String!]
  team_id_not_in: [String!]
  team_id_lt: String
  team_id_lte: String
  team_id_gt: String
  team_id_gte: String
  team_id_contains: String
  team_id_not_contains: String
  team_id_starts_with: String
  team_id_not_starts_with: String
  team_id_ends_with: String
  team_id_not_ends_with: String
  default_did: String
  default_did_not: String
  default_did_in: [String!]
  default_did_not_in: [String!]
  default_did_lt: String
  default_did_lte: String
  default_did_gt: String
  default_did_gte: String
  default_did_contains: String
  default_did_not_contains: String
  default_did_starts_with: String
  default_did_not_starts_with: String
  default_did_ends_with: String
  default_did_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  user_id: String
  team_id: String
  default_did: String
  dids: DidUpdateManyWithoutUsersInput
}

input UserUpdateManyDataInput {
  user_id: String
  team_id: String
  default_did: String
}

input UserUpdateManyMutationInput {
  user_id: String
  team_id: String
  default_did: String
}

input UserUpdateManyWithoutDidsInput {
  create: [UserCreateWithoutDidsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutDidsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutDidsInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateWithoutDidsDataInput {
  user_id: String
  team_id: String
  default_did: String
}

input UserUpdateWithWhereUniqueWithoutDidsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutDidsDataInput!
}

input UserUpsertWithWhereUniqueWithoutDidsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutDidsDataInput!
  create: UserCreateWithoutDidsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user_id: String
  user_id_not: String
  user_id_in: [String!]
  user_id_not_in: [String!]
  user_id_lt: String
  user_id_lte: String
  user_id_gt: String
  user_id_gte: String
  user_id_contains: String
  user_id_not_contains: String
  user_id_starts_with: String
  user_id_not_starts_with: String
  user_id_ends_with: String
  user_id_not_ends_with: String
  team_id: String
  team_id_not: String
  team_id_in: [String!]
  team_id_not_in: [String!]
  team_id_lt: String
  team_id_lte: String
  team_id_gt: String
  team_id_gte: String
  team_id_contains: String
  team_id_not_contains: String
  team_id_starts_with: String
  team_id_not_starts_with: String
  team_id_ends_with: String
  team_id_not_ends_with: String
  default_did: String
  default_did_not: String
  default_did_in: [String!]
  default_did_not_in: [String!]
  default_did_lt: String
  default_did_lte: String
  default_did_gt: String
  default_did_gte: String
  default_did_contains: String
  default_did_not_contains: String
  default_did_starts_with: String
  default_did_not_starts_with: String
  default_did_ends_with: String
  default_did_not_ends_with: String
  dids_every: DidWhereInput
  dids_some: DidWhereInput
  dids_none: DidWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`