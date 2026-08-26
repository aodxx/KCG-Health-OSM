// Civic Field Notes: shared mock workflow state; replace the provider implementation with a repository adapter in a later phase.
import { createContext, useContext, useMemo, useState } from "react";
import { deriveRisk, initialWorkflow, type ObservationDraft, type WorkflowEvent, type WorkflowState } from "@/domain/workflow";

interface WorkflowContextValue extends WorkflowState {
  startVisit: () => void;
  submitObservation: (draft: ObservationDraft) => void;
  submitReview: (note: string) => void;
  createReferral: () => void;
  createFollowUp: () => void;
  completeFollowUp: () => void;
  closeCase: () => void;
  resetWorkflow: () => void;
}

const WorkflowContext = createContext<WorkflowContextValue | null>(null);
const stamp = () => new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
const addEvent = (state: WorkflowState, event: Omit<WorkflowEvent, "id" | "at">): WorkflowState => ({ ...state, events: [...state.events, { ...event, id: `event-${state.events.length + 1}`, at: `วันนี้ · ${stamp()} น.` }] });

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkflowState>(initialWorkflow);
  const value = useMemo<WorkflowContextValue>(() => ({ ...state,
    startVisit: () => setState((current) => addEvent({ ...current, stage: "visit", taskStatus: "in_progress" }, { stage: "visit", title: "เริ่มเยี่ยมบ้าน", detail: "อสม. เริ่มบันทึกการเยี่ยมบ้านในพื้นที่ที่รับผิดชอบ" })),
    submitObservation: (observation) => setState((current) => { const risk = deriveRisk(observation); return addEvent({ ...current, stage: "risk", taskStatus: "submitted", risk, observation }, { stage: "risk", title: "ส่งผลคัดกรองแล้ว", detail: "บันทึก observation แล้ว · ต้องให้เจ้าหน้าที่ตรวจ", tone: risk }); }),
    submitReview: (reviewNote) => setState((current) => addEvent({ ...current, stage: current.risk === "urgent" ? "referral" : "follow_up", taskStatus: current.risk === "urgent" ? "under_review" : "follow_up", reviewNote }, { stage: "review", title: "เจ้าหน้าที่ตรวจข้อมูลแล้ว", detail: reviewNote || "ตรวจ observation และบันทึกผลการประสานงาน" })),
    createReferral: () => setState((current) => addEvent({ ...current, stage: "referral", referralRequested: true, taskStatus: "follow_up" }, { stage: "referral", title: "สร้างการส่งต่อ", detail: "ส่งต่อให้ทีมที่เกี่ยวข้องตรวจและประสานงานต่อ", tone: "urgent" })),
    createFollowUp: () => setState((current) => addEvent({ ...current, stage: "follow_up", followUpCreated: true, taskStatus: "follow_up" }, { stage: "follow_up", title: "สร้างงานติดตามแล้ว", detail: "มอบหมายงานติดตามกลับให้ อสม. ในพื้นที่" })),
    completeFollowUp: () => setState((current) => addEvent({ ...current, stage: "close", followUpCompleted: true }, { stage: "close", title: "ติดตามผลเรียบร้อย", detail: "บันทึกการติดตามครั้งล่าสุดแล้ว รอปิดเคส" })),
    closeCase: () => setState((current) => addEvent({ ...current, stage: "close", taskStatus: "closed", caseClosed: true }, { stage: "close", title: "ปิดเคสแล้ว", detail: "วงจรการประสานงานของเคสนี้เสร็จสมบูรณ์" })),
    resetWorkflow: () => setState(initialWorkflow),
  }), [state]);
  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
}

export function useWorkflow() { const context = useContext(WorkflowContext); if (!context) throw new Error("useWorkflow must be used inside WorkflowProvider"); return context; }
