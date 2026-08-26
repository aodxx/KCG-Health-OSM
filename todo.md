# Phase 0 Recovery / Foundation Reset TODO

## Source of Truth and audit

- [x] อ่าน PRD.md, AGENTS.md, Phase 0 checklist, D7 plan และ D5–D6 architecture
- [x] ตรวจ implementation จริงทั้งหมดและจำแนก DONE / PARTIAL / MISSING / OUT-OF-SCOPE
- [x] จัดทำ gap analysis ที่อ้างอิงไฟล์และ acceptance criteria

## Foundation only

- [ ] ตรวจและเติม env example โดยไม่มี secret
- [x] ตรวจ scripts สำหรับ fresh install, lint, test และ production build
- [x] ตรวจ PWA manifest และ service worker foundation
- [x] ตรวจ domain types/constants, repository/data adapter interfaces
- [x] ตรวจ offline queue interface และ UUID/idempotency model
- [x] ตรวจ role navigation tests, mock repository tests, mobile smoke tests และ accessibility basics
- [x] เก็บ app shell, mock data, role switcher และ shared components ที่ใช้ต่อได้
- [x] พัก implementation ของ Phase 1 โดยไม่เพิ่ม workflow หรือ business logic ใหม่

## Route and boundary verification

- [x] ตรวจ route skeleton ของ อสม. / เจ้าหน้าที่ / ประชาชน ไม่ชี้ไป 404
- [x] ตรวจว่าไม่มี Supabase, API, Google Sheets หรือ backend connection
- [x] ตรวจว่าไม่มี secret และไม่มี real health/PII data
- [x] ตรวจ repository structure และไฟล์ generated ที่ไม่ควร commit

## Final gates

- [x] fresh install ผ่าน
- [x] lint ผ่าน
- [x] tests ผ่าน
- [x] production build ผ่าน
- [x] สรุปสิ่งที่เก็บ / แก้ / ยังไม่ผ่าน
- [ ] บันทึก commit SHA และตัดสิน PHASE 0 PASS หรือ PHASE 0 NOT READY
