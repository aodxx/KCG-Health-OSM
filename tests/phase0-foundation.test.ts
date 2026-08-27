import { describe, expect, it } from "vitest";
import { getVolunteerTasks, mockRepository, mockUsers } from "@/data/mock/repository";
import { createMemoryQueue, createMutation } from "@/offline/queue";

describe("Phase 0 domain and mock foundation", () => {
  it("returns only the volunteer's synthetic form-assignment slice", () => {
    expect(getVolunteerTasks().every((task) => task.type === "form_completion")).toBe(true);
  });

  it("creates a unique idempotency key for every mutation", () => {
    const first = createMutation("form_draft", { recipientId: "REC001" });
    const second = createMutation("form_draft", { recipientId: "REC001" });
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
    expect(result.every((task) => task.type === "form_completion")).toBe(true);
  });

  it("supports explicit local queue state transitions", () => {
    const queue = createMemoryQueue<{ recipientId: string }>();
    const mutation = createMutation("submission_status", { recipientId: "REC001" });
    queue.enqueue(mutation);
    expect(queue.list()[0].state).toBe("pending");
    expect(queue.markState(mutation.mutationId, "synced")).toBe(true);
    expect(queue.list()[0].state).toBe("synced");
  });
});
