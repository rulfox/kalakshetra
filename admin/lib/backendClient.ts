import { redirect } from 'next/navigation';
import { ACCESS_COOKIE, clearAuthCookies, getAccessToken, getRefreshToken, setAuthCookies } from './auth';
import type { AuthResponse } from './types';

const API_BASE = process.env.BACKEND_API_BASE_URL || 'http://localhost:8080';

class BackendError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;
  const res = await fetch(`${API_BASE}/api/admin/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  });
  if (!res.ok) return false;
  const auth: AuthResponse = await res.json();
  await setAuthCookies(auth);
  return true;
}

/**
 * Authenticated fetch against the Spring backend's admin API, called only from Server
 * Components/Actions/Route Handlers (it reads the httpOnly cookie via next/headers). On a 401 it
 * refreshes the access token once and retries; if that also fails, it clears cookies and redirects
 * to /login — callers never have to think about token expiry.
 */
export async function backendFetch<T>(
  path: string,
  init: RequestInit = {},
  { parseJson = true }: { parseJson?: boolean } = {},
): Promise<T> {
  const attempt = async (): Promise<Response> => {
    const token = await getAccessToken();
    return fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
      cache: 'no-store',
    });
  };

  let res = await attempt();
  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await attempt();
    }
  }

  if (res.status === 401) {
    await clearAuthCookies();
    redirect('/login');
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new BackendError(res.status, body || `Backend request to ${path} failed with ${res.status}`);
  }

  if (!parseJson || res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

export { ACCESS_COOKIE, BackendError };
