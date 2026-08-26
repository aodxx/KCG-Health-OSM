// Civic Field Notes: adapter boundary only; Phase 0 ships a local mock implementation and no network client.
import type { CaseSummary, Household, MockUser, Task } from "@/domain/types";

export interface HealthRepository {
  listUsers(): Promise<MockUser[]>;
  listTasks(scopeUserId: string): Promise<Task[]>;
  listHouseholds(scopeUserId: string): Promise<Household[]>;
  listCases(scopeUserId: string): Promise<CaseSummary[]>;
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
