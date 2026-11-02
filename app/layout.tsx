
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘의 성향 연구소',
  description: '1분 심리 성향 테스트 모음',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘의 성향 연구소',
  description: '1분 직장인 성향 테스트 모음',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* 상업용 무료 프리텐다드(Pretendard) 웹폰트 CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        
        {/* 전역 폰트 적용 스타일 */}
        <style>{`
          * {
            font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
          }
        `}</style>
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
