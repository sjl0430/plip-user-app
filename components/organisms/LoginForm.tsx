"use client";

import {
  Checkbox,
  GlassInput,
  GradientButton,
  Label,
  TextLink,
} from "@/components/atoms";
import { SocialLoginSection } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="plip-content-column plip-form-stack"
      action={ROUTES.login}
      method="post"
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        <GlassInput
          id="login-email"
          name="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          required
        />

        <div className="relative">
          <GlassInput
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            autoComplete="current-password"
            required
            className="pr-12 sm:pr-14"
          />
          <button
            type="button"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-plip-text-secondary sm:right-4 sm:text-xs"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "숨김" : "표시"}
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5">
            <Checkbox
              id="remember-me"
              name="rememberMe"
              className="size-[15px] rounded border-[#969696]"
            />
            <Label
              htmlFor="remember-me"
              className="font-[family-name:var(--font-montserrat)] text-[11px] font-medium text-plip-text-secondary sm:text-xs"
            >
              Remember me
            </Label>
          </div>
          <TextLink
            href={ROUTES.forgotPassword}
            className="font-[family-name:var(--font-montserrat)] text-[11px] font-medium text-plip-text-secondary no-underline hover:underline sm:text-xs"
          >
            Forgot Password
          </TextLink>
        </div>
      </div>

      <GradientButton type="submit">Login</GradientButton>

      <SocialLoginSection />

      <p className="text-center font-[family-name:var(--font-montserrat)] text-[11px] text-white/70 sm:text-xs">
        계정이 없으신가요?{" "}
        <TextLink
          href={ROUTES.signup}
          className="font-semibold text-white no-underline hover:underline"
        >
          회원가입
        </TextLink>
      </p>
    </form>
  );
}
