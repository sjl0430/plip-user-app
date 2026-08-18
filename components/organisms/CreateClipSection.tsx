"use client";

import { PlipLogo, TextLink } from "@/components/atoms";
import { AZIT_LIST, AZIT_TOPICS } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

type Destination = "azit" | "diary";

const CAPTURE_TOOLS = ["타이머", "필터", "배속", "뷰티"] as const;
const DURATIONS = ["3분", "60초", "15초", "지금"] as const;

export function CreateClipSection() {
  const [step, setStep] = useState<"capture" | "upload">("capture");
  const [destination, setDestination] = useState<Destination>("azit");
  const [selectedAzit, setSelectedAzit] = useState(AZIT_LIST[0]?.id ?? "");
  const [selectedTopic, setSelectedTopic] = useState(AZIT_TOPICS[0]?.id ?? "");

  const azit = AZIT_LIST.find((item) => item.id === selectedAzit);
  const uploadHref =
    destination === "diary"
      ? ROUTES.diary.root
      : selectedAzit
        ? ROUTES.azit.detail(selectedAzit)
        : ROUTES.azit.root;

  if (step === "upload") {
    return (
      <section className="plip-create-upload" aria-label="클립 업로드">
        <header className="plip-create-upload__header">
          <button
            type="button"
            className="plip-create-upload__back"
            onClick={() => setStep("capture")}
            aria-label="뒤로"
          >
            ←
          </button>
          <h1>편집</h1>
          <TextLink href={uploadHref} className="plip-create-upload__submit">
            업로드
          </TextLink>
        </header>

        <div className="plip-create-upload__preview" aria-hidden>
          <div className="plip-create-upload__preview-frame">
            <PlipLogo width={140} height={76} className="plip-create-upload__preview-logo" />
          </div>
        </div>

        <div className="plip-create-upload__modal" role="dialog" aria-label="업로드 대상 선택">
          <div className="plip-create-upload__brand">
            <PlipLogo width={96} height={52} />
          </div>

          <div className="plip-create-upload__dest" role="radiogroup" aria-label="업로드 대상">
            <label className="plip-create-upload__radio">
              <input
                type="radio"
                name="destination"
                checked={destination === "azit"}
                onChange={() => setDestination("azit")}
              />
              <span>아지트 토픽</span>
            </label>
            <label className="plip-create-upload__radio">
              <input
                type="radio"
                name="destination"
                checked={destination === "diary"}
                onChange={() => setDestination("diary")}
              />
              <span>다이어리 테마</span>
            </label>
          </div>

          {destination === "azit" ? (
            <div className="plip-create-upload__fields">
              <label className="plip-create-upload__field">
                <span>아지트</span>
                <select
                  value={selectedAzit}
                  onChange={(event) => setSelectedAzit(event.target.value)}
                >
                  {AZIT_LIST.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="plip-create-upload__field">
                <span>토픽 (1인 1영상)</span>
                <select
                  value={selectedTopic}
                  onChange={(event) => setSelectedTopic(event.target.value)}
                >
                  {AZIT_TOPICS.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="plip-create-upload__add-topic">
                토픽 추가
              </button>
            </div>
          ) : (
            <p className="plip-create-upload__diary-hint">
              오늘 다이어리 날짜 · 선택한 테마로 저장됩니다.
            </p>
          )}

          <TextLink href={uploadHref} className="plip-create-upload__send">
            {destination === "azit"
              ? `${azit?.name ?? "아지트"}에 보내기`
              : "다이어리에 보내기"}
          </TextLink>
        </div>
      </section>
    );
  }

  return (
    <section className="plip-create-capture" aria-label="클립 촬영">
      <div className="plip-create-capture__stage">
        <header className="plip-create-capture__top">
          <TextLink href={ROUTES.diary.root} className="plip-create-capture__close" aria-label="닫기">
            ✕
          </TextLink>
          <button type="button" className="plip-create-capture__sound">
            사운드
          </button>
          <button type="button" className="plip-create-capture__flip" aria-label="카메라 전환">
            전환
          </button>
        </header>

        <div className="plip-create-capture__brand">
          <PlipLogo width={168} height={91} className="plip-create-capture__logo" />
          <p>촬영 · 업로드</p>
        </div>

        <aside className="plip-create-capture__tools" aria-label="촬영 도구">
          {CAPTURE_TOOLS.map((tool) => (
            <button key={tool} type="button">
              {tool}
            </button>
          ))}
        </aside>

        <footer className="plip-create-capture__bottom">
          <div className="plip-create-capture__durations">
            {DURATIONS.map((duration) => (
              <button
                key={duration}
                type="button"
                className={duration === "15초" ? "is-active" : undefined}
              >
                {duration}
              </button>
            ))}
          </div>

          <div className="plip-create-capture__controls">
            <button type="button" className="plip-create-capture__side">
              효과
            </button>
            <button
              type="button"
              className="plip-create-capture__shutter"
              aria-label="촬영"
              onClick={() => setStep("upload")}
            />
            <button
              type="button"
              className="plip-create-capture__side"
              onClick={() => setStep("upload")}
            >
              앨범
            </button>
          </div>

          <div className="plip-create-capture__modes">
            <span className="is-active">카메라</span>
            <span>템플릿</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
