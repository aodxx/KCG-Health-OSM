# Project Progress

## Current Phase

Phase 0 Recovery — Repository & Frontend Foundation

## Overall Status

IN PROGRESS

## Product Direction

Form-driven community screening platform: แพทย์/เจ้าหน้าที่สร้างแบบฟอร์ม เลือกกลุ่มเป้าหมาย เผยแพร่ ให้ประชาชนหรือ อสม. กรอก ส่งคำตอบ ตรวจ และเตรียมต่อยอดสู่ follow-up/referral/export โดยไม่ล็อกระบบไว้กับ NCD

## Completed

Repository ถูก sync จาก `aodxx/KCG-Health-OSM` branch `main` และ source documents ล่าสุดถูกนำเข้า workspace แล้ว มี React/Vite/TypeScript scaffold, Thai-first responsive app shell, role switcher, PWA foundation, shared UI primitives, route skeletons, domain contracts, repository interfaces และ synthetic mock adapters

โค้ด prototype/workflow เดิมถูกจัดเป็น paused boundary และไม่ถูก import จาก active runtime Active screens ใช้ framing ของ assigned forms, audience, submission และ household responsibility โดยไม่เพิ่ม Phase 1 business workflow

เพิ่ม route skeleton ครบตามคำสั่งแนบสำหรับ staff, volunteer และ citizen รวมถึง forms, campaigns, submissions, households, people และ sync paths และเพิ่ม test coverage รวม 30 tests

ลบ `client/public/__manus__/debug-collector.js`, `client/public/__manus__/version.json` และ `client/src/components/ManusDialog.tsx` ซึ่งเป็น workspace/debug residue ออกจาก PR-ready branch คง `vite-plugin-manus-runtime` ไว้เฉพาะ managed dev/preview integration ไม่ใช่ product runtime

## In Progress

กำลังปิด Phase 0 delivery ผ่าน PR-ready branch และรอผล GitHub Actions CI โดยยังไม่ merge และยังไม่เริ่ม Phase 1

## Remaining

ต้องมี `.env.example` แบบไม่มี secret ตาม Phase 0 exit criteria แต่ environment-file guard ของ workspace ป้องกันการสร้างหรือแก้ไฟล์นี้โดยตรง และไม่มีคำสั่งที่ได้รับอนุญาตใน session นี้สำหรับสร้างไฟล์ดังกล่าว จึงยังไม่สามารถประกาศ PHASE 0 PASS

## Known Risks

Product Definition v0.2 และ PRD มีอำนาจเหนือ workflow prototype เดิม โค้ด NCD/visit/referral จึงอยู่ใน paused archive และห้ามกลับมากำหนด core architecture

Phase 0 ห้ามใช้ข้อมูลสุขภาพจริง, CID, HN, เบอร์โทร, secret, Supabase, API, Google Sheets, Smart อสม. หรือ hard-coded clinical thresholds ใน core domain

## Current Branch

`recovery/phase0-foundation-v0.2-pr`

## Latest Commit

`dad59a41040be1dcf1a901a3eff354383796d47b` เป็นฐาน implementation ก่อน PR-ready rebase; commit หลังอัปเดต PROGRESS และ cleanup residue จะถูกบันทึกในขั้นตอน delivery

## Test Status

- install: PASS — `pnpm install --frozen-lockfile`
- check: PASS — `pnpm check`
- lint: PASS — `pnpm lint`
- test: PASS — 3 files / 30 tests
- build: PASS — `pnpm build`
- routes/mobile: PASS — role shells และ skeleton routes ตรวจแล้ว
- runtime logs: PASS — ไม่พบ browser error ใหม่

## CI Status

PENDING — จะเปิด Pull Request เข้า `main` แล้วตรวจ GitHub Actions readback

## Next Action

commit และ push PROGRESS/cleanup ไปยัง branch PR-ready จากนั้นเปิด PR เข้า `main`, ตรวจ CI ให้รันจริง และรายงานสถานะสุดท้าย หาก `.env.example` ยังไม่สามารถสร้างผ่านกลไกที่ได้รับอนุญาต ให้รายงาน `PHASE 0 NOT READY` โดยไม่เริ่ม Phase 1
