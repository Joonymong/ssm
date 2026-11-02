
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘의 성향 연구소',
  description: '1분 심리 성향 테스트 모음',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
