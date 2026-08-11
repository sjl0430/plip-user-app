# Deployment

plip-user-app 배포 가이드입니다.

## 현재 상태

| 구분 | 워크플로 | 상태 |
|------|----------|------|
| **CI** (품질 검증) | `.github/workflows/ci.yml` → `test` job | ✅ 활성 — PR/push 시 typecheck + lint + build |
| **CD** (배포) | `.github/workflows/ci.yml` → `deploy` job | ⏸ **비활성** — Vercel Secrets·변수 설정 전까지 실행 안 함 |

문서상 `develop` = 개발 서버, `main` = 운영 서버이지만, **배포 자동화는 아직 켜져 있지 않습니다.**

## 배포 방식 (택 1)

### A. Vercel Git 연동 (권장 · Actions 불필요)

1. [Vercel](https://vercel.com)에서 GitHub 레포 `team-yes-bang/plip-user-app` 연결
2. **Production Branch** → `main`
3. **Preview** → `develop` 및 PR 브랜치
4. 환경 변수(`API_URL` 등)는 Vercel Dashboard → Settings → Environment Variables

이 방식이면 push 시 Vercel이 자동 배포하며, GitHub Actions `deploy` job은 **사용하지 않아도** 됩니다.

### B. GitHub Actions → Vercel (레포 워크플로 사용)

`.github/workflows/ci.yml`의 `deploy` job을 활성화합니다.

#### 1. Vercel 프로젝트 연결

```bash
npm i -g vercel
vercel link
```

`.vercel/project.json`에서 `orgId`, `projectId` 확인.

#### 2. GitHub Secrets 등록

| Secret | 설명 |
|--------|------|
| `VERCEL_TOKEN` | Vercel Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → `projectId` |

**Settings → Secrets and variables → Actions → Repository secrets**

#### 3. GitHub Repository Variable 등록

| Variable | 값 | 설명 |
|----------|-----|------|
| `VERCEL_DEPLOY` | `true` | `true`로 설정해야 `deploy` job 실행 |

**Settings → Secrets and variables → Actions → Variables**

#### 4. GitHub Environments (선택)

| Environment | 브랜치 | Vercel |
|-------------|--------|--------|
| `development` | `develop` push | Preview 배포 |
| `production` | `main` push | Production (`--prod`) |

**Settings → Environments**에서 `production`에 승인 규칙(optional) 추가 가능.

## 브랜치 · 배포 매핑

| 브랜치 | 환경 | Actions `deploy` job |
|--------|------|----------------------|
| `develop` | 개발(Preview) | `vercel deploy` (preview) |
| `main` | 운영(Production) | `vercel deploy --prod` |

`deploy` job은 **`test` job 성공 후** `push` 이벤트에서만 실행됩니다. PR에서는 CI만 돌아갑니다.

## 환경 변수

앱 런타임 env는 Vercel Dashboard 또는 Actions Secrets가 아닌 **Vercel Environment Variables**에 설정합니다.

| 변수 (예) | 용도 |
|-----------|------|
| `API_URL` | MSA Gateway (서버) |
| `NEXT_PUBLIC_*` | 클라이언트 노출 허용 변수 |
| `AUTH_TRUST_HOST` | LAN/다른 IP 로그인 시 `true` |

`.env*` 파일은 Git에 커밋하지 않습니다.

## 다른 플랫폼 (AWS, Docker, 자체 서버)

Vercel이 아닌 경우 `.github/workflows/ci.yml`의 `deploy` job을 해당 플랫폼 CLI/API로 교체하고, 이 문서를 팀 인프라에 맞게 수정하세요.
