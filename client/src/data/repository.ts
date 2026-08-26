// Civic Field Notes: adapter boundary only; Phase 0 ships local mock contracts and no network client.
import type { AudienceSelection, Campaign, CampaignRecipient, CaseSummary, FormDefinition, FormVersion, Household, MockUser, Person, Submission, SubmissionAnswer, Task, VolunteerAssignment } from "@/domain/types";

export interface HealthRepository {
  listUsers(): Promise<MockUser[]>;
  listTasks(scopeUserId: string): Promise<Task[]>;
  listHouseholds(scopeUserId: string): Promise<Household[]>;
  listPeople(scopeUserId: string): Promise<Person[]>;
  listCases(scopeUserId: string): Promise<CaseSummary[]>;
}

export interface FormRepository {
  listDefinitions(ownerUserId: string): Promise<FormDefinition[]>;
  getVersion(formVersionId: string): Promise<FormVersion | undefined>;
}

export interface CampaignRepository {
  listCampaigns(ownerUserId: string): Promise<Campaign[]>;
  listAudienceSelections(campaignId: string): Promise<AudienceSelection[]>;
  listRecipients(campaignId: string): Promise<CampaignRecipient[]>;
}

export interface ResponsibilityRepository {
  listAssignments(scopeUserId: string): Promise<VolunteerAssignment[]>;
  canAccessHousehold(scopeUserId: string, householdId: string): Promise<boolean>;
}

export interface SubmissionRepository {
  listSubmissions(scopeUserId: string): Promise<Submission[]>;
  listAnswers(submissionId: string): Promise<SubmissionAnswer[]>;
}

export interface RepositoryResult<T> {
  data: T;
  source: "mock" | "future-adapter";
  generatedAt: string;
}

export const repositoryContract = {
  phase: 0,
  backend: "not-connected",
  allowedSources: ["synthetic-seed"],
} as const;
