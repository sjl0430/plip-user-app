import { ShopItemTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function ShopItemPage({ params }: PageProps) {
  const { itemId } = await params;
  return <ShopItemTemplate itemId={itemId} />;
}
