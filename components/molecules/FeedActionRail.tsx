import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flag, Heart, MessageCircle, Share2 } from "lucide-react";
import type { ReactNode } from "react";

type FeedActionRailProps = {
  authorName: string;
  avatarSrc?: string;
  likeLabel: string;
  commentLabel: string;
};

function RailButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="plip-tt-feed__action">
      <span className="plip-tt-feed__action-icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export function FeedActionRail({
  authorName,
  avatarSrc,
  likeLabel,
  commentLabel,
}: FeedActionRailProps) {
  return (
    <div className="plip-tt-feed__rail" aria-label="클립 액션">
      <div className="plip-tt-feed__avatar-wrap">
        <Avatar className="plip-tt-feed__avatar">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback className="bg-transparent text-xs font-bold text-white">
            {authorName.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <span className="plip-tt-feed__follow" aria-hidden>
          +
        </span>
      </div>
      <RailButton icon={<Heart className="size-6 fill-white" />} label={likeLabel} />
      <RailButton icon={<MessageCircle className="size-6 fill-white" />} label={commentLabel} />
      <RailButton icon={<Flag className="size-6" />} label="신고" />
      <RailButton icon={<Share2 className="size-6" />} label="공유" />
    </div>
  );
}
