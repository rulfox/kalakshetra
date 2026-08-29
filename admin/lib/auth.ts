import { cookies } from 'next/headers';
import type { AuthResponse } from './types';

export const ACCESS_COOKIE = 'ks_access_token';
export const REFRESH_COOKIE = 'ks_refresh_token';

const isProd = process.env.NODE_ENV === 'production';

/** Shared cookie options: httpOnly so client JS never sees the tokens, sameSite=lax since this
 *  is same-site navigation only (no cross-site form posts to worry about). */
function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export async function setAuthCookies(auth: AuthResponse) {
  const store = await cookies();
  const accessTtl = Math.max(60, Math.floor((new Date(auth.accessTokenExpiresAt).getTime() - Date.now()) / 1000));
  store.set(ACCESS_COOKIE, auth.accessToken, cookieOptions(accessTtl));
  store.set(REFRESH_COOKIE, auth.refreshToken, cookieOptions(60 * 60 * 24 * 30));
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value;
}
