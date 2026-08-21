import type { ApiAgitDetailMember } from "@/types/agit/api";
import type { ApiTopic, ApiTopicVideo } from "@/types/topic/api";
import type { UiTopicGallery, UiTopicVideo } from "@/types/topic/ui";
import * as topicApi from "@/lib/api/topicApi";
import { isSameKstDate, selectAgitTopic } from "@/lib/topic/selectAgitTopic";
import * as videoService from "@/services/videoService";

const FALLBACK_THUMBNAIL = "/plip/v13/topic-video-1.png";
const FALLBACK_AVATAR = "/plip/v13/profile-avatar.svg";
const FALLBACK_NICKNAME = "멤버";

type MemberProfile = {
  nickname: string;
  profileImageSrc: string;
};

function memberMap(members: ApiAgitDetailMember[]): Map<string, MemberProfile> {
  const map = new Map<string, MemberProfile>();
  for (const member of members) {
    map.set(member.userUuid, {
      nickname: member.nickname.trim() || FALLBACK_NICKNAME,
      profileImageSrc: member.profileImagePath?.trim() || FALLBACK_AVATAR,
    });
  }
  return map;
}

function profileOf(userUuid: string, members: Map<string, MemberProfile>): MemberProfile {
  return (
    members.get(userUuid) ?? {
      nickname: FALLBACK_NICKNAME,
      profileImageSrc: FALLBACK_AVATAR,
    }
  );
}

async function mapTopicVideo(
  item: ApiTopicVideo,
  members: Map<string, MemberProfile>,
): Promise<UiTopicVideo> {
  const attached = profileOf(item.userUuid, members);
  try {
    const detail = await videoService.getVideoDetail(item.videoUuid);
    const profile = profileOf(detail.userUuid || item.userUuid, members);
    return {
      id: item.videoUuid,
      thumbnailSrc: detail.thumbnailUrl?.trim() || FALLBACK_THUMBNAIL,
      profileImageSrc: profile.profileImageSrc,
      profileNickname: profile.nickname,
      uploadedAt: detail.createdAt.toISOString(),
      caption: detail.caption?.trim() ?? "",
    };
  } catch {
    return {
      id: item.videoUuid,
      thumbnailSrc: FALLBACK_THUMBNAIL,
      profileImageSrc: attached.profileImageSrc,
      profileNickname: attached.nickname,
      uploadedAt: item.createdAt,
      caption: "",
    };
  }
}

function mapSummary(topic: ApiTopic): UiTopicGallery["topic"] {
  return {
    id: topic.topicUuid,
    title: topic.title?.trim() ?? "",
    startAt: topic.startAt,
    isToday: isSameKstDate(topic.startAt),
  };
}

export async function getTopicGallery(
  agitUuid: string,
  members: ApiAgitDetailMember[],
): Promise<UiTopicGallery> {
  const topics = await topicApi.listTopics(agitUuid);
  const selected = selectAgitTopic(topics);
  if (!selected) {
    return { topic: null, videos: [] };
  }

  const topicVideos = await topicApi.listTopicVideos(selected.topicUuid);
  const profiles = memberMap(members);
  const videos = await Promise.all(topicVideos.map((item) => mapTopicVideo(item, profiles)));
  return { topic: mapSummary(selected), videos };
}
