// Civic Field Notes: offline queue contract is local-only in Phase 0; persistence and server reconciliation belong to later phases.
import type { SyncState } from "@/domain/types";

export type QueueMutationType = "visit_draft" | "observation" | "task_status" | "note";

export interface QueuedMutation<TPayload = unknown> {
  mutationId: string;
  idempotencyKey: string;
  type: QueueMutationType | string;
  payload: TPayload;
  createdAt: string;
  state: SyncState;
  retryCount: number;
}

export interface OfflineQueue<TPayload = unknown> {
  enqueue(mutation: QueuedMutation<TPayload>): void;
  list(): QueuedMutation<TPayload>[];
  markState(mutationId: string, state: SyncState): boolean;
}

export const createMutation = <TPayload>(type: QueueMutationType | string, payload: TPayload): QueuedMutation<TPayload> => {
  const mutationId = crypto.randomUUID();
  return {
    mutationId,
    idempotencyKey: mutationId,
    type,
    payload,
    createdAt: new Date().toISOString(),
    state: "pending",
    retryCount: 0,
  };
};

export const queueCopy = <TPayload>(items: QueuedMutation<TPayload>[]) => items.map((item) => ({ ...item }));

export const createMemoryQueue = <TPayload = unknown>(): OfflineQueue<TPayload> => {
  const items: QueuedMutation<TPayload>[] = [];
  return {
    enqueue(mutation) { items.push({ ...mutation }); },
    list() { return queueCopy(items); },
    markState(mutationId, state) {
      const item = items.find((entry) => entry.mutationId === mutationId);
      if (!item) return false;
      item.state = state;
      return true;
    },
  };
};
