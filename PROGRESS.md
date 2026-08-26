# Project Progress

## Current Phase

Phase 0 Recovery — Repository & Frontend Foundation

## Overall Status

IN PROGRESS — GitHub Pages compatibility implemented locally; `.env.example` blocker and public Pages readback remain

## Product Direction

Form-driven community screening platform: แพทย์/เจ้าหน้าที่สร้างแบบฟอร์ม เลือกกลุ่มเป้าหมาย เผยแพร่ ให้ประชาชนหรือ อสม. กรอก ส่งคำตอบ ตรวจ และเตรียมต่อยอดสู่ follow-up/referral/export โดยไม่ล็อกระบบไว้กับ NCD

## Completed

Repository ถูก sync จาก `aodxx/KCG-Health-OSM` และ implementation ถูกวางบน PR-ready branch ที่มี history ร่วมกับ GitHub main แล้ว มี React/Vite/TypeScript scaffold, Thai-first responsive app shell, role switcher, PWA manifest/service worker, shared UI primitives, domain contracts, repository interfaces, synthetic mock adapters, route skeletons และ 30 tests

เติม FormDefinition, FormVersion, FormSection, FormQuestion, QuestionOption, QuestionType, Campaign, AudienceDefinition, AudienceRule, CampaignRecipient, Submission, SubmissionAnswer, SubmissionMode, ReviewMode/Status, FollowUp/Referral contracts และ SyncQueueItem โดยยังไม่สร้าง workflow runtime

โค้ด NCD/visit/referral เดิมอยู่ใน `client/src/paused/phase1/` และ tests เดิมอยู่ใน `tests/paused/phase1/` ไม่ถูก import จาก active runtime

ลบ workspace/debug residue ได้แก่ `client/public/__manus__/debug-collector.js`, `client/public/__manus__/version.json` และ `client/src/components/ManusDialog.tsx` คง `vite-plugin-manus-runtime` เฉพาะ managed dev/preview integration

เพิ่ม route skeleton ครบ staff dashboard/forms/forms-new/campaigns/campaign-detail/submissions-review/households/volunteers/profile, volunteer home/assigned-forms/households/household-detail/person-detail/proxy-form/sync/profile และ citizen home/assigned-forms/form-completion/submission-status/profile

## In Progress

กำลังปิด Phase 0 delivery ผ่าน PR #1 โดยยังไม่ merge และยังไม่เริ่ม Phase 1

เพิ่ม GitHub Pages project-site base `/KCG-Health-OSM/`, hash routing สำหรับ static hosting, relative PWA manifest/scope, base-aware service worker registration/cache, `deploy-pages.yml` และ `.nojekyll`

## Remaining

`.env.example` แบบไม่มี secret ยังไม่สามารถสร้างได้ เพราะ environment-file guard ของ workspace ป้องกันการสร้างหรือแก้ไฟล์ `.env.example` โดยตรง และ session นี้ไม่มี capability สำหรับสร้างไฟล์ดังกล่าว อีกทั้ง repository ยังไม่มี GitHub Pages site configuration ให้ตรวจ public readback จาก API

## Known Risks

ห้ามใช้ข้อมูลสุขภาพจริง, CID, HN, เบอร์โทร, secret, Supabase, API, Google Sheets, Smart อสม. หรือ hard-coded clinical thresholds ใน Phase 0

## Current Branch

`recovery/phase0-foundation-v0.2-pr`

## Latest Commit

งาน Pages compatibility รอบนี้ยังไม่ได้ commit; HEAD ก่อน commit คือ `1cca6a3fde2752fbe6b81351c1903b25cb0e2988`

## Test Status

- install: PASS — `pnpm install --frozen-lockfile`
- check: PASS — `pnpm check`
- lint: PASS — `pnpm lint`
- test: PASS — 3 files / 30 tests
- build: PASS — `pnpm build`
- routes/mobile/runtime: PASS — routes checked, mobile screenshots captured, no new browser errors

## CI Status

PASS — PR #1 GitHub Actions `KCG Health OSM CI / verify` ผ่านหลังแก้ pnpm version mismatch

## Next Action

ตรวจ diff และ canonical domain contracts, รัน gates อีกครั้ง, commit/push branch recovery และเปิด PR/readback workflow. หาก `.env.example` หรือ GitHub Pages configuration ยังถูกระบบ/สิทธิ์ปิดกั้น ให้ตัดสิน `PHASE 0 NOT READY` อย่างโปร่งใส และห้ามเริ่ม Phase 1
