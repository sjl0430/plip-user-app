import {
  ShopChargeSection,
  ShopHomeSection,
  ShopItemSection,
  ShopMyItemsSection,
  ShopPointsSection,
  ShopPurchaseSection,
  ShopRefundSection,
  ShopWishlistSection,
} from "@/components/organisms/ShopSections";
import { AppChromeTemplate } from "@/components/templates/AppChromeTemplate";
import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { ReactNode } from "react";

function ShopChrome({
  children,
  showNav = true,
}: {
  children: ReactNode;
  showNav?: boolean;
}) {
  return (
    <AppChromeTemplate activeTab="mypage" variant="light" showNav={showNav}>
      <div className="border-b border-black/10 px-4 py-2">
        <TextLink href={ROUTES.mypage.root} className="text-xs text-black/50 no-underline">
          Profile
        </TextLink>
      </div>
      {children}
    </AppChromeTemplate>
  );
}

export function ShopHomeTemplate() {
  return (
    <ShopChrome>
      <ShopHomeSection />
    </ShopChrome>
  );
}

export function ShopItemTemplate({ itemId }: { itemId: string }) {
  return (
    <ShopChrome showNav={false}>
      <ShopItemSection itemId={itemId} />
    </ShopChrome>
  );
}

export function ShopPurchaseTemplate({ itemId }: { itemId: string }) {
  return (
    <ShopChrome showNav={false}>
      <ShopPurchaseSection itemId={itemId} />
    </ShopChrome>
  );
}

export function ShopChargeTemplate() {
  return (
    <ShopChrome showNav={false}>
      <ShopChargeSection />
    </ShopChrome>
  );
}

export function ShopWishlistTemplate() {
  return (
    <ShopChrome>
      <ShopWishlistSection />
    </ShopChrome>
  );
}

export function ShopMyItemsTemplate() {
  return (
    <ShopChrome>
      <ShopMyItemsSection />
    </ShopChrome>
  );
}

export function ShopPointsTemplate() {
  return (
    <ShopChrome>
      <ShopPointsSection />
    </ShopChrome>
  );
}

export function ShopRefundTemplate() {
  return (
    <ShopChrome>
      <ShopRefundSection />
    </ShopChrome>
  );
}

export function ShopRefundHistoryTemplate() {
  return (
    <ShopChrome>
      <ShopRefundSection history />
    </ShopChrome>
  );
}
