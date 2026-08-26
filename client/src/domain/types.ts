// Civic Field Notes: domain semantics stay framework-independent; Thai copy belongs in UI.

export type Role = "volunteer" | "staff" | "clinician" | "citizen";
export type TaskStatus = "assigned" | "in_progress" | "submitted" | "under_review" | "follow_up" | "closed";
export type RiskLevel = "normal" | "watch" | "needs_review" | "urgent";
export type SyncState = "synced" | "pending" | "failed";

export interface ServiceUnit {
  id: string;
  name: string;
  villages: number[];
}

export interface Village {
  id: string;
  number: number;
  name: string;
  serviceUnitId: string;
}

export interface Household {
  id: string;
  villageId: string;
  label: string;
  memberCount: number;
  assignedVolunteer: string;
  nextVisit?: string;
}

export interface Person {
  id: string;
  householdId: string;
  displayName: string;
  age: number;
  useCase: string;
}

export interface Task {
  id: string;
  type: string;
  title: string;
  subject: string;
  dueLabel: string;
  status: TaskStatus;
  risk: RiskLevel;
  householdId: string;
  syncState: SyncState;
}

export interface CaseSummary {
  id: string;
  personName: string;
  village: string;
  risk: RiskLevel;
  lastEvent: string;
  nextAction: string;
}

export interface MockUser {
  id: string;
  name: string;
  role: Role;
  scopeLabel: string;
}
