'use server';
import { db } from '@/db/db';
import { urlTable } from '@/db/schema';
import { shortenUrlHash } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export type State = {
  url?: string;
  success: boolean;
  error?: string | null;
};

export async function createShortUrl(_initialState: State, formData: FormData) {
  const url = formData.get('url');

  if (!url) {
    return {
      success: false,
      error: 'Please enter a valid url',
    };
  }

  if (typeof url !== 'string') {
    return {
      success: false,
      error: 'Please enter a valid url',
    };
  }

  const hash = shortenUrlHash(url);

  const body = {
    hash,
    longUrl: url,
  };

  try {
    const existingUrl = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.hash, hash))
      .limit(1);

    if (existingUrl.length > 0) {
      return {
        success: false,
        error: 'Url already exists',
      };
    }

    await db.insert(urlTable).values(body);

    return {
      success: true,
      url: `${process.env.BASE_URL!}/${hash}`,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to create short URL',
    };
  }
}
