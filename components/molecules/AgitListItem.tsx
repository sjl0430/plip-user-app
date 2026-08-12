import { IconButton } from "@/components/atoms";
import type { UiAgitListItem } from "@/types/agit/ui";

type AgitListItemProps = {
  item: UiAgitListItem;
};

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.5 6.5H18.5C19.05 6.5 19.5 6.95 19.5 7.5V15.5C19.5 16.05 19.05 16.5 18.5 16.5H9.5L5.5 19.5V7.5C5.5 6.95 5.95 6.5 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8.5 7.5L9.4 5.8C9.65 5.3 10.15 5 10.7 5H13.3C13.85 5 14.35 5.3 14.6 5.8L15.5 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4.5"
        y="7.5"
        width="15"
        height="11.5"
        rx="2.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="13.25" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function statusLabel(item: UiAgitListItem): string | null {
  if (item.hasNewChat && item.hasTodayTopic) {
    return "새 채팅 · 오늘의 토픽";
  }
  if (item.hasNewChat) {
    return "새 채팅 있을 때";
  }
  if (item.hasTodayTopic) {
    return "오늘의 토픽 있을 때";
  }
  return null;
}

export function AgitListItem({ item }: AgitListItemProps) {
  const status = statusLabel(item);

  return (
    <article className="flex w-full items-center gap-3 rounded-lg bg-zinc-100 px-3 py-3 sm:px-4">
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-zinc-900 sm:text-base">
          {item.title}
        </h3>
        {status ? (
          <p className="mt-0.5 truncate text-xs text-zinc-500 sm:text-sm">{status}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="relative inline-flex">
          <IconButton label={`${item.title} 채팅방`} className="bg-white">
            <ChatIcon className="size-4" />
          </IconButton>
          {item.hasNewChat ? (
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-zinc-400"
            />
          ) : null}
        </span>
        <span className="relative inline-flex">
          <IconButton label={`${item.title} 촬영`} className="bg-white">
            <CameraIcon className="size-4" />
          </IconButton>
          {item.hasTodayTopic ? (
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-zinc-400"
            />
          ) : null}
        </span>
      </div>
    </article>
  );
}
