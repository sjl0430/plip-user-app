import { IconButton } from "@/components/atoms";
import { DiaryThemeClipGroup } from "@/components/molecules";
import { DIARY_THEME_DATE_GROUPS } from "@/config/diary-mock";

type DiaryThemeDetailSectionProps = {
  themeId: string;
  themeName: string;
};

export function DiaryThemeDetailSection({
  themeId,
  themeName,
}: DiaryThemeDetailSectionProps) {
  const groups = DIARY_THEME_DATE_GROUPS[themeId] ?? [];

  return (
    <div className="flex flex-col gap-[1.15rem] p-[0.9rem_1rem_1.75rem]">
      <h2 className="m-0 text-center text-[1rem] font-extrabold text-[#111]">{themeName}</h2>

      {groups.length > 0 ? (
        groups.map((group) => (
          <DiaryThemeClipGroup
            key={group.date}
            themeName={themeName}
            date={group.date}
            clipCount={group.clipCount}
            showDateLink
          />
        ))
      ) : (
        <p className="m-[2rem_0_0] text-center text-[0.85rem] font-semibold text-[rgba(0,_0,_0,_0.4)]">해당 테마의 클립이 없습니다.</p>
      )}

      <div className="flex justify-center pt-[0.25rem]">
        <IconButton label="테마 옵션" className="!border-[var(--dc-glass-border)] !bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] !text-[var(--dc-fg-primary)]">
          <span aria-hidden>⋮</span>
        </IconButton>
      </div>
    </div>
  );
}
