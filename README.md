# KCG Health OSM

KCG Health OSM คือ PWA ภาษาไทยสำหรับสนับสนุนการทำงานภาคสนามและการประสานการดูแลระหว่างครัวเรือน อสม. และเจ้าหน้าที่สาธารณสุข/แพทย์ในตำบลโคกชะงาย อำเภอเมืองพัทลุง จังหวัดพัทลุง

## สถานะโครงการ

ขณะนี้โครงการอยู่ใน **Phase 0 — Repository & Frontend Foundation** โดยมี app shell, role-based prototype switcher, route skeleton, shared status/risk/sync components, mock repository, offline mutation primitive, PWA metadata และ quality gates ขั้นพื้นฐานแล้ว

ข้อมูลทั้งหมดใน UI เป็นข้อมูลสังเคราะห์เพื่อทดสอบ workflow เท่านั้น โครงการนี้ไม่ใช่ Smart อสม., HDC, HIS, EMR เต็มรูปแบบ หรือระบบวินิจฉัยโรค

## Stack

| ส่วน | เทคโนโลยี |
|---|---|
| Frontend | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + design tokens |
| Routing | Wouter |
| Components | shadcn/ui + Radix UI |
| PWA | Web App Manifest + service worker shell |
| Tests | Vitest + Testing Library + jsdom |
| Quality | ESLint + TypeScript check + Prettier |
| CI | GitHub Actions |

## เริ่มต้นใช้งานในเครื่อง

ต้องใช้ Node.js 22 และ pnpm 10 จากนั้นรันคำสั่งต่อไปนี้

```bash
pnpm install
pnpm dev
```

คำสั่งตรวจสอบมาตรฐานของ Phase 0 คือ:

```bash
pnpm check
pnpm lint
pnpm test
pnpm build
```

## โหมดสาธิต

เปิดหน้า `/volunteer` เพื่อดู dashboard งานของ อสม. เปิด `/staff` เพื่อดู triage overview และเปิด `/citizen` เพื่อดู citizen shell แบบจำกัดขอบเขต ผู้ใช้จำลองสามารถเปลี่ยนได้จาก role switcher ใน sidebar บน desktop หรือใช้ navigation บน mobile

## ขอบเขตและ guardrails

Phase 0 ยังไม่เชื่อม Supabase, Auth, Storage, API, external integration หรือฐานข้อมูลจริง และยังไม่สร้าง `supabase/` การทำ backend จะเริ่มได้ต่อเมื่อ architecture review และ security model ผ่าน gate ที่กำหนดในเอกสาร D5/D6/D7

ห้าม commit CID, HN, เบอร์โทร, ที่อยู่ละเอียด, health records จริง, export ของประชาชน, secret หรือ service-role key ลง repository นี้ การแสดง risk ใน prototype เป็น workflow state เท่านั้น ไม่ใช่ผลวินิจฉัย

## เอกสารอ้างอิงภายใน

เอกสาร source of truth ถูกคัดลอกไว้ใต้ `docs/` ได้แก่ PRD, system blueprint, MVP workflow/permissions, UI information architecture, logical data model, RLS matrix, synthetic seed specification, development plan และ Phase 0 checklist

เอกสารการเตรียม tooling อยู่ที่ `docs/development/PHASE-0-TOOLING-READINESS.md` และแนวทางภาพ/interaction อยู่ที่ `ideas.md`
