// Civic Field Notes: all records here are synthetic fixtures for Phase 0 only.
import type { CaseSummary, Household, MockUser, Task } from "@/domain/types";
import type { HealthRepository } from "@/data/repository";

export const mockUsers: MockUser[] = [
  { id: "U-VOL06", name: "วาสนา ร่มเย็น", role: "volunteer", scopeLabel: "หมู่ 6 · บ้านโคกมะม่วง" },
  { id: "U-STAFF02", name: "นภา ศรีพัทลุง", role: "staff", scopeLabel: "รพ.สต.บ้านโคกชะงาย" },
  { id: "U-CLIN01", name: "ทีมแพทย์ประจำเครือข่าย", role: "clinician", scopeLabel: "เฉพาะเคสที่ส่งต่อ" },
  { id: "U-CIT01", name: "ครอบครัวศรีสุข", role: "citizen", scopeLabel: "ครัวเรือน HH0101" },
];

export const households: Household[] = [
  { id: "HH0601", villageId: "V06", label: "ครัวเรือน HH0601", memberCount: 3, assignedVolunteer: "วาสนา ร่มเย็น", nextVisit: "วันนี้ · ก่อน 16:00" },
  { id: "HH0602", villageId: "V06", label: "ครัวเรือน HH0602", memberCount: 4, assignedVolunteer: "วาสนา ร่มเย็น", nextVisit: "พรุ่งนี้" },
  { id: "HH0603", villageId: "V06", label: "ครัวเรือน HH0603", memberCount: 2, assignedVolunteer: "วาสนา ร่มเย็น" },
  { id: "HH0101", villageId: "V01", label: "ครัวเรือน HH0101", memberCount: 3, assignedVolunteer: "สมใจ ใจดี", nextVisit: "พฤหัสบดี" },
];

export const tasks: Task[] = [
  { id: "TASK03", type: "ncd_screening", title: "คัดกรอง NCD ที่บ้าน", subject: "นายสมพงษ์ ตั้งใจ · อายุ 62 ปี", dueLabel: "วันนี้ · เร่งด่วน", status: "submitted", risk: "urgent", householdId: "HH0601", syncState: "synced" },
  { id: "TASK04", type: "repeat_measurement", title: "วัดซ้ำและติดตามผล", subject: "นางอัมพร ใจดี · อายุ 69 ปี", dueLabel: "พรุ่งนี้", status: "assigned", risk: "watch", householdId: "HH0701", syncState: "pending" },
  { id: "TASK01", type: "ncd_screening", title: "คัดกรอง NCD ที่บ้าน", subject: "นายกิตติ ศรีสุข · อายุ 58 ปี", dueLabel: "พฤหัสบดี", status: "assigned", risk: "normal", householdId: "HH0101", syncState: "synced" },
];

export const cases: CaseSummary[] = [
  { id: "CASE03", personName: "นายสมพงษ์ ตั้งใจ", village: "หมู่ 6 · บ้านโคกมะม่วง", risk: "urgent", lastEvent: "ส่งผลคัดกรองแล้ว 10:42 น.", nextAction: "เจ้าหน้าที่ตรวจผล" },
  { id: "CASE02", personName: "นายวิทยา ชื่นใจ", village: "หมู่ 8 · บ้านควน", risk: "needs_review", lastEvent: "รอตรวจซ้ำเมื่อวาน", nextAction: "มอบหมายงานวัดซ้ำ" },
  { id: "CASE01", personName: "นางอัมพร ใจดี", village: "หมู่ 7 · บ้านทุ่งยาว", risk: "watch", lastEvent: "เยี่ยมบ้าน 24 ส.ค.", nextAction: "ติดตามตามนัด" },
];

export const getVolunteerTasks = () => tasks.filter((task) => task.householdId.startsWith("HH06") || task.householdId === "HH0101");
export const getHouseholds = () => households;
export const getCases = () => cases;

export const mockRepository: HealthRepository = {
  async listUsers() { return mockUsers.map((user) => ({ ...user })); },
  async listTasks(scopeUserId) {
    const user = mockUsers.find((item) => item.id === scopeUserId);
    return user?.role === "volunteer" ? getVolunteerTasks().map((task) => ({ ...task })) : tasks.map((task) => ({ ...task }));
  },
  async listHouseholds(_scopeUserId) { return households.map((household) => ({ ...household })); },
  async listCases(_scopeUserId) { return cases.map((item) => ({ ...item })); },
};
