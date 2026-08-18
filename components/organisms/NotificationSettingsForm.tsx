"use client";

import { DailyToggle } from "@/components/molecules/DailyToggle";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { useState } from "react";

type ToggleKey = "all" | "chat" | "reaction" | "invite" | "roomRun" | "roomWalk";

const INITIAL: Record<ToggleKey, boolean> = {
  all: true,
  chat: true,
  reaction: false,
  invite: true,
  roomRun: true,
  roomWalk: false,
};

export function NotificationSettingsForm() {
  const [toggles, setToggles] = useState(INITIAL);

  function setToggle(key: ToggleKey, value: boolean) {
    setToggles((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="flex w-full flex-col gap-3.5">
      <SettingsRow
        icon="bell"
        title="전체 알림"
        description="모든 푸시 알림 허용"
        trailing={
          <DailyToggle
            checked={toggles.all}
            label="전체 알림"
            onChange={(value) => setToggle("all", value)}
          />
        }
      />

      <h2 className="dl-section-title">기능별 알림</h2>
      <SettingsRow
        icon="bell"
        title="채팅 알림"
        description="새 메시지와 답장"
        trailing={
          <DailyToggle
            checked={toggles.chat}
            label="채팅 알림"
            onChange={(value) => setToggle("chat", value)}
          />
        }
      />
      <SettingsRow
        icon="bell"
        title="영상 반응"
        description="내 영상의 이모지 반응"
        trailing={
          <DailyToggle
            checked={toggles.reaction}
            label="영상 반응"
            onChange={(value) => setToggle("reaction", value)}
          />
        }
      />
      <SettingsRow
        icon="bell"
        title="방 초대 및 관리"
        description="초대 링크·추방·방장 위임"
        trailing={
          <DailyToggle
            checked={toggles.invite}
            label="방 초대 및 관리"
            onChange={(value) => setToggle("invite", value)}
          />
        }
      />

      <h2 className="dl-section-title">방별 채팅 알림</h2>
      <SettingsRow
        icon="users"
        title="러닝 메이트의 30일"
        description={toggles.roomRun ? "채팅 알림 켜짐" : "채팅 알림 꺼짐"}
        trailing={
          <DailyToggle
            checked={toggles.roomRun}
            label="러닝 메이트의 30일 채팅 알림"
            onChange={(value) => setToggle("roomRun", value)}
          />
        }
      />
      <SettingsRow
        icon="users"
        title="주말 한강 산책 모임"
        description={toggles.roomWalk ? "채팅 알림 켜짐" : "채팅 알림 꺼짐"}
        trailing={
          <DailyToggle
            checked={toggles.roomWalk}
            label="주말 한강 산책 모임 채팅 알림"
            onChange={(value) => setToggle("roomWalk", value)}
          />
        }
      />
    </section>
  );
}
