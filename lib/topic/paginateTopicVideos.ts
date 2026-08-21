const MAX_PER_PAGE = 5;

/**
 * 토픽 클립을 페이지로 나눈다.
 * - 0개: 빈 페이지 1
 * - 1~5개: 한 페이지
 * - 6개 이상: 페이지 수 ceil(n/5), 각 3~5개, 앞쪽에 나머지
 */
export function paginateTopicVideos<T>(videos: T[]): T[][] {
  const count = videos.length;
  if (count === 0) {
    return [[]];
  }
  if (count <= MAX_PER_PAGE) {
    return [videos];
  }

  const pageCount = Math.ceil(count / MAX_PER_PAGE);
  const base = Math.floor(count / pageCount);
  const extra = count % pageCount;

  const pages: T[][] = [];
  let offset = 0;
  for (let index = 0; index < pageCount; index += 1) {
    const size = base + (index < extra ? 1 : 0);
    pages.push(videos.slice(offset, offset + size));
    offset += size;
  }
  return pages;
}
