# Phase 0 Recovery / Foundation Gap Analysis — Product Direction v0.2

## Product Direction Change Summary

Repository ถูก sync จาก `aodxx/KCG-Health-OSM` branch `main` ผ่าน remote `github` ที่ commit `fa40194` ซึ่งมี `docs/product/PRODUCT-DEFINITION-v0.2.md`, `PRD.md`, `AGENTS.md` และ `docs/development/AUTONOMOUS-AGENT-RULES.md` ฉบับล่าสุด เอกสารใหม่กำหนดให้ระบบเป็น form-driven community screening coordination platform โดยมีแกน `Create Form → Define Audience → Publish → Complete → Review → Follow-up/Referral → Export-ready` และให้ Product Definition/PRD มีอำนาจเหนือ prototype workflow เดิม

Phase 0 ยังคงเป็น Foundation only จึงเตรียม domain contracts, repository boundaries, role shells, PWA, tests และ synthetic data แต่ยังไม่สร้าง Form Builder เต็ม ไม่สร้าง campaign workflow เต็ม และไม่เชื่อม backend หรือ Smart อสม.

## Phase 0 Gap Analysis

| หมวด | สถานะ | หลักฐาน implementation |
|---|---|---|
| Repository source sync | DONE | `github/main` และ source documents ฉบับล่าสุดถูกนำเข้า workspace |
| Application scaffold / React / TypeScript / Vite | DONE | `client/`, `vite.config.ts`, `tsconfig.json`, `package.json` |
| Thai-first mobile PWA shell | DONE | `client/src/components/AppShell.tsx`, `client/src/index.css` |
| Synthetic role switcher | DONE | `client/src/data/mock/repository.ts`, `AppShell.tsx` |
| Role shells 3 ฝั่ง | DONE | `VolunteerToday.tsx`, `StaffOverview.tsx`, `CitizenHome.tsx` |
| Form-driven volunteer/staff shell copy | DONE | Volunteer assigned-form surface และ Staff form/audience/submission dashboard |
| Route skeleton ไม่ชี้ 404 | DONE | routes ใน `client/src/App.tsx` ครบ staff forms/campaigns/submissions/households/volunteers, volunteer forms/households/people/sync และ citizen forms/submissions; `tests/app-shell.test.tsx` |
| Shared status/sync/offline primitives | DONE | `client/src/components/field-primitives.tsx` |
| Domain foundation for geography/responsibility | DONE | `client/src/domain/types.ts`, `client/src/data/repository.ts` |
| FormDefinition/FormVersion/FormQuestion/FormField | DONE | `client/src/domain/types.ts` |
| Form schema validation boundary | DONE | `client/src/domain/form-schema.ts` |
| Campaign/AudienceSelection/CampaignRecipient | DONE | `client/src/domain/types.ts`, `client/src/data/mock/form-repository.ts` |
| Submission/Answer/Review/provenance | DONE | `client/src/domain/types.ts`, `client/src/data/mock/form-repository.ts` |
| Repository/data adapter interfaces | DONE | `client/src/data/repository.ts` |
| Synthetic mock adapters | DONE | `client/src/data/mock/repository.ts`, `form-repository.ts` |
| Offline queue / UUID / idempotency / sync states | DONE | `client/src/offline/queue.ts` |
| PWA manifest / service worker foundation | DONE | `client/public/manifest.webmanifest`, `client/public/sw.js` |
| Lint / test / build scripts | DONE | `package.json`, final gates pass |
| CI | DONE | `.github/workflows/ci.yml` |
| Role navigation / mock / mobile / accessibility tests | DONE | `tests/app-shell.test.tsx`, `tests/phase0-foundation.test.ts`, `tests/phase0-product-direction.test.ts` — 30 tests ผ่าน |
| `.env.example` ไม่มี secret | MISSING | ไม่พบไฟล์ และ environment-file editor ถูกป้องกันโดย workspace |
| Form Builder UI เต็ม | OUT-OF-SCOPE / PHASE 1 | Phase 0 มี schema/types และ route skeleton เท่านั้น |
| Campaign publish/recipient workflow เต็ม | OUT-OF-SCOPE / PHASE 1 | มี mock contracts/fixtures เท่านั้น |
| NCD/home-visit/referral workflow | PARK / PHASE 1 | โค้ดเดิมอยู่ใน `client/src/paused/phase1/` และไม่ถูก import จาก runtime |
| Supabase / API / Google Sheets / backend | OUT-OF-SCOPE | ไม่มี runtime integration; D5 Supabase เป็น draft เท่านั้น |
| Smart อสม. automation | OUT-OF-SCOPE | ไม่มี scrape, auto-fill หรือ API assumption |

## KEEP / REFACTOR / PARK

| กลุ่ม | รายการ |
|---|---|
| KEEP | React/Vite scaffold, AppShell, Thai design tokens, role switcher, PWA metadata/service worker, shared primitives, offline interface, CI และ quality scripts |
| REFACTOR | Volunteer shell, Staff shell, mock repository และ route placeholder ถูกปรับจาก NCD/triage framing เป็น assigned forms, audience, submission และ household responsibility framing |
| PARK | `client/src/paused/phase1/`, `tests/paused/phase1/` และ template integrations ที่ไม่อยู่ใน Phase 0 |

## สิ่งที่เก็บจากของเดิม

เก็บ app shell, responsive desktop rail/mobile navigation, synthetic users/households, shared status/sync components, route placeholders, PWA foundation, lint/test/build configuration และ CI เพราะเป็น reusable foundation

เก็บ implementation เดิมที่มีประโยชน์ใน paused archive โดยไม่ลบจำนวนมากและไม่ให้ runtime หรือ default test suite ใช้เป็น architecture authority

## สิ่งที่แก้แล้ว

เพิ่มและเชื่อม domain contracts สำหรับ FormDefinition, FormVersion, FormQuestion/FormField, Campaign, AudienceSelection, CampaignRecipient, Household responsibility, Submission, SubmissionAnswer, SubmissionReview และ completion provenance รวมถึง pure form-schema validation boundary

เพิ่ม mock adapters สำหรับ forms, campaigns, audience, responsibility และ submissions และเพิ่ม synthetic fixtures ที่สะท้อน self/proxy completion โดยไม่มีข้อมูลจริง

ปรับ Volunteer และ Staff live shells ให้เป็น form-driven foundation, ปรับ route labels และ placeholder copy ให้ไม่สัญญาการเริ่ม Phase 1 อัตโนมัติ และแทน legacy task/case fixtures ที่ปรากฏใน active mock layer ด้วย generic form-assignment fixtures

## สิ่งที่ยังขาด

เหลือ blocker เดียวคือ `.env.example` แบบไม่มี secret เนื่องจาก workspace ป้องกันการแก้ไขไฟล์ `.env`/`.env.example` โดยตรง และ session นี้ไม่มีกลไก environment-file request ที่เปิดให้เรียกใช้ได้ จึงยังไม่สามารถอ้างว่า checklist ครบ 100% ได้

## ผลตรวจสอบ

| Gate | Result |
|---|---|
| `pnpm install --frozen-lockfile` | PASS |
| `pnpm check` | PASS |
| `pnpm lint` | PASS |
| `pnpm test --run` | PASS — 3 files, 30 tests |
| `pnpm build` | PASS — Vite build completed |
| Mobile route screenshots | PASS — `/volunteer`, `/staff`, `/citizen` และ skeleton routes |
| Runtime boundary scan | PASS — ไม่พบ Supabase/API/Google Sheets/Smart อสม. integration ใน active runtime |
| Phase 1 runtime boundary | PASS — workflow files อยู่ใน paused archive และไม่ถูก import |

## Final Status

`PHASE 0 NOT READY` เพราะ `.env.example` ยังไม่ปรากฏใน repository แม้ implementation และ quality gates อื่นผ่านแล้ว งานควรหยุดที่ Foundation Recovery จนกว่าจะเพิ่มไฟล์ตัวอย่างนี้ผ่านกลไกที่ได้รับอนุญาต แล้วจึงรัน final verification และ commit/push รอบสุดท้าย
