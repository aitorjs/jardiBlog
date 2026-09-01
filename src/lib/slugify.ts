import { GENERATE_SLUG_FROM_TITLE } from '../config';

const accentsMap: Record<string, string> = {
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
  'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
  'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
  'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
  'ñ': 'n',
};

function slugify(str: string): string {
  return str
    // remove leading & trailing whitespace
    .trim()
    // replace accented characters
    .replace(/[\u00C0-\u00FF]/g, (char) => accentsMap[char] || char)
    // output lowercase
    .toLowerCase()
    // replace spaces
    .replace(/\s+/g, '-')
    // remove special characters
    .replace(/[^\w-]/g, '')
    // remove leading & trailing separators
    .replace(/^-+|-+$/g, '');
}

export default function generateSlug(title: string, staticSlug: string): string {
  return !GENERATE_SLUG_FROM_TITLE ? slugify(staticSlug) : slugify(title);
}