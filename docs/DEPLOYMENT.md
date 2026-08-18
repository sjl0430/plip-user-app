# Deployment

plip-user-app 배포 가이드입니다.

## 현재 상태

| 구분 | 방식 | 상태 |
|------|------|------|
| **CI** (품질 검증) | `.github/workflows/ci.yml` → `test` job | ✅ 활성 — PR/push 시 typecheck + lint + build |
| **CD** (배포) | Vercel Git 연동 | `main` push → Production |

GitHub Actions는 **CI만** 수행합니다. Actions `deploy` job은 사용하지 않습니다.

## Vercel Git 연동

1. [Vercel](https://vercel.com)에서 GitHub 레포 `team-yes-bang/plip-user-app` 연결
2. **Production Branch** → `main`
3. **Preview** → `develop` 및 PR 브랜치 (선택)
4. 환경 변수(`API_URL` 등)는 Vercel Dashboard → Settings → Environment Variables

`main`에 push되면 Vercel이 Production을 자동 배포합니다.

## 브랜치 · 배포 매핑

| 브랜치 | 환경 | 배포 |
|--------|------|------|
| `develop` | 개발 | Vercel Preview (연동 시) |
| `main` | 운영(Production) | Vercel Production |

## 환경 변수

앱 런타임 env는 **Vercel Environment Variables**에 설정합니다.

| 변수 (예) | 용도 |
|-----------|------|
| `API_URL` | MSA Gateway (서버) |
| `NEXT_PUBLIC_*` | 클라이언트 노출 허용 변수 |
| `AUTH_TRUST_HOST` | LAN/다른 IP 로그인 시 `true` |

`.env*` 파일은 Git에 커밋하지 않습니다.

## 다른 플랫폼 (AWS, Docker, 자체 서버)

Vercel이 아닌 경우 이 문서를 팀 인프라에 맞게 수정하세요. GitHub Actions에 배포 job을 다시 넣지 말고, 플랫폼 연동을 우선합니다.
