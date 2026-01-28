// components/ui/avatar-svgs.tsx
"use client";

import * as React from "react";

export const UserAvatarSVG = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 32, className = "", ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-full ${className}`}
    {...props}
  >
    <defs>
      <linearGradient id="userAvatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
    </defs>

    <circle
      cx="50"
      cy="50"
      r="48"
      fill="url(#userAvatarBg)"
      stroke="#374151"
      strokeWidth="1"
    />
    <circle cx="50" cy="40" r="15" fill="#4b5563" />
    <ellipse cx="50" cy="70" rx="18" ry="20" fill="#4b5563" />
    <circle cx="65" cy="35" r="8" fill="white" fillOpacity="0.1" />
  </svg>
));
UserAvatarSVG.displayName = "UserAvatarSVG";

export const TraderAvatarSVG = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 32, className = "", ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-full ${className}`}
    {...props}
  >
    <defs>
      <linearGradient id="traderAvatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>

    <circle
      cx="50"
      cy="50"
      r="48"
      fill="url(#traderAvatarBg)"
      stroke="#334155"
      strokeWidth="1.5"
    />

    <circle cx="50" cy="38" r="14" fill="#475569" />

    <path d="M35 45 L65 45 L70 85 L30 85 Z" fill="url(#suitGradient)" />

    <path d="M45 45 L55 45 L53 50 L47 50 Z" fill="#64748b" />

    <path d="M49 45 L51 45 L52 60 L48 60 Z" fill="#dc2626" />
    <path d="M48 60 L52 60 L51 65 L49 65 Z" fill="#b91c1c" />

    <circle cx="45" cy="36" r="2.5" fill="#d1d5db" />
    <circle cx="55" cy="36" r="2.5" fill="#d1d5db" />

    <circle cx="60" cy="30" r="6" fill="white" fillOpacity="0.15" />
  </svg>
));
TraderAvatarSVG.displayName = "TraderAvatarSVG";

export const AdminAvatarSVG = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 32, className = "", ...props }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-full ${className}`}
    {...props}
  >
    <defs>
      <linearGradient id="adminAvatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>

    <circle
      cx="50"
      cy="50"
      r="48"
      fill="url(#adminAvatarBg)"
      stroke="#2563eb"
      strokeWidth="1.5"
    />
    <circle cx="50" cy="40" r="15" fill="#3b82f6" />
    <ellipse cx="50" cy="70" rx="20" ry="22" fill="#3b82f6" />
    <path
      d="M50 38 L55 43 L65 33"
      stroke="#93c5fd"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="35" cy="25" r="5" fill="white" fillOpacity="0.2" />
  </svg>
));
AdminAvatarSVG.displayName = "AdminAvatarSVG";

// Avatar z inicjałami
export const InitialsAvatarSVG = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & {
    size?: number;
    initials: string;
    bgColor?: string;
    textColor?: string;
  }
>(
  (
    {
      size = 32,
      initials = "U",
      bgColor = "#374151",
      textColor = "#d1d5db",
      className = "",
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full ${className}`}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={bgColor}
        stroke="#4b5563"
        strokeWidth="1"
      />

      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill={textColor}
        fontSize="36"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="bold"
        className="select-none"
      >
        {initials.slice(0, 2)}
      </text>
    </svg>
  ),
);
InitialsAvatarSVG.displayName = "InitialsAvatarSVG";
