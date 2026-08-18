import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export type ChatPollOption = {
  id: string;
  label: string;
  votes: number;
};

type ChatPollCardProps = {
  azitId: string;
  question: string;
  meta: string;
  options: ChatPollOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ChatPollCard({
  azitId,
  question,
  meta,
  options,
  selectedId,
  onSelect,
}: ChatPollCardProps) {
  return (
    <article className="dl-poll-card">
      <div>
        <p className="dl-poll-card__title">{question}</p>
        <p className="dl-poll-card__meta">{meta}</p>
      </div>
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            className={`dl-poll-option ${selected ? "dl-poll-option--selected" : ""}`}
            onClick={() => onSelect(option.id)}
          >
            <DailyIcon name={selected ? "circleDotBrand" : "circle"} size={16} />
            <span className="dl-poll-option__label">{option.label}</span>
            <span className="dl-poll-option__votes">{option.votes}표</span>
          </button>
        );
      })}
      <TextLink href={ROUTES.azit.pollEdit(azitId)} className="dl-btn dl-btn--secondary no-underline">
        투표 수정
      </TextLink>
    </article>
  );
}
