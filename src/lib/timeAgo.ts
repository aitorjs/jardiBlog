export function timeAgo(date: Date | string, lang: string = 'es'): string {
  const then = new Date(date).getTime();
  const now = Date.now();
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

  if (minutes < 1) return rtf.format(0, 'second'); // "ahora" / "now"
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  if (hours < 24) return rtf.format(-hours, 'hour');
  if (days < 7) return rtf.format(-days, 'day');
  return rtf.format(-weeks, 'week');
}