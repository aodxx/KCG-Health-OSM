// Civic Field Notes: staff view prioritizes triage signals and coordination, not full clinical records.
import { ArrowRight, CheckCircle2, ClipboardList, Clock3, ShieldAlert } from "lucide-react";
import { getCases } from "@/data/mock/repository";
import { RiskBadge, VillageLabel } from "@/components/field-primitives";

export default function StaffOverview() {
  const cases = getCases();
  return <section className="page-stack"><header className="page-heading"><div><p className="eyebrow">ภาพรวมการประสานงาน · 27 สิงหาคม 2569</p><h1>เห็นสัญญาณก่อน งานค้าง</h1><p className="lede">รพ.สต.บ้านโคกชะงาย · ข้อมูลสาธิตจากพื้นที่จำลอง</p></div><div className="header-stamp"><ShieldAlert size={18} /><span>มี 1 เคสต้องตรวจ</span></div></header>
    <div className="metric-row staff-metrics"><div className="metric-card metric-alert"><span>ต้องตรวจวันนี้</span><strong>01</strong><small>เคสเร่งด่วน</small></div><div className="metric-card"><span>งานรอตรวจ</span><strong>07</strong><small>จาก 2 หน่วยบริการ</small></div><div className="metric-card"><span>ติดตามอยู่</span><strong>12</strong><small>เคสที่ยังเปิด</small></div></div>
    <div className="triage-callout"><div className="callout-icon"><ShieldAlert size={22} /></div><div><strong>มีผลคัดกรองที่ต้องให้เจ้าหน้าที่ตรวจ</strong><p>ข้อมูลนี้เป็น observation จากการลงพื้นที่ ไม่ใช่การวินิจฉัยโรค</p></div><button className="dark-action">เปิด triage <ArrowRight size={16} /></button></div>
    <div className="section-heading"><div><span className="section-index">01 / Triage inbox</span><h2>เคสที่ต้องขยับต่อ</h2></div><button className="text-button">ดูเคสทั้งหมด <ArrowRight size={16} /></button></div>
    <div className="case-list">{cases.map((item) => <article className="case-row" key={item.id}><div className="case-signal"><RiskBadge level={item.risk} /><span>{item.id}</span></div><div className="case-detail"><strong>{item.personName}</strong><VillageLabel>{item.village}</VillageLabel><p>{item.lastEvent}</p></div><div className="case-next"><span>ขั้นถัดไป</span><strong>{item.nextAction}</strong></div><button className="round-arrow" aria-label={`เปิดเคส ${item.id}`}><ArrowRight size={18} /></button></article>)}</div>
    <div className="section-heading compact"><div><span className="section-index">02 / Coverage</span><h2>ภาพรวมงานวันนี้</h2></div></div>
    <div className="coverage-panel"><div className="coverage-line"><span>งานที่มอบหมาย</span><strong>24 / 31</strong></div><div className="progress-track"><span style={{ width: "77%" }} /></div><div className="coverage-meta"><span><CheckCircle2 size={15} />เสร็จแล้ว 18</span><span><Clock3 size={15} />กำลังทำ 6</span><span><ClipboardList size={15} />รอเริ่ม 7</span></div></div>
  </section>;
}
