# Project Progress

## Current Phase

Phase 0 Recovery — Repository & Frontend Foundation

## Overall Status

IN PROGRESS

## Product Direction

Form-driven community screening platform: แพทย์/เจ้าหน้าที่สร้างแบบฟอร์ม เลือกกลุ่มเป้าหมาย เผยแพร่ ให้ประชาชนหรือ อสม. กรอก ส่งคำตอบ ตรวจ และเตรียมต่อยอดสู่ follow-up/referral/export โดยไม่ล็อกระบบไว้กับ NCD

## Completed

Repository ถูก sync source documents ล่าสุดจาก `aodxx/KCG-Health-OSM` branch `main` แล้ว และมี Product Definition v0.2, PRD, AGENTS, autonomous rules และ architecture documents ใน workspace

มี React/Vite/TypeScript scaffold, Thai-first responsive app shell, role switcher, PWA manifest/service worker, shared UI primitives, route skeletons, domain contracts สำหรับ geography, people, households, forms, campaigns, audience, submissions และ sync รวมถึง repository interfaces และ synthetic mock adapters

โค้ด prototype/workflow เดิมถูกจัดเป็น paused boundary และไม่ถูก import จาก active runtime ส่วน active screens ถูกปรับให้เป็น foundation สำหรับ assigned forms, audience, submission และ household responsibility

## In Progress

กำลังตรวจ repository structure, route coverage, runtime boundary, mobile/accessibility smoke และ quality gates ให้ตรงกับคำสั่ง Recovery ฉบับล่าสุด พร้อมเตรียม delivery branch บน GitHub

## Remaining

ต้องมี `.env.example` แบบไม่มี secret ตาม Phase 0 exit criteria แต่ workspace environment editor ป้องกันการสร้างหรือแก้ไฟล์ `.env.example` โดยตรง และ session นี้ไม่มีกลไกที่ได้รับอนุญาตสำหรับสร้างไฟล์ดังกล่าว

ยังต้องทำ final commit/push หลังการตรวจชุดสุดท้าย และต้องไม่เริ่ม Phase 1 จนกว่าจะได้รับอนุมัติ

## Known Risks

เอกสาร Product Definition v0.2 มีอำนาจเหนือ workflow prototype เดิม โค้ด NCD/visit/referral จึงต้องคงไว้เฉพาะ paused archive และห้ามกลับมากำหนด core architecture

ห้ามใช้ข้อมูลสุขภาพจริง, CID, HN, เบอร์โทร, secret, Supabase, API, Google Sheets, Smart อสม. หรือ hard-coded clinical thresholds ใน Phase 0

## Current Branch

`recovery/product-direction-v0.2`

## Latest Commit

`abbe704a8550defa29a2ba9d46f4c99bb4d95de3` หลังเพิ่ม PROGRESS.md และ final recovery verification

## Test Status

- install: PASS — `pnpm install --frozen-lockfile`
- check: PASS — `pnpm check`
- lint: PASS — `pnpm lint`
- test: PASS — 3 files / 16 tests
- build: PASS — `pnpm build`
- routes/mobile: PASS — screenshots ตรวจ role shells และ skeleton routes
- GitHub readback: PASS สำหรับ branch `recovery/product-direction-v0.2`

## Next Action

ตรวจ final diff และ quality gates หลังเพิ่ม PROGRESS.md จากนั้น commit และ push branch ใหม่/เดิมให้ GitHub readback ตรงกับ workspace หาก blocker `.env.example` ยังแก้ไม่ได้ ให้รายงาน `PHASE 0 NOT READY` อย่างชัดเจนและหยุดโดยไม่เริ่ม Phase 1
