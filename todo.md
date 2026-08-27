# Next Work — Phase 0 Closure

## P0 decision

- [ ] ตรวจ workspace/GitHub HEAD และ branch ปัจจุบัน
- [ ] ปิด `.env.example` blocker ผ่านกลไกที่ได้รับอนุญาต หากยังทำไม่ได้ให้บันทึกเป็น blocker
- [ ] ตั้ง GitHub Pages base path `/KCG-Health-OSM/`
- [ ] ปรับ SPA routing/deep-link strategy ให้เหมาะกับ project site
- [ ] ปรับ manifest, service worker และ asset paths ให้ทำงานใต้ base path
- [ ] เพิ่ม GitHub Pages deployment workflow

## Canonical foundation audit

- [ ] เทียบ domain types กับ DATABASE-DESIGN-v0.2 invariants
- [ ] ตรวจ mock repository และ responsibility scope
- [ ] ตรวจ active runtime ไม่ใช้ legacy Visit/Observation/Case/NCD เป็นแกน

## Verification

- [ ] รัน install, check, lint, test, build
- [ ] ตรวจ route/runtime/mobile smoke และ CI
- [ ] deploy/readback GitHub Pages หาก repository settings อนุญาต
- [ ] อัปเดต PROGRESS.md และ gap analysis
- [ ] commit/push และรายงาน PHASE 0 PASS หรือ NOT READY
- [ ] ห้ามเริ่ม Phase 1 จนกว่าเจ้าของโครงการอนุมัติ
