import { db } from '@/db/db';
import { urlTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

async function getShortUrl(uid: string) {
  const res = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.hash, uid))
    .limit(1);

  if (res.length === 0) {
    throw new Error('No url found');
  }

  return res.pop();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  try {
    const data = await getShortUrl(uid);
    if (!data) {
      notFound();
    }
    return Response.redirect(data?.longUrl, 301);
  } catch (error: unknown) {
    console.log(error);
    notFound();
  }
}
