import { TextLink } from "@/components/atoms";
import { RoomInfoRow } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";

type JoinCompleteSectionProps = {
  azit: UiAzit;
  profileName?: string;
};

export function JoinCompleteSection({
  azit,
  profileName = "데일리러너",
}: JoinCompleteSectionProps) {
  const maxMembers = azit.maxMembers ?? azit.memberCount;

  return (
    <section className="flex w-full flex-col gap-3.5">
      <div className="dl-hero-icon dl-hero-icon--success">
        <img src="/plip/daily-loop/icon-check.svg" alt="" width={32} height={32} />
      </div>

      <h2 className="dl-title dl-title--complete">방 참여가 완료됐어요</h2>
      <p className="dl-subtitle leading-[22px]">
        이제 원하는 순간에 영상을 올리고
        <br />
        멤버들과 목적을 이어가세요.
      </p>

      <div className="dl-panel dl-panel--stack">
        <p className="m-0 text-[18px] font-semibold leading-[26px] text-[var(--dl-color-text-primary)]">
          {azit.name}
        </p>
        <RoomInfoRow
          icon="users"
          title={`${azit.memberCount} / ${maxMembers}명`}
          description={`프로필: ${profileName}`}
        />
      </div>

      <div className="dl-panel dl-panel--subtle">
        <p className="dl-notice-title">처음 할 일</p>
        <p className="dl-notice-body leading-[22px]">
          1. 오늘의 토픽 확인
          <br />
          2. 채팅 알림 설정
          <br />
          3. 자유롭게 첫 영상 등록
        </p>
      </div>

      <div className="dl-actions">
        <TextLink href={ROUTES.azit.detail(azit.id)} className="dl-btn dl-btn--primary no-underline">
          방으로 들어가기
        </TextLink>
        <TextLink href={ROUTES.azit.search} className="dl-btn dl-btn--secondary no-underline">
          공개 방 더 둘러보기
        </TextLink>
      </div>
    </section>
  );
}
