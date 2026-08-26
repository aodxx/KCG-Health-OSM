# D0 — Deep Discovery

สถานะ: Working document
วันที่เริ่ม: 2026-08-26

## 1. เป้าหมายของ Discovery

ทำความเข้าใจระบบสุขภาพระดับตำบลโคกชะงายจากข้อมูลจริง ก่อนกำหนดหน้าจอ ฐานข้อมูล หรือเทคโนโลยี production โดยตอบให้ได้ว่า:

1. ใครเป็นผู้ใช้งานจริงและใครรับผิดชอบใคร
2. งานใดเกิดขึ้นทุกวัน/ทุกเดือน/ตามเหตุการณ์
3. ข้อมูลใดถูกเก็บอยู่แล้วและอยู่ที่ระบบใด
4. จุดใดเป็นงานซ้ำ งานกระดาษ งานโทร/LINE หรือการตามงานด้วยคน
5. ข้อมูลใดเป็นข้อมูลสุขภาพ/ข้อมูลส่วนบุคคลอ่อนไหว
6. ระบบใหม่ควรช่วยงานเดิมส่วนใด และส่วนใดไม่ควรทำซ้ำ Smart อสม./HDC/ระบบภาครัฐ

## 2. ภาพพื้นที่เบื้องต้น

จากเอกสารที่ผู้ใช้เตรียมไว้ใน Google Drive:

- ตำบลโคกชะงาย อำเภอเมืองพัทลุง จังหวัดพัทลุง
- 9 หมู่บ้าน
- ประชากรประมาณ 5,034 คน
- 1,337 ครัวเรือน

ตัวเลขนี้ถือเป็น **working baseline** และต้องตรวจเทียบกับข้อมูลทะเบียน/ท้องถิ่นล่าสุดก่อนใช้ใน production หรือรายงานทางการ

## 3. หน่วยบริการที่เกี่ยวข้อง

ข้อมูล HCODE กระทรวงสาธารณสุขยืนยันอย่างน้อย 2 หน่วยบริการที่สัมพันธ์กับตำบล:

1. โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านโคกชะงาย — รหัส 5 หลัก 09774, สถานะใช้งาน
2. โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านทุ่งยาว — ปรากฏในฐาน HCODE และโครงการกองทุนสุขภาพตำบล

ข้อสรุปเชิงออกแบบ: ระบบต้องรองรับ **หลายหน่วยบริการภายในตำบล** ตั้งแต่แรก และไม่ผูก household/อสม. ทั้งหมดไว้กับ รพ.สต. เดียว

## 4. Workflow สุขภาพที่พบจากพื้นที่จริง

หลักฐานจากโครงการคัดกรองเบาหวาน/ความดันของพื้นที่สะท้อน workflow ที่ชัดเจน:

`กำหนดกลุ่มเป้าหมาย → ลงพื้นที่/คัดกรอง → ประเมินความเสี่ยง → แบ่งกลุ่ม → ให้คำแนะนำ → นัดตรวจซ้ำ/ส่งต่อ → ติดตาม → ขึ้นทะเบียน/สรุปผล`

กลุ่มผลการคัดกรองที่ควรรองรับอย่างน้อย:

- ปกติ
- มีปัจจัยเสี่ยง/ต้องปรับพฤติกรรม
- ผลตรวจผิดปกติ ต้องนัดตรวจซ้ำ
- สงสัย/ได้รับการวินิจฉัยโรค ต้องส่งต่อและติดตาม

ข้อสรุปเชิงระบบ: แกนกลางควรเป็น **Case & Follow-up Workflow** มากกว่าเป็นเพียงฟอร์มบันทึกค่า BP/น้ำตาล

## 5. บทบาท อสม. ที่ควรถือเป็น Core Use Cases

ข้อมูลกรมสนับสนุนบริการสุขภาพปีงบประมาณ 2569 ระบุบทบาทแกนนำสุขภาพด้าน NCD อย่างน้อย:

### บทบาทพื้นฐาน
- คัดกรอง NCD ในประชาชนอายุ 35 ปีขึ้นไป
- ให้คำแนะนำปรับเปลี่ยนพฤติกรรมสุขภาพ

### บทบาทเพิ่มเติมตามบริบท
- สร้าง/สนับสนุนอาสาสมัครประจำครอบครัว (อสค.)
- ติดตามเยี่ยมบ้านร่วมกับเจ้าหน้าที่
- ร่วมกิจกรรมรณรงค์แก้ปัญหา NCD ในชุมชน

ระบบใหม่ต้องไม่ออกแบบให้ขัดหรือทำงานซ้ำโดยไม่จำเป็นกับ Smart อสม. แต่ควรช่วย coordination, continuity และ local visibility ที่ระบบกลางอาจไม่ได้ตอบโจทย์ระดับตำบล

## 6. ปัญหาสุขภาพพื้นที่ที่พบและควรอยู่ใน Discovery Scope

### NCD
มีโครงการต่อเนื่องด้านเบาหวาน ความดัน และ Health Station จึงควรเป็น use case แรกของ prototype

### ผู้สูงอายุ / Long Term Care
แผนกองทุนสุขภาพตำบลมีโครงการคัดกรองสุขภาพผู้สูงอายุ สุขภาพจิต การดูแลผู้มีภาวะพึ่งพิง และพาหนะรับส่งผู้ทุพพลภาพ รวมทั้งมีหลักฐานว่าตำบลเคยอยู่ในระบบ LTC

### ไข้เลือดออก
พื้นที่มีโครงการควบคุมโรคต่อเนื่อง และข้อมูลปี 2566 ระบุว่าดัชนีลูกน้ำบางช่วงเกินเกณฑ์มาตรฐาน จึงเหมาะกับ use case เชิงพื้นที่/ครัวเรือน เช่น household survey, จุดเสี่ยง, campaign tracking

## 7. Proposed Product Shape v0.1 (ยังไม่ใช่ PRD)

ระบบควรแบ่งเป็น 4 surfaces:

### A. OSM Mobile PWA
- งานวันนี้
- ครัวเรือนรับผิดชอบ
- ลงพื้นที่/เยี่ยมบ้าน
- คัดกรอง
- ติดตามเคส
- แจ้งเหตุ/ส่งต่อ
- งานรณรงค์
- offline queue

### B. Staff/Clinical Coordination
- triage รายการเสี่ยง
- ตรวจข้อมูล/มอบหมาย
- นัดติดตาม
- case timeline
- dashboard พื้นที่
- escalations

### C. Household/Resident Portal
- งาน/นัดหมายที่เกี่ยวข้องกับตน
- แบบประเมินที่อนุญาต
- ข้อมูลคำแนะนำ
- แจ้งขอความช่วยเหลือ
- consent/privacy controls

### D. Local Operations Dashboard
- ภาพรวมหมู่บ้าน
- coverage
- งานค้าง
- กลุ่มเสี่ยงแบบ aggregate
- campaign progress
- workload ของ อสม.

## 8. Data Model Concepts ที่ต้องพิสูจน์ใน D1

ยังไม่สร้างฐานข้อมูล แต่มี entities ที่คาดว่าจะต้องมี:

- Tambon
- Village
- ServiceUnit
- Household
- Person
- OSMVolunteer
- StaffUser
- HouseholdAssignment
- Screening
- HealthObservation
- RiskAssessment
- Visit
- Case
- Referral
- FollowUpTask
- Campaign
- ActivityReport
- Consent
- Attachment
- AuditEvent

ต้องแยก `Person identity` ออกจาก `Clinical/health data` และกำหนด access boundary ก่อนเขียน schema

## 9. Architecture Direction (ยังไม่ล็อก)

Candidate:

`PWA Frontend → Supabase Auth/API/Postgres/Storage → Local Dashboard`

Google Workspace ใช้เป็น:
- Drive: research/source documents
- Sheets: export/report/operational staging เฉพาะข้อมูลที่เหมาะสม
- PDF: แบบฟอร์ม/รายงาน/เอกสารอ้างอิง

ข้อควรระวัง: Google Sheets ไม่ควรถูกใช้เป็นฐานข้อมูลสุขภาพหลักที่มีข้อมูลละเอียดของประชาชนโดยไม่มี security model ที่เหมาะสม

## 10. Security principles ที่ล็อกได้ตั้งแต่ตอนนี้

- Public GitHub repository ต้องไม่มี PII/PHI จริง
- least privilege
- row-level authorization
- auditability
- explicit role/area assignment
- encryption in transit/at rest ตามบริการที่ใช้
- แยกข้อมูลสำหรับงานปฏิบัติการกับรายงาน aggregate
- ห้ามใช้ user-editable metadata เป็นฐานในการตัดสินสิทธิ์
- รองรับ revocation/role change

## 11. ข้อค้นพบสำคัญที่สุดของ D0 รอบแรก

1. ระบบต้องรองรับหลาย รพ.สต. / หลายพื้นที่รับผิดชอบ
2. ควรออกแบบจาก case/follow-up workflow ไม่ใช่จากเมนู
3. NCD เป็น candidate use case แรกที่ดีที่สุดสำหรับ prototype
4. ผู้สูงอายุ/LTC และไข้เลือดออกเป็น use cases ถัดไปที่มีหลักฐานพื้นที่จริงรองรับ
5. Smart อสม. เป็นระบบที่ต้องอยู่ใน landscape analysis เพื่อหลีกเลี่ยงการสร้างซ้ำ
6. Supabase ควรเป็น candidate backend แต่ยังไม่ควรเริ่ม schema จนกว่า access model จะชัด

## 12. Next: D1 — Field Workflow & Data Mapping

เป้าหมายรอบถัดไป:

1. ทำแผนที่ 9 หมู่บ้าน → รพ.สต. → อสม. → ครัวเรือน
2. ระบุจำนวน อสม. จริงต่อหมู่บ้าน
3. รวบรวมฟอร์ม/Sheet/PDF ที่ใช้จริง
4. ทำ workflow map งาน NCD แบบ end-to-end
5. ระบุข้อมูลที่ Smart อสม./HDC เก็บอยู่แล้ว
6. ทำ Data Classification: Public / Internal / Personal / Sensitive Health
7. สร้าง System Blueprint v0.1 ก่อน PRD

## Research references

- HCODE รพ.สต.บ้านโคกชะงาย: https://hcode.moph.go.th/code/17238/
- ระบบ 3 หมอรู้จักคุณ / บทบาท อสม.: https://3doctor.hss.moph.go.th/osm-potential/report-community
- รายงานติดตามเยี่ยมบ้าน: https://3doctor.hss.moph.go.th/osm-fiveroles/report-visit
- DDC Open Data / Smart อสม. NCD: https://ddcopendata.ddc.moph.go.th/f/datasetView/562
- โครงการ NCD พื้นที่: https://localfund.happynetwork.org/project/13704
- โครงการ NCD รพ.สต.บ้านทุ่งยาว: https://localfund.happynetwork.org/project/190160
- แผนผู้สูงอายุ 2568: https://localfund.happynetwork.org/planning/190224
- ไข้เลือดออก 2567: https://localfund.happynetwork.org/project/166528
