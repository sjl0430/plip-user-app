"use client";
import leftoverStyles from "@/components/styles/leftover.module.css";

import { PlipLogo, TextLink } from "@/components/atoms";
import { AGIT_LIST, AGIT_TOPICS } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

type Destination = "agit" | "diary";

const CAPTURE_TOOLS = ["타이머", "필터", "배속", "뷰티"] as const;
const DURATIONS = ["3분", "60초", "15초", "지금"] as const;

export function CreateClipSection() {
  const [step, setStep] = useState<"capture" | "upload">("capture");
  const [destination, setDestination] = useState<Destination>("agit");
  const [selectedAgit, setSelectedAgit] = useState(AGIT_LIST[0]?.id ?? "");
  const [selectedTopic, setSelectedTopic] = useState(AGIT_TOPICS[0]?.id ?? "");

  const agit = AGIT_LIST.find((item) => item.id === selectedAgit);
  const uploadHref =
    destination === "diary"
      ? ROUTES.diary.root
      : selectedAgit
        ? ROUTES.agit.detail(selectedAgit)
        : ROUTES.agit.root;

  if (step === "upload") {
    return (
      <section className="flex flex-1 min-h-0 flex-col bg-[var(--dc-page-bg)] text-[var(--dc-fg-primary)]" aria-label="클립 업로드">
        <header className={`${leftoverStyles.plipCreateUploadHeader} grid grid-cols-[2.5rem_1fr_auto] items-center gap-2 border-b border-black/8 px-[0.85rem] py-3`}>
          <button
            type="button"
            className="text-[1.1rem] font-bold"
            onClick={() => setStep("capture")}
            aria-label="뒤로"
          >
            ←
          </button>
          <h1>편집</h1>
          <TextLink href={uploadHref} className="rounded-[var(--dc-btn-radius)] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_0.75rem] text-[0.8125rem] font-medium !text-[var(--dc-fg-primary)] !no-underline">
            업로드
          </TextLink>
        </header>

        <div className="flex justify-center p-[1rem_1rem_0.5rem]" aria-hidden>
          <div className="grid place-items-center w-[min(100%,_280px)] aspect-[9_/_14] rounded-[1rem] bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,_#1a2d6e_0%,_#0b1753_50%,_#04091d_100%)]">
            <PlipLogo width={140} height={76} className="plip-create-upload__preview-logo" />
          </div>
        </div>

        <div className="m-[0.75rem_1rem_1.25rem] rounded-[var(--dc-radius)] border border-[var(--dc-glass-border)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow-card)] backdrop-blur-[20px] p-[1rem]" role="dialog" aria-label="업로드 대상 선택">
          <div className="flex justify-center mb-[0.85rem]">
            <PlipLogo width={96} height={52} />
          </div>

          <div className="flex justify-center gap-[1.5rem] mb-[0.95rem]" role="radiogroup" aria-label="업로드 대상">
            <label className="inline-flex items-center gap-[0.4rem] text-[0.9rem] font-semibold">
              <input
                type="radio"
                name="destination"
                checked={destination === "agit"}
                onChange={() => setDestination("agit")}
              />
              <span>아지트 토픽</span>
            </label>
            <label className="inline-flex items-center gap-[0.4rem] text-[0.9rem] font-semibold">
              <input
                type="radio"
                name="destination"
                checked={destination === "diary"}
                onChange={() => setDestination("diary")}
              />
              <span>다이어리 테마</span>
            </label>
          </div>

          {destination === "agit" ? (
            <div className="flex flex-col gap-[0.65rem]">
              <label className={`${leftoverStyles.plipCreateUploadField} grid grid-cols-[3.5rem_1fr] items-center gap-2 text-[0.85rem] font-semibold`}>
                <span>아지트</span>
                <select
                  value={selectedAgit}
                  onChange={(event) => setSelectedAgit(event.target.value)}
                >
                  {AGIT_LIST.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`${leftoverStyles.plipCreateUploadField} grid grid-cols-[3.5rem_1fr] items-center gap-2 text-[0.85rem] font-semibold`}>
                <span>토픽 (1인 1영상)</span>
                <select
                  value={selectedTopic}
                  onChange={(event) => setSelectedTopic(event.target.value)}
                >
                  {AGIT_TOPICS.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="ml-[4rem] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] p-[0.5rem_0.65rem] text-left text-[0.85rem] font-semibold">
                토픽 추가
              </button>
            </div>
          ) : (
            <p className="mb-[0.75rem] text-[0.85rem] text-[rgba(0,_0,_0,_0.55)] text-center">
              오늘 다이어리 날짜 · 선택한 테마로 저장됩니다.
            </p>
          )}

          <TextLink href={uploadHref} className="block mt-[0.9rem] rounded-[0.55rem] bg-[linear-gradient(180deg,_#1e228a_0%,_#051219_100%)] p-[0.75rem_1rem] text-center text-[0.9rem] font-bold !text-[#fff] !no-underline">
            {destination === "agit"
              ? `${agit?.name ?? "아지트"}에 보내기`
              : "다이어리에 보내기"}
          </TextLink>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 min-h-0 flex-col" aria-label="클립 촬영">
      <div className="relative flex-1 min-h-dvh overflow-hidden bg-[radial-gradient(ellipse_70%_50%_at_50%_42%,_#1a2d6e_0%,_#0b1753_48%,_#04091d_100%)]">
        <header className="absolute top-[0.75rem] left-[0.75rem] right-[0.75rem] z-20 flex items-center justify-between">
          <TextLink href={ROUTES.diary.root} className="!text-[#fff] !no-underline text-[0.85rem] font-bold" aria-label="닫기">
            ✕
          </TextLink>
          <button type="button" className="!text-[#fff] !no-underline text-[0.85rem] font-bold">
            사운드
          </button>
          <button type="button" className="!text-[#fff] !no-underline text-[0.85rem] font-bold" aria-label="카메라 전환">
            전환
          </button>
        </header>

        <div className="absolute top-[42%] left-[50%] z-10 flex flex-col items-center gap-[0.65rem] [transform:translate(-50%,_-50%)] pointer-events-none [&_p]:text-[0.75rem] [&_p]:font-bold [&_p]:tracking-[0.14em] [&_p]:uppercase [&_p]:text-[rgba(255,_255,_255,_0.72)]">
          <PlipLogo width={168} height={91} className="[filter:drop-shadow(0_8px_24px_rgba(0,_0,_0,_0.35))]" />
          <p>촬영 · 업로드</p>
        </div>

        <aside className="absolute top-[4.5rem] right-[0.65rem] z-20 flex flex-col gap-[0.85rem] [&_button]:text-[#fff] [&_button]:text-[0.7rem] [&_button]:font-bold [&_button]:[text-shadow:0_1px_2px_rgba(0,_0,_0,_0.4)]" aria-label="촬영 도구">
          {CAPTURE_TOOLS.map((tool) => (
            <button key={tool} type="button">
              {tool}
            </button>
          ))}
        </aside>

        <footer className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-[0.85rem] px-3 pb-[calc(1.1rem+env(safe-area-inset-bottom))]">
          <div className={`${leftoverStyles.plipCreateCaptureDurations} flex justify-center gap-[0.85rem]`}>
            {DURATIONS.map((duration) => (
              <button
                key={duration}
                type="button"
                className={duration === "15초" ? "text-[#fff]" : undefined}
              >
                {duration}
              </button>
            ))}
          </div>

          <div className={`${leftoverStyles.plipCreateCaptureControls} grid grid-cols-[1fr_auto_1fr] items-center`}>
            <button type="button" className={`${leftoverStyles.plipCreateCaptureSide}`}>
              효과
            </button>
            <button
              type="button"
              className="w-[4.65rem] h-[4.65rem] rounded-[999px] border border-[#fff] bg-[radial-gradient(circle_at_40%_35%,_#fff_0%,_#5fc5ff_28%,_#5b3dff_78%,_#2a1466_100%)] shadow-[-4px_0_0_#5fc5ff,_4px_0_0_var(--dc-accent),_0_0_28px_rgba(91,_61,_255,_0.28)] [justify-self:center]"
              aria-label="촬영"
              onClick={() => setStep("upload")}
            />
            <button
              type="button"
              className={`${leftoverStyles.plipCreateCaptureSide}`}
              onClick={() => setStep("upload")}
            >
              앨범
            </button>
          </div>

          <div className="flex justify-center gap-[1.25rem] text-[rgba(255,_255,_255,_0.55)] text-[0.85rem] font-bold">
            <span className={`${leftoverStyles.isActive}`}>카메라</span>
            <span>템플릿</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
