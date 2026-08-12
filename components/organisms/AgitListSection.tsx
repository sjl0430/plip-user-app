"use client";

import { SubmitButton } from "@/components/atoms";
import { AgitListItem } from "@/components/molecules/AgitListItem";
import { AgitSearchBar } from "@/components/molecules/AgitSearchBar";
import { AGIT_LIST_ITEMS } from "@/config/agit-mock";
import { useMemo, useState } from "react";

export function AgitListSection() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = appliedQuery.trim().toLowerCase();
    if (!keyword) {
      return AGIT_LIST_ITEMS;
    }
    return AGIT_LIST_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(keyword),
    );
  }, [appliedQuery]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <AgitSearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => setAppliedQuery(query)}
        />
        <SubmitButton type="button" className="w-full shrink-0 px-3 sm:w-auto">
          + 아지트 생성
        </SubmitButton>
      </div>

      <ul className="flex flex-col gap-2">
        {filteredItems.map((item) => (
          <li key={item.id}>
            <AgitListItem item={item} />
          </li>
        ))}
      </ul>

      {filteredItems.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          검색 결과가 없습니다.
        </p>
      ) : null}
    </div>
  );
}
