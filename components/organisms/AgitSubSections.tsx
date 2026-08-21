import leftoverStyles from "@/components/styles/leftover.module.css";
import { TextLink } from "@/components/atoms";
import { RoomChatSection } from "@/components/organisms/RoomChatSection";
import { AGIT_MEMBERS, AGIT_TOPICS, getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

type AgitIdProps = { agitId: string };

export function AgitEnterSection({ agitId }: AgitIdProps) {
  const agit = getAgitById(agitId);
  return (
    <section className="flex flex-1 flex-col bg-[transparent] text-[var(--dc-fg-primary)] px-4 py-10 text-center">
      <div
        className="mx-auto mb-4 size-24 rounded-full"
        style={{ background: agit?.coverGradient ?? "#111" }}
        aria-hidden
      />
      <h1 className="text-xl font-semibold text-black">{agit?.name ?? "아지트"}</h1>
      <p className="mt-2 text-sm text-black/50">입장하면 토픽·채팅·클립을 볼 수 있어요.</p>
      <TextLink
        href={ROUTES.agit.detail(agitId)}
        className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline mt-6"
      >
        입장하기
      </TextLink>
    </section>
  );
}

export function AgitMembersSection({ agitId }: AgitIdProps) {
  return (
    <section className="flex flex-1 flex-col bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="멤버 리스트">
      <header className={`${leftoverStyles.plipTtFriendsHeader} flex items-center justify-between border-b border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.42))] px-4 py-[0.85rem] backdrop-blur-[20px]`}>
        <TextLink href={ROUTES.agit.detail(agitId)} className="text-sm text-black no-underline">
          뒤로
        </TextLink>
        <h1>멤버</h1>
        <span className="w-10" />
      </header>
      {AGIT_MEMBERS.map((member) => (
        <div key={member.id} className="flex items-center gap-[0.75rem] m-[0_1rem_0.5rem] p-[0.75rem_0.85rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] !no-underline text-[inherit] transition-[background_0.15s_ease] hover:bg-[rgba(0,_0,_0,_0.03)]">
          <span className="w-[3.35rem] h-[3.35rem] rounded-[999px] shrink-0 shadow-[0_0_0_1.5px_#fff,_0_0_0_2.5px_rgba(0,_0,_0,_0.06)] bg-zinc-200" aria-hidden />
          <span className="flex-1">
            <span className="block font-semibold text-black">{member.name}</span>
            <span className="block text-xs text-black/45">
              {member.role === "owner" ? "방장" : "멤버"}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}

export function AgitTopicsSection({ agitId }: AgitIdProps) {
  return (
    <section className="flex flex-1 flex-col bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="토픽 리스트">
      <header className={`${leftoverStyles.plipTtFriendsHeader} flex items-center justify-between border-b border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.42))] px-4 py-[0.85rem] backdrop-blur-[20px]`}>
        <TextLink href={ROUTES.agit.detail(agitId)} className="text-sm text-black no-underline">
          뒤로
        </TextLink>
        <h1>토픽</h1>
        <span className="w-10" />
      </header>
      {AGIT_TOPICS.map((topic) => (
        <div key={topic.id} className="flex items-center gap-[0.75rem] m-[0_1rem_0.5rem] p-[0.75rem_0.85rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] !no-underline text-[inherit] transition-[background_0.15s_ease] hover:bg-[rgba(0,_0,_0,_0.03)]">
          <span className="flex-1">
            <span className="block font-semibold text-black">{topic.title}</span>
            <span className="block text-xs text-black/45">
              클립 {topic.clipCount} · 1인 1영상
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}

export function AgitChatSection({ agitId }: AgitIdProps) {
  const agit = getAgitById(agitId);
  if (!agit) return null;
  return <RoomChatSection agit={agit} />;
}

export function AgitSearchSection() {
  return (
    <section className="flex flex-1 flex-col bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="아지트 검색">
      <header className={`${leftoverStyles.plipTtFriendsHeader} flex items-center justify-between border-b border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.42))] px-4 py-[0.85rem] backdrop-blur-[20px]`}>
        <TextLink href={ROUTES.agit.root} className="text-sm text-black no-underline">
          뒤로
        </TextLink>
        <h1>검색</h1>
        <span className="w-10" />
      </header>
      <div className="px-4 py-3">
        <input
          type="search"
          placeholder="공개 아지트 · 카테고리 검색"
          className="border border-[var(--dc-glass-border)] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] w-full px-4 py-3 text-sm text-black outline-none"
        />
      </div>
      <p className="px-4 text-xs text-black/45">공개방만 검색됩니다. 비공개는 초대 링크로 입장하세요.</p>
    </section>
  );
}
