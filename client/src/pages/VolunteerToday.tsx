// Civic Field Notes: volunteer landing is a task-first, one-hand field console.
import { ArrowRight, CalendarClock, ChevronRight, ClipboardCheck, Navigation, Plus, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { getHouseholds, getVolunteerTasks } from "@/data/mock/repository";
import { RiskBadge, TaskStatusBadge, SyncStatusIndicator, VillageLabel } from "@/components/field-primitives";

export default function VolunteerToday() {
  const [, navigate] = useLocation();
  const tasks = getVolunteerTasks();
  const households = getHouseholds().filter((household) => household.villageId === "V06");
  return <section className="page-stack">
    <header className="page-heading"><div><p className="eyebrow">วันพุธ · 27 สิงหาคม 2569</p><h1>งานที่ควรเห็นวันนี้</h1><p className="lede">สวัสดี วาสนา วันนี้มี 3 งานที่อยู่ในความรับผิดชอบของคุณ</p></div><button className="avatar-button" aria-label="เปิดโปรไฟล์"><UserRound size={19} /></button></header>
    <div className="context-strip"><div><span className="strip-label">พื้นที่รับผิดชอบ</span><strong>หมู่ 6 · บ้านโคกมะม่วง</strong></div><VillageLabel>รพ.สต.บ้านโคกชะงาย</VillageLabel></div>
    <div className="metric-row"><div className="metric-card metric-primary"><span>งานวันนี้</span><strong>03</strong><small>งานที่มอบหมาย</small></div><div className="metric-card"><span>รอตรวจ</span><strong>01</strong><small>ส่งให้เจ้าหน้าที่แล้ว</small></div><div className="metric-card"><span>รอส่ง</span><strong>01</strong><small>บันทึกในเครื่อง</small></div></div>
    <div className="section-heading"><div><span className="section-index">01 / งานภาคสนาม</span><h2>คิวงานของคุณ</h2></div><button className="text-button">ดูทั้งหมด <ArrowRight size={16} /></button></div>
    <div className="task-list">{tasks.map((task, index) => <article className="task-card" key={task.id}><div className="task-margin"><span>0{index + 1}</span></div><div className="task-body"><div className="task-topline"><span className="task-type"><ClipboardCheck size={14} />{task.type === "repeat_measurement" ? "ติดตามซ้ำ" : "คัดกรอง NCD"}</span><RiskBadge level={task.risk} /></div><h3>{task.title}</h3><p className="task-subject"><UserRound size={15} />{task.subject}</p><div className="task-footer"><span className="due-label"><CalendarClock size={14} />{task.dueLabel}</span><SyncStatusIndicator state={task.syncState} /><TaskStatusBadge status={task.status} /><button className="round-arrow" aria-label={`เปิด ${task.title}`} onClick={() => navigate(`/volunteer/tasks/${task.id}`)}><ChevronRight size={18} /></button></div></div></article>)}</div>
    <div className="section-heading compact"><div><span className="section-index">02 / ครัวเรือน</span><h2>พื้นที่ที่ดูแล</h2></div><button className="text-button">เปิดแผนที่ <Navigation size={15} /></button></div>
    <div className="household-list">{households.map((household) => <div className="household-row" key={household.id}><div className="household-icon"><UserRound size={18} /></div><div><strong>{household.label}</strong><span>{household.memberCount} สมาชิก · {household.nextVisit ?? "ยังไม่มีนัด"}</span></div><ChevronRight size={18} className="muted-icon" /></div>)}</div>
    <button className="primary-action" onClick={() => navigate("/volunteer/tasks/TASK03")}><Plus size={18} />เริ่มบันทึกการเยี่ยมบ้าน</button>
  </section>;
}
