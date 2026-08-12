export const ROUTES = {
  home: "/diary",
  intro: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  diary: {
    root: "/diary",
    date: (date: string) => `/diary/${date}` as const,
    themes: {
      root: "/diary/themes",
      detail: (themeId: string) => `/diary/themes/${themeId}` as const,
    },
  },
  mypage: {
    root: "/mypage",
    profile: "/mypage/profile",
    password: "/mypage/profile/password",
    notifications: "/mypage/notifications",
  },
} as const;
