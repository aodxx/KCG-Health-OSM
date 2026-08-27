# KCG Health OSM

## Product Direction

KCG Health OSM เป็นระบบสำหรับออกแบบ กระจาย กรอก ตรวจ และติดตามแบบคัดกรองสุขภาพระดับชุมชน โดยแกนผลิตภัณฑ์คือ `Create Form → Define Audience → Publish → Complete → Review → Follow-up/Referral → Export-ready` เชื่อมแพทย์/เจ้าหน้าที่ รพ.สต. อสม. ครัวเรือน และประชาชน ระบบไม่ใช่ Smart อสม., HDC, HIS หรือเวชระเบียนเต็มรูปแบบ

เอกสารอำนาจสูงสุดของทิศทางปัจจุบันคือ `docs/product/PRODUCT-DEFINITION-v0.2.md` และ `PRD.md` ส่วนเอกสาร architecture ใช้กำหนด domain, provenance, access boundary และแนวทางต่อยอด backend ในอนาคต

## Current Phase

โครงการอยู่ใน **Phase 0 Recovery / Repository & Frontend Foundation** เท่านั้น โค้ด Phase 1 เดิมถูกเก็บใน `client/src/paused/phase1/` และ `tests/paused/phase1/` เพื่อไม่ให้ workflow เยี่ยมบ้าน/NCD/Referral เดิมกำหนด architecture ใหม่ โครงการ Phase 0 ใช้ synthetic/mock data เท่านั้น และไม่มี Supabase, API, Google Sheets, Smart อสม. integration หรือ production backend

Phase 0 เตรียม role shells, route skeletons, Thai-first mobile PWA shell, design tokens, FormDefinition/FormVersion/FormQuestion, Campaign/AudienceSelection, household responsibility, Submission provenance, repository interfaces, mock adapters, offline queue/idempotency model, tests, lint, build และ CI โดยยังไม่สร้าง Form Builder หรือ workflow เต็ม

## Local development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Quality gates:

```bash
pnpm check
pnpm lint
pnpm test --run
pnpm build
```

เปิดใช้งาน role shells ผ่าน `/volunteer`, `/staff` และ `/citizen` ส่วนเส้นทางย่อยเป็น route skeleton ที่แสดงขอบเขต Phase 0 และไม่ควรชี้ไปหน้า 404

## Data and security boundary

ข้อมูลใน development/test ต้องเป็นข้อมูลสังเคราะห์เท่านั้น ห้ามใส่ CID, HN, เบอร์โทร, เวชระเบียน หรือข้อมูลสุขภาพจริงลง repository ห้ามใส่ secret หรือ service-role key ใน frontend และห้ามสร้างการเชื่อมต่อระบบภายนอกก่อนผ่าน phase gate และ architecture review

## Source of truth

- `docs/product/PRODUCT-DEFINITION-v0.2.md`
- `PRD.md`
- `AGENTS.md`
- `docs/development/PHASE-0-CHECKLIST.md`
- `docs/development/D7-DEVELOPMENT-PLAN-v0.1.md`
- `docs/development/AUTONOMOUS-AGENT-RULES.md`
- `docs/architecture/`
