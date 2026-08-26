// Civic Field Notes: Phase 0 staff shell exposes form, audience, submission, and responsibility surfaces only.
import { ArrowRight, CheckCircle2, Clock3, FilePlus2, UsersRound } from "lucide-react";
import { useLocation } from "wouter";
import { campaignRecipients, formDefinitions, submissions } from "@/data/mock/form-repository";
import { VillageLabel } from "@/components/field-primitives";

export default function StaffOverview() {
  const [, navigate] = useLocation();
  return <section className="page-stack"><header className="page-heading"><div><p className="eyebrow">ศูนย์จัดการแบบฟอร์ม · 27 สิงหาคม 2569</p><h1>ออกแบบงานให้ชุมชน</h1><p className="lede">รพ.สต.บ้านโคกชะงาย · ข้อมูลสาธิตจากพื้นที่จำลอง</p></div><div className="header-stamp"><FilePlus2 size={18} /><span>แบบฟอร์มเผยแพร่ 01</span></div></header>
    <div className="metric-row staff-metrics"><div className="metric-card metric-primary"><span>ผู้รับแบบฟอร์ม</span><strong>{String(campaignRecipients.length).padStart(2, "0")}</strong><small>จากกลุ่มเป้าหมายจำลอง</small></div><div className="metric-card"><span>ส่งคำตอบแล้ว</span><strong>{String(submissions.length).padStart(2, "0")}</strong><small>พร้อมตรวจสอบ</small></div><div className="metric-card"><span>ยังไม่กรอก</span><strong>01</strong><small>ต้องติดตามสถานะ</small></div></div>
    <div className="triage-callout"><div className="callout-icon"><FilePlus2 size={22} /></div><div><strong>สร้างแบบฟอร์มจากคำถามที่ทีมกำหนด</strong><p>เลือกชนิดคำถาม ตัวเลือก และกติกาการตรวจได้ในโครงสร้างแบบจำลอง</p></div><button className="dark-action" onClick={() => navigate("/staff/tasks")}>เปิดพื้นที่สร้าง <ArrowRight size={16} /></button></div>
    <div className="section-heading"><div><span className="section-index">01 / Form library</span><h2>แบบฟอร์มของหน่วยบริการ</h2></div><button className="text-button" onClick={() => navigate("/staff/tasks")}>ดูทั้งหมด <ArrowRight size={16} /></button></div>
    <div className="case-list">{formDefinitions.map((form) => <article className="case-row" key={form.id}><div className="case-signal"><FilePlus2 size={20} /><span>{form.id}</span></div><div className="case-detail"><strong>{form.name}</strong><VillageLabel>เจ้าของแบบฟอร์ม · เจ้าหน้าที่จำลอง</VillageLabel><p>{form.description}</p></div><div className="case-next"><span>สถานะ</span><strong>เผยแพร่แล้ว · v1</strong></div><button className="round-arrow" aria-label={`เปิดแบบฟอร์ม ${form.id}`} onClick={() => navigate("/staff/tasks")}><ArrowRight size={18} /></button></article>)}</div>
    <div className="section-heading compact"><div><span className="section-index">02 / Audience & submission</span><h2>ความคืบหน้าภารกิจ</h2></div></div>
    <div className="coverage-panel"><div className="coverage-line"><span>ส่งแบบฟอร์มแล้ว</span><strong>{submissions.length} / {campaignRecipients.length}</strong></div><div className="progress-track"><span style={{ width: `${Math.round((submissions.length / campaignRecipients.length) * 100)}%` }} /></div><div className="coverage-meta"><span><CheckCircle2 size={15} />ส่งแล้ว {submissions.length}</span><span><Clock3 size={15} />รอตรวจ 0</span><span><UsersRound size={15} />ยังไม่กรอก {campaignRecipients.length - submissions.length}</span></div></div>
  </section>;
}
