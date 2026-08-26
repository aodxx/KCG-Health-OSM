// Civic Field Notes: explicit route placeholders prevent dead ends while Phase 1 workflows are staged.
import { ArrowLeft, Construction } from "lucide-react";
import { useLocation } from "wouter";

export default function RoutePlaceholder({ label }: { label: string }) {
  const [, navigate] = useLocation();
  return <section className="page-stack placeholder-page"><button className="text-button back-button" onClick={() => navigate("/")}><ArrowLeft size={16} />กลับหน้าหลัก</button><div className="placeholder-card"><Construction size={30} /><span className="section-index">กำลังเตรียมพื้นที่นี้</span><h1>{label}</h1><p>โครงสร้างเส้นทางพร้อมแล้ว ฟังก์ชันงานจริงจะเข้ามาใน Phase 1 โดยยังใช้ข้อมูลจำลองเท่านั้น</p></div></section>;
}
