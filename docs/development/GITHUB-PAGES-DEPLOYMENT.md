# GitHub Pages Deployment — KCG Health OSM

สถานะ: **ACTIVE / FIXED FRONTEND HOSTING DECISION**
วันที่เริ่มใช้: 2026-08-27

## 1. Hosting Decision

Frontend/PWA ของ KCG Health OSM ใช้ **GitHub Pages** เป็น hosting มาตรฐานของโครงการ

Repository:
`aodxx/KCG-Health-OSM`

Public application URL:
`https://aodxx.github.io/KCG-Health-OSM/`

การเปลี่ยน frontend hosting หลักต้องได้รับอนุมัติจากเจ้าของโครงการอย่างชัดเจน

## 2. Architecture Boundary

GitHub Pages ใช้สำหรับ static frontend เท่านั้น:
- HTML
- CSS
- JavaScript
- static assets
- PWA manifest
- service worker

GitHub Pages **ไม่ใช่ backend runtime** และห้ามใช้เป็นที่เก็บ secret หรือ privileged credentials

เมื่อถึง Phase 6 backend/Auth/database จะอยู่บนบริการ backend แยกต่างหาก และ frontend บน GitHub Pages จะเชื่อมผ่าน HTTPS API/SDK ที่ปลอดภัย

## 3. Base Path

เพราะเป็น project site ของ repository นี้ แอปต้องรองรับ base path:

`/KCG-Health-OSM/`

Vite/configuration ต้องตั้งค่า production base ให้ถูกต้อง

ห้ามเขียน asset path แบบ absolute root โดยไม่คำนึงถึง repository path เช่น `/assets/...` หากทำให้ Pages แตก

ต้องตรวจอย่างน้อย:
- JavaScript bundle
- CSS bundle
- fonts
- icons
- images
- manifest
- service worker
- internal navigation

## 4. Router Strategy

GitHub Pages ไม่มี server-side SPA rewrite แบบ application server ทั่วไป

Agent ต้องเลือก routing strategy ที่ทำให้:
- เปิดหน้าแรกได้
- internal navigation ได้
- refresh route ไม่เกิด 404 ที่ผู้ใช้ใช้งานจริง
- shared/deep links ทำงานตาม strategy ที่เลือก

สามารถใช้ hash routing หรือ static fallback strategy ที่พิสูจน์แล้วว่าใช้ได้กับ GitHub Pages โดยเลือกให้เหมาะกับ codebase ปัจจุบัน

ห้ามถือว่า development server behavior เท่ากับ GitHub Pages production behavior

## 5. PWA Requirements

PWA ต้องทำงานภายใต้ `/KCG-Health-OSM/`

ตรวจ:
- manifest `start_url`
- manifest `scope`
- icon paths
- service worker registration path
- service worker scope
- cached asset paths
- installability metadata

Phase 0 ต้องการ PWA foundation ที่ถูก path; production-grade offline caching อยู่ใน Phase 7

## 6. GitHub Actions Deployment

Repository ต้องมี GitHub Pages deployment workflow เช่น:

`.github/workflows/deploy-pages.yml`

แนวทางมาตรฐาน:
1. checkout
2. setup Node/pnpm
3. install with frozen lockfile
4. check/typecheck
5. lint
6. test
7. build
8. upload Pages artifact
9. deploy Pages

Deployment production ควรรันจาก `main` หลัง quality gates ผ่าน

ห้าม deploy branch ที่ยังไม่ผ่าน phase/current quality gates เป็น production page โดยอัตโนมัติ

## 7. Required Verification

หลัง frontend deployment ทุกครั้ง Agent ต้องตรวจเอง:
- workflow completed successfully
- deployment succeeded
- public URL ตอบกลับได้
- application shell render ได้
- static assets load ได้
- navigation หลักทำงาน
- browser/runtime console ไม่มี blocking error
- manifest/service worker paths ไม่ 404
- mobile viewport ใช้งานได้

ห้ามหยุดให้เจ้าของโครงการลองเปิดแทนในสิ่งที่ Agent ตรวจได้เอง

## 8. Phase Gates

### Phase 0
ต้องมี:
- Pages-compatible build
- correct base path
- deployment workflow foundation
- successful public deployment/readback ก่อน `PHASE 0 PASS` หาก GitHub Pages ถูกเปิดใช้งานสำหรับ repository แล้ว

หาก repository/account setting เป็น blocker ที่ Agent แก้เองไม่ได้ ให้รายงาน exact blocker และบอกขั้นตอนที่เจ้าของต้องทำเพียงครั้งเดียว

### Phase 1–5
ทุก feature frontend ต้องรักษา Pages compatibility และ public deployment ต้องไม่พัง

### Phase 6+
Frontend ยังคง GitHub Pages ส่วน backend/Auth/database แยกบริการ

### Phase 10
Production release ต้องยืนยันทั้ง:
- GitHub Pages frontend
- backend services
- security/configuration
- monitoring/operational readiness

## 9. Security Rules

ห้าม frontend bundle มี:
- Supabase service-role key
- private API key
- database password
- server secret
- OAuth client secret
- private signing key

ค่าที่เปิดเผยต่อ browser โดยธรรมชาติ ต้องถูกออกแบบให้ปลอดภัยแม้ผู้ใช้เห็นค่าได้ และ backend ต้องบังคับ authorization ฝั่ง server/RLS

## 10. Definition of Done for Frontend Delivery

Frontend change ยังไม่ถือว่าส่งมอบจนกว่า:
1. tests/check/lint/build ผ่าน
2. GitHub commit/push สำเร็จ
3. CI ผ่าน
4. GitHub Pages deployment ผ่านเมื่อ relevant
5. public URL/readback ผ่าน
6. `PROGRESS.md` บันทึกสถานะจริง

Canonical frontend hosting decision:
**GitHub Pages — `https://aodxx.github.io/KCG-Health-OSM/`**
