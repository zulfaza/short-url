import { db } from '@/db/db';
import { urlTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';

async function getShortUrl(uid: string) {
  const res = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.hash, uid))
    .limit(1);

  if (res.length === 0) {
    throw new Error('No url found');
  }

  return res[0].longUrl;
}

interface PageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  try {
    const data = await getShortUrl(uid);
    redirect(data);
  } catch (error: unknown) {
    console.log(error);
    notFound();
  }
}
