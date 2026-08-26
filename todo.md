# Product Direction Sync + Phase 0 Recovery TODO

## GitHub synchronization

- [ ] ตรวจ remote, branch และ local diff ก่อน sync
- [ ] fetch/pull `aodxx/KCG-Health-OSM` branch `main`
- [ ] preserve local changes ที่ใช้ต่อได้และตรวจ merge/conflict
- [ ] ยืนยันไฟล์ Product Definition และ Source of Truth ใหม่หลัง sync

## Source of Truth audit

- [ ] อ่าน `docs/product/PRODUCT-DEFINITION-v0.2.md`
- [ ] อ่าน `PRD.md`, `AGENTS.md`, Phase 0 checklist และ `AUTONOMOUS-AGENT-RULES.md`
- [ ] อ่าน architecture D5–D6 ที่เกี่ยวข้อง
- [ ] ทำ gap analysis ใหม่ตาม Product Definition/PRD ล่าสุด
- [ ] จำแนกโค้ดเดิม KEEP / REFACTOR / PARK

## Phase 0 foundation only

- [ ] ปรับ FormDefinition / FormVersion / FormQuestion contracts
- [ ] ปรับ Campaign / AudienceSelection contracts
- [ ] ปรับ Household / HouseholdMember / VolunteerAssignment contracts
- [ ] ปรับ Submission / SubmissionAnswer / SubmittedBy contracts
- [ ] ตรวจ repository interfaces, mock repositories, synthetic seed data
- [ ] ตรวจ offline queue, UUID/idempotency, PWA, role shells และ route skeleton
- [ ] ห้ามนำ NCD/Visit/Referral workflow กลับเข้า runtime
- [ ] ห้ามเชื่อม backend, API, Smart อสม. หรือ external integration

## Verification and delivery

- [ ] fresh install ผ่าน
- [ ] lint ผ่าน
- [ ] tests ผ่าน
- [ ] production build ผ่าน
- [ ] route/runtime/CI/deployment-readback ตรวจได้
- [ ] commit และ push ไป `aodxx/KCG-Health-OSM`
- [ ] รายงาน branch, SHA, results และ SYNCED/NOT SYNCED TO GITHUB
- [ ] ห้ามเริ่ม Phase 1 เอง
