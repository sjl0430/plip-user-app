import type { ReactNode } from "react";

type MobileDeviceFrameProps = {
  children: ReactNode;
};

export function MobileDeviceFrame({ children }: MobileDeviceFrameProps) {
  return (
    <div className="plip-device-stage">
      <div className="plip-device-frame" aria-hidden="false">
        <div className="plip-device-frame__island" aria-hidden="true" />
        <div className="plip-device-screen">{children}</div>
        <div className="plip-device-frame__home-bar" aria-hidden="true" />
      </div>
    </div>
  );
}
