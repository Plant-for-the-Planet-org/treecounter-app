import { schema } from 'normalizr';

export const tpoSchema = new schema.Entity('tpo');
export const plantProjectSchema = new schema.Entity('plantProject');
export const paymentGatewaySchema = new schema.Entity('paymentGateway');
export const userProfileSchema = new schema.Entity('userProfile');
export const treecounterSchema = new schema.Entity('treecounter');
export const contributionSchema = new schema.Entity('contribution');
export const plantProjectImageSchema = new schema.Entity('plantProjectImage');
export const contributionImageSchema = new schema.Entity('contributionImage');
export const challengeSchema = new schema.Entity('challenges');

tpoSchema.define({
  treecounter: treecounterSchema,
  plantProjects: [plantProjectSchema],
  paymentGateways: [paymentGatewaySchema]
});

plantProjectSchema.define({
  tpo: tpoSchema,
  plantProjectImages: [plantProjectImageSchema]
});

plantProjectImageSchema.define({
  plantProject: plantProjectSchema
});

contributionSchema.define({
  treecounter: treecounterSchema,
  contributionImages: [contributionImageSchema]
});

challengeSchema.define({
  treecounter: treecounterSchema
});

contributionImageSchema.define({
  contribution: contributionSchema
});

userProfileSchema.define({
  treecounter: treecounterSchema,
  plantProjects: [plantProjectSchema]
});

treecounterSchema.define({
  contributions: [contributionSchema],
  challenges: [challengeSchema]
});
