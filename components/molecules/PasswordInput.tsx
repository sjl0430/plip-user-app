"use client";

import { Input } from "@/components/atoms";
import { useState } from "react";

type PasswordInputProps = {
  id: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

export function PasswordInput({
  id,
  name,
  placeholder,
  autoComplete,
  required,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="pr-10"
      />
      <button
        type="button"
        aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "숨김" : "표시"}
      </button>
    </div>
  );
}
