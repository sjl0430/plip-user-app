"use client";

import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { DestinationToggle, type DestinationId } from "@/components/molecules/DestinationToggle";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { TopicChip } from "@/components/molecules/TopicChip";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useState } from "react";

const TOPICS = ["#7시_러닝_인증", "#아침_식단"] as const;

export function UploadWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [destination, setDestination] = useState<DestinationId>("azit");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("#7시_러닝_인증");

  if (step === 1) {
    return (
      <section className="dl-camera -mx-5 -mt-6" aria-label="카메라">
        <Image src="/plip/figma/camera.png" alt="" fill className="object-cover" sizes="402px" />
        <AuthTopBar title="" onBack={() => history.back()} />
        <div className="absolute inset-x-6 bottom-8 flex items-center justify-between">
          <button type="button" className="dl-icon-sq" aria-label="플래시">
            <DailyIcon name="alert" size={20} />
          </button>
          <button type="button" className="dl-camera__shutter" aria-label="촬영" onClick={() => setStep(2)}>
            <span className="dl-camera__shutter-inner" />
          </button>
          <button type="button" className="dl-icon-sq" aria-label="전환">
            <DailyIcon name="camera" size={20} />
          </button>
        </div>
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="flex w-full flex-col gap-3.5">
        <AuthTopBar title="영상 확인" onBack={() => setStep(1)} />
        <div className="relative h-[450px] overflow-hidden rounded-2xl">
          <Image src="/plip/daily-loop/recent-video-1.png" alt="" fill className="object-cover" sizes="354px" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SubmitButton type="button" variant="outline" onClick={() => setStep(1)}>
            다시 촬영
          </SubmitButton>
          <SubmitButton type="button" variant="brand" onClick={() => setStep(3)}>
            사용하기
          </SubmitButton>
        </div>
        <p className="m-0 text-[18px] font-semibold text-[var(--dl-color-text-primary)]">캡션 · 아이템</p>
        <AuthField id="caption" name="caption" label="캡션" placeholder="오늘도 5초, 어제보다 가볍게." />
        <button type="button" className="dl-item-selector text-left">
          <p className="dl-notice-card__title">아이템</p>
          <p className="dl-notice-card__body">적용 안 함 · 탭하여 선택</p>
        </button>
        <SubmitButton variant="brand" onClick={() => setStep(3)}>
          다음
        </SubmitButton>
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="flex w-full flex-col gap-3.5">
        <AuthTopBar title="업로드 설정" onBack={() => setStep(2)} />
        <p className="m-0 text-[14px] font-semibold text-[var(--dl-color-text-primary)]">기록 목적지</p>
        <DestinationToggle value={destination} onChange={setDestination} />
        <NoticeCard title="새벽 기상 인증" body="아지트 · 방 프로필 안지민" />
        <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">토픽 / 테마 선택</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <TopicChip key={item} selected={topic === item} onClick={() => setTopic(item)}>
              {item}
            </TopicChip>
          ))}
        </div>
        <NoticeCard
          title="이 토픽에 이미 영상이 있어요"
          body="기존 영상 보기 또는 다른 토픽으로 이동할 수 있어요."
        />
        <AuthField id="note" name="note" label="한 줄 기록" placeholder="오늘도 5초, 어제보다 가볍게." />
        <SubmitButton variant="brand" onClick={() => setStep(4)}>
          업로드
        </SubmitButton>
        <p className="text-center text-[11px] text-[var(--dl-color-text-tertiary)]">
          내 영상은 업로드 후 언제든 다운로드할 수 있어요.
        </p>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-3.5">
      <AuthTopBar title="업로드 완료" backHref={ROUTES.diary.root} />
      <div className="dl-success-hero">
        <div className="dl-success-hero__icon">
          <DailyIcon name="check" size={28} />
        </div>
        <p className="m-0 text-[18px] font-semibold leading-[26px] text-[var(--dl-color-text-primary)]">
          오늘의 영상이 등록됐어요
        </p>
        <p className="m-0 text-[12px] font-medium leading-[17px] text-[var(--dl-color-text-success)]">
          {topic} · 8월 14일
        </p>
      </div>
      <TextLink href={ROUTES.azit.detail("azit-walk")} className="dl-btn dl-btn--primary no-underline">
        방에서 보기
      </TextLink>
      <button type="button" className="dl-btn dl-btn--secondary">
        <DailyIcon name="download" size={20} />
        내 영상 다운로드
      </button>
    </section>
  );
}
