# Autonomous Agent Rules — KCG Health OSM

## 1. Owner is not the QA tester
The agent must not stop and ask the project owner to manually test routine implementation behavior when the agent can verify it itself.

The agent must verify with available tools first, including as applicable:
- inspect source and diff
- install dependencies
- lint/typecheck
- unit/integration/E2E tests
- production build
- route and broken-link checks
- mobile render smoke checks
- accessibility checks
- runtime/browser logs
- CI/workflow logs
- deployment/readback checks

When a failure is found, diagnose it, fix it, and rerun verification autonomously.

Ask the owner only when the action truly requires the owner, such as account consent, credential creation/entry, provider permission changes, legally significant approval, physical-world validation, or an unresolved product decision.

When owner action is unavoidable, provide exact click-by-click steps and the expected result.

## 2. GitHub is the implementation handoff point
Implementation is not considered delivered while it exists only in an agent workspace, Lovable internal project, local sandbox, or other temporary environment.

For implementation intended for this project, the agent must:
1. verify the implementation
2. run lint/test/build
3. inspect the final diff for unrelated/junk files
4. commit the work
5. push/sync to the designated GitHub repository/branch when authorized
6. report branch and commit SHA

If the environment cannot push, report exactly:
`NOT SYNCED TO GITHUB`

Then state where the work currently exists and what handoff is required.

Never imply that GitHub changed when it did not.

## 3. Phase gate remains mandatory
Current work stays inside the active phase. Passing tests does not authorize starting the next phase automatically.

The agent may continue fixing the current phase without asking the owner for routine verification, but must stop before entering the next phase until explicit phase authorization is given.
