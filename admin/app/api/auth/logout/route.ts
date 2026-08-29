import { NextResponse } from 'next/server';
import { clearAuthCookies, getRefreshToken } from '@/lib/auth';

const API_BASE = process.env.BACKEND_API_BASE_URL || 'http://localhost:8080';

export async function POST() {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    await fetch(`${API_BASE}/api/admin/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    }).catch(() => undefined);
  }
  await clearAuthCookies();
  return NextResponse.json({ ok: true });
}
