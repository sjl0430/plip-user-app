import { ApiError } from "@/lib/api/apiFetch";
import { clearDevAccessToken } from "@/lib/api/devAccessToken";
import { handleSessionExpired } from "@/lib/auth/session-expired";
import {
  clearRequestAccessTokenOverride,
  getRequestAccessTokenOverride,
  setRequestAccessTokenOverride,
} from "@/lib/auth/request-token-cache";
import { getServerAuthJwt } from "@/lib/auth/server-token";
import * as authService from "@/services/authService";

export async function withAuthRetry<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }

    clearDevAccessToken();

    const override = getRequestAccessTokenOverride();
    if (override) {
      clearRequestAccessTokenOverride();
      return handleSessionExpired();
    }

    const jwt = await getServerAuthJwt();
    const refreshToken = jwt?.refreshToken;
    if (typeof refreshToken !== "string" || !refreshToken) {
      return handleSessionExpired();
    }

    try {
      const refreshed = await authService.reissueToken(refreshToken);
      setRequestAccessTokenOverride(refreshed.accessToken);
      try {
        return await request();
      } catch (retryError) {
        if (retryError instanceof ApiError && retryError.status === 401) {
          return handleSessionExpired();
        }
        throw retryError;
      }
    } catch (reissueError) {
      if (reissueError instanceof ApiError && reissueError.status === 401) {
        return handleSessionExpired();
      }
      throw reissueError;
    } finally {
      clearRequestAccessTokenOverride();
    }
  }
}
