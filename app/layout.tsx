import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "游满江 | 商业剪辑师 & AI 影像创作",
  description: "游满江个人作品集——上海商业剪辑师，专注 TVC、品牌短片、活动纪实与 AI 影像创作。",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "游满江 | Commercial Film Editor",
    description: "剪辑 · 调色 · 视效 · 声音设计 · AI 影像",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
