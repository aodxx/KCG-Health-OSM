// Civic Field Notes: asymmetric field console with thumb-zone navigation and explicit demo context.
import { Link, useLocation } from "wouter";
import { Bell, ClipboardList, Home, LayoutDashboard, MapPinned, Menu, UserRound, UsersRound } from "lucide-react";
import type { MockUser, Role } from "@/domain/types";
import { mockUsers } from "@/data/mock/repository";
import { cn } from "@/lib/utils";
import { OfflineBanner } from "./field-primitives";

const roleLabels: Record<Role, string> = { volunteer: "อสม.", staff: "เจ้าหน้าที่", clinician: "แพทย์", citizen: "ประชาชน" };

const roleNav: Record<Role, { label: string; href: string; icon: typeof Home }[]> = {
  volunteer: [
    { label: "วันนี้", href: "/volunteer", icon: Home },
    { label: "ครัวเรือน", href: "/volunteer/households", icon: UsersRound },
    { label: "งาน", href: "/volunteer/tasks", icon: ClipboardList },
    { label: "แจ้งเตือน", href: "/volunteer/alerts", icon: Bell },
    { label: "โปรไฟล์", href: "/volunteer/profile", icon: UserRound },
  ],
  staff: [
    { label: "ภาพรวม", href: "/staff", icon: LayoutDashboard },
    { label: "เคส", href: "/staff/cases", icon: ClipboardList },
    { label: "งาน", href: "/staff/tasks", icon: ClipboardList },
    { label: "พื้นที่", href: "/staff/areas", icon: MapPinned },
    { label: "โปรไฟล์", href: "/staff/profile", icon: UserRound },
  ],
  clinician: [
    { label: "ภาพรวม", href: "/staff", icon: LayoutDashboard },
    { label: "เคสส่งต่อ", href: "/staff/cases", icon: ClipboardList },
    { label: "โปรไฟล์", href: "/staff/profile", icon: UserRound },
  ],
  citizen: [
    { label: "หน้าแรก", href: "/citizen", icon: Home },
    { label: "นัดหมาย", href: "/citizen/appointments", icon: ClipboardList },
    { label: "ติดตาม", href: "/citizen/follow-up", icon: Bell },
    { label: "ข้อความ", href: "/citizen/messages", icon: UsersRound },
    { label: "โปรไฟล์", href: "/citizen/profile", icon: UserRound },
  ],
};

export function AppShell({ user, onUserChange, children }: { user: MockUser; onUserChange: (user: MockUser) => void; children: React.ReactNode }) {
  const [location] = useLocation();
  const nav = roleNav[user.role];
  return <div className="app-frame">
    <aside className="desktop-rail">
      <div className="brand-lockup"><div className="brand-mark" aria-hidden="true"><span /><span /><span /></div><div><span className="brand-kicker">KCG / FIELD NOTES</span><strong>สุขภาพโคกชะงาย</strong></div></div>
      <div className="demo-switcher"><span className="eyebrow">โหมดต้นแบบ</span><label htmlFor="role-select">ผู้ใช้งานจำลอง</label><select id="role-select" value={user.id} onChange={(event) => onUserChange(mockUsers.find((item) => item.id === event.target.value) ?? user)}>{mockUsers.map((item) => <option key={item.id} value={item.id}>{roleLabels[item.role]} · {item.name}</option>)}</select><small>ข้อมูลทั้งหมดเป็นข้อมูลจำลอง</small></div>
      <nav className="rail-nav" aria-label="เมนูหลัก">{nav.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className={cn("rail-link", location === href && "is-active")}><Icon size={18} />{label}</Link>)}</nav>
      <div className="rail-footer"><span className="online-pip" />ระบบพร้อมใช้งานในเครื่องนี้<small>Phase 0 · Frontend foundation</small></div>
    </aside>
    <main className="app-main">
      <header className="mobile-topbar"><div className="brand-mini"><div className="brand-mark" aria-hidden="true"><span /><span /><span /></div><span>KCG Health OSM</span></div><button className="icon-button" aria-label="เมนู"><Menu size={21} /></button></header>
      <OfflineBanner />
      <div className="content-wrap">{children}</div>
    </main>
    <nav className="mobile-nav" aria-label="เมนูหลัก">{nav.slice(0, 5).map(({ label, href, icon: Icon }) => <Link key={href} href={href} className={cn("mobile-nav-link", location === href && "is-active")}><Icon size={19} /><span>{label}</span></Link>)}</nav>
  </div>;
}
