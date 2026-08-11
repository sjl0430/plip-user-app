# Git Convention

이 문서는 `.github/` Issue·PR 템플릿과 CI를 기준으로 한 Git 작업 규칙입니다.  
(plip-user-app — Next.js / npm / Husky)

| 경로 | 역할 |
|------|------|
| `.github/ISSUE_TEMPLATE/` | 이슈 유형·제목·라벨·본문 |
| `.github/pull_request_template.md` | PR 제목·본문 양식 |
| `.github/workflows/ci.yml` | `develop` / `main` PR·push — **CI** (test job) · **CD** (deploy job, Vercel 설정 후) |

## 0. 브랜치 전략 (환경)

| 브랜치 | 환경 | 용도 |
|--------|------|------|
| **`develop`** | **개발 서버** | 일상 개발·기능 통합. feature/fix 브랜치의 **머지 대상** |
| **`main`** | **운영(Production) 서버** | 검증 완료 코드만 반영. **`develop` → `main`** 릴리즈 PR |

```
feature/12-login-page  ──PR──▶  develop  ──(개발 서버 배포*)──▶
                                      │
                               릴리즈 PR (검증 후)
                                      ▼
                                    main  ──(운영 서버 배포*)──▶
```

\* **배포(CD)** 는 [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md) 참고. 기본적으로 **CI만 활성**이며, Vercel Git 연동 또는 Actions Secrets 설정 후 배포 가능.

- feature/fix/refactor 등 작업 브랜치는 **`develop`에서 분기**합니다.
- **`main`에 직접 push/PR 금지** (핫픽스 등 예외는 팀 합의 후).
- 운영 반영: `develop` → `main` PR + CI 통과 + 리뷰 후 머지.

## 1. 기본 흐름

```
Issue 생성 → 브랜치 생성 → 커밋 → PR → CI(Test) 통과 → 리뷰 → 머지
```

1. 작업 전 **Issue**를 만들고 번호를 확보합니다.
2. PR 제목·본문에 **동일 Issue**를 연결합니다 (`Close #N`).
3. `develop` / `main` 대상 PR은 **Actions Test**가 자동 실행됩니다.
4. 일반 작업 PR의 **base branch는 `develop`** 입니다.

## 2. Issue

GitHub **New Issue**에서 템플릿을 선택합니다.

| 유형 | 제목 prefix | Label | 용도 |
|------|-------------|-------|------|
| Feature | `[Feature]` | Feature | 신규 기능·화면·API 연동 |
| Fix | `[Fix]` | Fix | 버그 수정 |
| Refactor | `[Refactor]` | Refactor | 동작 동일, 구조·가독성 개선 |
| Style | `[Style]` | Style | 포맷·네이밍 등 동작 없는 스타일 |
| Docs | `[Docs]` | Docs | README, 본 문서 등 |
| Chore | `[Chore]` | Chore | 빌드·CI·의존성·설정 |

### 작성 요령

- `[Type]` 뒤에 **한글 요약**을 구체적으로 적습니다.  
  예: `[Feature] 로그인 화면 추가`
- 작업할 내용은 **`- [ ]` 체크리스트**로 나눕니다.
- Fix는 **재현 / 원인 / 수정** 항목을 구분합니다.
- Figma, Notion, Swagger 등 참고 링크가 있으면 **참고** 칸에 적습니다.

> 레포에 Label(`Feature`, `Fix` 등)이 없으면 Issue 생성 시 라벨 적용이 실패할 수 있습니다.  
> **최초 1회** GitHub **Labels**에 동일 이름으로 만들어 두세요.

## 3. 브랜치

```
{type}/{issue-number}-{short-kebab-description}
```

| type | 예 |
|------|-----|
| feature | `feature/12-login-page` |
| fix | `fix/25-session-expire` |
| refactor | `refactor/40-hero-organism` |
| style | `style/18-eslint-warnings` |
| docs | `docs/31-git-convention` |
| chore | `chore/7-ci-workflow` |

- **작업 브랜치 베이스:** **`develop`** (개발 서버)
- **`main`:** 운영 서버 — `develop`에서 릴리즈 PR로만 반영

## 4. 커밋 메시지

```
{Type}: {변경 요약}
```

| Type | 예 |
|------|-----|
| Feature | `Feature: 로그인 화면 추가` |
| Fix | `Fix: 세션 만료 처리 수정` |
| Docs | `Docs: README Git Convention 보완` |
| Chore | `Chore: CI workflow 추가` |

**Type:** `Feature` \| `Fix` \| `Refactor` \| `Style` \| `Docs` \| `Chore`

### 4.1. Git Hooks (Husky)

`npm install` 시 Husky가 설치됩니다.

| Hook | 동작 | 목적 |
|------|------|------|
| **pre-commit** | `lint-staged` → ESLint `--fix` | staged `*.{ts,tsx}` 품질 |
| **commit-msg** | `scripts/commit-msg` | 커밋 메시지 컨벤션 검증 |
| **pre-push** | `npm run test` (typecheck + lint) | push 직전 검증 |
| **prebuild** | `npm run test` | `npm run build` 전 검증 |

- 허용 메시지: `Feature|Fix|Refactor|Style|Docs|Chore:` + 요약 (**첫 줄**)
- 우회: `git commit --no-verify` / `git push --no-verify` (**남용 금지**)
- 클론 직후 `npm install`로 훅을 설치하세요.

## 5. Pull Request

### 제목

```
[#{Issue Number}] {Type} : {작업 내용}
```

- `[#12] Feature : 로그인 화면 구현`
- `[#25] Fix : JWT 세션 만료 오류 수정`
- `[#31] Docs : Git Convention 문서 추가`

### 본문

`.github/pull_request_template.md` 섹션을 모두 채웁니다.

| 섹션 | 내용 |
|------|------|
| 작업 내용 | 무엇을 왜 바꿨는지 (2–4문장) |
| 관련 이슈 | `Close #N` |
| 변경 사항 | **변경 단위별** 제목 · 파일 · 설명 · **코드 스니펫** |
| 테스트 | 로컬/CI 확인 항목 |

#### 변경 사항 작성 규칙

각 변경마다 아래 형식을 따릅니다.

1. `### N. {변경 제목}`
2. **파일** — 영향받는 경로 나열
3. **설명** — 무엇이 어떻게 바뀌었는지
4. **코드** — 실제 diff에서 발췌한 핵심 스니펫 (```lang 블록, 10~30줄)

모호한 체크리스트(`- [ ] CI 추가`)만 적지 말고, **구체적 파일·코드**를 포함합니다.

#### PR 본문 복사 (cpm / 에이전트 출력)

- 응답 **맨 아래**에 ` ````markdown ` … ` ```` ` **단일 블록** — 블록 안만 PR 본문, 상태·링크는 블록 **밖**
- 내부 코드 스니펫 때문에 **4-backtick** 래퍼 사용 (3-backtick이면 복사 시 깨짐)

### 머지 전

- [ ] 제목·Type·이슈 번호 일치
- [ ] `Close #N` 연결
- [ ] CI **Test** 성공

## 6. CI / CD

### CI (활성) — `.github/workflows/ci.yml` → `test`

| 항목 | 내용 |
|------|------|
| 트리거 | `develop` / `main`에 대한 `pull_request`, `push` |
| 실행 | Node 20 + `npm ci` + `typecheck` + `lint` + `build` |

push 전 로컬에서도 `npm run test` (또는 `npm run build`)로 확인합니다.

### CD (비활성 — 설정 필요) — `deploy` job

| 항목 | 내용 |
|------|------|
| 트리거 | `push` to `develop` / `main`, **`test` job 성공 후** |
| 조건 | Repository Variable `VERCEL_DEPLOY=true` + Vercel Secrets |
| `develop` | Vercel Preview (개발 서버) |
| `main` | Vercel Production (`--prod`, 운영 서버) |

상세 설정: [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md)  
Vercel Git 연동만 써도 되며, 이 경우 Actions `deploy` job은 끈 채로 두면 됩니다.

API 명세: Gateway Swagger UI에서 서비스별 OpenAPI를 통합 조회합니다.

## 7. 예시

### 기능 개발 (develop)

```
1. Issue   [Feature] 로그인 화면 추가  → #12
2. Branch  feature/12-login-page       (from develop)
3. Commit  Feature: 로그인 화면 추가
4. PR      [#12] Feature : 로그인 화면 구현  → base: develop / Close #12
5. CI      Test 통과 → 리뷰 → develop 머지 → (설정 시) 개발 서버 배포
```

### 운영 배포 (main)

```
1. PR      develop → main  (릴리즈 PR, 변경 요약·테스트 명시)
2. CI      Test 통과 → 리뷰 → main 머지 → (설정 시) 운영 서버 배포
```
