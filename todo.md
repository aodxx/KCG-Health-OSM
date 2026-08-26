# Phase 0 Final Recovery TODO

## Sync and state

- [ ] fetch/pull branch `recovery/product-direction-v0.2`
- [ ] ตรวจ git status และ diff ก่อนแก้
- [ ] ยืนยันว่า workspace ไม่เก่า

## Blocker and hygiene

- [ ] สร้าง `.env.example` แบบไม่มี secret และมีคำอธิบาย Phase 0
- [ ] ตรวจ `client/public/__manus__/`, ManusDialog, manus runtime plugin และ debug tooling
- [ ] ตัดสิน KEEP/REMOVE สำหรับ workspace residue
- [ ] ตรวจ generated junk, secrets, real data, node_modules/dist/cache และ package manager เดียว

## Phase 0 requirements

- [ ] ตรวจ PROGRESS.md และอัปเดตให้ตรง HEAD
- [ ] ตรวจ scaffold, PWA, 3 role shells, routes, domain, repository/mock, UUID/idempotency
- [ ] ตรวจไม่มี Supabase production, clinical rules หรือ Phase 1 runtime

## Quality and GitHub delivery

- [ ] รัน frozen install
- [ ] รัน check, lint, test, build
- [ ] ตรวจ runtime logs, routes และ mobile layout
- [ ] push branch และเปิด PR เข้า main
- [ ] ตรวจ GitHub Actions CI จริงและแก้จนผ่าน
- [ ] อัปเดต PROGRESS รอบสุดท้าย
- [ ] commit/push รอบสุดท้ายและ GitHub readback
- [ ] รายงาน branch, SHA, PR, files, gates, CI และ final status
- [ ] หาก PASS ให้หยุดและรายงาน READY FOR PHASE 1 โดยไม่เริ่ม Phase 1
