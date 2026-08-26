import { describe, expect, it } from "vitest";
import { cases, getVolunteerTasks, mockRepository, mockUsers } from "@/data/mock/repository";
import { createMemoryQueue, createMutation } from "@/offline/queue";

describe("Phase 0 domain and mock foundation", () => {
  it("keeps the urgent synthetic case explicit and non-diagnostic", () => {
    expect(cases.find((item) => item.id === "CASE03")?.risk).toBe("urgent");
    expect(cases.find((item) => item.id === "CASE03")?.nextAction).toContain("ตรวจ");
  });

  it("returns only the volunteer's synthetic task slice", () => {
    expect(getVolunteerTasks().every((task) => task.householdId.startsWith("HH06") || task.householdId === "HH0101")).toBe(true);
  });

  it("creates a unique idempotency key for every mutation", () => {
    const first = createMutation("visit_draft", { taskId: "TASK03" });
    const second = createMutation("visit_draft", { taskId: "TASK03" });
    expect(first.idempotencyKey).toBe(first.mutationId);
    expect(first.idempotencyKey).not.toBe(second.idempotencyKey);
    expect(first.state).toBe("pending");
  });

  it("ships only synthetic role fixtures", () => {
    expect(mockUsers.map((user) => user.id)).toEqual(["U-VOL06", "U-STAFF02", "U-CLIN01", "U-CIT01"]);
  });

  it("exposes a mock repository behind the adapter contract", async () => {
    const result = await mockRepository.listTasks("U-VOL06");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((task) => task.householdId.startsWith("HH06") || task.householdId === "HH0101")).toBe(true);
  });

  it("supports explicit local queue state transitions", () => {
    const queue = createMemoryQueue<{ taskId: string }>();
    const mutation = createMutation("task_status", { taskId: "TASK03" });
    queue.enqueue(mutation);
    expect(queue.list()[0].state).toBe("pending");
    expect(queue.markState(mutation.mutationId, "synced")).toBe(true);
    expect(queue.list()[0].state).toBe("synced");
  });
});
