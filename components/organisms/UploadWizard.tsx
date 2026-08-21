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
      <section className="relative min-h-dvh overflow-hidden bg-[#0e0f14]" aria-label="카메라">
        <Image src="/plip/v13/camera-view.png" alt="" fill className="object-cover" sizes="402px" priority />
        <div className="absolute inset-0 bg-[rgba(0,_0,_0,_0.12)] pointer-events-none" aria-hidden />
        <button type="button" className="absolute top-[12px] left-[15px] z-20 grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="닫기" onClick={() => router.back()}>
          <DailyIcon name="x" size={20} />
        </button>
        <p className="absolute top-[116px] left-[50%] z-20 m-0 [transform:translateX(-50%)] text-[34px] font-bold text-[#fff]">00:05</p>
        <div className="absolute top-[145px] left-[50%] z-20 w-[220px] h-[220px] [transform:translateX(-50%)] border border-[rgba(255,_255,_255,_0.72)] rounded-[999px] pointer-events-none" aria-hidden />
        <p className="absolute top-[600px] left-[50%] z-20 m-0 [transform:translateX(-50%)] text-xs whitespace-nowrap text-[#fff]">화면 중앙에 오늘의 장면을 맞춰주세요</p>
        <div className="absolute right-[23px] bottom-[36px] left-[23px] z-20 flex items-center justify-between">
          <button type="button" className="grid w-[44px] h-[44px] place-items-center border-0 rounded-[22px] bg-[rgba(0,_0,_0,_0.32)] text-[#fff]" aria-label="플래시">
            <DailyIcon name="alert" size={24} />
          </button>
          <button type="button" className="w-[84px] h-[84px] border-0 rounded-[999px] bg-[rgba(255,_255,_255,_0.28)]" aria-label="촬영" onClick={() => setStep(2)}>
            <span className="block w-[64px] h-[64px] m-[10px_auto] rounded-[999px] bg-[var(--dl-color-bg-brand)]" />
          </button>
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="카메라 전환">
            <DailyIcon name="camera" size={20} />
          </button>
        </div>
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="flex flex-col gap-3.5 px-[23px] pb-8 pt-3" aria-label="영상 확인">
        <header className="grid grid-cols-[44px_1fr_44px] items-start gap-[10px]">
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="뒤로" onClick={() => setStep(1)}>
            <DailyIcon name="chevronLeft" size={20} />
          </button>
          <div className="min-w-0 pt-[14px]">
            <h1 className="m-0 text-[24px] font-bold leading-[29px] text-[var(--dl-color-text-primary)]">영상 확인</h1>
          </div>
          <span className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] [visibility:hidden] pointer-events-none m-dlIconSqSpacer" aria-hidden />
        </header>

        <div className="relative h-[450px] overflow-hidden rounded-[22px]">
          <Image src="/plip/v13/runner-preview.png" alt="" fill className="object-cover" sizes="354px" />
          <span className="absolute right-[16px] bottom-[16px] text-[13px] font-semibold text-[#fff]">00:05</span>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-[14px]">
          <SubmitButton type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
            다시 촬영
          </SubmitButton>
          <SubmitButton type="button" variant="brand" className="flex-1" onClick={() => setStep(3)}>
            이 영상 사용
          </SubmitButton>
        </div>

        <h2 className="m-[8px_0_0] text-lg font-semibold text-[var(--dl-color-text-primary)]">캡션 · 아이템</h2>
        <AuthField
          id="caption"
          name="caption"
          label="캡션"
          defaultValue="새벽 러닝 완료! 오늘도 5분 가볍게."
        />
        <button type="button" className="flex flex-col gap-[6px] min-h-[62px] justify-center p-[16px_14px] border border-[var(--dl-color-text-brand)] rounded-[16px] bg-[var(--dl-color-bg-brand-subtle)] text-left">
          <p className="m-0 text-[15px] font-semibold text-[var(--dl-color-text-brand)]">아이템</p>
          <p className="m-0 text-[11px] text-[var(--dl-color-text-secondary)]">적용 안 함 · 탭하여 선택</p>
        </button>
        <SubmitButton variant="brand" onClick={() => setStep(3)}>
          업로드 설정
        </SubmitButton>
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="flex flex-col gap-[14px] px-[23px] pb-8 pt-3" aria-label="업로드 설정">
        <header className="grid grid-cols-[44px_1fr_44px] items-start gap-[10px]">
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="뒤로" onClick={() => setStep(2)}>
            <DailyIcon name="chevronLeft" size={20} />
          </button>
          <div className="min-w-0 pt-[14px]">
            <h1 className="m-0 text-[24px] font-bold leading-[29px] text-[var(--dl-color-text-primary)]">업로드 설정</h1>
          </div>
          <span className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] [visibility:hidden] pointer-events-none m-dlIconSqSpacer" aria-hidden />
        </header>

        <p className="m-0 text-[15px] font-semibold text-[#1f1c29]">기록 목적지</p>
        <div className="flex flex-wrap gap-2">
          <TopicChip selected={destination === "diary"} onClick={() => setDestination("diary")}>
            다이어리
          </TopicChip>
          <TopicChip selected={destination === "agit"} onClick={() => setDestination("agit")}>
            아지트
          </TopicChip>
        </div>

        <div className="flex flex-col gap-[6px] min-h-[84px] p-[14px_16px] rounded-[16px] bg-[var(--dl-color-bg-brand-subtle)]">
          <p className="m-0 text-[15px] font-semibold text-[var(--dl-color-text-primary)]">새벽 기상 인증</p>
          <p className="m-0 text-[11px] text-[var(--dl-color-text-secondary)]">아지트 · 방 프로필 안지민</p>
        </div>

        <p className="m-0 text-[15px] font-semibold text-[#1f1c29]">토픽 / 테마 선택</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <TopicChip key={item} selected>
              {item}
            </TopicChip>
          ))}
        </div>

        <div className="flex flex-col gap-[5px] min-h-[84px] p-[13px_14px] rounded-[14px] bg-[#ffe5e5] text-[#d84545]" role="alert">
          <p className="m-0 text-[13px] font-semibold">이 토픽에 이미 영상이 있어요</p>
          <p className="m-0 text-[11px]">기존 영상 보기 또는 다른 토픽으로 이동할 수 있어요.</p>
        </div>

        <AuthField id="tags" name="tags" label="태그" defaultValue="#러닝 #기상" />
        <p className="m-0 text-[12px] text-[var(--dl-color-text-secondary)]">최대 5개</p>

        <SubmitButton variant="brand" onClick={() => setStep(4)}>
          업로드 시작
        </SubmitButton>
        <p className="m-0 text-center text-[11px] text-[var(--dl-color-text-tertiary)]">내 영상은 업로드 후 언제든 다운로드할 수 있어요.</p>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-3.5 px-[23px] pb-8 pt-3" aria-label="업로드 완료">
      <header className="grid grid-cols-[44px_1fr_44px] items-start gap-[10px]">
        <TextLink href={ROUTES.diary.root} className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] no-underline" aria-label="뒤로">
          <DailyIcon name="chevronLeft" size={20} />
        </TextLink>
        <div className="min-w-0 pt-[14px]">
          <h1 className="m-0 text-[24px] font-bold leading-[29px] text-[var(--dl-color-text-primary)]">업로드 완료</h1>
        </div>
        <span className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] [visibility:hidden] pointer-events-none m-dlIconSqSpacer" aria-hidden />
      </header>
      <div className="flex w-full flex-col items-center justify-center gap-[10px] rounded-[20px] bg-[var(--dl-color-bg-success)] p-[20px]">
        <div className="grid w-[58px] h-[58px] place-items-center rounded-[29px] bg-[var(--dl-color-bg-elevated)]">
          <DailyIcon name="check" size={28} />
        </div>
        <p className="m-0 text-[18px] font-semibold leading-[26px] text-[var(--dl-color-text-primary)]">
          오늘의 영상이 등록됐어요
        </p>
        <p className="m-0 text-[12px] font-medium leading-[17px] text-[var(--dl-color-text-success)]">
          #7시_러닝_인증 · 8월 18일
        </p>
      </div>
      <TextLink href={ROUTES.agit.detail("azit-walk")} className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-brand)] !text-[var(--dl-color-text-inverse)] shadow-[none] [backdrop-filter:none] m-dlBtnPrimary no-underline">
        방에서 보기
      </TextLink>
      <button type="button" className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-brand-subtle)] !text-[var(--dl-color-text-brand)] shadow-[none] [backdrop-filter:none] m-dlBtnSecondary">
        <DailyIcon name="download" size={20} />
        내 영상 다운로드
      </button>
    </section>
  );
}
