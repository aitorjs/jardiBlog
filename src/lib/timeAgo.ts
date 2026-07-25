export function timeAgo(date: Date | string): string {
  const then = new Date(date).getTime();
  const now = Date.now();
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "justo ahora";
  if (minutes < 60) return `hace ${minutes} minuto${minutes === 1 ? "" : "s"}`;
  if (hours < 24) return `hace ${hours} hora${hours === 1 ? "" : "s"}`;
  if (days < 7) return `hace ${days} día${days === 1 ? "" : "s"}`;
  return `hace ${weeks} semana${weeks === 1 ? "" : "s"}`;
}