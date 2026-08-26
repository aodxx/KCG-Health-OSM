# D5 — Supabase Architecture Draft v0.1

สถานะ: Architecture draft only — ยังไม่ apply schema
วันที่: 2026-08-26

## 1. เป้าหมาย
วางแนวทางใช้ Supabase สำหรับ KCG-Health-OSM โดยยึดหลัก least privilege, RLS-first, auditability และไม่ผูก production data กับ public client เกินจำเป็น

## 2. Supabase Components ที่คาดว่าจะใช้
- Auth — ยืนยันตัวตนผู้ใช้
- Postgres — operational database
- Row Level Security — authorization ระดับ row
- Storage — เอกสาร/รูปที่จำเป็นต่อ workflow
- Edge Functions — งาน privileged/server-side บางประเภท
- Realtime — พิจารณาเฉพาะ notification/status ที่จำเป็น

## 3. Schema Strategy
แนะนำแยกอย่างน้อย 3 schema เชิงตรรกะ:

### public
เฉพาะ object ที่ frontend จำเป็นต้องเรียกผ่าน Data API และมี RLS ครบ
ตัวอย่าง: tasks, visits, observations, cases, follow_ups

### internal
สำหรับ object ที่ไม่ควร expose โดยตรง เช่น audit helpers, authorization lookup, export staging, privileged functions

### reference
lookup/read-mostly เช่น service units, villages, form definitions, risk rule metadata

หมายเหตุ: ชื่อ schema จริงยังไม่ล็อกจนกว่าจะทำ migration design

## 4. Auth Mapping
`auth.users.id` เชื่อมกับ `public.user_accounts.id`

ห้ามใช้ `user_metadata` เพื่อ authorization

ข้อมูล role/scope หลักควรอยู่ในตารางที่ควบคุมโดยระบบ เช่น:
- user_roles
- role_scopes
- volunteer_assignments
- care_team_assignments

app_metadata อาจใช้เป็น cache/claim ที่ระบบตั้งให้ แต่ฐานความจริงควรตรวจจาก DB สำหรับสิทธิ์สำคัญที่ต้องสดทันที

## 5. RLS Strategy
ทุก table ใน exposed schema ต้องเปิด RLS

Policy ต้องพิจารณา `role + scope + relationship` ไม่ใช่ `TO authenticated` อย่างเดียว

ตัวอย่างแนวคิด:
- volunteer อ่าน household ได้เมื่อมี active volunteer_assignment
- volunteer เพิ่ม observation ได้เมื่อ person/household อยู่ใน assignment และ task ยัง active
- staff อ่าน case ได้เมื่อ case.service_unit_id อยู่ใน staff scope
- clinician อ่าน case ได้เมื่อมี care/referral assignment
- citizen อ่าน person ได้เมื่อ person.user_account_id = auth.uid() หรือมี guardian/consent relationship
- admin ไม่มี policy อ่าน health tables โดยอัตโนมัติ

## 6. Grants + RLS
นอกจาก RLS ต้องจำกัด Postgres grants ด้วย

แนวทาง:
1. revoke สิทธิ์ default ที่เกินจำเป็นจาก anon/authenticated
2. grant เฉพาะ SELECT/INSERT/UPDATE ที่ role client ต้องใช้กับ object นั้น
3. ใช้ RLS จำกัด row ต่อ
4. operation ที่ sensitive มากให้ผ่าน server-side function แทน direct table mutation

## 7. Views
หากสร้าง view ที่ frontend เรียก:
- ใช้ `security_invoker = true` เมื่อเหมาะสม
- หลีกเลี่ยง view ที่ bypass RLS
- summary dashboard ควร expose เฉพาะข้อมูล aggregate ที่จำเป็น

## 8. Privileged Functions
หลีกเลี่ยง SECURITY DEFINER เว้นแต่จำเป็นจริง

ถ้าจำเป็น:
- เก็บใน schema ที่ไม่ expose
- validate auth.uid() และ scope ภายใน function
- revoke EXECUTE from PUBLIC
- grant เฉพาะ role/function caller ที่จำเป็น
- ตรวจ advisors หลังสร้าง

## 9. Storage Design
แยก bucket ตาม sensitivity เช่น:
- public-assets — ไม่มีข้อมูลบุคคล
- case-attachments — private
- consent-evidence — highly restricted

Object path ควรประกอบด้วย opaque ids ไม่ใช้ชื่อ/เลขบัตรประชาชน

ทุก private bucket ต้องมี storage RLS ตาม case/assignment/scope

## 10. Offline Sync Boundary
Frontend PWA เก็บเฉพาะข้อมูลขั้นต่ำที่จำเป็นสำหรับงานที่กำลังทำ

ไม่ cache รายชื่อทั้งตำบลหรือข้อมูลสุขภาพจำนวนมากบนอุปกรณ์

sync payload ใช้:
- client_id
- mutation_id/idempotency_key
- local_created_at
- server_version ที่อ่านล่าสุด

Server ตรวจ authorization ซ้ำทุกครั้ง ไม่เชื่อ client role/scope

## 11. Audit Architecture
Audit event ควรสร้างฝั่ง database/server สำหรับ operation สำคัญ เช่น:
- view sensitive case
- create/update observation
- referral
- export
- consent change
- permission/assignment change

Client ไม่สามารถ update/delete audit records

## 12. Service Role / Secret Keys
ห้ามใส่ secret/service-role key ใน PWA, GitHub Pages หรือ Lovable frontend

Frontend ใช้ publishable key + user session + RLS เท่านั้น

งานที่ต้อง bypass RLS ต้องอยู่ใน trusted backend/Edge Function และตรวจ authorization ก่อนเสมอ

## 13. Realtime
MVP ไม่ควรเปิด realtime ทุก table

พิจารณาเฉพาะ:
- task assignment ใหม่
- urgent alert state
- staff review result
- follow-up update

notification ที่ไม่เร่งด่วนสามารถใช้ pull/refresh เพื่อลด complexity

## 14. Environment Plan
ก่อน production ควรมีอย่างน้อย:
- development
- staging/UAT
- production

ห้ามใช้ข้อมูลประชาชนจริงใน development

UAT ควรใช้ synthetic/mock data เว้นแต่มีมาตรการและอนุมัติที่ชัดเจน

## 15. Current Supabase Project
มี project ref `kaanguobjhlusjvgbowt` ที่ผู้ใช้เตรียมไว้ แต่สถานะที่ตรวจล่าสุดเป็น INACTIVE

ขณะนี้ **ยังไม่ restore, ยังไม่สร้าง table, ยังไม่เปิด RLS policy หรือ apply migration ใด ๆ** ตามแผน discovery-first

## 16. Pre-schema Gate
ก่อนเขียน migration จริง ต้องผ่านอย่างน้อย:
- D2 System Blueprint review
- D3 Permission Matrix review
- D4 Screen/Workflow review
- D5 Logical Model review
- ระบุ authentication method
- ระบุ production identifier strategy
- ระบุ consent/privacy requirements
- ระบุ offline data policy

## 17. Security Baseline จาก Supabase Docs ล่าสุด
แนวทางที่ต้องยึดตอน implement:
- เปิด RLS ทุก table ใน exposed schema
- ใช้ least-privilege grants ร่วมกับ RLS
- ห้ามใช้ user_metadata ใน authorization
- ห้าม expose secret/service-role keys
- UPDATE policy ต้องพิจารณา USING + WITH CHECK และมี SELECT policy ที่สอดคล้อง
- policy ต้องตรวจ ownership/scope จริง ไม่ใช่ authenticated อย่างเดียว
- views/functions/storage ต้องตรวจ security semantics แยกต่างหาก

## 18. ขั้นถัดไป
D6 ควรสร้าง:
1. Entity Relationship Diagram (logical)
2. RLS Policy Matrix แบบ table × role × operation
3. Field-level data dictionary สำหรับ MVP
4. Synthetic seed dataset สำหรับ 9 หมู่บ้านเพื่อใช้ prototype/UAT

จากนั้นจึงค่อยตัดสินใจ restore Supabase project และเริ่ม migration ใน development environment
