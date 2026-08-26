// Civic Field Notes: shared visual language for status, risk, sync, and field-note hierarchy.
import { AlertTriangle, Check, CloudOff, Clock3, MapPin, RefreshCw, Wifi } from "lucide-react";
import type { RiskLevel, SyncState, TaskStatus } from "@/domain/types";
import { cn } from "@/lib/utils";

const riskMeta: Record<RiskLevel, { label: string; icon: typeof Check; className: string }> = {
  normal: { label: "ปกติ", icon: Check, className: "risk-normal" },
  watch: { label: "เฝ้าระวัง", icon: Clock3, className: "risk-watch" },
  needs_review: { label: "รอตรวจ", icon: RefreshCw, className: "risk-review" },
  urgent: { label: "เร่งด่วน", icon: AlertTriangle, className: "risk-urgent" },
};

const statusLabels: Record<TaskStatus, string> = {
  assigned: "มอบหมายแล้ว",
  in_progress: "กำลังทำ",
  submitted: "ส่งแล้ว",
  under_review: "เจ้าหน้าที่กำลังตรวจ",
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
