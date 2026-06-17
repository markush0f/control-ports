import type { ProcessIconName } from "../data/processTypes";

type ProcessIconProps = {
  name: ProcessIconName;
};

export function ProcessIcon({ name }: ProcessIconProps) {
  const commonProps = {
    className: "h-4 w-4 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "browser":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      );
    case "code":
      return (
        <svg {...commonProps}>
          <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />
        </svg>
      );
    case "database":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </svg>
      );
    case "docker":
      return (
        <svg {...commonProps}>
          <path d="M4 14h15l-2 4H8c-2.2 0-4-1.8-4-4ZM7 10h3v3H7zM11 10h3v3h-3zM11 6h3v3h-3zM15 10h3v3h-3z" />
        </svg>
      );
    case "game":
      return (
        <svg {...commonProps}>
          <path d="M7 15h4l2 2h4a4 4 0 0 0 4-4v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1a4 4 0 0 0 4 4Z" />
          <path d="M8 11v4M6 13h4M16 12h.01M18 14h.01" />
        </svg>
      );
    case "java":
      return (
        <svg {...commonProps}>
          <path d="M8 18h8M7 21h10M9 14h6a3 3 0 0 0 3-3H6a3 3 0 0 0 3 3ZM10 3c2 2-2 3 0 5M14 3c2 2-2 3 0 5" />
        </svg>
      );
    case "media":
      return (
        <svg {...commonProps}>
          <path d="M9 18V5l10-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      );
    case "network":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      );
    case "node":
      return (
        <svg {...commonProps}>
          <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
          <path d="M9 10v5M9 10l6 5M15 10v5" />
        </svg>
      );
    case "python":
      return (
        <svg {...commonProps}>
          <path d="M8 9h8a3 3 0 0 1 3 3v1H8a3 3 0 0 0-3 3v1" />
          <path d="M16 15H8a3 3 0 0 1-3-3v-1h11a3 3 0 0 0 3-3V7" />
          <path d="M9 6h.01M15 18h.01" />
        </svg>
      );
    case "security":
      return (
        <svg {...commonProps}>
          <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "server":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="6" rx="2" />
          <rect x="4" y="14" width="16" height="6" rx="2" />
          <path d="M8 7h.01M8 17h.01" />
        </svg>
      );
    case "system":
      return (
        <svg {...commonProps}>
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          <path d="M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...commonProps}>
          <path d="m4 7 5 5-5 5M11 17h9" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );
  }
}
