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
    <div className="flex flex-col items-center gap-[0.15rem] text-[0.68rem] font-bold text-[#fff]">
      <span className="grid place-items-center w-[2.55rem] h-[2.55rem] rounded-[999px] border border-[var(--dc-glass-dark-border)] bg-[linear-gradient(180deg,_var(--dc-glass-dark-from),_var(--dc-glass-dark-to))] backdrop-blur-[16px]">{icon}</span>
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
    <div className="flex flex-col items-center gap-[0.85rem] pb-[0.2rem]" aria-label="클립 액션">
      <div className="relative mb-[0.2rem]">
        <Avatar className="w-[3rem] h-[3rem] rounded-[999px] border border-[#fff] shadow-[0_0_0_2px_rgba(0,_0,_0,_0.2),_0_0_0_3px_color-mix(in_srgb,_#5fc5ff_70%,_var(--dc-accent))]">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback className="bg-transparent text-xs font-bold text-white">
            {authorName.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <span className="absolute left-[50%] bottom-[-0.35rem] grid place-items-center w-[1.15rem] h-[1.15rem] rounded-[999px] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] border border-[#fff] text-[#111] text-[0.85rem] font-extrabold leading-none [transform:translateX(-50%)]" aria-hidden>
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
