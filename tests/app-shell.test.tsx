import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import App from "@/App";

describe("App shell", () => {
  afterEach(() => cleanup());
  it("renders the volunteer task-first shell", async () => {
    window.history.pushState({}, "", "/volunteer");
    render(<App />);
    expect(await screen.findByRole("heading", { name: "แบบฟอร์มที่ได้รับ" })).toBeInTheDocument();
    expect(screen.getByText("โหมดต้นแบบ")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "เมนูหลักบนเดสก์ท็อป" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "เมนูหลักบนมือถือ" })).toBeInTheDocument();
  });

  it("renders mobile navigation with labeled controls and no basic axe violations", async () => {
    window.innerWidth = 390;
    window.history.pushState({}, "", "/volunteer");
    const { container } = render(<App />);
    expect(await screen.findByRole("heading", { name: "แบบฟอร์มที่ได้รับ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "เมนู" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(5);
    const accessibilityReport = await axe(container);
    expect(accessibilityReport.violations).toHaveLength(0);
  });

  it.each([
    ["/staff", "ออกแบบงานให้ชุมชน"],
    ["/citizen", "ติดตามนัดหมายได้ในที่เดียว"],
    ["/volunteer/households", "ครัวเรือนในความรับผิดชอบ"],
    ["/staff/cases", "คำตอบที่รอตรวจ"],
    ["/citizen/appointments", "แบบฟอร์มที่ได้รับ"],
  ])("renders a non-404 route skeleton for %s", async (path, expected) => {
    window.history.pushState({}, "", path);
    render(<App />);
    expect(await screen.findByRole("heading", { name: expected })).toBeInTheDocument();
    expect(screen.queryByText("ไม่พบหน้านี้")).not.toBeInTheDocument();
  });

  it.each([
    "/staff/forms", "/staff/forms/new", "/staff/campaigns", "/staff/campaigns/CAMP001", "/staff/submissions/review", "/staff/households", "/staff/volunteers",
    "/volunteer/households/HH0601", "/volunteer/people/P0601", "/volunteer/forms/FORM001", "/volunteer/sync",
    "/citizen/forms", "/citizen/forms/FORM001", "/citizen/submissions",
  ])("keeps required Phase 0 route %s out of 404", async (path) => {
    window.history.pushState({}, "", path);
    render(<App />);
    expect(await screen.findByText("กำลังเตรียมพื้นที่นี้")).toBeInTheDocument();
    expect(screen.queryByText("ไม่พบหน้านี้")).not.toBeInTheDocument();
  });
});
