type Visibility = "public" | "private";

type VisibilityToggleProps = {
  value: Visibility;
  onChange: (value: Visibility) => void;
};

export function VisibilityToggle({ value, onChange }: VisibilityToggleProps) {
  return (
    <div className="dl-segment" role="tablist" aria-label="방 공개 여부">
      <button
        type="button"
        role="tab"
        aria-selected={value === "public"}
        className={`dl-segment__item ${value === "public" ? "dl-segment__item--active" : ""}`}
        onClick={() => onChange("public")}
      >
        공개 방
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "private"}
        className={`dl-segment__item ${value === "private" ? "dl-segment__item--active" : ""}`}
        onClick={() => onChange("private")}
      >
        비공개 방
      </button>
    </div>
  );
}
