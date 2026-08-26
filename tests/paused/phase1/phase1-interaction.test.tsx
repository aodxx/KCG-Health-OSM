import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("Phase 1 happy path", () => {
  it("moves the synthetic urgent case from visit to close", async () => {
    window.history.pushState({}, "", "/volunteer/tasks/TASK03");
    render(<App />);

    fireEvent.click(await screen.findByRole("button", { name: /เริ่มเยี่ยมบ้าน/ }));
    fireEvent.change(screen.getByPlaceholderText("เช่น 186"), { target: { value: "186" } });
    fireEvent.change(screen.getByPlaceholderText("เช่น 116"), { target: { value: "116" } });
    fireEvent.click(screen.getByRole("button", { name: /ส่งผลให้เจ้าหน้าที่ตรวจ/ }));
    fireEvent.click(await screen.findByRole("button", { name: /ดูขั้นตอนถัดไป/ }));

    await waitFor(() => expect(screen.getByRole("heading", { name: "ตรวจและประสานเคส" })).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText("บันทึกเหตุผลหรือสิ่งที่ต้องประสาน"), { target: { value: "ตรวจซ้ำและประสานทีมพื้นที่" } });
    fireEvent.click(screen.getByRole("button", { name: /ยืนยันการตรวจ/ }));
    fireEvent.click(screen.getByRole("button", { name: /สร้างการส่งต่อ/ }));
    fireEvent.click(screen.getByRole("button", { name: /สร้างงานติดตาม/ }));
    fireEvent.click(screen.getByRole("button", { name: /บันทึกว่าติดตามแล้ว/ }));
    fireEvent.click(screen.getByRole("button", { name: /ปิดเคส/ }));

    expect(await screen.findByRole("heading", { name: "เคสนี้ปิดแล้ว" })).toBeInTheDocument();
    expect(screen.getByText("ปิดเคสแล้ว")).toBeInTheDocument();
  });
});
