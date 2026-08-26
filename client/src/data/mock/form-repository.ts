// Civic Field Notes: form-driven Phase 0 fixtures; all records are synthetic and local-only.
import type { AudienceSelection, Campaign, CampaignRecipient, FormDefinition, FormVersion, Submission, SubmissionAnswer, VolunteerAssignment } from "@/domain/types";
import type { CampaignRepository, FormRepository, ResponsibilityRepository, SubmissionRepository } from "@/data/repository";

export const formDefinitions: FormDefinition[] = [
  { id: "FORM001", name: "แบบสำรวจสุขภาวะชุมชน", description: "แบบฟอร์มสาธิตสำหรับเก็บข้อมูลทั่วไปตามภารกิจ", ownerUserId: "U-STAFF02", status: "published", currentVersionId: "FORM001-V1" },
];

export const formVersions: FormVersion[] = [
  { id: "FORM001-V1", formDefinitionId: "FORM001", version: 1, reviewPolicy: "review_by_rule", immutable: true, publishedAt: "2026-08-27T08:00:00+07:00", questions: [
    { id: "Q001", key: "contact_preference", label: "ช่องทางติดต่อที่สะดวก", type: "select", required: true, order: 1, options: [{ value: "phone", label: "โทรศัพท์", order: 1 }, { value: "volunteer", label: "ติดต่อผ่าน อสม.", order: 2 }] },
    { id: "Q002", key: "needs_support", label: "ต้องการให้ทีมดูแลติดต่อกลับหรือไม่", type: "yes_no", required: true, order: 2 },
    { id: "Q003", key: "notes", label: "รายละเอียดเพิ่มเติม", type: "long_text", required: false, order: 3 },
  ] },
];

export const campaigns: Campaign[] = [
  { id: "CAMP001", serviceUnitId: "SU01", campaignType: "community_screening", name: "สำรวจสุขภาวะชุมชน รอบที่ 1", formVersionId: "FORM001-V1", status: "published", startDate: "2026-08-27", endDate: "2026-09-10" },
];

export const audienceSelections: AudienceSelection[] = [
  { id: "AUD001", campaignId: "CAMP001", targetType: "village", villageIds: ["V06"] },
];

export const campaignRecipients: CampaignRecipient[] = [
  { id: "REC001", campaignId: "CAMP001", personId: "P0601", householdId: "HH0601", volunteerId: "U-VOL06", status: "submitted", completionMode: "proxy_by_volunteer" },
  { id: "REC002", campaignId: "CAMP001", personId: "P0101", householdId: "HH0101", status: "assigned" },
];

export const submissions: Submission[] = [
  { id: "SUB001", campaignRecipientId: "REC001", formVersionId: "FORM001-V1", targetPersonId: "P0601", householdId: "HH0601", actualSubmitterId: "U-VOL06", completionMode: "proxy_by_volunteer", status: "submitted", submittedAt: "2026-08-27T10:42:00+07:00", syncState: "synced" },
];

export const submissionAnswers: SubmissionAnswer[] = [
  { id: "ANS001", submissionId: "SUB001", questionId: "Q001", valueText: "volunteer" },
  { id: "ANS002", submissionId: "SUB001", questionId: "Q002", valueBoolean: false },
];

const copy = <T>(items: T[]) => items.map((item) => ({ ...item }));

export const mockFormRepository: FormRepository = {
  async listDefinitions(ownerUserId) { return copy(formDefinitions.filter((form) => form.ownerUserId === ownerUserId)); },
  async getVersion(formVersionId) { return formVersions.find((version) => version.id === formVersionId); },
};

export const mockCampaignRepository: CampaignRepository = {
  async listCampaigns(_ownerUserId) { return copy(campaigns); },
  async listAudienceSelections(campaignId) { return copy(audienceSelections.filter((selection) => selection.campaignId === campaignId)); },
  async listRecipients(campaignId) { return copy(campaignRecipients.filter((recipient) => recipient.campaignId === campaignId)); },
};

const volunteerAssignments: VolunteerAssignment[] = [
  { id: "ASSIGN-VOL06-HH0601", volunteerId: "VOL06", scope: "household", householdId: "HH0601", active: true, validFrom: "2026-01-01" },
  { id: "ASSIGN-VOL06-HH0602", volunteerId: "VOL06", scope: "household", householdId: "HH0602", active: true, validFrom: "2026-01-01" },
  { id: "ASSIGN-VOL06-HH0603", volunteerId: "VOL06", scope: "household", householdId: "HH0603", active: true, validFrom: "2026-01-01" },
];

export const mockResponsibilityRepository: ResponsibilityRepository = {
  async listAssignments(scopeUserId) { return scopeUserId === "U-VOL06" ? copy(volunteerAssignments) : []; },
  async canAccessHousehold(scopeUserId, householdId) { return scopeUserId === "U-STAFF02" || (scopeUserId === "U-VOL06" && volunteerAssignments.some((assignment) => assignment.householdId === householdId && assignment.active)); },
};

export const mockSubmissionRepository: SubmissionRepository = {
  async listSubmissions(scopeUserId) { return scopeUserId === "U-VOL06" || scopeUserId === "U-STAFF02" ? copy(submissions) : []; },
  async listAnswers(submissionId) { return copy(submissionAnswers.filter((answer) => answer.submissionId === submissionId)); },
};
