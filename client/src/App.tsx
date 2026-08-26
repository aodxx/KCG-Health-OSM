// Civic Field Notes: Phase 0 route skeleton keeps role context visible; Phase 1 workflow remains parked outside runtime.
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";
import { mockUsers } from "@/data/mock/repository";
import type { MockUser } from "@/domain/types";
import VolunteerToday from "@/pages/VolunteerToday";
import StaffOverview from "@/pages/StaffOverview";
import CitizenHome from "@/pages/CitizenHome";
import NotFound from "@/pages/NotFound";
import RoutePlaceholder from "@/pages/RoutePlaceholder";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

function RoleRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => navigate("/volunteer"), [navigate]);
  return null;
}

function Router({ user, onUserChange }: { user: MockUser; onUserChange: (user: MockUser) => void }) {
  return <AppShell user={user} onUserChange={onUserChange}><Switch><Route path="/" component={RoleRedirect} /><Route path="/volunteer" component={VolunteerToday} /><Route path="/volunteer/households">{() => <RoutePlaceholder label="ครัวเรือนในความรับผิดชอบ" />}</Route><Route path="/volunteer/tasks">{() => <RoutePlaceholder label="แบบฟอร์มที่ได้รับ" />}</Route><Route path="/volunteer/alerts">{() => <RoutePlaceholder label="แจ้งเตือน" />}</Route><Route path="/volunteer/profile">{() => <RoutePlaceholder label="โปรไฟล์อสม." />}</Route><Route path="/staff" component={StaffOverview} /><Route path="/staff/cases">{() => <RoutePlaceholder label="คำตอบที่รอตรวจ" />}</Route><Route path="/staff/tasks">{() => <RoutePlaceholder label="แบบฟอร์มและภารกิจ" />}</Route><Route path="/staff/areas">{() => <RoutePlaceholder label="พื้นที่และความรับผิดชอบ" />}</Route><Route path="/staff/profile">{() => <RoutePlaceholder label="โปรไฟล์เจ้าหน้าที่" />}</Route><Route path="/citizen" component={CitizenHome} /><Route path="/citizen/appointments">{() => <RoutePlaceholder label="แบบฟอร์มที่ได้รับ" />}</Route><Route path="/citizen/follow-up">{() => <RoutePlaceholder label="ประวัติการส่งคำตอบ" />}</Route><Route path="/citizen/messages">{() => <RoutePlaceholder label="ข้อความ" />}</Route><Route path="/citizen/profile">{() => <RoutePlaceholder label="โปรไฟล์" />}</Route><Route>{() => <NotFound />}</Route></Switch></AppShell>;
}

export default function App() {
  const [user, setUser] = useState<MockUser>(mockUsers[0]);
  const [, navigate] = useLocation();
  const changeUser = (next: MockUser) => { setUser(next); navigate(next.role === "citizen" ? "/citizen" : next.role === "volunteer" ? "/volunteer" : "/staff"); };
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router user={user} onUserChange={changeUser} /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
