export type CursorSparkShape = {
  id: string;
  label: string;
  viewBox: string;
  path: string;
};

export const DEFAULT_CURSOR_SPARK_SHAPE_ID = "lightning";

export const CURSOR_SPARK_SHAPES: CursorSparkShape[] = [
  {
    id: "lightning",
    label: "번개",
    viewBox: "0 0 24 32",
    path: "M13 1 L5 15 H11 L7 31 L21 11 H14 Z",
  },
  {
    id: "heart",
    label: "하트",
    viewBox: "0 0 24 24",
    path: "M12 20.8 C12 20.8 4.5 14.2 4.5 9.2 C4.5 6.4 6.6 4.2 9.4 4.2 C10.8 4.2 12 5.1 12 5.1 C12 5.1 13.2 4.2 14.6 4.2 C17.4 4.2 19.5 6.4 19.5 9.2 C19.5 14.2 12 20.8 12 20.8 Z",
  },
  {
    id: "star",
    label: "별",
    viewBox: "0 0 24 24",
    path: "M12 2.2 L14.8 9.4 L22.5 9.8 L16.6 14.5 L18.8 22 L12 17.6 L5.2 22 L7.4 14.5 L1.5 9.8 L9.2 9.4 Z",
  },
  {
    id: "sparkle",
    label: "스파클",
    viewBox: "0 0 24 24",
    path: "M12 1 L13.4 9.2 L21.5 10.6 L13.4 12 L12 20.2 L10.6 12 L2.5 10.6 L10.6 9.2 Z",
  },
  {
    id: "diamond",
    label: "다이아",
    viewBox: "0 0 24 24",
    path: "M12 2 L21 12 L12 22 L3 12 Z",
  },
  {
    id: "moon",
    label: "달",
    viewBox: "0 0 24 24",
    path: "M15.5 3.2 C12.8 3.2 10.6 5.4 10.6 8.1 C10.6 10.8 12.8 13 15.5 13 C14.2 15.4 11.8 17 9 17 C5.1 17 2 13.9 2 10 C2 6.1 5.1 3 9 3 C11.4 3 13.4 4 15.5 3.2 Z",
  },
  {
    id: "flower",
    label: "꽃",
    viewBox: "0 0 24 24",
    path: "M12 6.5 C12 4.6 13.5 3 15.4 3 C17.3 3 18.8 4.6 18.8 6.5 C20.7 6.5 22.2 8 22.2 9.9 C22.2 11.8 20.7 13.3 18.8 13.3 C18.8 15.2 17.3 16.7 15.4 16.7 C13.5 16.7 12 15.2 12 13.3 C10.1 13.3 8.6 11.8 8.6 9.9 C8.6 8 10.1 6.5 12 6.5 Z M12 11.2 C12.9 11.2 13.6 11.9 13.6 12.8 C13.6 13.7 12.9 14.4 12 14.4 C11.1 14.4 10.4 13.7 10.4 12.8 C10.4 11.9 11.1 11.2 12 11.2 Z",
  },
  {
    id: "note",
    label: "음표",
    viewBox: "0 0 24 24",
    path: "M16.5 3.5 L16.5 15.2 C15.6 14.6 14.4 14.2 13.1 14.2 C10.2 14.2 7.8 16.1 7.8 18.4 C7.8 20.7 10.2 22.5 13.1 22.5 C16 22.5 18.4 20.7 18.4 18.4 L18.4 8.8 L9.5 11.4 L9.5 8.6 L16.5 6.7 Z",
  },
  {
    id: "circle",
    label: "원",
    viewBox: "0 0 24 24",
    path: "M12 3 C16.9 3 21 7.1 21 12 C21 16.9 16.9 21 12 21 C7.1 21 3 16.9 3 12 C3 7.1 7.1 3 12 3 Z",
  },
  {
    id: "drop",
    label: "물방울",
    viewBox: "0 0 24 24",
    path: "M12 2.5 C12 2.5 6 10.5 6 15 C6 18.9 8.7 21.5 12 21.5 C15.3 21.5 18 18.9 18 15 C18 10.5 12 2.5 12 2.5 Z",
  },
];

export function getCursorSparkShape(id: string): CursorSparkShape {
  return (
    CURSOR_SPARK_SHAPES.find((shape) => shape.id === id) ?? CURSOR_SPARK_SHAPES[0]
  );
}
