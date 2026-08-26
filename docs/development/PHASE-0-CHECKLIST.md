# Phase 0 — Repository & Frontend Foundation Checklist

สถานะ: Ready to start

## Goal
สร้างรากฐาน frontend/PWA ที่สะอาดสำหรับ MVP โดยใช้ข้อมูลจำลองเท่านั้น และยังไม่เชื่อม backend จริง

## Repository
- [ ] ตรวจ README, PRD, AGENTS.md และ docs ที่เกี่ยวข้อง
- [ ] ยืนยัน frontend stack และบันทึก decision
- [ ] สร้าง application scaffold
- [ ] เพิ่ม `.gitignore`
- [ ] เพิ่ม `.env.example` โดยไม่มีค่าจริง
- [ ] ใช้ package manager หนึ่งตัวและ commit lockfile
- [ ] เพิ่ม lint/test/build scripts
- [ ] เพิ่ม CI สำหรับ lint + test + build

## Mobile/PWA
- [ ] mobile-first layout
- [ ] PWA manifest
- [ ] service worker ขั้นพื้นฐาน
- [ ] Thai typography
- [ ] design tokens
- [ ] touch targets ที่เหมาะกับมือถือ
- [ ] app shell / bottom navigation
- [ ] visible prototype/demo state

## Role Shells
- [ ] Volunteer shell
- [ ] Staff/Clinician shell
- [ ] Citizen shell
- [ ] role-specific navigation
- [ ] ใช้ role switcher แบบข้อมูลจำลองสำหรับทดสอบ

## Shared Components
- [ ] TaskStatusBadge
- [ ] RiskLevelBadge
- [ ] SyncStatusIndicator
- [ ] OfflineBanner
- [ ] HouseholdCard
- [ ] PersonSummary
- [ ] TaskCard
- [ ] CaseTimelineItem
- [ ] empty/error/loading states

ทุก status/risk ต้องมี text/icon ไม่พึ่งสีอย่างเดียว

## Domain Foundation
- [ ] ServiceUnit / Village / Household / Person
- [ ] Task
- [ ] Visit
- [ ] Observation
- [ ] RiskAssessment
- [ ] Case
- [ ] Referral
- [ ] FollowUp
- [ ] standard status constants

## Data Layer
- [ ] repository interfaces แยกจาก UI
- [ ] mock implementation จาก synthetic seed data
- [ ] ยังไม่ import Supabase ใน Phase 0
- [ ] เตรียม adapter boundary สำหรับ backend ในอนาคต

## Route Skeletons
### Volunteer
- [ ] วันนี้
- [ ] ครัวเรือน
- [ ] งาน
- [ ] แจ้งเตือน
- [ ] โปรไฟล์

### Staff/Clinician
- [ ] ภาพรวม
- [ ] เคส
- [ ] งาน
- [ ] พื้นที่
- [ ] โปรไฟล์

### Citizen
- [ ] หน้าแรก
- [ ] นัดหมาย
- [ ] การติดตาม
- [ ] ข้อความ
- [ ] โปรไฟล์

## Offline Foundation
- [ ] local queue interface
- [ ] client-generated UUID
- [ ] idempotency key ใน mutation model
- [ ] sync states pending/synced/failed

## Guardrails
- [ ] ใช้ข้อมูลจำลองเท่านั้น
- [ ] ไม่มีข้อมูลระบุตัวบุคคลจริงใน repo
- [ ] ไม่มี secret ใน source/frontend
- [ ] ไม่มี backend production connection
- [ ] ไม่มี external integration ใน Phase 0

## Tests
- [ ] domain status tests
- [ ] role navigation tests
- [ ] mobile render smoke tests
- [ ] mock repository tests
- [ ] accessibility basics

## Exit Criteria
Phase 0 เสร็จเมื่อ:
1. fresh install succeeds
2. lint passes
3. tests pass
4. production build passes
5. role shells ทั้ง 3 ฝั่งทำงานบน mobile viewport
6. ใช้ข้อมูลจำลองเท่านั้น
7. ยังไม่มี backend connection
8. repo ไม่มีไฟล์ขยะหรือ secret
9. Phase 1 เริ่มได้โดยไม่ต้องรื้อโครงสร้าง

## Next Phase
Phase 1 — Mock MVP Workflow:
`Assign → Visit → Observation → Risk → Review → Referral → Follow-up → Close`
