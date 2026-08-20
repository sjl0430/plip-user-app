import type { ReactNode } from "react";

type MobileDeviceFrameProps = {
  children: ReactNode;
};

/**
 * 모바일: 크롬 없이 풀스크린.
 * PC: 얇은 프레임 + 상태바. 헤더/하단 탭을 가리지 않습니다.
 */
export function MobileDeviceFrame({ children }: MobileDeviceFrameProps) {
  return (
    <div className="plip-device-stage">
      <div className="plip-device-frame">
        <div className="plip-device-screen">
          <div className="plip-status-bar" aria-hidden>
            <span>9:41</span>
            <span>●●●  100%</span>
          </div>
          <div className="plip-device-app">{children}</div>
        </div>
      </div>
    </div>
  );
}
