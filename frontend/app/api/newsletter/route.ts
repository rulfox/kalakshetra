import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/** Server-side proxy to the backend's public newsletter endpoint — keeps the backend's CORS
 *  surface limited to server-to-server calls for this route instead of opening it to the browser. */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const res = await fetch(`${API_BASE}/api/public/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  const text = await res.text();
  return new NextResponse(text || null, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('Content-Type') || 'application/json' },
  });
}
