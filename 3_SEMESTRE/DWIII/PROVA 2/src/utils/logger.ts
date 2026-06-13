export function logAction(action: string, details: unknown): void {
  console.log(`[${new Date().toISOString()}] ${action}`, details);
}
