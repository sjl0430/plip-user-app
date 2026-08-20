"use client";

import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { TopicChip } from "@/components/molecules/TopicChip";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TOPICS = ["#7시_러닝_인증", "#아침_식단"] as const;
type DestinationId = "agit" | "diary";

export function UploadWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [destination, setDestination] = useState<DestinationId>("agit");

  if (step === 1) {
    return (
      <section className="dl-camera-full" aria-label="카메라">
        <Image src="/plip/v13/camera-view.png" alt="" fill className="object-cover" sizes="402px" priority />
        <div className="dl-camera-full__overlay" aria-hidden />
        <button type="button" className="dl-camera-full__close dl-icon-sq" aria-label="닫기" onClick={() => router.back()}>
          <DailyIcon name="x" size={20} />
        </button>
        <p className="dl-camera-full__timer">00:05</p>
        <div className="dl-camera-full__guide" aria-hidden />
        <p className="dl-camera-full__hint">화면 중앙에 오늘의 장면을 맞춰주세요</p>
        <div className="dl-camera-full__controls">
          <button type="button" className="dl-camera-full__flash" aria-label="플래시">
            <DailyIcon name="alert" size={24} />
          </button>
          <button type="button" className="dl-camera-full__shutter" aria-label="촬영" onClick={() => setStep(2)}>
            <span className="dl-camera-full__shutter-inner" />
          </button>
          <button type="button" className="dl-icon-sq" aria-label="카메라 전환">
            <DailyIcon name="camera" size={20} />
          </button>
        </div>
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="dl-upload-preview px-[23px] pb-8 pt-3" aria-label="영상 확인">
        <header className="dl-topic-viewer-head">
          <button type="button" className="dl-icon-sq" aria-label="뒤로" onClick={() => setStep(1)}>
            <DailyIcon name="chevronLeft" size={20} />
          </button>
          <div className="dl-topic-viewer-head__main">
            <h1 className="dl-upload-preview__title">영상 확인</h1>
          </div>
          <span className="dl-icon-sq dl-icon-sq--spacer" aria-hidden />
        </header>

        <div className="dl-upload-preview__media">
          <Image src="/plip/v13/runner-preview.png" alt="" fill className="object-cover" sizes="354px" />
          <span className="dl-upload-preview__duration">00:05</span>
        </div>

        <div className="dl-upload-preview__actions">
          <SubmitButton type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
            다시 촬영
          </SubmitButton>
          <SubmitButton type="button" variant="brand" className="flex-1" onClick={() => setStep(3)}>
            이 영상 사용
          </SubmitButton>
        </div>

        <h2 className="dl-upload-preview__section">캡션 · 아이템</h2>
        <AuthField
          id="caption"
          name="caption"
          label="캡션"
          defaultValue="새벽 러닝 완료! 오늘도 5분 가볍게."
        />
        <button type="button" className="dl-item-selector text-left">
          <p className="dl-item-selector__title">아이템</p>
          <p className="dl-item-selector__body">적용 안 함 · 탭하여 선택</p>
        </button>
        <SubmitButton variant="brand" onClick={() => setStep(3)}>
          업로드 설정
        </SubmitButton>
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="dl-upload-setup px-[23px] pb-8 pt-3" aria-label="업로드 설정">
        <header className="dl-topic-viewer-head">
          <button type="button" className="dl-icon-sq" aria-label="뒤로" onClick={() => setStep(2)}>
            <DailyIcon name="chevronLeft" size={20} />
          </button>
          <div className="dl-topic-viewer-head__main">
            <h1 className="dl-upload-preview__title">업로드 설정</h1>
          </div>
          <span className="dl-icon-sq dl-icon-sq--spacer" aria-hidden />
        </header>

        <p className="dl-upload-setup__label">기록 목적지</p>
        <div className="flex flex-wrap gap-2">
          <TopicChip selected={destination === "diary"} onClick={() => setDestination("diary")}>
            다이어리
          </TopicChip>
          <TopicChip selected={destination === "agit"} onClick={() => setDestination("agit")}>
            아지트
          </TopicChip>
        </div>

        <div className="dl-upload-setup__card">
          <p className="dl-upload-setup__card-title">새벽 기상 인증</p>
          <p className="dl-upload-setup__card-body">아지트 · 방 프로필 안지민</p>
        </div>

        <p className="dl-upload-setup__label">토픽 / 테마 선택</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <TopicChip key={item} selected>
              {item}
            </TopicChip>
          ))}
        </div>

        <div className="dl-upload-setup__warn" role="alert">
          <p className="dl-upload-setup__warn-title">이 토픽에 이미 영상이 있어요</p>
          <p className="dl-upload-setup__warn-body">기존 영상 보기 또는 다른 토픽으로 이동할 수 있어요.</p>
        </div>

        <AuthField id="tags" name="tags" label="태그" defaultValue="#러닝 #기상" />
        <p className="m-0 text-[12px] text-[var(--dl-color-text-secondary)]">최대 5개</p>

        <SubmitButton variant="brand" onClick={() => setStep(4)}>
          업로드 시작
        </SubmitButton>
        <p className="dl-upload-setup__footnote">내 영상은 업로드 후 언제든 다운로드할 수 있어요.</p>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-3.5 px-[23px] pb-8 pt-3" aria-label="업로드 완료">
      <header className="dl-topic-viewer-head">
        <TextLink href={ROUTES.diary.root} className="dl-icon-sq no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="dl-topic-viewer-head__main">
          <h1 className="dl-upload-preview__title">업로드 완료</h1>
        </div>
        <span className="dl-icon-sq dl-icon-sq--spacer" aria-hidden />
      </header>
      <div className="dl-success-hero">
        <div className="dl-success-hero__icon">
          <DailyIcon name="check" size={28} />
        </div>
        <p className="m-0 text-[18px] font-semibold leading-[26px] text-[var(--dl-color-text-primary)]">
          오늘의 영상이 등록됐어요
        </p>
        <p className="m-0 text-[12px] font-medium leading-[17px] text-[var(--dl-color-text-success)]">
          #7시_러닝_인증 · 8월 18일
        </p>
      </div>
      <TextLink href={ROUTES.agit.detail("azit-walk")} className="dl-btn dl-btn--primary no-underline">
        방에서 보기
      </TextLink>
      <button type="button" className="dl-btn dl-btn--secondary">
        <DailyIcon name="download" size={20} />
        내 영상 다운로드
      </button>
    </section>
  );
}
