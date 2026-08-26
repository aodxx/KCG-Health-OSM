// Civic Field Notes: framework-independent Phase 0 domain contracts; no backend or workflow side effects.

export type EntityId = string;
export type Role = "volunteer" | "staff" | "clinician" | "citizen" | "coordinator" | "admin";
export type TaskStatus = "new" | "assigned" | "in_progress" | "submitted" | "under_review" | "referred" | "follow_up" | "closed";
export type RiskLevel = "normal" | "watch" | "needs_review" | "urgent";
export type SyncState = "synced" | "pending" | "failed";
export type VerificationStatus = "draft" | "submitted" | "verified" | "rejected";
export type ObservationSource = "field" | "citizen" | "staff";
export type CaseStatus = "open" | "under_review" | "referred" | "follow_up" | "closed";
export type ReferralStatus = "draft" | "sent" | "accepted" | "completed" | "cancelled";
export type FollowUpStatus = "planned" | "assigned" | "completed" | "cancelled";
export type ConsentStatus = "granted" | "withdrawn" | "not_required" | "pending";
export type AssignmentScope = "village" | "household" | "person";

export const ROLE_LABELS: Record<Role, string> = {
  citizen: "ประชาชน",
  volunteer: "อสม.",
  coordinator: "ผู้ประสานงาน",
  staff: "เจ้าหน้าที่",
  clinician: "แพทย์",
  admin: "ผู้ดูแลระบบ",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  new: "งานใหม่",
  assigned: "มอบหมายแล้ว",
  in_progress: "กำลังดำเนินการ",
  submitted: "ส่งข้อมูลแล้ว",
  under_review: "รอตรวจ",
  referred: "ส่งต่อแล้ว",
  follow_up: "ติดตามผล",
  closed: "ปิดแล้ว",
};

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  normal: "ปกติ",
  watch: "เฝ้าระวัง",
  needs_review: "ต้องตรวจสอบ",
  urgent: "เร่งด่วน",
};

export const SYNC_STATE_LABELS: Record<SyncState, string> = {
  synced: "ส่งแล้ว",
  pending: "รอส่ง",
  failed: "ส่งไม่สำเร็จ",
};

export interface ServiceUnit { id: EntityId; name: string; villages: number[]; code?: string; unitType?: string; active?: boolean; }
export interface Village { id: EntityId; number: number; name: string; serviceUnitId: EntityId; active?: boolean; }
export interface Household { id: EntityId; villageId: EntityId; label: string; memberCount: number; assignedVolunteer: string; nextVisit?: string; addressText?: string; status?: "active" | "inactive" | "moved"; }
export interface HouseholdMembership { id: EntityId; householdId: EntityId; personId: EntityId; relationCode: string; isPrimaryContact?: boolean; validFrom?: string; validTo?: string; }
export interface Person { id: EntityId; householdId: EntityId; displayName: string; age: number; useCase: string; sexAtRegistration?: string; birthDate?: string; status?: "active" | "inactive" | "deceased" | "moved"; }
export interface UserAccount { id: EntityId; personId?: EntityId; active: boolean; }
export interface UserRole { id: EntityId; userAccountId: EntityId; roleCode: Role; active: boolean; }
export interface RoleScope { id: EntityId; userRoleId: EntityId; serviceUnitId?: EntityId; villageId?: EntityId; caseId?: EntityId; validFrom?: string; validTo?: string; }
export interface Volunteer { id: EntityId; personId?: EntityId; userAccountId?: EntityId; volunteerCode?: string; homeVillageId: EntityId; active: boolean; }
export interface VolunteerAssignment { id: EntityId; volunteerId: EntityId; scope: AssignmentScope; villageId?: EntityId; householdId?: EntityId; personId?: EntityId; active: boolean; validFrom?: string; validTo?: string; }
export interface Campaign { id: EntityId; serviceUnitId: EntityId; campaignType: string; name: string; startDate?: string; endDate?: string; status: string; }
export interface Task { id: EntityId; type: string; title: string; subject: string; dueLabel: string; status: TaskStatus; risk: RiskLevel; householdId: EntityId; syncState: SyncState; campaignId?: EntityId; personId?: EntityId; caseId?: EntityId; priority?: string; versionNo?: number; }
export interface TaskAssignment { id: EntityId; taskId: EntityId; assigneeUserId: EntityId; assignedBy?: EntityId; assignedAt?: string; active: boolean; }
export interface Visit { id: EntityId; taskId?: EntityId; caseId?: EntityId; householdId: EntityId; personId: EntityId; visitType: string; startedAt?: string; endedAt?: string; recordedBy: EntityId; syncState: SyncState; clientIdempotencyKey: string; }
export interface Observation { id: EntityId; visitId: EntityId; personId: EntityId; typeCode: string; valueNumeric?: number; valueText?: string; valueBoolean?: boolean; unit?: string; observedAt: string; observedBy: EntityId; source: ObservationSource; verificationStatus: VerificationStatus; }
export interface RiskAssessment { id: EntityId; caseId: EntityId; level: RiskLevel; ruleSetVersion: string; explanationCode: string; requiresStaffReview: boolean; generatedAt: string; reviewedBy?: EntityId; reviewedAt?: string; }
export interface Alert { id: EntityId; caseId: EntityId; alertType: string; severity: RiskLevel; status: string; raisedBy: EntityId; raisedAt: string; acknowledgedBy?: EntityId; acknowledgedAt?: string; }
export interface Case { id: EntityId; personId: EntityId; serviceUnitId: EntityId; caseType: string; status: CaseStatus; currentRiskLevel: RiskLevel; openedAt: string; closedAt?: string; ownerUserId?: EntityId; }
export interface Review { id: EntityId; caseId: EntityId; reviewerUserId: EntityId; reviewType: string; resultCode: string; noteSummary?: string; reviewedAt: string; }
export interface Referral { id: EntityId; caseId: EntityId; fromServiceUnitId: EntityId; toServiceUnitId?: EntityId; referredBy: EntityId; referralReasonCode: string; status: ReferralStatus; referredAt: string; }
export interface FollowUp { id: EntityId; caseId: EntityId; taskId?: EntityId; followUpType: string; dueAt: string; assignedTo: EntityId; status: FollowUpStatus; completedAt?: string; }
export interface CaseEvent { id: EntityId; caseId: EntityId; eventType: string; actorUserId?: EntityId; occurredAt: string; payloadMinimized?: Record<string, string | number | boolean | null>; }
export interface Consent { id: EntityId; personId: EntityId; purposeCode: string; status: ConsentStatus; grantedAt?: string; withdrawnAt?: string; evidenceReference?: string; }
export interface AuditEvent { id: EntityId; actorUserId: EntityId; actionCode: string; resourceType: string; resourceId: EntityId; serviceUnitId?: EntityId; occurredAt: string; result: "success" | "failure"; contextCode?: string; }

export interface CaseSummary { id: EntityId; personName: string; village: string; risk: RiskLevel; lastEvent: string; nextAction: string; }
export interface MockUser { id: EntityId; name: string; role: Role; scopeLabel: string; }
