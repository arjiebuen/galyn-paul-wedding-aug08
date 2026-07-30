/**
 * Input sanitization utilities to prevent XSS, HTML injection, and other attacks.
 */

/**
 * Strip HTML tags from a string to prevent XSS injection.
 * This is aggressive — removes ALL HTML tags.
 */
export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/**
 * Escape HTML special characters to prevent HTML injection.
 * Converts < > & " ' to their HTML entity equivalents.
 */
export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "<",
    ">": ">",
    '"': """,
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitize a string for safe database storage:
 * - Trims whitespace
 * - Strips HTML tags
 * - Normalizes excessive whitespace
 * - Enforces max length
 */
export function sanitizeText(
  input: string,
  maxLength: number = 1000
): string {
  let sanitized = input.trim();
  sanitized = stripHtmlTags(sanitized);
  // Replace multiple spaces/newlines with a single space
  sanitized = sanitized.replace(/\s+/g, " ");
  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

/**
 * Sanitize a name field specifically:
 * - Removes HTML tags
 * - Removes any characters that aren't letters, spaces, hyphens, apostrophes, or periods
 * - Trims and collapses whitespace
 */
export function sanitizeName(input: string, maxLength: number = 100): string {
  let sanitized = stripHtmlTags(input).trim();
  // Allow letters, spaces, hyphens, apostrophes, periods, and common name characters
  sanitized = sanitized.replace(/[^a-zA-ZÀ-ÿ\s\-'.]/g, "");
  sanitized = sanitized.replace(/\s+/g, " ").trim();
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

/**
 * Sanitize a message/textarea field:
 * - Strips HTML tags (don't allow any HTML)
 * - Trims and collapses excessive whitespace but preserves line breaks as spaces
 * - Truncates to max length
 */
export function sanitizeMessage(
  input: string,
  maxLength: number = 1000
): string {
  let sanitized = stripHtmlTags(input).trim();
  // Normalize line breaks and excessive spacing
  sanitized = sanitized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  sanitized = sanitized.replace(/\n{3,}/g, "\n\n");
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

