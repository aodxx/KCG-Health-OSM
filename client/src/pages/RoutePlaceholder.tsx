// Civic Field Notes: Phase 0 placeholders keep Form-driven route structure explicit without starting Phase 1.
import { ArrowLeft, Construction } from "lucide-react";
import { useLocation } from "wouter";

export default function RoutePlaceholder({ label }: { label: string }) {
  const [, navigate] = useLocation();
  return <section className="page-stack placeholder-page"><button className="text-button back-button" onClick={() => navigate("/volunteer")}><ArrowLeft size={16} />กลับหน้าหลัก</button><div className="placeholder-card"><Construction size={30} /><span className="section-index">กำลังเตรียมพื้นที่นี้</span><h1>{label}</h1><p>โครงสร้างเส้นทางพร้อมแล้ว ฟังก์ชันเต็มจะเริ่มเมื่อ Phase 0 ผ่านและได้รับอนุมัติ โดยยังใช้ข้อมูลจำลองเท่านั้น</p></div></section>;
}
