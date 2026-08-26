// Civic Field Notes: offline mutations are explicit and retry-safe before any backend exists.
import type { SyncState } from "@/domain/types";

export interface QueuedMutation<TPayload = unknown> {
  mutationId: string;
  idempotencyKey: string;
  type: string;
  payload: TPayload;
  createdAt: string;
  state: SyncState;
  retryCount: number;
}

export const createMutation = <TPayload>(type: string, payload: TPayload): QueuedMutation<TPayload> => {
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
