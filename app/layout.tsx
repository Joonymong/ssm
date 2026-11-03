import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘의 성향 연구소 | 1분 오피스 성향 진단',
  description: '1분 만에 까발리는 오피스 생존 본능과 사주 여행지 연구소',
  metadataBase: new URL('https://ssm-opal.vercel.app'),
  openGraph: {
    title: '오늘의 성향 연구소 💣',
    description: '1분 만에 까발리는 오피스 생존 본능 & 사주×성향 세계 여행지 진단!',
    url: 'https://ssm-opal.vercel.app',
    siteName: '오늘의 성향 연구소',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7587381512055029"
          crossOrigin="anonymous"
        ></script>
        <script defer src="/_vercel/insights/script.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>

        {/* 프리텐다드 & 손글씨 백업 웹폰트 로드 */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />
        <link
           href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <style>{`
          /* !important를 제거하여 하위 페이지에서 꾹꾹체가 정상 작동하도록 수정 */
          body {
            font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, sans-serif;
          }

          /* 메모먼트 꾹꾹체 (public/kkuk.ttf 업로드 시 1순위 작동, 없을 시 손글씨체 즉시 작동) */
          @font-face {
            font-family: 'MemomentKkukkkuk';
            src: url('/kkuk.ttf') format('truetype'),
                 url('/kkuk.otf') format('opentype'),
                 url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/MemomentKkukkkuk.woff2') format('woff2');
            font-weight: normal;
            font-display: swap;
          }

          .kkuk-theme, .kkuk-theme * {
            font-family: 'MemomentKkukkkuk', 'Gaegu', cursive, sans-serif !important;
          }
        `}</style>
      </head>
      <body className="antialiased min-h-screen selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
