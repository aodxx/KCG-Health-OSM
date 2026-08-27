# KCG Health OSM

PWA สำหรับสนับสนุนการทำงานร่วมกันระหว่างเจ้าหน้าที่/แพทย์ระดับตำบล อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) และประชาชน/ครัวเรือนในตำบลโคกชะงาย อำเภอเมืองพัทลุง จังหวัดพัทลุง

## Project status

**Phase D0 — Deep Discovery**

ขณะนี้ยังไม่เริ่มพัฒนา production application และยังไม่ล็อก PRD หรือสถาปัตยกรรมฐานข้อมูล การทำงานในระยะนี้มุ่งสำรวจพื้นที่จริง workflow งานสาธารณสุข ข้อมูลต้นทาง ความเป็นส่วนตัว และ use cases ก่อนสร้าง System Blueprint v0.1

## Source of truth

- Google Drive `เว็บแอปพลิเคชั่น อสม.โคกชะงาย` — เอกสารต้นทาง งานวิจัย แบบฟอร์ม PDF/Sheet และข้อมูลประกอบการออกแบบ
- GitHub repository นี้ — source code, เอกสารออกแบบที่ผ่านการสังเคราะห์, schema/migration และประวัติการเปลี่ยนแปลง
- Supabase project ที่เตรียมไว้ — ยังไม่ถือเป็น architecture decision จนกว่า Data Model และ Security Model จะผ่านการออกแบบ
- Lovable — ใช้สร้าง prototype/UI หลัง user workflow หลักถูกยืนยันแล้ว

## Discovery documents

- `docs/discovery/D0-DEEP-DISCOVERY.md`
- `docs/discovery/SOURCE-INVENTORY.md`
- `docs/discovery/OPEN-QUESTIONS.md`

## Important rule

ห้าม commit ข้อมูลสุขภาพจริง ข้อมูลระบุตัวบุคคล เลขบัตรประชาชน เบอร์โทร ที่อยู่ละเอียด หรือเอกสารผู้ป่วยลง public repository นี้
