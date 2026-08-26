# Source Inventory

สถานะ: D0 working inventory

## Google Drive

โฟลเดอร์หลัก: `เว็บแอปพลิเคชั่น อสม.โคกชะงาย`

### สิ่งที่ฉันเตรียมใว้
- `เตรียมไว้ให้แล้ว`
  - ระบุ GitHub repository: `aodxx/KCG-Health-OSM`
  - ระบุ Google Drive workspace ของโครงการ
  - ระบุ Supabase project ที่เตรียมไว้เป็น candidate

### เอกสารข้อมูล ประกอบการออกแบบ
- `สำรวมงานที่ อสม. ต้องทำเป็นประจำ,การส่งงานที่ได้มอ....docx`
  - ภารกิจ อสม.
  - การคัดกรอง
  - เยี่ยมบ้าน
  - การรายงานผลงาน
- `โครงสร้างการทำงาน อสม. ระดับตำบล.docx`
  - โครงสร้างการบริหาร
  - ระดับหมู่บ้าน/ตำบล
  - ความสัมพันธ์กับ รพ.สต.
- เอกสารสำรวจตำบลโคกชะงาย 2 ชุด
  - 9 หมู่บ้าน
  - ประชากรประมาณ 5,034 คน
  - 1,337 ครัวเรือน

หมายเหตุ: พบเอกสารสำรวจตำบลซ้ำ 2 ไฟล์ที่มีเนื้อหาเดียวกัน ควรเก็บ master เพียงชุดเดียวเมื่อจัดระเบียบ Drive ในรอบต่อไป

## External / Official Sources

### กระทรวงสาธารณสุข / กรมสนับสนุนบริการสุขภาพ
- HCODE รพ.สต.บ้านโคกชะงาย
- HCODE/ฐานหน่วยบริการ รพ.สต.บ้านทุ่งยาว
- ระบบ 3 หมอรู้จักคุณ
- รายงาน NCD และติดตามเยี่ยมบ้าน
- DDC Open Data ที่อธิบายการสำรวจผ่าน Smart อสม.

### Local health fund evidence
ใช้เพื่อทำความเข้าใจ workflow และปัญหาพื้นที่ ไม่ถือเป็น clinical source of truth

พบโครงการที่เกี่ยวข้องกับ:
- เบาหวาน/ความดัน/NCD
- Health Station
- ผู้สูงอายุ
- LTC/ภาวะพึ่งพิง
- สุขภาพจิตผู้สูงอายุ
- ไข้เลือดออก
- สุขภาพช่องปาก

## GitHub

Repository: `aodxx/KCG-Health-OSM`

สถานะก่อน D0: repository ว่าง

สถานะหลังเริ่ม D0:
- README.md
- docs/discovery/D0-DEEP-DISCOVERY.md
- docs/discovery/SOURCE-INVENTORY.md
- docs/discovery/OPEN-QUESTIONS.md

## Supabase

Project ref: `kaanguobjhlusjvgbowt`

สถานะระหว่าง D0: `INACTIVE`

Decision: ยังไม่ restore หรือสร้าง schema จนกว่า D1 จะสรุป Data Classification + Role/Access Matrix

## Lovable

Workspace: `นิวัฒน์'s Lovable`
Plan: Free
Projects: 0

Decision: ยังไม่สร้าง project ใน D0 เพื่อหลีกเลี่ยง prototype ที่ล็อก UX ก่อนเข้าใจ workflow จริง

## Source handling rules

1. Drive = raw/reference/source material
2. GitHub = synthesized design + code
3. ห้ามนำข้อมูลผู้ป่วย/ประชาชนจริงขึ้น public GitHub
4. เอกสารออนไลน์ที่เป็นข้อมูลเชิงสถิติหรือโครงการต้องระบุปี เพราะข้อมูลอาจล้าสมัย
5. ข้อมูลจำนวนประชากร/ครัวเรือนต้องตรวจแหล่งล่าสุดก่อนใช้เป็นค่าทางการ
