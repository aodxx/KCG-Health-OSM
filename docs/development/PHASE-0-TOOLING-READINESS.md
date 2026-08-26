# Phase 0 — Tooling & Skill Readiness

สถานะ: Prepared for implementation
วันที่: 2026-08-27

## Repository assessment

Repository ต้นทาง `aodxx/KCG-Health-OSM` เป็น discovery/architecture workspace ที่มีเอกสาร PRD, blueprint, logical data model, RLS matrix, synthetic seed specification, development plan และ Phase 0 checklist แต่ยังไม่มี `package.json`, `src/`, `public/` หรือ application scaffold ดังนั้นจึงไม่ควรพยายาม patch application ลงใน repository เอกสารโดยตรงแบบคาดเดา framework

Project scaffold ที่ใช้สำหรับการพัฒนา frontend คือ React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + shadcn/ui + Wouter ซึ่งตรงกับ technical direction ใน D7 และยังคงแยก frontend ออกจาก backend ได้ชัดเจนใน Phase 0

## Installed capability matrix

| ความต้องการ Phase 0 | สถานะ | วิธีรองรับ |
|---|---|---|
| React/TypeScript application scaffold | พร้อม | React 19, TypeScript, Vite |
| Mobile-first styling/design tokens | พร้อมใช้งาน | Tailwind CSS 4 และ `client/src/index.css` |
| Shared accessible primitives | พร้อมใช้งาน | shadcn/ui และ Radix UI ที่ scaffold ให้มา |
| Client-side route skeleton | พร้อมใช้งาน | Wouter |
| PWA manifest/service worker | ติดตั้งเพิ่มแล้ว | `vite-plugin-pwa` |
| Unit/component tests | ติดตั้งเพิ่มแล้ว | Vitest + Testing Library |
| Browser-like test environment | ติดตั้งเพิ่มแล้ว | `jsdom` |
| Accessibility smoke checks | ติดตั้งเพิ่มแล้ว | `vitest-axe` + `@testing-library/jest-dom` |
| Mock repository boundary | ต้องพัฒนาใน Phase 0 | `src/data/repositories` และ `src/data/mock` |
| Offline mutation primitives | ต้องพัฒนาใน Phase 0 | `src/offline` โดยยังไม่เชื่อม backend |
| Supabase/Auth/Storage/RLS | จงใจยังไม่ติดตั้ง | เริ่มได้เมื่อ Phase 3 ผ่าน gate |
| External integrations | จงใจยังไม่ติดตั้ง | ไม่อยู่ในขอบเขต Phase 0 |

## Skills reviewed

ทักษะที่เกี่ยวข้องและพร้อมใช้คือแนวทาง static web development ซึ่งครอบคลุม React 19, Tailwind 4, Wouter, shadcn/ui, accessibility, responsive layout, animation และการใช้ component ที่มีอยู่ใน scaffold ก่อนสร้างใหม่

ทักษะด้าน image generation ถูกใช้เฉพาะเพื่อเตรียม logo และ visual assets ที่ไม่มีข้อมูลสุขภาพจริง ส่วนทักษะ Supabase, OAuth, file storage, notifications, LLM และ automation ยังไม่ถูกเปิดใช้ เพราะจะขยายขอบเขตเกิน Phase 0 และขัดกับข้อกำหนด “no backend required”

## Guardrails

ใน Phase 0 จะใช้ synthetic/mock data เท่านั้น ห้ามใส่ CID, HN, เบอร์โทร, ที่อยู่ละเอียด, health record จริง หรือ secret ลง source code ห้ามสร้าง `supabase/` และห้ามเชื่อม project ที่เตรียมไว้จนกว่าจะผ่าน architecture review ตาม D5/D7

## Next implementation slice

ขั้นต่อไปคือสร้าง app shell, role switcher, role-specific navigation, route skeletons, shared status/risk/sync components, domain types, mock repositories, offline queue interface, PWA metadata และ test/build scripts โดยคง server placeholder ของ template ไว้แต่ไม่เพิ่ม backend behavior
