import type { ReactNode } from "react";
import { PlipLogoTagline } from "@/components/atoms/PlipLogoTagline";

type PlipLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

type LogoScaleAnchorProps = {
  cx: number;
  cy: number;
  className?: string;
  children: ReactNode;
};

function LogoScaleAnchor({
  cx,
  cy,
  className = "",
  children,
}: LogoScaleAnchorProps) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className={`plip-logo__letter ${className}`.trim()}>
        <g transform={`translate(${-cx} ${-cy})`}>{children}</g>
      </g>
    </g>
  );
}

export function PlipLogo({
  className = "",
  width = 223,
  height = 121,
}: PlipLogoProps) {
  return (
    <svg
      className={`plip-logo ${className}`}
      width={width}
      height={height}
      viewBox="0 0 223.067 128.847"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PLIP Personal Clip"
      overflow="visible"
    >
      <defs>
        <filter
          id="plip-logo-filter-l-leg"
          x="118.822"
          y="69.7938"
          width="22.8635"
          height="59.053"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="plip-logo-filter-p-left"
          x="30.9329"
          y="18.7409"
          width="61.0807"
          height="88.1338"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="plip-logo-l-leg-gradient"
          x1="130.253"
          y1="69.7938"
          x2="130.253"
          y2="120.847"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#4389FF" />
        </linearGradient>
      </defs>

      {/* 원본 logo.svg 레이어 순서 유지 */}
      {/* i dot — I 세로 막대 상단 중심(Y축) 기준 scaleY */}
      <LogoScaleAnchor
        cx={105.05}
        cy={27.142}
        className="plip-logo__letter--dot"
      >
        <path
          d="M115.713 10.9861C115.713 17.0535 110.794 21.9722 104.727 21.9722C98.6593 21.9722 93.7407 17.0535 93.7407 10.9861C93.7407 4.91864 98.6593 0 104.727 0C110.794 0 115.713 4.91864 115.713 10.9861Z"
          fill="#FEA6AC"
        />
      </LogoScaleAnchor>

      <LogoScaleAnchor cx={149.36} cy={85.66} className="plip-logo__letter--p-right">
        <path
          d="M122.822 120.905V50.4066H150.636C155.983 50.4066 160.538 51.4278 164.302 53.4702C168.065 55.4897 170.934 58.301 172.907 61.9039C174.904 65.484 175.902 69.6148 175.902 74.2963C175.902 78.9779 174.893 83.1087 172.873 86.6887C170.854 90.2687 167.928 93.057 164.095 95.0536C160.286 97.0501 155.673 98.0484 150.257 98.0484H132.529V86.1035H147.847C150.716 86.1035 153.08 85.6101 154.938 84.6233C156.82 83.6136 158.22 82.2252 159.138 80.4581C160.079 78.6681 160.549 76.6142 160.549 74.2963C160.549 71.9555 160.079 69.9131 159.138 68.169C158.22 66.4019 156.82 65.0365 154.938 64.0726C153.057 63.0858 150.67 62.5924 147.778 62.5924H137.727V120.905H122.822Z"
          fill="white"
        />
      </LogoScaleAnchor>

      <LogoScaleAnchor cx={105.05} cy={52.57} className="plip-logo__letter--i">
        <path
          d="M112.482 27.142V78.195H97.6182V27.142H112.482Z"
          fill="#8AA4D0"
        />
      </LogoScaleAnchor>

      <LogoScaleAnchor cx={105} cy={82} className="plip-logo__letter--l">
        <path
          d="M73.0611 98.8745V42.3286H87.9664V86.5854H136.974V98.8745H73.0611Z"
          fill="white"
        />
        <g filter="url(#plip-logo-filter-l-leg)">
          <path
            d="M137.685 69.7938V120.847H122.822V69.7938H137.685Z"
            fill="url(#plip-logo-l-leg-gradient)"
          />
        </g>
      </LogoScaleAnchor>

      <LogoScaleAnchor cx={61.47} cy={58.81} className="plip-logo__letter--p-left">
        <g filter="url(#plip-logo-filter-p-left)">
          <path
            d="M34.9329 98.8747V18.7409H62.7469C68.094 18.7409 72.6493 19.7621 76.4129 21.8046C80.1766 23.8241 83.0452 26.6353 85.0188 30.2383C87.0153 33.8183 88.0136 37.9491 88.0136 42.6307C88.0136 47.3122 87.0038 51.443 84.9843 55.0231C82.9648 58.6031 80.0389 61.3914 76.2064 63.3879C72.3969 65.3845 67.7842 66.3827 62.3682 66.3827H44.6402V54.4379H59.9586C62.8272 54.4379 65.1909 53.9445 67.0498 52.9577C68.9316 51.9479 70.3315 50.5595 71.2495 48.7924C72.1904 47.0024 72.6608 44.9485 72.6608 42.6307C72.6608 40.2899 72.1904 38.2474 71.2495 36.5033C70.3315 34.7363 68.9316 33.3708 67.0498 32.407C65.168 31.4202 62.7813 30.9268 59.8898 30.9268H49.8382V98.8747H34.9329Z"
            fill="#77CBCC"
          />
        </g>
      </LogoScaleAnchor>

      <PlipLogoTagline />
    </svg>
  );
}
