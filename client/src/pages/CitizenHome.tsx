// Civic Field Notes: citizen shell exposes only an own-household follow-up summary.
import { CalendarCheck2, ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import { RiskBadge, VillageLabel } from "@/components/field-primitives";
import { useWorkflow } from "@/contexts/WorkflowContext";

export default function CitizenHome() {
  const workflow = useWorkflow();
  const followUpLabel = workflow.caseClosed ? "ติดตามผลเรียบร้อย" : workflow.followUpCreated ? "มีนัดติดตามจากทีมดูแล" : "ติดตามผลการเยี่ยมบ้าน";
  const followUpDetail = workflow.caseClosed ? "ทีมดูแลบันทึกการติดตามครั้งล่าสุดแล้ว" : workflow.followUpCreated ? "พฤหัสบดีที่ 29 สิงหาคม · ช่วงเช้า" : "พฤหัสบดีที่ 29 สิงหาคม · ช่วงเช้า";
  return <section className="page-stack citizen-page"><header className="page-heading"><div><p className="eyebrow">หน้าหลักของครัวเรือน</p><h1>ติดตามนัดหมายได้ในที่เดียว</h1><p className="lede">ข้อมูลสาธิตสำหรับครัวเรือน HH0101 เท่านั้น</p></div><div className="privacy-chip"><ShieldCheck size={17} />ข้อมูลของคุณ</div></header>
    <div className="citizen-hero paper-sheet"><span className="sheet-code">HH0101 / FOLLOW-UP</span><div><span className="section-index">นัดหมายถัดไป</span><h2>{followUpLabel}</h2><p>{followUpDetail}</p><VillageLabel>รพ.สต.บ้านทุ่งยาว</VillageLabel></div><CalendarCheck2 size={44} strokeWidth={1.5} /></div>
    <div className="section-heading compact"><div><span className="section-index">01 / การติดตาม</span><h2>สถานะล่าสุด</h2></div></div>
    <div className="citizen-status paper-sheet"><span className="sheet-code">STATUS / ครัวเรือนของคุณ</span><div><RiskBadge level={workflow.caseClosed ? "normal" : workflow.followUpCreated ? "watch" : "normal"} /><strong>{workflow.caseClosed ? "ติดตามเสร็จแล้ว" : workflow.followUpCreated ? "มีงานติดตามให้ทีมดูแล" : "เจ้าหน้าที่รับข้อมูลแล้ว"}</strong><p>{workflow.caseClosed ? "สถานะล่าสุดถูกบันทึกไว้ในระบบจำลอง" : "แสดงเฉพาะสถานะของครัวเรือนนี้"}</p></div><ChevronRight className="muted-icon" /></div>
    <div className="citizen-actions"><button className="soft-action"><CalendarCheck2 size={19} /><span><strong>ดูนัดหมาย</strong><small>ยืนยันหรือขอเปลี่ยนเวลา</small></span><ChevronRight size={18} /></button><button className="soft-action"><MessageCircle size={19} /><span><strong>ขอความช่วยเหลือ</strong><small>ส่งข้อความถึงทีมดูแล</small></span><ChevronRight size={18} /></button></div>
    <div className="privacy-note"><ShieldCheck size={19} /><p><strong>เราแสดงเท่าที่จำเป็น</strong><br />หน้านี้ไม่มีข้อมูลของครัวเรือนอื่น และไม่มีข้อความวินิจฉัยโรค</p></div>
  </section>;
}
