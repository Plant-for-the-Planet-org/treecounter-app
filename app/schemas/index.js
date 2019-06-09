import { schema } from 'normalizr';
import { tree } from '../assets';

export const challengeSchema = new schema.Entity('challenge');
export const competitionSchema = new schema.Entity('competition');
export const paymentGatewaySchema = new schema.Entity('paymentGateway');
export const competitionEnrollmentSchema = new schema.Entity(
  'competitionEnrollment'
);
export const competitionPagerSchema = new schema.Entity('competitionPager');
export const contributionSchema = new schema.Entity('contribution');
export const contributionImageSchema = new schema.Entity('contributionImage');
export const plantProjectSchema = new schema.Entity('plantProject');
export const plantProjectImageSchema = new schema.Entity('plantProjectImage');
export const tpoSchema = new schema.Entity('tpo');
export const treecounterSchema = new schema.Entity('treecounter');
export const userProfileSchema = new schema.Entity('userProfile');

challengeSchema.define({
  treecounter: treecounterSchema
});

competitionSchema.define({
  topEnrollments: [competitionEnrollmentSchema],
  allEnrollments: [competitionEnrollmentSchema]
});

competitionPagerSchema.define({
  competitions: [competitionSchema]
});

contributionSchema.define({
  treecounter: treecounterSchema,
  contributionImages: [contributionImageSchema]
});

contributionImageSchema.define({
  contribution: contributionSchema
});

plantProjectSchema.define({
  tpo: tpoSchema,
  plantProjectImages: [plantProjectImageSchema]
});

plantProjectImageSchema.define({
  plantProject: plantProjectSchema
});

tpoSchema.define({
  treecounter: treecounterSchema,
  plantProjects: [plantProjectSchema],
  paymentGateways: [paymentGatewaySchema]
});

treecounterSchema.define({
  contributions: [contributionSchema],
  challenges: [challengeSchema],
  competitions: [competitionSchema],
  competitionEnrollments: [competitionEnrollmentSchema]
});

userProfileSchema.define({
  treecounter: treecounterSchema,
  plantProjects: [plantProjectSchema]
});
