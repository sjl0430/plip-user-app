export const CALENDAR_TOPICS = ["전체", "러닝", "식단", "스트레칭"] as const;

export type CalendarTopic = (typeof CALENDAR_TOPICS)[number];
export type CalendarTopicName = Exclude<CalendarTopic, "전체">;

export type CalendarRecord = {
  count: number;
  topics: Partial<Record<CalendarTopicName, number>>;
};

export type CalendarClip = {
  id: string;
  name: string;
  topic: CalendarTopicName;
  thumbSrc: string;
};

export const CALENDAR_RECORDS: Record<string, CalendarRecord> = {
  "2026-08-03": { count: 2, topics: { 러닝: 2 } },
  "2026-08-07": { count: 1, topics: { 식단: 1 } },
  "2026-08-10": { count: 3, topics: { 러닝: 2, 스트레칭: 1 } },
  "2026-08-12": { count: 2, topics: { 식단: 2 } },
  "2026-08-14": { count: 4, topics: { 러닝: 2, 식단: 1, 스트레칭: 1 } },
  "2026-08-18": { count: 2, topics: { 러닝: 2 } },
  "2026-08-21": { count: 5, topics: { 러닝: 2, 식단: 2, 스트레칭: 1 } },
  "2026-08-26": { count: 4, topics: { 식단: 2, 스트레칭: 2 } },
};

export const CALENDAR_CLIPS: Record<string, CalendarClip[]> = {
  "2026-08-14": [
    { id: "cal-1", name: "민지", topic: "러닝", thumbSrc: "/plip/daily-loop/cal-thumb-1.png" },
    { id: "cal-2", name: "준호", topic: "식단", thumbSrc: "/plip/daily-loop/cal-thumb-2.png" },
    { id: "cal-3", name: "서연", topic: "스트레칭", thumbSrc: "/plip/daily-loop/cal-thumb-3.png" },
  ],
};

export const CALENDAR_STATS = {
  recordedDays: 8,
  monthVideos: 23,
  streak: 4,
};

export const CALENDAR_LEGEND = [
  { label: "러닝", src: "/plip/daily-loop/cal-dot-run.svg" },
  { label: "식단", src: "/plip/daily-loop/cal-dot-diet.svg" },
  { label: "스트레칭", src: "/plip/daily-loop/cal-dot-stretch.svg" },
] as const;
