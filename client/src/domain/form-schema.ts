// Civic Field Notes: pure form-schema validation boundary; no persistence, API, or clinical rules.
import type { FormQuestion, FormQuestionType, FormVersion } from "@/domain/types";

export const FORM_QUESTION_TYPES: FormQuestionType[] = ["short_text", "long_text", "number", "checkbox", "radio", "select", "date", "time", "yes_no"];

export interface FormSchemaIssue { code: "missing_label" | "unsupported_type" | "duplicate_order" | "missing_option"; questionId?: string; message: string; }

export const validateFormQuestion = (question: FormQuestion): FormSchemaIssue[] => {
  const issues: FormSchemaIssue[] = [];
  if (!question.label.trim()) issues.push({ code: "missing_label", questionId: question.id, message: "คำถามต้องมี label" });
  if (!FORM_QUESTION_TYPES.includes(question.type)) issues.push({ code: "unsupported_type", questionId: question.id, message: "ชนิดคำถามยังไม่รองรับ" });
  if (["radio", "select", "checkbox", "single_choice", "multiple_choice"].includes(question.type) && (!question.options || question.options.length === 0)) issues.push({ code: "missing_option", questionId: question.id, message: "คำถามชนิดเลือกต้องมีตัวเลือก" });
  return issues;
};

export const validateFormVersion = (version: FormVersion): FormSchemaIssue[] => {
  const issues = version.questions.flatMap(validateFormQuestion);
  const orders = version.questions.map((question) => question.order);
  if (new Set(orders).size !== orders.length) issues.push({ code: "duplicate_order", message: "ลำดับคำถามต้องไม่ซ้ำกัน" });
  return issues;
};
