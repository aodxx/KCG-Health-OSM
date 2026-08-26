import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import App from "@/App";

describe("App shell", () => {
  afterEach(() => cleanup());
  it("renders the volunteer task-first shell", async () => {
    window.history.pushState({}, "", "/volunteer");
    render(<App />);
    expect(await screen.findByRole("heading", { name: "งานที่ควรเห็นวันนี้" })).toBeInTheDocument();
    expect(screen.getByText("โหมดต้นแบบ")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "เมนูหลักบนเดสก์ท็อป" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "เมนูหลักบนมือถือ" })).toBeInTheDocument();
  });

  it("renders mobile navigation with labeled controls and no basic axe violations", async () => {
    window.innerWidth = 390;
    window.history.pushState({}, "", "/volunteer");
    const { container } = render(<App />);
    expect(await screen.findByRole("heading", { name: "งานที่ควรเห็นวันนี้" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "เมนู" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(5);
    const accessibilityReport = await axe(container);
    expect(accessibilityReport.violations).toHaveLength(0);
  });

  it.each([
    ["/staff", "เห็นสัญญาณก่อน งานค้าง"],
    ["/citizen", "ติดตามนัดหมายได้ในที่เดียว"],
    ["/volunteer/households", "ครัวเรือน"],
    ["/staff/cases", "เคสทั้งหมด"],
    ["/citizen/appointments", "นัดหมาย"],
  ])("renders a non-404 route skeleton for %s", async (path, expected) => {
    window.history.pushState({}, "", path);
    render(<App />);
    expect(await screen.findByRole("heading", { name: expected })).toBeInTheDocument();
    expect(screen.queryByText("ไม่พบหน้านี้")).not.toBeInTheDocument();
  });
});
