import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App shell", () => {
  it("renders the volunteer task-first shell", async () => {
    window.history.pushState({}, "", "/volunteer");
    render(<App />);
    expect(await screen.findByRole("heading", { name: "งานที่ควรเห็นวันนี้" })).toBeInTheDocument();
    expect(screen.getByText("โหมดต้นแบบ")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation", { name: "เมนูหลัก" })).toHaveLength(2);
  });
});
