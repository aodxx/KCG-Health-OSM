// Civic Field Notes: all records here are synthetic Phase 0 fixtures; no clinical workflow is active.
import type { Household, MockUser, Person, Task } from "@/domain/types";
import type { HealthRepository } from "@/data/repository";

export const mockUsers: MockUser[] = [
  { id: "U-VOL06", name: "วาสนา ร่มเย็น", role: "volunteer", scopeLabel: "หมู่ 6 · บ้านโคกมะม่วง" },
  { id: "U-STAFF02", name: "นภา ศรีพัทลุง", role: "staff", scopeLabel: "รพ.สต.บ้านโคกชะงาย" },
  { id: "U-CLIN01", name: "ทีมแพทย์ประจำเครือข่าย", role: "clinician", scopeLabel: "เฉพาะงานที่ได้รับอนุญาต" },
  { id: "U-CIT01", name: "ครอบครัวศรีสุข", role: "citizen", scopeLabel: "ครัวเรือน HH0101" },
];

export const people: Person[] = [
  { id: "P0601", householdId: "HH0601", displayName: "คุณสมพงษ์ ตัวอย่าง", age: 62, useCase: "ผู้รับแบบฟอร์มสาธิต" },
  { id: "P0602", householdId: "HH0602", displayName: "คุณอัมพร ตัวอย่าง", age: 69, useCase: "ผู้รับแบบฟอร์มสาธิต" },
  { id: "P0101", householdId: "HH0101", displayName: "คุณกิตติ ตัวอย่าง", age: 58, useCase: "ผู้รับแบบฟอร์มสาธิต" },
];

export const households: Household[] = [
  { id: "HH0601", villageId: "V06", label: "ครัวเรือน HH0601", memberCount: 3, assignedVolunteer: "วาสนา ร่มเย็น", nextVisit: "วันนี้ · ก่อน 16:00" },
  { id: "HH0602", villageId: "V06", label: "ครัวเรือน HH0602", memberCount: 4, assignedVolunteer: "วาสนา ร่มเย็น", nextVisit: "พรุ่งนี้" },
  { id: "HH0603", villageId: "V06", label: "ครัวเรือน HH0603", memberCount: 2, assignedVolunteer: "วาสนา ร่มเย็น" },
  { id: "HH0101", villageId: "V01", label: "ครัวเรือน HH0101", memberCount: 3, assignedVolunteer: "สมใจ ใจดี", nextVisit: "พฤหัสบดี" },
];

export const tasks: Task[] = [
  { id: "TASK-FORM-001", type: "form_completion", title: "สำรวจสุขภาวะชุมชน", subject: "ผู้รับแบบฟอร์ม P0601 · HH0601", dueLabel: "วันนี้ · ก่อน 16:00", status: "submitted", risk: "normal", householdId: "HH0601", syncState: "synced", campaignId: "CAMP001", personId: "P0601" },
  { id: "TASK-FORM-002", type: "form_completion", title: "สำรวจสุขภาวะชุมชน", subject: "ผู้รับแบบฟอร์ม P0101 · HH0101", dueLabel: "10 กันยายน", status: "assigned", risk: "normal", householdId: "HH0101", syncState: "pending", campaignId: "CAMP001", personId: "P0101" },
];

export const getVolunteerTasks = () => tasks.filter((task) => task.householdId.startsWith("HH06") || task.householdId === "HH0101");
export const getHouseholds = () => households;

export const mockRepository: HealthRepository = {
  async listUsers() { return mockUsers.map((user) => ({ ...user })); },
  async listTasks(scopeUserId) { return scopeUserId === "U-VOL06" ? getVolunteerTasks().map((task) => ({ ...task })) : tasks.map((task) => ({ ...task })); },
  async listHouseholds(_scopeUserId) { return households.map((household) => ({ ...household })); },
  async listPeople(_scopeUserId) { return people.map((person) => ({ ...person })); },
  async listCases(_scopeUserId) { return []; },
};
