import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Called by the backend (RevalidationService) right after an admin mutation commits, so edits
 * show up immediately instead of waiting out the ISR cache TTL. Protected by a shared secret —
 * this is a write-adjacent endpoint (it busts cached content), not a public route.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const tag = request.nextUrl.searchParams.get('tag');

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }
  if (!tag) {
    return NextResponse.json({ message: 'Missing tag' }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}
