"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { ChatBubble, ChatPollCard, DailyToggle, RoomNav } from "@/components/molecules";
import { AGIT_CHAT } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";
import type { UiAgit, UiChatMessage } from "@/types/agit/ui";
import { useState } from "react";

const POLL_OPTIONS = [
  { id: "run", label: "러닝", votes: 3 },
  { id: "grow", label: "성장", votes: 2 },
  { id: "routine", label: "루틴", votes: 1 },
];

type RoomChatSectionProps = {
  agit: UiAgit;
};

function roomInitials(name: string) {
  if (name.includes("러닝")) return "RL";
  return name.replace(/\s+/g, "").slice(0, 2);
}

export function RoomChatSection({ agit }: RoomChatSectionProps) {
  const [notify, setNotify] = useState(true);
  const [draft, setDraft] = useState("");
  const [selectedOption, setSelectedOption] = useState("run");
  const [messages, setMessages] = useState<UiChatMessage[]>(AGIT_CHAT);

  function sendMessage() {
    const body = draft.trim();
    if (!body) return;
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        senderName: "나",
        body,
        isMine: true,
        time: "방금",
      },
    ]);
    setDraft("");
  }

  return (
    <section className="dl-chat" aria-label="채팅">
      <header className="dl-chat-head">
        <span className="dl-chat-head__avatar">{roomInitials(agit.name)}</span>
        <div className="dl-chat-head__body">
          <h1 className="dl-chat-head__title">{agit.name}</h1>
          <p className="dl-chat-head__meta">채팅 · 알림 {notify ? "켜짐" : "꺼짐"}</p>
        </div>
        <DailyToggle checked={notify} label="채팅 알림" onChange={setNotify} />
      </header>

      <div className="dl-chat-notice">
        <p className="dl-chat-notice__text">영상과 채팅은 분리되어 있어요</p>
        <TextLink href={ROUTES.agit.detail(agit.id)} className="dl-chat-notice__link no-underline">
          영상 보기
          <DailyIcon name="chevronRightBrand" size={16} />
        </TextLink>
      </div>

      <div className="dl-chat-thread">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <ChatPollCard
          agitId={agit.id}
          question="오늘 러닝 영상 태그는?"
          meta="익명 투표 · 6명 참여 · 오늘 마감"
          options={POLL_OPTIONS}
          selectedId={selectedOption}
          onSelect={setSelectedOption}
        />
      </div>

      <form
        className="dl-composer"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <button type="button" className="dl-composer__icon" aria-label="첨부">
          <DailyIcon name="plus" size={18} />
        </button>
        <input
          className="dl-composer__input"
          value={draft}
          placeholder="메시지를 입력하세요"
          aria-label="메시지 입력"
          onChange={(event) => setDraft(event.target.value)}
        />
        <TextLink href={ROUTES.agit.poll(agit.id)} className="dl-composer__poll no-underline">
          투표
        </TextLink>
        <button type="submit" className="dl-composer__send" aria-label="전송">
          <DailyIcon name="arrowUp" size={18} />
        </button>
      </form>

      <RoomNav agitId={agit.id} active="chat" />
    </section>
  );
}
