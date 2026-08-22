"use server";

import { signOut } from "@/auth";
import { ApiError } from "@/lib/api/apiFetch";
import * as authService from "@/services/authService";
import { getServerRefreshToken } from "@/lib/auth/server-token";
import { actionFailure, actionSuccess, type ActionResult } from "@/types/action-result";
import type { ApiLocalSignupRequest, ApiOtpPurpose } from "@/types/auth/api";
import type { UiRestorePayload, UiTerm } from "@/types/auth/ui";

function toActionError(error: unknown): ActionResult<never> {
  if (error instanceof ApiError) {
    return actionFailure(`[${error.status}] ${error.message}`);
  }
  if (error instanceof Error) {
    return actionFailure(error.message);
  }
  return actionFailure("Unknown error");
}

export async function logoutAction(): Promise<ActionResult<void>> {
  try {
    const refreshToken = await getServerRefreshToken();
    if (refreshToken) {
      await authService.logout(refreshToken);
    }
    await signOut({ redirect: false });
    return actionSuccess(undefined);
  } catch (error) {
    return toActionError(error);
  }
}

export async function requestEmailOtpAction(
  email: string,
  purpose: ApiOtpPurpose = "SIGNUP",
): Promise<ActionResult<void>> {
  try {
    await authService.requestEmailOtp(email, purpose);
    return actionSuccess(undefined);
  } catch (error) {
    return toActionError(error);
  }
}

export async function verifyEmailOtpAction(
  email: string,
  otpCode: string,
  purpose: ApiOtpPurpose = "SIGNUP",
): Promise<ActionResult<{ verificationToken: string }>> {
  try {
    const verificationToken = await authService.verifyEmailOtp(email, otpCode, purpose);
    return actionSuccess({ verificationToken });
  } catch (error) {
    return toActionError(error);
  }
}

export async function listActiveTermsAction(): Promise<ActionResult<UiTerm[]>> {
  try {
    const terms = await authService.listActiveTerms();
    return actionSuccess(terms);
  } catch (error) {
    return toActionError(error);
  }
}

export async function signupLocalAction(
  payload: ApiLocalSignupRequest,
): Promise<ActionResult<{ userUuid: string }>> {
  try {
    const tokens = await authService.signupLocal(payload);
    return actionSuccess({ userUuid: tokens.userUuid });
  } catch (error) {
    return toActionError(error);
  }
}

export async function restoreAccountAction(
  payload: UiRestorePayload,
): Promise<ActionResult<{ userUuid: string }>> {
  try {
    const tokens = await authService.restoreAccount(payload);
    return actionSuccess({ userUuid: tokens.userUuid });
  } catch (error) {
    return toActionError(error);
  }
}
