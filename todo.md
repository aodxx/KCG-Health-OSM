# Project Structure + Phase 0 Recovery TODO

## Sync and source audit

- [ ] ตรวจ remote, branch และ local diff ก่อน sync
- [ ] sync `aodxx/KCG-Health-OSM` branch `main`
- [ ] อ่าน Product Definition, PRD, AGENTS, Phase 0 checklist, autonomous rules, D7, repository structure และ architecture docs ทั้งหมด
- [ ] อ่านคำสั่งแนบให้ครบทุกส่วน
- [ ] ตรวจ source/workspace implementation จริง
- [ ] จำแนก prototype เป็น KEEP / REFACTOR / PARK

## Repository structure

- [ ] ตรวจ root files: README, PRD, AGENTS, PROGRESS, package, lockfile, env example, tsconfig, vite, eslint, prettier, public, src, tests, docs, CI
- [ ] สร้างหรือปรับ `PROGRESS.md` เป็นสถานะกลางของโครงการ
- [ ] รักษา separation ระหว่าง UI / Domain / Repository / Mock Data / Services
- [ ] ไม่ให้ legacy prototype กำหนด architecture ใหม่

## Phase 0 domain foundation

- [ ] geography: Tambon, ServiceUnit, Village
- [ ] people: Person, UserAccount, Staff, Volunteer
- [ ] household: Household, HouseholdMember, HouseholdAssignment/VolunteerAssignment
- [ ] form engine: FormDefinition, FormVersion, FormSection, FormQuestion, QuestionOption, QuestionType
- [ ] campaign: Campaign, AudienceDefinition, AudienceRule, CampaignRecipient
- [ ] submission: Submission, SubmissionAnswer, SubmissionStatus, SubmissionMode
- [ ] review/follow-up types เป็น contracts เท่านั้น ไม่สร้าง workflow
- [ ] sync: queue item, sync status, client UUID, idempotency key
- [ ] FormVersion immutable และ future conditional/rule config types
- [ ] ไม่มี hard-coded clinical threshold

## Data access and mock

- [ ] repository interfaces สำหรับ people, households, volunteers, forms, campaigns, submissions
- [ ] mock implementations และ synthetic seed data
- [ ] household/member/assignment history รองรับ startAt/endAt/active
- [ ] UI ไม่ import mock arrays โดยตรงทุกหน้า
- [ ] ไม่มี Supabase/API/Google Sheets/backend/Smart อสม.

## Route and UI foundation

- [ ] staff dashboard, forms, forms/new, campaigns, campaign detail, submissions/review, households, volunteers, settings/profile
- [ ] volunteer home, assigned forms, households, household detail, person detail, proxy completion shell, sync status, profile
- [ ] citizen home, assigned forms, form completion shell, submission status, profile
- [ ] shared AppShell, navigation, states, OfflineBanner, status/form/campaign/submission/household primitives
- [ ] Thai-first, mobile-first, Android-first, 44px touch targets, text/icon status

## PWA and quality

- [ ] `.env.example` แบบไม่มี secret
- [ ] manifest, icon metadata, service worker registration และ mobile viewport
- [ ] fresh install
- [ ] lint, test, build
- [ ] domain/status, form version, assignment, mock repository, routes, role navigation และ accessibility tests
- [ ] `.github/workflows/ci.yml` install/lint/test/build
- [ ] ตรวจ runtime logs, route readback, deployment/readback ที่ทำได้

## Delivery gate

- [ ] อัปเดต PROGRESS.md ก่อนจบ
- [ ] commit และ push ไป GitHub
- [ ] รายงาน branch, commit SHA, test/build results
- [ ] ระบุ SYNCED TO GITHUB หรือ NOT SYNCED TO GITHUB พร้อมสาเหตุ
- [ ] ห้ามเริ่ม Phase 1 และห้ามเพิ่ม NCD/Visit/Referral/clinical workflow
