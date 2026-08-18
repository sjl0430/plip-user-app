import type { UiPointLog, UiRefundRequest, UiShopItem } from "@/types/shop/ui";

export const SHOP_ITEMS: UiShopItem[] = [
  {
    id: "item-frame",
    name: "오로라 프레임",
    price: 1200,
    description: "클립 테두리에 은은한 블루 글로우를 더합니다.",
    coverGradient: "linear-gradient(145deg, #6cc7f5, #1e228a)",
  },
  {
    id: "item-sticker",
    name: "플립 스티커 팩",
    price: 800,
    description: "다이어리·피드에 붙일 수 있는 스티커 세트.",
    coverGradient: "linear-gradient(145deg, #f5a96c, #8a1e4a)",
  },
  {
    id: "item-theme",
    name: "미드나잇 테마",
    price: 1500,
    description: "앱 크롬을 더 어두운 톤으로 꾸며줍니다.",
    coverGradient: "linear-gradient(145deg, #1a1a2e, #0b1753)",
  },
];

export const POINT_LOGS: UiPointLog[] = [
  { id: "p1", label: "충전", amount: 5000, createdAt: "2026-08-12" },
  { id: "p2", label: "오로라 프레임 구매", amount: -1200, createdAt: "2026-08-11" },
  { id: "p3", label: "출석 보너스", amount: 100, createdAt: "2026-08-10" },
];

export const REFUND_REQUESTS: UiRefundRequest[] = [
  { id: "r1", itemName: "플립 스티커 팩", amount: 800, status: "available" },
  { id: "r2", itemName: "미드나잇 테마", amount: 1500, status: "pending" },
  { id: "r3", itemName: "오로라 프레임", amount: 1200, status: "done" },
];

export function getShopItemById(itemId: string): UiShopItem | undefined {
  return SHOP_ITEMS.find((item) => item.id === itemId);
}
