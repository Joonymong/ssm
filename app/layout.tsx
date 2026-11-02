import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: '오늘의 성향 연구소 | 1분 오피스 성향 진단',
  description: '1분 만에 까발리는 오피스 생존 본능! 내 퇴사 타이머와 영수증을 확인해보세요.',
  metadataBase: new URL('https://ssm-opal.vercel.app'),
  openGraph: {
    title: '오늘의 성향 연구소 💣',
    description: '1분 만에 까발리는 오피스 생존 본능! 당신의 퇴사 시한폭탄 타이머는 며칠?',
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
        {/* 1. 구글 애드센스 정식 심사 코드 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7587381512055029"
          crossOrigin="anonymous"
        ></script>

        {/* 2. Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* 3. 프리텐다드(Pretendard) 공식 가변 폰트 CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />

        {/* 4. 레트로 만화 타이틀용 볼드 폰트 CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/MaplestoryOTFBold.woff2"
        />

        {/* 5. 폰트 깨짐 방지 강제 적용 및 만화 도트 스타일 */}
        <style>{`
          * {
            font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif !important;
          }

          @font-face {
            font-family: 'ComicTitle';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/MaplestoryOTFBold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }

          .comic-font {
            font-family: 'ComicTitle', cursive, sans-serif !important;
          }

          /* 만화책 망점 도트 배경 클래스 */
          .comic-dots {
            background-color: #f1f5f9;
            background-image: radial-gradient(#cbd5e1 20%, transparent 20%);
            background-position: 0 0;
            background-size: 14px 14px;
          }
        `}</style>
      </head>
      <body className="antialiased min-h-screen selection:bg-rose-500 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
