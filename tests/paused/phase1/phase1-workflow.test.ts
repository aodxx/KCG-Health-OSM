import { describe, expect, it } from "vitest";
import { deriveRisk, initialObservation, initialWorkflow } from "@/domain/workflow";

describe("Phase 1 mock workflow", () => {
  it("starts at assign with an append-only first event", () => {
    expect(initialWorkflow.stage).toBe("assign");
    expect(initialWorkflow.taskStatus).toBe("assigned");
    expect(initialWorkflow.events[0].stage).toBe("assign");
  });

  it("derives workflow risk states from synthetic observations", () => {
    expect(deriveRisk({ ...initialObservation, systolic: "124", diastolic: "78" })).toBe("normal");
    expect(deriveRisk({ ...initialObservation, systolic: "136", diastolic: "84" })).toBe("watch");
    expect(deriveRisk({ ...initialObservation, systolic: "151", diastolic: "96" })).toBe("needs_review");
    expect(deriveRisk({ ...initialObservation, systolic: "186", diastolic: "116" })).toBe("urgent");
    expect(deriveRisk({ ...initialObservation, redFlag: true })).toBe("urgent");
  });
});
