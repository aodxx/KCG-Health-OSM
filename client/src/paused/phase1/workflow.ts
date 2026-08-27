// Civic Field Notes: Phase 1 workflow semantics are explicit, append-oriented, and mock-only.
import type { RiskLevel, TaskStatus } from "./types";

export type WorkflowStage = "assign" | "visit" | "observation" | "risk" | "review" | "referral" | "follow_up" | "close";
export type ObservationDraft = { systolic: string; diastolic: string; glucose: string; redFlag: boolean; note: string };

export interface WorkflowEvent { id: string; stage: WorkflowStage; title: string; detail: string; at: string; tone?: RiskLevel; }

export interface WorkflowState {
  taskStatus: TaskStatus;
  stage: WorkflowStage;
  risk: RiskLevel | null;
  observation: ObservationDraft;
  reviewNote: string;
  referralRequested: boolean;
  followUpCreated: boolean;
  followUpCompleted: boolean;
  caseClosed: boolean;
  events: WorkflowEvent[];
}

export const initialObservation: ObservationDraft = { systolic: "", diastolic: "", glucose: "", redFlag: false, note: "" };
export const initialWorkflow: WorkflowState = {
  taskStatus: "assigned", stage: "assign", risk: null, observation: initialObservation, reviewNote: "", referralRequested: false, followUpCreated: false, followUpCompleted: false, caseClosed: false,
  events: [{ id: "event-assign", stage: "assign", title: "มอบหมายงานแล้ว", detail: "งานคัดกรอง NCD ถูกมอบหมายให้ วาสนา ร่มเย็น", at: "วันนี้ · 09:10 น." }],
};

export function deriveRisk(observation: ObservationDraft): RiskLevel {
  const systolic = Number(observation.systolic);
  const diastolic = Number(observation.diastolic);
  if (observation.redFlag || systolic >= 180 || diastolic >= 110) return "urgent";
  if (systolic >= 140 || diastolic >= 90) return "needs_review";
  if (systolic >= 130 || diastolic >= 80) return "watch";
  return "normal";
}
