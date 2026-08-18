# plip-user-app

PLIP 사용자 앱 — Next.js 16 (App Router) + TypeScript + Tailwind CSS v4

> **에이전트/AI 규칙** (`AGENTS.md`, `.cursor/`)은 **로컬 전용**이며 Git에 올리지 않습니다.  
> 팀 공유 규칙은 이 **README**에만 반영합니다.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (`prebuild`에서 typecheck + lint 선행) |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint 전체 검사 |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | typecheck + lint (pre-push / prebuild) |

## Git Convention

상세: [`docs/GIT_CONVENTION.md`](./docs/GIT_CONVENTION.md)

### 브랜치 · 환경

| 브랜치 | 환경 | 용도 |
|--------|------|------|
| **`develop`** | 개발 서버 | feature 브랜치 머지 · 일상 개발 |
| **`main`** | 운영 서버 | `develop` 릴리즈 PR로만 반영 |

```
feature/* ──PR──▶ develop (개발 서버) ──릴리즈 PR──▶ main (운영 서버)
```

### 작업 규칙

```
Issue → 브랜치(develop 기준) → 커밋 → PR → CI → 리뷰 → 머지
```

| 항목 | 규칙 |
|------|------|
| Issue 제목 | `[Feature]` `[Fix]` … + 한글 요약 |
| 브랜치 | `feature/12-login-page` (**from `develop`**) |
| PR base | **`develop`** (운영은 `develop` → `main` 릴리즈 PR) |
| 커밋 | `Feature: 로그인 화면 추가` |
| PR 제목 | `[#12] Feature : 로그인 화면 구현` |
| PR 본문 | `Close #12` + 템플릿 섹션 작성 |

템플릿: `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`  
CI: `.github/workflows/ci.yml` (`develop` / `main`)

### CI / CD

| 구분 | 상태 | 설명 |
|------|------|------|
| **CI** (`test` job) | ✅ 활성 | typecheck + lint + build |
| **CD** | Vercel Git | `main` push → Production |

배포 설정: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)

## Git 훅 (Husky)

| 시점 | 동작 |
|------|------|
| **pre-commit** | staged `*.{ts,tsx}` ESLint `--fix` |
| **commit-msg** | `Type: 요약` 형식 검증 |
| **pre-push** | `npm run test` |
| **prebuild** | `npm run test` 후 build |

`npm install` 시 Husky 자동 설정. `--no-verify` 남용 금지.

## 프로젝트 구조

### UI — Atomic Design

```
components/
├── atoms/        # Button, Heading, Text, …
├── molecules/    # LinkButton, ExternalLink, …
├── organisms/    # HeroSection, …
├── templates/    # HomeTemplate, …
└── index.ts

app/
└── <route>/page.tsx   # Template만 조합 (마크업 직접 작성 금지)
```

**import 방향:** `pages → templates → organisms → molecules → atoms`

### 데이터 — 3-Layer (Collabhub 스타일)

```
UI (client / RSC)
  → actions/*Action       ("use server", zod, ActionResult)
    → services/*Service   (orchestration, Api → Ui map)
      → lib/api/*         (sole HTTP / apiFetch)
        → API_URL
```

상세 규칙(금지 사항, 네이밍, Auth, SSE, env 등)은 아래 **개발 규칙** 및 팀 협의를 따릅니다.

### 기타 디렉터리 (예정/확장)

| 경로 | 역할 |
|------|------|
| `actions/` | Server Actions |
| `services/` | 비즈니스 오케스트레이션 |
| `lib/api/` | HTTP 클라이언트 (`apiFetch`) |
| `config/api-endpoints.ts` | API 경로 상수 |
| `types/<domain>/` | `api.ts` (DTO), `ui.ts` (UI 모델), zod 스키마 |

## 개발 규칙 (Git 공유)

### 데이터 계층

1. `fetch(API_URL)`은 **`lib/api/*`에서만** 호출
2. **Client 컴포넌트**는 `lib/api`, `services` import 금지 → Server Actions 사용
3. **RSC 페이지**는 읽기에 `*Service` 직접 호출 가능; 변경(mutation)은 Actions 경유
4. **Actions** — auth/validation, `ActionResult` 반환; `apiFetch` 직접 호출 금지
5. **Services** — `Api*` → `Ui*` 매핑, API 조합; `"use server"` 없음
6. **Types** — `types/<domain>/api.ts` (DTO), `ui.ts` (UI 모델), zod 스키마
7. **API 경로** — `config/api-endpoints.ts` (`API_ENDPOINTS`)에만 정의

### UI (Atomic Design)

1. **`app/` 페이지**에 presentational 마크업 직접 작성 금지 → Template 조합
2. import 방향: `pages → templates → organisms → molecules → atoms`
3. 각 계층에 `index.ts` barrel export

### Git 훅

- pre-commit / prebuild 우회(`--no-verify`) 금지 (명시적 요청 시만 예외)

### 에이전트 명령: `cpm`

채팅에서 **`cpm`** 이라고 하면 에이전트가 아래를 수행합니다.

1. `git add` → `commit` → `push`
2. PR 본문을 **복사·붙여넣기용 단일 코드 블록**(` ````markdown ` 4-backtick)으로 출력 — 변경 사항에 **파일·설명·코드 스니펫** 포함

PR 생성(`gh pr create`)은 **`cpm`만으로는 실행하지 않음** — 별도 요청 시에만 진행.

## 문서 유지 규칙

새로운 **구조·컨벤션·개발 규칙** 지시가 있으면:

1. **로컬 `AGENTS.md`** — 에이전트용 상세 규칙 (Git 제외)
2. **`README.md`** — 팀용 요약 갱신 (**Git에 커밋**)

`AGENTS.md`, `CLAUDE.md`, `.cursor/`는 `.gitignore`에 등록되어 있으며 **커밋하지 않습니다.**

## 기술 스택

- Next.js 16.3 · React 19 · TypeScript 5
- Tailwind CSS v4 · ESLint (eslint-config-next)
- Husky · lint-staged
