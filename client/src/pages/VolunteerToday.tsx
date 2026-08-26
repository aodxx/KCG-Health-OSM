// Civic Field Notes: Phase 0 volunteer shell shows assigned forms and household responsibility only.
import { ArrowRight, CalendarClock, ChevronRight, ClipboardCheck, Navigation, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { getHouseholds } from "@/data/mock/repository";
import { campaignRecipients } from "@/data/mock/form-repository";
import { TaskStatusBadge, SyncStatusIndicator, VillageLabel } from "@/components/field-primitives";

export default function VolunteerToday() {
  const [, navigate] = useLocation();
  const recipients = campaignRecipients.filter((recipient) => recipient.volunteerId === "U-VOL06");
  const households = getHouseholds().filter((household) => household.villageId === "V06");
  return <section className="page-stack">
    <header className="page-heading"><div><p className="eyebrow">พื้นที่ของฉัน · 27 สิงหาคม 2569</p><h1>แบบฟอร์มที่ได้รับ</h1><p className="lede">สวัสดี วาสนา ตรวจงานที่ได้รับและครัวเรือนในความรับผิดชอบของคุณ</p></div><button className="avatar-button" aria-label="เปิดโปรไฟล์"><UserRound size={19} /></button></header>
    <div className="context-strip"><div><span className="strip-label">ความรับผิดชอบ</span><strong>หมู่ 6 · บ้านโคกมะม่วง</strong></div><VillageLabel>รพ.สต.บ้านโคกชะงาย</VillageLabel></div>
    <div className="metric-row"><div className="metric-card metric-primary"><span>แบบฟอร์มที่ได้รับ</span><strong>{String(recipients.length).padStart(2, "0")}</strong><small>จากภารกิจจำลอง</small></div><div className="metric-card"><span>ส่งคำตอบแล้ว</span><strong>01</strong><small>รอเจ้าหน้าที่ตรวจ</small></div><div className="metric-card"><span>ผู้รับทั้งหมด</span><strong>{String(campaignRecipients.length).padStart(2, "0")}</strong><small>ในข้อมูลจำลอง</small></div></div>
    <div className="section-heading"><div><span className="section-index">01 / งานที่ได้รับ</span><h2>คิวแบบฟอร์มของคุณ</h2></div><button className="text-button" onClick={() => navigate("/volunteer/tasks")}>ดูทั้งหมด <ArrowRight size={16} /></button></div>
    <div className="task-list">{recipients.map((recipient, index) => { const submitted = recipient.status === "submitted"; return <article className="task-card" key={recipient.id}><div className="task-margin"><span>0{index + 1}</span></div><div className="task-body"><div className="task-topline"><span className="task-type"><ClipboardCheck size={14} />แบบฟอร์มที่ได้รับ</span><span className="status-stamp">{submitted ? "ส่งคำตอบแล้ว" : "รอดำเนินการ"}</span></div><h3>สำรวจสุขภาวะชุมชน</h3><p className="task-subject"><UserRound size={15} />ผู้รับในครัวเรือน · {recipient.personId}</p><div className="task-footer"><span className="due-label"><CalendarClock size={14} />{submitted ? "ส่งแล้ว · รอตรวจ" : "กำหนดส่ง · 10 ก.ย."}</span><SyncStatusIndicator state={submitted ? "synced" : "pending"} /><TaskStatusBadge status={submitted ? "submitted" : "assigned"} /><button className="round-arrow" aria-label={`เปิดแบบฟอร์ม ${recipient.id}`} onClick={() => navigate("/volunteer/tasks")}><ChevronRight size={18} /></button></div></div></article>; })}</div>
    <div className="section-heading compact"><div><span className="section-index">02 / Household responsibility</span><h2>ครัวเรือนที่ดูแล</h2></div><button className="text-button" onClick={() => navigate("/volunteer/households")}>ดูรายการ <Navigation size={15} /></button></div>
    <div className="household-list">{households.map((household) => <button className="household-row" key={household.id} onClick={() => navigate("/volunteer/households")}><div className="household-icon"><UserRound size={18} /></div><span><strong>{household.label}</strong><span>{household.memberCount} สมาชิก · {household.nextVisit ?? "พร้อมรับแบบฟอร์ม"}</span></span><ChevronRight size={18} className="muted-icon" /></button>)}</div>
  </section>;
}
