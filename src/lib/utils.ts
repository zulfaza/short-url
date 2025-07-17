import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenUrlHash(url: string): string {
  let hash = 0;
  const charLimit = 6;
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const alphabetLength = alphabet.length;

  // Simple string hashing algorithm (djb2 variant)
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char; // hash * 31 + char
    hash |= 0; // Convert to 32bit integer
  }

  hash = Math.abs(hash);

  let shortUrl = '';
  while (hash > 0 || shortUrl.length === 0) {
    const remainder = hash % alphabetLength;
    shortUrl = alphabet[remainder] + shortUrl;
    hash = Math.floor(hash / alphabetLength);
    if (shortUrl.length >= charLimit && hash === 0) {
      break;
    }
  }

  return shortUrl.slice(0, charLimit);
}
