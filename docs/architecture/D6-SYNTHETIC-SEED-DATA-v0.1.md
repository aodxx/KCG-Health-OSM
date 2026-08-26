# D6 — Synthetic Seed Data v0.1

สถานะ: **SUPERSEDED / HISTORICAL REFERENCE**

seed ชุดนี้ถูกออกแบบบน data model รุ่นก่อน Product Definition v0.2 จึงไม่ใช่ชุดข้อมูลตัวอย่าง canonical สำหรับการพัฒนาปัจจุบัน

## แนวทางปัจจุบัน

Synthetic/mock data ใหม่ต้องอิง `docs/architecture/DATABASE-DESIGN-v0.2.md` และอย่างน้อยต้องครอบคลุม:
- service units / villages
- households / persons / household memberships
- volunteers / volunteer assignments
- form templates / immutable form versions / questions/options
- campaigns / audience definitions/rules / campaign recipients
- submissions / answers / review placeholders
- follow-up / appointment / referral placeholders ตาม phase

ข้อห้าม:
- ห้ามใช้ CID/HN/เบอร์โทร/ข้อมูลสุขภาพจริง
- ห้าม copy ข้อมูลประชาชนจริงมาเป็น seed
- ห้ามใช้ NCD hard-coded dataset เป็น architecture หลัก

รายละเอียด seed เดิมยังอยู่ใน Git history เพื่อการอ้างอิงย้อนหลังเท่านั้น
