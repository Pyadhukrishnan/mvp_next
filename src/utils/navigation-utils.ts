import { Icons } from "../themes/icons/icons";

interface NavigationLinks {
  path: string;
  label: string;
  icon: keyof typeof Icons;
}

export const accountLinks: NavigationLinks[] = [
  { path: "/my-account", label: "マイアカウント", icon: "profileIcon" },
  { path: "/emil-addresses", label: "メールアドレス", icon: "mailIcon" },
  {
    path: "/payment-information",
    label: "お支払い情報",
    icon: "creditcardIcon",
  },
  { path: "/id-card", label: "例）身分証明書", icon: "idCardIcon" },
  {
    path: "/qualification-certificate",
    label: "例）資格証",
    icon: "awardIcon",
  },
  { path: "/region-language", label: "地域／言語", icon: "globeIcon" },
  { path: "/theme", label: "テーマ", icon: "palatteIcon" },
  { path: "/notification", label: "通知", icon: "bellIcon" },
];

export const basicInformationLinks: NavigationLinks[] = [
  { path: "/service-name", label: "ServiceName をシェア", icon: "uploadIcon" },
  { path: "/terms-of-service", label: "利用規約", icon: "boxIcon" },
  { path: "/privacy-policy", label: "プライバシーポリシー", icon: "boxIcon" },
  {
    path: "/contact-information",
    label: "運営元企業・お問い合わせ先",
    icon: "boxIcon",
  },
];

export const getActiveStatus = (path: string, pathname: string): boolean => {
  // Exact match or starts with path and followed by a slash
  return pathname === path || pathname.startsWith(`${path}/`);
};

export const navigateTo = (path: string, navigate: (path: string) => void) => {
  navigate(path); // Perform the navigation
};
