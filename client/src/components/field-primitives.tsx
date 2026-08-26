// Civic Field Notes: shared visual language for status, risk, sync, and field-note hierarchy.
import { AlertTriangle, Check, ChevronRight, CloudOff, Clock3, ClipboardList, MapPin, RefreshCw, UserRound, Wifi } from "lucide-react";
import type { RiskLevel, SyncState, TaskStatus } from "@/domain/types";
import { cn } from "@/lib/utils";

const riskMeta: Record<RiskLevel, { label: string; icon: typeof Check; className: string }> = {
  normal: { label: "ปกติ", icon: Check, className: "risk-normal" },
  watch: { label: "เฝ้าระวัง", icon: Clock3, className: "risk-watch" },
  needs_review: { label: "รอตรวจ", icon: RefreshCw, className: "risk-review" },
  urgent: { label: "เร่งด่วน", icon: AlertTriangle, className: "risk-urgent" },
};

const statusLabels: Record<TaskStatus, string> = {
  new: "งานใหม่",
  assigned: "มอบหมายแล้ว",
  in_progress: "กำลังทำ",
  submitted: "ส่งแล้ว",
  under_review: "เจ้าหน้าที่กำลังตรวจ",
  referred: "ส่งต่อแล้ว",
  follow_up: "ติดตามต่อ",
  closed: "ปิดงานแล้ว",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const meta = riskMeta[level];
  const Icon = meta.icon;
  return <span className={cn("ink-stamp", meta.className)}><Icon size={14} strokeWidth={2.3} aria-hidden="true" />{meta.label}</span>;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return <span className="status-stamp"><span className="status-dot" aria-hidden="true" />{statusLabels[status]}</span>;
}

export function SyncStatusIndicator({ state }: { state: SyncState }) {
  const meta = {
    synced: { label: "บันทึกแล้ว", icon: Wifi, className: "sync-good" },
    pending: { label: "รอส่งเมื่อมีสัญญาณ", icon: CloudOff, className: "sync-pending" },
    failed: { label: "ส่งไม่สำเร็จ · ลองใหม่", icon: RefreshCw, className: "sync-failed" },
  }[state];
  const Icon = meta.icon;
  return <span className={cn("sync-state", meta.className)}><Icon size={14} aria-hidden="true" />{meta.label}</span>;
}

export function OfflineBanner() {
  return <div className="offline-banner" role="status"><CloudOff size={17} aria-hidden="true" /><span><strong>โหมดออฟไลน์</strong> · งานที่บันทึกไว้จะส่งเมื่อกลับมาออนไลน์</span></div>;
}

export function FieldNoteRule({ children }: { children: React.ReactNode }) {
  return <div className="field-note-rule"><span className="rule-marker" aria-hidden="true" />{children}</div>;
}

export function VillageLabel({ children }: { children: React.ReactNode }) {
  return <span className="village-label"><MapPin size={13} aria-hidden="true" />{children}</span>;
}

export function HouseholdCard({ household }: { household: import("@/domain/types").Household }) {
  return <article className="household-row"><span className="household-icon"><UserRound size={17} aria-hidden="true" /></span><span><strong>{household.label}</strong><span>{household.memberCount} คน · {household.assignedVolunteer}</span></span><ChevronRight className="muted-icon" size={17} aria-hidden="true" /></article>;
}

export function PersonSummary({ person }: { person: import("@/domain/types").Person }) {
  return <div className="subject-card"><span className="subject-avatar"><UserRound size={18} aria-hidden="true" /></span><span><span className="eyebrow">บุคคลในครัวเรือน</span><strong>{person.displayName}</strong><span>อายุ {person.age} ปี · {person.useCase}</span></span></div>;
}

export function TaskCard({ task }: { task: import("@/domain/types").Task }) {
  return <article className="task-card"><span className="task-margin" aria-hidden="true">{task.id.slice(-2)}</span><div className="task-body"><div className="task-topline"><span className="task-type"><ClipboardList size={13} aria-hidden="true" />{task.type}</span><RiskBadge level={task.risk} /></div><h3>{task.title}</h3><p className="task-subject">{task.subject}</p><div className="task-footer"><TaskStatusBadge status={task.status} /><SyncStatusIndicator state={task.syncState} /></div></div></article>;
}

export function CaseTimelineItem({ event }: { event: import("@/domain/types").CaseEvent }) {
  return <div className="timeline-item"><span className="timeline-dot" aria-hidden="true" /><div><span className="timeline-meta">{event.occurredAt} · {event.eventType}</span><strong>เหตุการณ์ในเคส</strong><p>บันทึกโดยผู้ใช้งานในขอบเขตที่ได้รับอนุญาต</p></div></div>;
}

export function EmptyState({ title = "ยังไม่มีรายการ", detail = "ข้อมูลจะแสดงเมื่อมีรายการในขอบเขตของคุณ" }: { title?: string; detail?: string }) {
  return <div className="empty-state" role="status"><ClipboardList size={20} aria-hidden="true" /><strong>{title}</strong><p>{detail}</p></div>;
}

export function LoadingState({ label = "กำลังเตรียมข้อมูล" }: { label?: string }) {
  return <div className="empty-state" role="status" aria-live="polite"><RefreshCw size={18} aria-hidden="true" />{label}</div>;
}

export function ErrorState({ label = "ไม่สามารถแสดงข้อมูลได้" }: { label?: string }) {
  return <div className="empty-state error-state" role="alert"><AlertTriangle size={18} aria-hidden="true" />{label}</div>;
}
