import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文化の守り手たち | 宮崎DAプロジェクト 協賛企業紹介",
  description: "宮崎県博物館デジタルアーカイブプロジェクトを支援する協賛企業一覧。宮崎の文化と未来を守るメセナ企業をご紹介します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
