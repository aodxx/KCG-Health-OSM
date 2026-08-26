# D3 — MVP Workflow & Permission Matrix

สถานะ: Working specification
วันที่: 2026-08-26

## 1. เป้าหมาย MVP

พิสูจน์ workflow หลักให้ครบวงจรด้วยกรณีใช้งาน NCD + เยี่ยมบ้าน ก่อนขยายไป LTC, ผู้พิการ, ไข้เลือดออก และ campaign อื่น

วงจรที่ต้องใช้งานได้จริง:

`Assign household → Create task → Visit → Record observations → Assess risk → Alert/Review → Refer → Follow-up → Close`

## 2. MVP Use Case

### UC-01 ผูก อสม. กับครัวเรือน
เจ้าหน้าที่หรือผู้ประสานงานกำหนดว่า อสม. คนใดรับผิดชอบครัวเรือนใด

ผลลัพธ์:
- อสม. เห็นเฉพาะครัวเรือนใน scope ของตน
- ระบบตรวจ coverage และครัวเรือนที่ยังไม่มีผู้รับผิดชอบได้

### UC-02 มอบหมายงานคัดกรอง/เยี่ยมบ้าน
เจ้าหน้าที่สร้าง task รายบุคคล รายครัวเรือน หรือเป็น campaign

ข้อมูลขั้นต่ำ:
- task type
- target
- assignee
- due date
- priority
- form/template

### UC-03 อสม. ลงพื้นที่
อสม. เปิด task → เริ่ม visit → ตรวจยืนยันบุคคล/ครัวเรือน → บันทึกแบบฟอร์ม

รองรับ offline queue และบันทึกสถานะ sync ต่อ submission

### UC-04 บันทึก NCD observation
MVP รองรับอย่างน้อย:
- blood pressure
- blood glucose (เมื่อ workflow อนุญาต)
- weight
- height/BMI เมื่อจำเป็น
- smoking/alcohol/activity risk flags
- symptoms/notes ที่กำหนดใน template

ค่าทางคลินิกและ threshold ต้องมาจาก policy/template ที่เจ้าหน้าที่อนุมัติ ไม่ hard-code แบบกระจัดกระจายใน frontend

### UC-05 Risk & Red Flag
เมื่อข้อมูลเข้าเกณฑ์:
- สร้าง RiskAssessment
- mark submission ว่าต้อง review
- สร้าง Alert
- แจ้งเจ้าหน้าที่ตาม service-unit scope

ระบบช่วยจัดลำดับความเร่งด่วน แต่ไม่วินิจฉัยโรคแทนวิชาชีพ

### UC-06 Staff Review
เจ้าหน้าที่เปิดเคสที่รอตรวจ:
- ดูข้อมูลที่ อสม. บันทึก
- ยืนยัน/แก้สถานะ
- ให้คำแนะนำ
- สร้าง follow-up หรือ referral

### UC-07 Referral
Referral ต้องมีอย่างน้อย:
- case/person
- source service unit
- target service unit/provider (ถ้าทราบ)
- reason
- urgency
- status
- created_by
- timestamps

### UC-08 Follow-up
ระบบสร้างงานติดตามพร้อม due date และ owner

สถานะตัวอย่าง:
- due
- contacted
- visited
- awaiting_result
- completed
- missed

### UC-09 Close case/task
ปิดเมื่อ action ที่กำหนดครบ โดยเก็บ timeline และ audit history

## 3. Task State Machine

`draft → assigned → in_progress → submitted → needs_review → verified → completed`

ทางเลือกเพิ่มเติม:
- `submitted → referred`
- `verified → follow_up_due`
- ทุกสถานะที่เหมาะสม → `cancelled`

หลักการ:
- ห้ามลบประวัติสถานะสำคัญ
- การย้อนสถานะต้องมี audit reason
- case และ task เป็นคนละ entity: case หนึ่งมีหลาย task ได้

## 4. Case Severity Model

MVP ใช้ระดับเชิงปฏิบัติการ ไม่ใช่ diagnosis:

- `routine` — งานทั่วไป
- `attention` — ต้องติดตาม
- `high` — เจ้าหน้าที่ควร review เร็ว
- `critical` — red flag/ส่งต่อด่วนตาม protocol

ชื่อและ threshold สามารถปรับภายหลังโดย policy/template

## 5. Permission Principles

สิทธิ์ต้องพิจารณาอย่างน้อย 4 มิติพร้อมกัน:

1. Role — เป็นใคร
2. Organization scope — อยู่หน่วยบริการใด
3. Geography scope — หมู่บ้านใด
4. Assignment/Case relationship — ได้รับมอบหมายหรือเกี่ยวข้องกับเคสหรือไม่

ห้ามใช้เพียง `role = authenticated` เพื่อเปิดข้อมูลสุขภาพ

## 6. Permission Matrix v0.1

Legend:
- R = read
- C = create
- U = update
- A = assign/approve
- — = ไม่มีสิทธิ์โดย default

| Resource | Household | อสม. | ประธาน/Coordinator | Staff | Clinician | Admin |
|---|---|---|---|---|---|---|
| Own household profile | R/U limited | R assigned | R limited | R scoped | R case-scoped | metadata only |
| Other household health data | — | R assigned only | summary only | R scoped | R referred/care-scoped | — default |
| Task | R relevant | R/C/U assigned | R/A coordination | R/C/U/A | R relevant | metadata/config |
| Visit | R shared summary | C/U own | summary | R/U review | R relevant | — default |
| Observation | R when explicitly shared | C/R assigned | aggregate only | R/U verification | R case-scoped | — default |
| Risk/Alert | R relevant summary | R assigned | aggregate/status | R/C/U | R case-scoped | — default |
| Referral | R own/relevant | C request/R status | status summary | C/R/U | R/U accepted cases | — default |
| Follow-up | R relevant | R/C/U assigned | R status | R/C/U/A | R/C/U case-scoped | — default |
| Campaign | R public/relevant | R | R | C/R/U | R | config only |
| User/Role | own profile | own | scoped volunteer list | scoped | own | C/R/U admin |
| AuditEvent | own consent/activity subset | own actions subset | — | authorized audit only | authorized subset | security admin only |

หมายเหตุ: ตารางนี้เป็น logical policy; Supabase RLS ต้องแตกเป็น policy จริงตาม entity และ relationship

## 7. Data Minimization for MVP

เก็บเฉพาะข้อมูลที่จำเป็นต่อ use case:
- identifier ภายในระบบ
- ชื่อ/ข้อมูลติดต่อเท่าที่จำเป็น
- household/village/service-unit relationship
- assignment
- observation สำหรับ workflow ที่เปิดใช้งาน
- referral/follow-up
- consent/authorization metadata

ยังไม่ควรเก็บใน MVP โดยไม่มีเหตุผลชัดเจน:
- เวชระเบียนเต็มรูปแบบ
- ประวัติการรักษาทั้งหมดจากโรงพยาบาล
- สำเนาบัตรประชาชนโดย default
- รูปภาพสุขภาพจำนวนมากโดยไม่จำเป็น
- ข้อมูลครัวเรือนที่ไม่มีผลต่อ workflow สุขภาพ

## 8. Dashboard MVP

### อสม.
- งานวันนี้
- งานเกินกำหนด
- ครัวเรือนที่รับผิดชอบ
- follow-up ที่ถึงกำหนด
- alert ที่เกี่ยวข้อง
- sync pending

### Staff
- งานรวมตามหมู่บ้าน
- completion rate
- pending review
- red flags
- referrals
- overdue follow-up
- household coverage

Dashboard ต้องแสดง aggregate ก่อน และเปิดรายละเอียดเมื่อผู้ใช้มีสิทธิ์

## 9. Form/Template Engine Requirement

แบบฟอร์มต้องไม่ฝัง field ของทุกโรคไว้ใน component เดียว

FormTemplate ควรรองรับ:
- field definitions
- required/optional
- data type/unit
- validation
- conditional visibility
- risk rules reference
- version
- active dates

Submission ต้องบันทึก template version ที่ใช้ เพื่อป้องกันความหมายของข้อมูลเปลี่ยนเมื่อแก้แบบฟอร์มในอนาคต

## 10. Offline Sync Rules

- อ่านรายการงานที่ sync ล่าสุดได้ offline
- สร้าง visit/submission draft offline ได้
- UUID สร้างที่ client
- sync เป็น idempotent
- แสดง `offline / queued / syncing / synced / conflict / failed`
- ห้ามแก้ silent conflict โดยไม่ให้ผู้ใช้รู้
- sensitive cached data ต้องมีอายุและขอบเขตจำกัด

## 11. Audit Requirements

ขั้นต่ำต้องบันทึก:
- user
- action
- resource type/id
- timestamp
- service-unit/context
- before/after metadata สำหรับการเปลี่ยนสถานะสำคัญเมื่อเหมาะสม
- reason สำหรับ override/cancel/reopen

ไม่ควร log secret/token หรือข้อมูลสุขภาพเต็มชุดซ้ำลง audit payload

## 12. Prototype Acceptance Criteria

ก่อนขึ้น Supabase schema จริง Prototype ต้องสาธิตได้อย่างน้อย:
1. Staff สร้าง task ให้ อสม.
2. อสม. เห็น task และครัวเรือนใน scope
3. อสม. ทำ visit และบันทึก observation
4. ระบบแสดง risk/red flag state
5. Staff เปิด review และสร้าง referral/follow-up
6. อสม. เห็นงาน follow-up ใหม่
7. Household เห็นเฉพาะข้อมูล/นัดของตน
8. Coordinator เห็นสถานะงานแต่ไม่เห็น clinical detail เกินจำเป็น
9. Admin จัด user/scope ได้โดยไม่ต้องเปิด clinical data
10. UI แสดงสถานะ offline/sync อย่างชัดเจน

## 13. Next Gate

เมื่อ D3 ผ่านการทบทวน ให้ทำต่อ:
- D4 UI Information Architecture & Screen Map
- Lovable prototype จาก D2+D3
- D5 Logical Data Model / Supabase schema draft
- Security/RLS threat review
- จากนั้นจึงสรุป PRD v1.0
