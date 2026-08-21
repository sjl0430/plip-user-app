import { TopicPreviewTemplate } from "@/components/templates";
import { parseTopicPreviewCount } from "@/config/topic-mock";

type TopicPreviewPageProps = {
  searchParams: Promise<{ n?: string | string[] }>;
};

export default async function TopicPreviewPage({ searchParams }: TopicPreviewPageProps) {
  const params = await searchParams;
  return <TopicPreviewTemplate videoCount={parseTopicPreviewCount(params.n)} />;
}
