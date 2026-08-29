import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, BackendError } from '@/lib/backendClient';
import type { PresignResponse } from '@/lib/types';

/**
 * Proxies the presign request so the browser never needs the admin's JWT (it's an httpOnly
 * cookie) — the client only ever gets back the short-lived, single-use S3 upload URL.
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  try {
    const presigned = await backendFetch<PresignResponse>('/api/admin/uploads/presign', {
      method: 'POST',
      body,
    });
    return NextResponse.json(presigned);
  } catch (e) {
    // backendFetch's own 401 handling calls next/navigation's redirect(), which throws a
    // special NEXT_REDIRECT error that must propagate untouched for the redirect to happen —
    // only a genuine backend error (BackendError) should be turned into a JSON response here.
    if (e instanceof BackendError) {
      return NextResponse.json({ message: 'Could not get an upload URL' }, { status: e.status });
    }
    throw e;
  }
}
