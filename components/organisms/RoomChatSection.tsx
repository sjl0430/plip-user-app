"use client";

import { DailyIcon } from "@/components/atoms";
import { HeaderBackLink, HeaderMenuButton, ScreenHeader } from "@/components/molecules";
import { ChatMoreSheet } from "@/components/organisms/ChatMoreSheet";
import { NotificationIconToggle } from "@/components/molecules/NotificationIconToggle";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import { useState } from "react";

type ChatLine = {
  id: string;
  direction: "incoming" | "outgoing";
  sender: string;
  body: string;
  time: string;
};

const MOCK_MESSAGES: ChatLine[] = [
  { id: "m1", direction: "incoming", sender: "지민", body: "내일 토픽은 러닝 인증으로 할까요?", time: "오후 9:14" },
  { id: "m2", direction: "outgoing", sender: "나", body: "좋아요. 러닝 토픽으로 이어갈게요!", time: "오후 9:15" },
  { id: "m3", direction: "incoming", sender: "민지", body: "오늘 토픽은 러닝으로 이어갈까요?", time: "07:18" },
  { id: "m4", direction: "outgoing", sender: "나", body: "좋아요. 촬영 후 바로 올릴게요!", time: "07:19" },
];

type RoomChatSectionProps = {
  agit: UiAgit;
};

export function RoomChatSection({ agit }: RoomChatSectionProps) {
  const [notify, setNotify] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <section className="flex min-h-[calc(100dvh_-_80px)] flex-col p-[12px_23px_16px]" aria-label="아지트 채팅">
      <ScreenHeader
        tone="plain"
        leading={<HeaderBackLink href={ROUTES.agit.detail(agit.id)} />}
        title={agit.name}
        subtitle={`채팅 · 알림 ${notify ? "켜짐" : "꺼짐"}`}
        trailing={
          <>
            <NotificationIconToggle checked={notify} label="채팅 알림" onChange={setNotify} />
            <HeaderMenuButton label="더보기" expanded={menuOpen} onClick={() => setMenuOpen(true)} />
          </>
        }
      />

      <p className="m-[16px_0_8px] text-center text-xs font-medium text-[#7a758f]">오늘</p>

      <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto">
        {MOCK_MESSAGES.map((message) =>
          message.direction === "incoming" ? (
            <article key={message.id} className="flex gap-2">
              <span className="size-9 shrink-0 rounded-full bg-[linear-gradient(135deg,#6b4af5_0%,#fc8c6e_100%)]" aria-hidden />
              <div className="flex max-w-[276px] flex-col gap-1">
                <p className="m-0 text-xs font-medium text-[var(--dl-color-text-secondary)]">{message.sender}</p>
                <p className="m-0 rounded-2xl bg-[var(--dl-color-bg-surface)] px-3 py-2.5 text-sm leading-5 text-[var(--dl-color-text-primary)]">{message.body}</p>
                <p className="m-0 text-[11px] text-[var(--dl-color-text-tertiary)]">{message.time}</p>
              </div>
            </article>
          ) : (
            <article key={message.id} className="flex justify-end gap-2">
              <div className="flex max-w-[276px] flex-col items-end gap-1">
                <p className="m-0 rounded-2xl bg-[var(--dl-color-bg-brand)] px-3 py-2.5 text-sm leading-5 text-[var(--dl-color-text-inverse)]">{message.body}</p>
                <p className="m-0 text-[11px] text-[var(--dl-color-text-tertiary)]">{message.time}</p>
              </div>
            </article>
          ),
        )}
      </div>

      <form
        className="flex items-center gap-[8px] min-h-[60px] mt-[12px] p-[8px_8px_8px_14px] rounded-[18px] bg-[var(--dl-color-bg-brand-subtle)]"
        onSubmit={(event) => {
          event.preventDefault();
          setDraft("");
        }}
      >
        <input
          className="flex-1 border-0 bg-[transparent] text-[13px] text-[var(--dl-color-text-primary)] [outline:none] placeholder:text-[var(--dl-color-text-tertiary)]"
          value={draft}
          placeholder="메시지를 입력하세요"
          aria-label="메시지 입력"
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="전송">
          <DailyIcon name="upload" size={20} />
        </button>
      </form>

      <ChatMoreSheet
        agitId={agit.id}
        open={menuOpen}
        notify={notify}
        myRole={agit.myRole}
        onClose={() => setMenuOpen(false)}
        onToggleNotify={() => setNotify((current) => !current)}
      />
    </section>
  );
}

