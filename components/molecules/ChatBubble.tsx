import type { UiChatMessage } from "@/types/agit/ui";

type ChatBubbleProps = {
  message: UiChatMessage;
};

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <article className={`dl-bubble ${message.isMine ? "dl-bubble--mine" : ""}`}>
      <div className="dl-bubble__meta">
        <p className="dl-bubble__name">{message.senderName}</p>
        {message.time ? <p className="dl-bubble__time">{message.time}</p> : null}
      </div>
      {message.replyTo ? (
        <div className="dl-bubble__reply">
          <p className="dl-bubble__reply-name">{message.replyTo.name}에게 답장</p>
          <p className="dl-bubble__reply-text">{message.replyTo.excerpt}</p>
        </div>
      ) : null}
      <p className="dl-bubble__text">{message.body}</p>
    </article>
  );
}
