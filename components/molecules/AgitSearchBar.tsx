import { Input, SubmitButton } from "@/components/atoms";
import type { FormEvent } from "react";

type AgitSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function AgitSearchBar({ value, onChange, onSearch }: AgitSearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-1 items-center gap-2"
    >
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="아지트 검색"
        aria-label="아지트 검색"
        className="min-w-0 flex-1"
      />
      <SubmitButton type="submit" className="w-auto shrink-0 px-3">
        검색
      </SubmitButton>
    </form>
  );
}
