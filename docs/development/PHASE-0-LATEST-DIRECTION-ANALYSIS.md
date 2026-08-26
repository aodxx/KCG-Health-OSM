# Phase 0 Latest Direction Analysis

วันที่วิเคราะห์: 2026-08-27

## Executive summary

GitHub `main` ล่าสุดคือ `1e9c3fd111a89eb054e0748714e1caee6748e673` และเปลี่ยนข้อกำหนดสำคัญจากการเป็นเพียง local foundation + CI ไปสู่ **GitHub Pages-compatible frontend foundation** อย่างชัดเจน Product core ยังคงเป็น form-driven community screening platform แต่เอกสารใหม่ล็อก canonical data model ที่ `DATABASE-DESIGN-v0.2.md` และกำหนด GitHub Pages เป็น hosting มาตรฐาน

Implementation ที่มีอยู่บน recovery workspace มี domain contracts, mock adapters, role shells, PWA, tests และ CI หลายส่วนแล้ว แต่ยังไม่ควรประกาศ Phase 0 PASS เพราะยังมี Pages deployment/base-path gaps และ `.env.example` ที่ยังไม่ถูกส่งเข้า repository

## Source of Truth ที่อ่าน

ลำดับอำนาจล่าสุดคือ Product Definition v0.2 → PRD.md → MASTER-ROADMAP.md → DATABASE-DESIGN-v0.2.md → AGENTS.md → AUTONOMOUS-AGENT-RULES.md → current checklist → repository structure โดย D7/D5/D6 รุ่นเก่าที่ขัดกันเป็น historical reference

## จุดเปลี่ยนสำคัญของแนวคิด

| ประเด็น | ข้อกำหนดล่าสุด | ผลต่อ Phase 0 |
|---|---|---|
| Product core | Create Form → Audience → Publish → Complete → Submit → Review → Follow-up/Referral → Export-ready | ต้องวาง foundation รอบ Form/Campaign/Submission ไม่ใช่ Visit/NCD/Case |
| Form | Form Template, immutable Form Version, sections, questions, options, generic validation/visibility config | types/schema/interface ต้องคง version immutability และไม่ hard-code clinical rule |
| Audience | person/household/village/rule segment/mixed และ resolve เป็น Campaign Recipient | mock adapter ต้องมี provenance และ target materialization contract |
| Provenance | subject person, actual submitter, SELF/PROXY, form version, timestamp, client UUID, idempotency key | submission contract/offline contract ต้องเชื่อมข้อมูลเหล่านี้ให้ครบ |
| Responsibility | ServiceUnit → Village → Volunteer → Household → Person และ assignment history | ห้ามใช้เพียง `household.volunteerId`; ต้องมี active/start/end history |
| Boundary | ไม่ใช่ Smart อสม., EMR/HIS หรือ diagnosis system; backend/auth/database เริ่ม Phase 6 | Phase 0 ใช้ mock only และเก็บ follow-up/referral เป็น placeholder contracts |
| Hosting | GitHub Pages ที่ `https://aodxx.github.io/KCG-Health-OSM/` | Vite base, router, manifest, service worker และ asset paths ต้องทำงานใต้ `/KCG-Health-OSM/` |
| Delivery | ต้องมี Pages deployment workflow และ public readback เมื่อ Pages เปิดใช้งาน | CI verify อย่างเดียวไม่เพียงพอสำหรับ final PASS |

## Implementation gap analysis

| สถานะ | รายการ | หลักฐาน/ผลกระทบ |
|---|---|---|
| DONE | React/Vite/TypeScript scaffold, app shell, Thai-first role shells, shared primitives | มีใน recovery workspace |
| DONE | domain types, form schema boundary, repository interfaces, synthetic mock repositories | สอดคล้องส่วนใหญ่กับ canonical model |
| DONE | offline queue interface, client-generated UUID และ idempotency key | เป็น foundation เท่านั้น ไม่ใช่ production sync |
| DONE | CI verify: install/check/lint/test/build | workflow เดิมทำงานและ CI run ก่อนหน้าเคยผ่านหลังแก้ pnpm mismatch |
| DONE | route skeleton ของ staff/volunteer/citizen และ mobile smoke/accessibility tests | มี route coverage และ 30 tests ใน recovery implementation |
| PARKED | NCD/Visit/Observation/Case/RiskAssessment workflow | ต้องอยู่ใน paused archive และไม่กำหนด architecture |
| REMOVE | Manus debug collector assets และ unused ManusDialog | ถูกลบจาก PR-ready branch แล้ว |
| KEEP WITH BOUNDARY | `vite-plugin-manus-runtime` | เป็น managed dev/preview tooling; ต้องไม่กลายเป็น product runtime dependency |
| MISSING | `.env.example` ใน GitHub branch | เป็น exit criterion บังคับ แต่ workspace environment guard ป้องกันการสร้างไฟล์ |
| MISSING | `vite.config.ts` explicit `base: '/KCG-Health-OSM/'` | ปัจจุบันไม่มี base config จึงยังไม่พิสูจน์ Pages path |
| MISSING | Pages-safe router/deep-link strategy | Wouter history route ยังต้องพิสูจน์ refresh/deep link บน static host |
| MISSING | Pages-compatible manifest/service worker paths | manifest ใช้ `/` และ `/manus-storage/...`; main register ใช้ `/sw.js` ซึ่งไม่สอดคล้อง project-site base โดยอัตโนมัติ |
| MISSING | `.github/workflows/deploy-pages.yml` | เอกสารใหม่กำหนด Pages artifact upload/deploy workflow แยกจาก verify CI |
| MISSING | deployed URL/readback evidence | ยังไม่มี public Pages deployment ที่ตรวจ shell, assets, routes, manifest และ SW |
| PARTIAL | canonical entity coverage | มีหลาย types แล้ว แต่ต้อง audit ให้ตรง `DATABASE-DESIGN-v0.2.md` รวม governance placeholders และ canonical status/invariants |
| PARTIAL | repository hygiene | recovery branch มี scaffold จำนวนมากบน main history เดิม และต้องตรวจ generated files/package boundary อีกครั้งหลัง sync ใหม่ |

## สิ่งที่ต้องปรับใน Phase 0 ตามลำดับความสำคัญ

### P0 — ต้องทำก่อนประกาศ PASS

1. เพิ่ม `.env.example` แบบ comment/placeholder เท่านั้น โดยไม่มี secret
2. ตั้ง Vite production base เป็น `/KCG-Health-OSM/` และตรวจ build output
3. เปลี่ยน manifest `start_url`, `scope`, icon paths และ service-worker registration ให้รองรับ base path
4. เลือกและทดสอบ router strategy สำหรับ GitHub Pages refresh/deep-link ไม่ให้เกิด 404
5. เพิ่ม `.github/workflows/deploy-pages.yml` สำหรับ build และ deploy Pages อย่างปลอดภัยจาก branch ที่กำหนด
6. เปิด/ตรวจ deployment จริงและทำ public URL readback ตาม checklist

### P1 — ต้อง audit/ปรับให้พร้อมต่อ Phase 1

1. เทียบ domain types กับ canonical entity set และ invariants ใน DATABASE-DESIGN-v0.2 โดยเฉพาะ `HouseholdMembership`, `UserAccount`, `RoleScope`, `CampaignRecipient`, `SubmissionReview`, `Consent`, `AuditEvent` และ `DataCorrectionRequest`
2. ตรวจสถานะ canonical: form version draft/published/retired, campaign draft/published/closed/cancelled, submission draft/submitted/requires_review/reviewed/action_required/completed
3. ตรวจ mock data ให้ครอบคลุม 2 service units, 9 villages, หลาย volunteers/households และทั้ง SELF/PROXY โดยยังเป็นข้อมูลสมมติ
4. เพิ่ม tests ที่พิสูจน์ responsibility scope ว่า volunteer ไม่เห็น household นอก active assignment
5. ตรวจว่า active runtime ไม่มี legacy `Task`, `Visit`, `Observation`, `Case`, `RiskAssessment`, NCD logic หรือ clinical threshold เป็นแกน

### P2 — เอกสารและ hygiene

1. อัปเดต `PROGRESS.md` หลังทุก commit ให้ SHA ตรงกับ HEAD
2. ปรับ README ให้ระบุ GitHub Pages เป็น hosting มาตรฐานและแยก backend ตั้งแต่ Phase 6
3. ตรวจ generated junk, debug residue, lockfile เดียว และ no-secret scan
4. จัดทำ ADR หากจำเป็นต้องเบี่ยงจาก canonical database design

## สิ่งที่ยังไม่ควรทำ

ยังไม่ควรสร้าง Form Builder เต็ม, audience resolver runtime, campaign publish workflow, citizen/volunteer completion workflow, staff review workflow, follow-up/referral behavior, Supabase/Auth/database หรือ Smart อสม. integration ในรอบ Recovery นี้ งานเหล่านี้เป็น Phase 1 เป็นต้นไปตาม D7 v0.2 และต้องรอ explicit approval หลัง Phase 0 PASS

## ข้อสรุป

การเปลี่ยนแปลงล่าสุดไม่ได้เปลี่ยน product core แต่เพิ่ม **GitHub Pages เป็น hard delivery constraint** และยกระดับ `DATABASE-DESIGN-v0.2.md` เป็น canonical data contract ผลคือ implementation ปัจจุบันพร้อมในส่วน foundation เชิงแอปและ domain หลายส่วน แต่ยังมี gap สำคัญด้าน Pages base path, deployment workflow, public readback และ `.env.example` จึงควรจัดสถานะเป็น **PHASE 0 NOT READY** จนกว่า P0 จะผ่านครบ

## References

[1]: https://github.com/aodxx/KCG-Health-OSM/blob/main/docs/product/PRODUCT-DEFINITION-v0.2.md "Product Definition v0.2"
[2]: https://github.com/aodxx/KCG-Health-OSM/blob/main/PRD.md "PRD.md"
[3]: https://github.com/aodxx/KCG-Health-OSM/blob/main/docs/architecture/DATABASE-DESIGN-v0.2.md "Canonical Database Design v0.2"
[4]: https://github.com/aodxx/KCG-Health-OSM/blob/main/docs/development/PHASE-0-CHECKLIST.md "Phase 0 Checklist"
[5]: https://github.com/aodxx/KCG-Health-OSM/blob/main/docs/development/D7-DEVELOPMENT-PLAN-v0.2.md "D7 Development Plan v0.2"
[6]: https://github.com/aodxx/KCG-Health-OSM/blob/main/docs/development/GITHUB-PAGES-DEPLOYMENT.md "GitHub Pages Deployment"
