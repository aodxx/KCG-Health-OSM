# D6 — Synthetic Seed Dataset v0.1

สถานะ: Safe mock dataset specification
วันที่: 2026-08-26

## 1. วัตถุประสงค์
ใช้ทดสอบ UI, workflow, filtering, role scope และ RLS โดยไม่ใช้ข้อมูลประชาชนจริง

## 2. กฎความปลอดภัย
- ทุกชื่อบุคคล/อสม./เจ้าหน้าที่ในเอกสารนี้เป็นชื่อสมมติ
- ห้ามใช้ CID/HN/เบอร์โทร/ที่อยู่จริง
- ชื่อหมู่บ้านและชื่อหน่วยบริการใช้เป็น geographic/service labels ได้
- ค่าคัดกรองเป็น mock values เพื่อทดสอบ workflow เท่านั้น ไม่ใช่ข้อมูลคนจริง

## 3. Service Units

| id | name | villages |
|---|---|---|
| SU01 | รพ.สต.บ้านทุ่งยาว | 1, 7, 9 |
| SU02 | รพ.สต.บ้านโคกชะงาย | 2, 3, 4, 5, 6, 8 |

## 4. Villages

| code | หมู่ | ชื่อ |
|---|---:|---|
| V01 | 1 | บ้านควนใหม่ |
| V02 | 2 | บ้านโคกชะงาย |
| V03 | 3 | บ้านโคกกอ |
| V04 | 4 | บ้านลำพายตก |
| V05 | 5 | บ้านหนองจิก |
| V06 | 6 | บ้านโคกมะม่วง |
| V07 | 7 | บ้านทุ่งยาว |
| V08 | 8 | บ้านควน |
| V09 | 9 | บ้านไสใหญ่ |

> หมู่ 9 ใช้ชื่อ working label ตามหลักฐานพื้นที่ล่าสุดที่ใช้ใน Discovery; ต้องยืนยัน master data ก่อน production

## 5. Mock Volunteers

| code | ชื่อสมมติ | village | scope |
|---|---|---|---|
| VOL01 | สมใจ ใจดี | V01 | HH0101-HH0103 |
| VOL02 | มาลี สุขใจ | V02 | HH0201-HH0203 |
| VOL03 | ประภา แสงทอง | V03 | HH0301-HH0303 |
| VOL04 | สุภาพร มีสุข | V04 | HH0401-HH0403 |
| VOL05 | จันทร์เพ็ญ พูนสุข | V05 | HH0501-HH0503 |
| VOL06 | วาสนา ร่มเย็น | V06 | HH0601-HH0603 |
| VOL07 | สายใจ กล้าดี | V07 | HH0701-HH0703 |
| VOL08 | นวลจันทร์ ชื่นใจ | V08 | HH0801-HH0803 |
| VOL09 | อรุณี ตั้งใจ | V09 | HH0901-HH0903 |

## 6. Mock Households
สร้าง 3 ครัวเรือนต่อหมู่บ้าน รวม 27 ครัวเรือน

รูปแบบ:
- HH0101, HH0102, HH0103 สำหรับ V01
- ...
- HH0901, HH0902, HH0903 สำหรับ V09

แต่ละครัวเรือนมีสมาชิกสมมติ 2-4 คน เพื่อทดสอบ person/household relationship

## 7. Mock Persons ตัวอย่าง

| person | household | ชื่อสมมติ | อายุประมาณ | use case |
|---|---|---|---:|---|
| P010101 | HH0101 | นายกิตติ ศรีสุข | 58 | NCD screening |
| P010102 | HH0101 | นางสุรีย์ ศรีสุข | 55 | normal follow-up |
| P020101 | HH0201 | นายธนา พูนผล | 67 | elderly + NCD |
| P030101 | HH0301 | นางพรทิพย์ แสงดี | 73 | home visit |
| P040101 | HH0401 | นายวิเชียร มีสุข | 49 | repeat BP |
| P050101 | HH0501 | นางกมลชนก ร่มเย็น | 44 | screening |
| P060101 | HH0601 | นายสมพงษ์ ตั้งใจ | 62 | urgent mock flow |
| P070101 | HH0701 | นางอัมพร ใจดี | 69 | follow-up |
| P080101 | HH0801 | นายวิทยา ชื่นใจ | 53 | needs review |
| P090101 | HH0901 | นางละไม แสงทอง | 60 | referral mock |

## 8. Mock User Accounts / Roles

| account | role | link |
|---|---|---|
| U-VOL01..09 | volunteer | VOL01..09 |
| U-COORD01 | coordinator | V01-V09 aggregate coordination |
| U-STAFF01 | staff | SU01 |
| U-STAFF02 | staff | SU02 |
| U-CLIN01 | clinician | referred case scope only |
| U-ADMIN01 | admin | system metadata only |
| U-CIT01 | citizen | P010101 / HH0101 authorized scope |

## 9. Mock Campaign

`CMP-NCD-001 — คัดกรอง NCD รอบทดสอบ`
- type: ncd_screening
- scope: 9 villages
- data: synthetic only

## 10. Mock Tasks

### TASK01 — normal flow
- person: P010101
- assignee: VOL01
- type: ncd_screening
- status: assigned
- priority: normal

### TASK02 — needs review
- person: P080101
- assignee: VOL08
- status: submitted
- risk: needs_review

### TASK03 — urgent/red flag
- person: P060101
- assignee: VOL06
- status: submitted
- risk: urgent
- creates alert + staff triage item

### TASK04 — follow-up
- person: P070101
- assignee: VOL07
- type: repeat_measurement
- status: assigned

## 11. Mock Observations

> ค่าต่อไปนี้สร้างขึ้นเพื่อทดสอบ UI state ไม่ใช่เกณฑ์วินิจฉัยหรือข้อมูลจริง

| obs set | person | BP | glucose | expected UI state |
|---|---|---|---|---|
| O01 | P010101 | 124/78 | 98 | Normal |
| O02 | P080101 | 148/92 | 126 | Needs review |
| O03 | P060101 | 186/116 | null | Urgent + staff review required |
| O04 | P070101 | 138/86 | 110 | Watch / follow-up |

UI ต้องแสดงว่า abnormal values ต้องให้เจ้าหน้าที่ตรวจ ไม่วินิจฉัยโรคโดยอัตโนมัติ

## 12. Mock Cases

### CASE01 Normal screening
Task → Visit → Observations → Normal → Submitted → Closed/next routine cycle

### CASE02 Needs review
Task → Visit → Observations → Needs review → Staff review → Repeat measurement task

### CASE03 Urgent coordination
Task → Visit → Observation/red flag → Alert → Referral/Ask Staff → Triage Inbox → Staff acknowledges → Follow-up task

### CASE04 Citizen appointment
Citizen Home → appointment → follow-up summary → confirm attendance

## 13. RLS Test Scenarios

1. VOL01 reads HH0101: allow
2. VOL01 reads HH0201: deny
3. VOL01 creates observation for P010101 during assigned task: allow
4. VOL01 reads unrelated CASE03 in V06: deny
5. STAFF01 reads cases in SU01: allow
6. STAFF01 reads normal case in SU02 with no referral: deny
7. CLIN01 reads explicitly referred CASE03: allow
8. CLIN01 browses all village households: deny
9. COORD01 reads task counts/status across allowed villages: allow
10. COORD01 reads full sensitive observations: deny by default
11. ADMIN01 changes village metadata: allow
12. ADMIN01 reads CASE03 clinical observations: deny
13. CIT01 reads own authorized follow-up: allow
14. CIT01 reads another household: deny
15. withdrawn consent / ended assignment causes access to stop according to policy

## 14. Offline Test Scenarios
- volunteer starts visit offline
- captures 3 observations
- task moves locally to in_progress
- network returns
- client syncs with one idempotency key per mutation
- retry must not duplicate observation
- conflict in demographic update must require review instead of blind overwrite

## 15. Dataset size recommendation for prototype
For UI/RLS integration test:
- 2 service units
- 9 villages
- 27 households
- ~70 fictional persons
- 9 volunteers
- 2 staff
- 1 clinician
- 1 coordinator
- 1 admin
- 1-3 citizen accounts
- 30-50 tasks
- 10-20 active cases
- risk mix: mostly normal, some watch/needs review, 1-2 urgent mock cases

เพียงพอสำหรับทดสอบ pagination, filter, dashboard counts, cross-scope denial และ offline sync โดยไม่สร้างข้อมูลจำนวนเกินจำเป็น
