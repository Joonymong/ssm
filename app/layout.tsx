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

        {/* 구글 애드센스 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7587381512055029"
          crossOrigin="anonymous"
        ></script>

        {/* 상업용 무료 볼드 만화 손글씨 폰트 (Maple 단풍나무체) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/MaplestoryOTFBold.woff2"
        />

        {/* 레트로 만화 하프톤 도트 배경 스타일 정의 */}
        <style>{`
          @font-face {
            font-family: 'ComicBold';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/MaplestoryOTFBold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
          
          .comic-title {
            font-family: 'ComicBold', cursive, sans-serif;
          }

          /* 만화책 특유의 회색 도트 망점 배경 */
          .comic-bg {
            background-color: #d1d5db;
            background-image: radial-gradient(#9ca3af 20%, transparent 20%);
            background-position: 0 0;
            background-size: 16px 16px;
          }
        `}</style>
      </head>
      <body className="comic-bg text-slate-900 antialiased">{children}</body>
    </html>
  );
}
