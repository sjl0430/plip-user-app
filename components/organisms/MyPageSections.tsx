import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export function MyPageProfileSection() {
  return (
    <section aria-label="설정 홈" className="plip-tt-profile">
      <header className="plip-tt-profile__header">
        <span className="plip-tt-profile__handle">설정</span>
        <TextLink href={ROUTES.mypage.settings} className="plip-tt-profile__icon-btn" aria-label="전체 설정">
          ≡
        </TextLink>
      </header>

      <div className="plip-tt-profile__hero">
        <div className="plip-tt-profile__photo-wrap">
          <div className="plip-tt-profile__photo" aria-hidden />
          <span className="plip-tt-profile__photo-add">+</span>
        </div>
        <p className="plip-tt-profile__id">@plip_user</p>
        <div className="plip-tt-profile__stats">
          <div>
            <strong>3</strong>
            <span>아지트</span>
          </div>
          <div>
            <strong>12</strong>
            <span>클립</span>
          </div>
          <div>
            <strong>99K</strong>
            <span>포인트</span>
          </div>
        </div>
        <div className="plip-tt-profile__actions">
          <TextLink href={ROUTES.mypage.profile} className="plip-tt-profile__edit">
            프로필 수정
          </TextLink>
        </div>
        <TextLink href={ROUTES.mypage.profile} className="plip-tt-profile__bio">
          소개 추가
        </TextLink>
      </div>

      <div className="plip-tt-profile__tabs" aria-label="내 콘텐츠">
        <button type="button" className="is-active" aria-label="내 클립">
          클립
        </button>
        <button type="button" aria-label="다이어리">
          다이어리
        </button>
        <button type="button" aria-label="저장">
          저장
        </button>
      </div>

      <div className="plip-tt-profile__empty">
        <p>최근 찍은 클립을 모아보세요.</p>
        <TextLink href={ROUTES.create} className="plip-tt-profile__upload">
          촬영하기
        </TextLink>
      </div>

      <div className="plip-tt-profile__links">
        <TextLink href={ROUTES.shop.root}>상점 · 포인트</TextLink>
        <TextLink href={ROUTES.shop.myItems}>내 아이템</TextLink>
        <TextLink href={ROUTES.mypage.notifications}>알림</TextLink>
        <TextLink href={ROUTES.mypage.settings}>설정 및 개인정보</TextLink>
      </div>
    </section>
  );
}

export function MyPagePointsSection() {
  return (
    <section className="plip-tt-settings" aria-label="포인트">
      <h1>포인트</h1>
      <TextLink href={ROUTES.shop.points} className="plip-tt-settings__row">
        <span>포인트 로그</span>
        <span aria-hidden>›</span>
      </TextLink>
      <TextLink href={ROUTES.shop.charge} className="plip-tt-settings__row">
        <span>충전</span>
        <span aria-hidden>›</span>
      </TextLink>
    </section>
  );
}

export function MyPageMenuSection() {
  return (
    <section className="plip-tt-settings" aria-label="메뉴">
      <h1>메뉴</h1>
      <TextLink href={ROUTES.mypage.settings} className="plip-tt-settings__row">
        <span>설정</span>
        <span aria-hidden>›</span>
      </TextLink>
      <TextLink href={ROUTES.shop.root} className="plip-tt-settings__row">
        <span>상점</span>
        <span aria-hidden>›</span>
      </TextLink>
    </section>
  );
}

export function MyPageWithdrawSection() {
  return (
    <section className="plip-tt-settings" aria-label="탈퇴">
      <h1>계정 탈퇴</h1>
      <p className="px-4 text-sm text-black/50">탈퇴 시 아지트·클립 데이터가 삭제될 수 있습니다.</p>
    </section>
  );
}

export function MyPageSettingsSection() {
  return (
    <section className="plip-tt-settings" aria-label="설정">
      <h1>설정 및 개인정보</h1>
      {[
        { href: ROUTES.mypage.notifications, label: "알림" },
        { href: ROUTES.mypage.password, label: "비밀번호" },
        { href: ROUTES.mypage.profile, label: "계정" },
        { href: ROUTES.shop.root, label: "상점 · 포인트" },
        { href: ROUTES.shop.refund, label: "환불" },
        { href: ROUTES.shop.points, label: "포인트 로그" },
      ].map((item) => (
        <TextLink key={item.href} href={item.href} className="plip-tt-settings__row">
          <span>{item.label}</span>
          <span aria-hidden>›</span>
        </TextLink>
      ))}
    </section>
  );
}
