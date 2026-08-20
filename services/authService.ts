import * as authApi from "@/lib/api/authApi";
import type {
  ApiLocalLoginRequest,
  ApiTokenReissueResponse,
  ApiTokenResponse,
} from "@/types/auth/api";
import type { UiAuthTokens, UiRestorePayload } from "@/types/auth/ui";

function mapTokenResponse(data: ApiTokenResponse): UiAuthTokens {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    accessTokenExpiresAt: Date.now() + data.accessTokenExpiresIn * 1000,
    userUuid: data.userUuid,
  };
}

function mapReissueResponse(data: ApiTokenReissueResponse): UiAuthTokens {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    accessTokenExpiresAt: Date.now() + data.accessTokenExpiresIn * 1000,
    userUuid: "",
  };
}

export async function loginLocal(payload: ApiLocalLoginRequest): Promise<UiAuthTokens> {
  const data = await authApi.postLoginLocal(payload);
  return mapTokenResponse(data);
}

export async function loginSocial(provider: string, accessToken: string): Promise<UiAuthTokens> {
  const data = await authApi.postLoginSocial(provider, { accessToken });
  return mapTokenResponse(data);
}

export async function reissueToken(refreshToken: string): Promise<UiAuthTokens> {
  const data = await authApi.postReissue({ refreshToken });
  const mapped = mapReissueResponse(data);
  return mapped;
}

export async function logout(refreshToken: string): Promise<void> {
  await authApi.postLogout({ refreshToken });
}

export async function restoreAccount(payload: UiRestorePayload): Promise<UiAuthTokens> {
  if (payload.type === "local") {
    const data = await authApi.postRestoreAccount({
      email: payload.email,
      password: payload.password,
    });
    return mapTokenResponse(data);
  }

  const data = await authApi.postRestoreAccount({
    accessToken: payload.accessToken,
  });
  return mapTokenResponse(data);
}
