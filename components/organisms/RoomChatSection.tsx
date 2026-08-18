"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { ChatMoreSheet } from "@/components/organisms/ChatMoreSheet";
import { NotificationIconToggle } from "@/components/molecules/NotificationIconToggle";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";
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
  azit: UiAzit;
};

export function RoomChatSection({ azit }: RoomChatSectionProps) {
  const [notify, setNotify] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <section className="dl-azit-chat" aria-label="아지트 채팅">
      <header className="dl-azit-chat-head">
        <TextLink href={ROUTES.azit.detail(azit.id)} className="dl-icon-sq no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="dl-azit-chat-head__main">
          <h1 className="dl-azit-chat-head__title">{azit.name}</h1>
          <p className="dl-azit-chat-head__meta">채팅 · 알림 {notify ? "켜짐" : "꺼짐"}</p>
        </div>
        <NotificationIconToggle
          checked={notify}
          label="채팅 알림"
          onChange={setNotify}
        />
        <button
          type="button"
          className="dl-icon-sq"
          aria-label="더보기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <DailyIcon name="ellipsis" size={20} />
        </button>
      </header>

      <p className="dl-azit-chat__day">오늘</p>

      <div className="dl-azit-chat-thread">
        {MOCK_MESSAGES.map((message) =>
          message.direction === "incoming" ? (
            <article key={message.id} className="dl-chat-msg dl-chat-msg--incoming">
              <span className="dl-chat-msg__avatar" aria-hidden />
              <div className="dl-chat-msg__stack">
                <p className="dl-chat-msg__sender">{message.sender}</p>
                <p className="dl-chat-msg__bubble">{message.body}</p>
                <p className="dl-chat-msg__time">{message.time}</p>
              </div>
            </article>
          ) : (
            <article key={message.id} className="dl-chat-msg dl-chat-msg--outgoing">
              <div className="dl-chat-msg__stack">
                <p className="dl-chat-msg__bubble">{message.body}</p>
                <p className="dl-chat-msg__time">{message.time}</p>
              </div>
            </article>
          ),
        )}
      </div>

      <form
        className="dl-azit-chat-composer"
        onSubmit={(event) => {
          event.preventDefault();
          setDraft("");
        }}
      >
        <input
          className="dl-azit-chat-composer__input"
          value={draft}
          placeholder="메시지를 입력하세요"
          aria-label="메시지 입력"
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="dl-icon-sq" aria-label="전송">
          <DailyIcon name="upload" size={20} />
        </button>
      </form>

      <ChatMoreSheet
        azitId={azit.id}
        open={menuOpen}
        notify={notify}
        onClose={() => setMenuOpen(false)}
        onToggleNotify={() => setNotify((current) => !current)}
      />
    </section>
  );
}
