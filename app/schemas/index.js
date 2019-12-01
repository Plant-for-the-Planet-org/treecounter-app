import { schema } from 'normalizr';

export const paymentGatewaySchema = new schema.Entity('paymentGateway');
export const challengeSchema = new schema.Entity('challenge');
export const competitionSchema = new schema.Entity('competition');
export const competitionEnrollmentSchema = new schema.Entity(
  'competitionEnrollment'
);
export const competitionPagerSchema = new schema.Entity('competitionPager');
export const contributionSchema = new schema.Entity('contribution');
export const contributionImageSchema = new schema.Entity('contributionImage');
export const eventPledgeSchema = new schema.Entity('eventPledge');
export const plantProjectSchema = new schema.Entity('plantProject');
export const plantProjectImageSchema = new schema.Entity('plantProjectImage');
export const pledgeEventSchema = new schema.Entity('pledgeEvent');
export const reviewsSchema = new schema.Entity('reviews');
export const tpoSchema = new schema.Entity('tpo');
export const treecounterSchema = new schema.Entity('treecounter');
export const userProfileSchema = new schema.Entity('userProfile');

challengeSchema.define({
  treecounter: treecounterSchema
});

competitionSchema.define({
  treecounter: treecounterSchema,
  topEnrollments: [competitionEnrollmentSchema],
  allEnrollments: [competitionEnrollmentSchema]
});

competitionEnrollmentSchema.define({
  competition: competitionSchema
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

eventPledgeSchema.define({
  pledgeEvent: pledgeEventSchema,
  userProfile: userProfileSchema
});

plantProjectSchema.define({
  tpo: tpoSchema,
  plantProjectImages: [plantProjectImageSchema],
  reviews: [reviewsSchema]
});

reviewsSchema.define({
  plantProject: plantProjectSchema,
  userProfile: userProfileSchema
});

plantProjectImageSchema.define({
  plantProject: plantProjectSchema
});

pledgeEventSchema.define({
  eventPledges: [eventPledgeSchema]
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
  plantProjects: [plantProjectSchema],
  eventPledges: [eventPledgeSchema],
  reviews: [reviewsSchema]
});
