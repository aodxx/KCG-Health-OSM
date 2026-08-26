# Phase 0 Recovery / Foundation Gap Analysis

## ขอบเขตการตรวจ

การตรวจนี้ยึด `PRD.md`, `AGENTS.md`, `docs/development/PHASE-0-CHECKLIST.md`, `docs/development/D7-DEVELOPMENT-PLAN-v0.1.md` และเอกสาร D5–D6 ใต้ `docs/architecture/` เป็น Source of Truth เป้าหมายคือทำให้ repository เป็น **Repository & Frontend Foundation** โดยไม่เปิดใช้ business workflow ของ Phase 1 และไม่เชื่อม backend หรือ external integration จริง

## สถานะสรุป

| หมวด | สถานะ | หลักฐาน implementation |
|---|---|---|
| Application scaffold / React / TypeScript / Vite | DONE | `client/`, `vite.config.ts`, `tsconfig.json`, `package.json` |
| Thai-first mobile app shell | DONE | `client/src/components/AppShell.tsx`, `client/src/index.css` |
| Synthetic role switcher | DONE | `client/src/data/mock/repository.ts`, `AppShell.tsx` |
| Role shells 3 ฝั่ง | DONE | `VolunteerToday.tsx`, `StaffOverview.tsx`, `CitizenHome.tsx` |
| Route skeleton ไม่ชี้ 404 | DONE | routes ใน `client/src/App.tsx` และ `tests/app-shell.test.tsx` |
| Shared status/risk/sync/offline primitives | DONE | `client/src/components/field-primitives.tsx` |
| Domain types/constants ตาม D5/D6 | DONE | `client/src/domain/types.ts` |
| Repository/data adapter boundary | DONE | `client/src/data/repository.ts` และ `mockRepository` |
| Offline queue interface / UUID / idempotency / sync states | DONE | `client/src/offline/queue.ts` |
| PWA manifest / service worker foundation | DONE | `client/public/manifest.webmanifest`, `client/public/sw.js` |
| Lint / test / build scripts | DONE | `package.json` |
| CI | DONE | `.github/workflows/ci.yml` |
| Role navigation / mock repository / mobile / accessibility tests | DONE | `tests/phase0-foundation.test.ts`, `tests/app-shell.test.tsx` |
| `.env.example` ไม่มี secret | MISSING | ไม่พบไฟล์ใน repository; ต้องเติมผ่านกลไกจัดการ environment ของ project ก่อนจึงจะปิด checklist ข้อนี้ได้ |
| Phase 1 workflow runtime | OUT-OF-SCOPE / PHASE 1 | ย้ายไป `client/src/paused/phase1/` และไม่ถูก import จาก `App.tsx` |
| Phase 1 workflow tests | OUT-OF-SCOPE / PHASE 1 | ย้ายไป `tests/paused/phase1/` และถูก exclude จาก default Vitest suite |
| Supabase / API / Google Sheets / backend integration | OUT-OF-SCOPE | ไม่มี integration ใน runtime; D5 Supabase เป็น architecture draft เท่านั้น |

## สิ่งที่เก็บจากของเดิม

เก็บ app shell, responsive desktop rail/mobile navigation, role switcher, Thai typography/design tokens, synthetic mock fixtures, shared risk/status/sync/offline components, route placeholders, PWA metadata/service worker และ CI เดิมไว้ทั้งหมดเพราะเป็น foundation ที่ใช้ต่อได้โดยไม่ผูกกับ Phase 1

เก็บ Phase 1 ที่มีประโยชน์ไว้แบบไม่ลบ โดยย้าย workflow domain/context/pages และ tests ไปยังพื้นที่ `paused` เพื่อป้องกันไม่ให้ถูกนำเข้า runtime หรือทำให้ default Phase 0 quality gate กลายเป็นการทดสอบ business workflow

## สิ่งที่แก้

ปรับโครงสร้างเอกสารจาก `docs/docs/` เป็น `docs/` ให้ตรงกับ repository structure และ source paths ที่ระบุในเอกสาร เพิ่ม domain contract ให้ครอบคลุม ServiceUnit, Village, Household, Person, Task, Visit, Observation, RiskAssessment, Case, Referral, FollowUp และ entity ที่เกี่ยวข้อง พร้อม standard status constants

เพิ่ม `HealthRepository` adapter interface และ mock implementation ที่ใช้ synthetic fixtures เพิ่ม `OfflineQueue` interface และ in-memory implementation ที่รองรับ pending/synced/failed รวมถึง client-generated UUID และ idempotency key เพิ่ม shared foundation components ได้แก่ HouseholdCard, PersonSummary, TaskCard, CaseTimelineItem, EmptyState, LoadingState และ ErrorState

ถอด `WorkflowProvider` และ Phase 1 routes ออกจาก `App.tsx` ทำให้ `/volunteer/tasks`, `/staff/cases` และ route skeleton อื่น ๆ แสดง placeholder ได้โดยไม่เข้า workflow ใหม่ ถอด analytics runtime script ออกจาก `client/index.html` เพื่อไม่ส่งข้อมูลออกภายนอกใน Phase 0 เพิ่ม mobile/role/accessibility smoke tests และ mock adapter/queue tests

## สิ่งที่ยังไม่ผ่าน

ข้อเดียวที่ยังค้างคือ `.env.example` เนื่องจากไม่พบไฟล์ใน repository และการสร้าง/แก้ไฟล์ environment ต้องดำเนินการผ่านกลไกจัดการ environment ของ project ไม่ใช่การเขียนไฟล์โดยตรงจาก workflow นี้ ดังนั้นตามเกณฑ์ของผู้ใช้ยังไม่ควรตัดสินเป็น `PHASE 0 PASS` จนกว่าจะมีไฟล์ตัวอย่างที่ไม่มีค่าลับถูกเพิ่มเข้ามา

## ผลตรวจ quality gates

ผลล่าสุดหลัง Recovery: `pnpm check` ผ่าน, `pnpm lint` ผ่าน, `pnpm test` ผ่าน 2 test files / 13 tests และ `pnpm build` ผ่าน การติดตั้ง clean room ด้วย `pnpm install --frozen-lockfile` ผ่านเมื่อรวม `patches/wouter@3.7.1.patch` ซึ่งเป็น local patched dependency ที่ lockfile อ้างถึง

## คำตัดสินชั่วคราว

`PHASE 0 NOT READY` — implementation และ quality gates ผ่าน แต่ checklist ยังขาด `.env.example` ตามข้อบังคับของ Phase 0 จึงต้องเติมไฟล์ตัวอย่างแบบไม่มี secret แล้วรัน final verification อีกครั้งก่อนประกาศ PASS
