import { TextLink } from "@/components/atoms";
import {
  POINT_LOGS,
  REFUND_REQUESTS,
  SHOP_ITEMS,
  getShopItemById,
} from "@/config/shop-mock";
import { ROUTES } from "@/config/routes";

export function ShopHomeSection() {
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="샵">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">샵</h1>
        <div className="flex gap-3 text-sm">
          <TextLink href={ROUTES.shop.wishlist} className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline">
            위시
          </TextLink>
          <TextLink href={ROUTES.shop.myItems} className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline">
            내 아이템
          </TextLink>
        </div>
      </div>
      <div className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)] justify-between">
        <div>
          <p className="text-sm font-medium">보유 포인트</p>
          <p className="text-xl font-semibold">99,999P</p>
        </div>
        <TextLink
          href={ROUTES.shop.charge}
          className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline"
        >
          충전
        </TextLink>
      </div>
      {SHOP_ITEMS.map((item) => (
        <TextLink key={item.id} href={ROUTES.shop.item(item.id)} className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)]">
          <div
            className="w-[3.5rem] h-[3.5rem] rounded-[0.85rem] shrink-0"
            style={{ background: item.coverGradient }}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-[var(--dc-fg-secondary)] text-xs">{item.price.toLocaleString()}P</p>
          </div>
        </TextLink>
      ))}
      <TextLink href={ROUTES.shop.points} className="text-center text-sm text-black/50 no-underline">
        포인트 로그
      </TextLink>
      <TextLink href={ROUTES.shop.refund} className="text-center text-sm text-black/50 no-underline">
        환불 신청
      </TextLink>
    </section>
  );
}

export function ShopItemSection({ itemId }: { itemId: string }) {
  const item = getShopItemById(itemId);
  if (!item) {
    return (
      <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]">
        <p className="text-[var(--dc-fg-secondary)]">상품을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.shop.root}>샵으로</TextLink>
      </section>
    );
  }
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="아이템 상세">
      <div
        className="h-48 rounded-2xl"
        style={{ background: item.coverGradient }}
        aria-hidden
      />
      <h1 className="text-xl font-semibold">{item.name}</h1>
      <p className="text-[var(--dc-accent)] text-lg font-semibold">
        {item.price.toLocaleString()}P
      </p>
      <p className="text-[var(--dc-fg-secondary)] text-sm">{item.description}</p>
      <TextLink
        href={ROUTES.shop.purchase(item.id)}
        className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline w-full min-h-[2.75rem] m-dcBtnBlock"
      >
        구매하기
      </TextLink>
    </section>
  );
}

export function ShopPurchaseSection({ itemId }: { itemId: string }) {
  const item = getShopItemById(itemId);
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)] items-center text-center" aria-label="구매 완료">
      <h1 className="text-xl font-semibold">구매 완료</h1>
      <p className="text-[var(--dc-fg-secondary)] mt-2 text-sm">
        {item?.name ?? "아이템"}을(를) 구매했습니다.
      </p>
      <TextLink
        href={ROUTES.shop.myItems}
        className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline mt-6"
      >
        내 아이템 보기
      </TextLink>
      <TextLink href={ROUTES.shop.root} className="text-[var(--dc-fg-secondary)] text-sm no-underline">
        샵으로
      </TextLink>
    </section>
  );
}

export function ShopChargeSection() {
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="포인트 충전">
      <h1 className="text-lg font-semibold">충전</h1>
      {[1000, 5000, 10000].map((amount) => (
        <button
          key={amount}
          type="button"
          className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)] w-full justify-between text-left"
        >
          <span className="font-medium">{amount.toLocaleString()}P</span>
          <span className="text-[var(--dc-accent)] text-sm">선택</span>
        </button>
      ))}
      <TextLink
        href={ROUTES.shop.root}
        className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline w-full min-h-[2.75rem] m-dcBtnBlock"
      >
        충전 완료 (mock)
      </TextLink>
    </section>
  );
}

export function ShopWishlistSection() {
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="위시리스트">
      <h1 className="text-lg font-semibold">위시리스트</h1>
      {SHOP_ITEMS.slice(0, 2).map((item) => (
        <TextLink key={item.id} href={ROUTES.shop.item(item.id)} className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)]">
          <div
            className="w-[3.5rem] h-[3.5rem] rounded-[0.85rem] shrink-0"
            style={{ background: item.coverGradient }}
            aria-hidden
          />
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-[var(--dc-fg-secondary)] text-xs">{item.price.toLocaleString()}P</p>
          </div>
        </TextLink>
      ))}
    </section>
  );
}

export function ShopMyItemsSection() {
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="내 아이템">
      <h1 className="text-lg font-semibold">내 아이템</h1>
      {SHOP_ITEMS.slice(0, 1).map((item) => (
        <div key={item.id} className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)]">
          <div
            className="w-[3.5rem] h-[3.5rem] rounded-[0.85rem] shrink-0"
            style={{ background: item.coverGradient }}
            aria-hidden
          />
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-[var(--dc-fg-secondary)] text-xs">보유 중</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export function ShopPointsSection() {
  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label="포인트 로그">
      <h1 className="text-lg font-semibold">포인트 로그</h1>
      {POINT_LOGS.map((log) => (
        <div key={log.id} className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)] justify-between">
          <div>
            <p className="font-medium">{log.label}</p>
            <p className="text-[var(--dc-fg-secondary)] text-xs">{log.createdAt}</p>
          </div>
          <span
            className="text-[var(--dc-accent)] font-semibold"
          >
            {log.amount >= 0 ? "+" : ""}
            {log.amount.toLocaleString()}P
          </span>
        </div>
      ))}
    </section>
  );
}

export function ShopRefundSection({ history = false }: { history?: boolean }) {
  const items = history
    ? REFUND_REQUESTS.filter((r) => r.status !== "available")
    : REFUND_REQUESTS.filter((r) => r.status === "available");

  return (
    <section className="flex flex-1 flex-col gap-[0.75rem] p-[1rem_1rem_1.25rem] bg-[transparent] text-[var(--dc-fg-primary)]" aria-label={history ? "환불 내역" : "환불 신청"}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{history ? "환불 내역" : "환불 신청"}</h1>
        <TextLink
          href={history ? ROUTES.shop.refund : ROUTES.shop.refundHistory}
          className="inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline"
        >
          {history ? "신청" : "내역"}
        </TextLink>
      </div>
      {items.map((req) => (
        <div key={req.id} className="flex gap-[0.85rem] items-center p-[0.85rem] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[var(--dc-glass-border)] shadow-[var(--dc-shadow)] backdrop-blur-[20px] no-underline text-[var(--dc-fg-primary)] justify-between">
          <div>
            <p className="font-medium">{req.itemName}</p>
            <p className="text-[var(--dc-fg-secondary)] text-xs">{req.status}</p>
          </div>
          <span className="font-semibold">{req.amount.toLocaleString()}P</span>
        </div>
      ))}
    </section>
  );
}
