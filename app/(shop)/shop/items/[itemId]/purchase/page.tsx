import { ShopPurchaseTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function ShopPurchasePage({ params }: PageProps) {
  const { itemId } = await params;
  return <ShopPurchaseTemplate itemId={itemId} />;
}
