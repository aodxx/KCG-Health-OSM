# D5 — Supabase Architecture Draft v0.1

สถานะ: **SUPERSEDED / HISTORICAL REFERENCE**

เอกสารนี้เป็นร่างจากสถาปัตยกรรมรุ่นก่อน Product Definition v0.2 และไม่อนุญาตให้ใช้เป็นคำสั่งเริ่ม Supabase, schema หรือ migration ในปัจจุบัน

## กติกาปัจจุบัน

- Phase 0–5 ใช้ domain contracts + repository interfaces + synthetic mock adapters
- Backend/Auth/Database จริงเริ่มใน **Phase 6** ตาม `MASTER-ROADMAP.md`
- Canonical logical database design คือ `docs/architecture/DATABASE-DESIGN-v0.2.md`
- ก่อนเริ่ม Phase 6 ต้องตรวจ backend choice, migrations, RLS/server authorization, security tests และ synthetic staging ใหม่อีกครั้ง
- ห้ามใช้ service-role/secret key ใน frontend
- ห้ามใส่ real citizen/health data ก่อน pilot/privacy gate

รายละเอียดเดิมยังอยู่ใน Git history เพื่อการอ้างอิงย้อนหลังเท่านั้น
