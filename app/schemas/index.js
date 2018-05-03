import {schema} from 'normalizr'

export const tpoSchema = new schema.Entity('tpo')
export const plantProjectSchema = new schema.Entity('plantProject')
export const paymentGatewaySchema = new schema.Entity('paymentGateway')
export const userProfileSchema = new schema.Entity('userProfile')
export const treecounterSchema = new schema.Entity('treecounter')
export const contributionSchema = new schema.Entity('contribution')
export const plantProjectImageSchema = new schema.Entity('plantProjectImage')
export const contributionImageSchema = new schema.Entity('contributionImage')

tpoSchema.define({
  treecounter: treecounterSchema,
  plant_projects: [plantProjectSchema],
  payment_gateways: [paymentGatewaySchema],
})

plantProjectSchema.define({
  tpo: tpoSchema,
  project_images: [plantProjectImageSchema]
})

plantProjectImageSchema.define({
  plant_project: plantProjectSchema
})

contributionSchema.define({
  treecounter: treecounterSchema,
  contribution_images: [contributionImageSchema]
})

contributionImageSchema.define({
  contribution: contributionSchema
})

userProfileSchema.define({
  treecounter: treecounterSchema,
})

treecounterSchema.define({
  contributions: [contributionSchema],
})

