import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/auth';
import type { AuthResponse } from '@/lib/types';

const API_BASE = process.env.BACKEND_API_BASE_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const res = await fetch(`${API_BASE}/api/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: res.status });
  }

  const auth: AuthResponse = await res.json();
  await setAuthCookies(auth);
  return NextResponse.json({ displayName: auth.displayName });
}
