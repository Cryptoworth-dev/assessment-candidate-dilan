export const CATEGORY_COLORS: string[] = [
  "#1d4ed8",
  "#2563eb",
  "#0f172a",
  "#64748b",
  "#cbd5e1",
  "#d946ef",
  "#f59e0b",
  "#10b981",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
  "#ef4444",
  "#0ea5e9",
  "#7c3aed",
  "#ec4899",
  "#facc15",
  "#14b8a6",
  "#fb7185",
]

export function getCategoryColor(name: string): string {
  const hash = Array.from(name).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  )
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length]
}