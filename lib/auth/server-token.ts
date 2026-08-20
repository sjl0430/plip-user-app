import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function getServerAuthJwt() {
  const headerStore = await headers();
  const cookie = headerStore.get("cookie") ?? "";

  return getToken({
    req: { headers: { cookie } },
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
}

export async function getServerAccessToken(): Promise<string | undefined> {
  const jwt = await getServerAuthJwt();
  const token = jwt?.accessToken;
  return typeof token === "string" && token.length > 0 ? token : undefined;
}

export async function getServerRefreshToken(): Promise<string | undefined> {
  const jwt = await getServerAuthJwt();
  const token = jwt?.refreshToken;
  return typeof token === "string" && token.length > 0 ? token : undefined;
}
