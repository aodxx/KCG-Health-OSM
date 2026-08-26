// Phase 0 only: verify product-direction contracts without starting Form Builder workflow.
import { describe, expect, it } from "vitest";
import { validateFormVersion } from "@/domain/form-schema";
import { formVersions, mockResponsibilityRepository, mockSubmissionRepository, campaignRecipients } from "@/data/mock/form-repository";


describe("Product Direction v0.2 foundation", () => {
  it("accepts the synthetic form version schema and keeps it immutable", () => {
    const version = formVersions[0];
    expect(validateFormVersion(version)).toEqual([]);
    expect(version.immutable).toBe(true);
    expect(version.questions.map((question) => question.order)).toEqual([1, 2, 3]);
  });

  it("preserves self and proxy recipient completion modes", () => {
    expect(campaignRecipients.some((recipient) => recipient.completionMode === "proxy_by_volunteer")).toBe(true);
    expect(campaignRecipients.some((recipient) => recipient.completionMode === undefined)).toBe(true);
  });

  it("limits volunteer responsibility to assigned households", async () => {
    await expect(mockResponsibilityRepository.canAccessHousehold("U-VOL06", "HH0601")).resolves.toBe(true);
    await expect(mockResponsibilityRepository.canAccessHousehold("U-VOL06", "HH0101")).resolves.toBe(false);
  });

  it("exposes synthetic submission provenance only through the adapter", async () => {
    const submissions = await mockSubmissionRepository.listSubmissions("U-STAFF02");
    expect(submissions[0]).toMatchObject({ targetPersonId: "P0601", householdId: "HH0601", completionMode: "proxy_by_volunteer", formVersionId: "FORM001-V1" });
    expect(submissions[0].actualSubmitterId).toBe("U-VOL06");
  });
});
