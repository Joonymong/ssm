'use client';

import { useEffect, useRef } from 'react';

export default function SmartBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이미 배너가 생성되어 중복 실행되는 것을 방지
    if (bannerRef.current && bannerRef.current.innerHTML === '') {
      const script = document.createElement('script');
      script.src = 'https://ads-partners.coupang.com/g.js';
      script.async = true;
      script.onload = () => {
        // 스크립트 로드 완료 후 쿠팡 다이나믹 배너 객체 생성 실행
        if (window.PartnersCoupang) {
          new window.PartnersCoupang.G({
            "id": 1048230,
            "template": "carousel",
            "trackingCode": "AF7587966",
            "width": "680",
            "height": "140",
            "tsource": ""
          });
        }
      };
      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-3xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917] space-y-2 text-center overflow-hidden">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs bg-amber-200 border-2 border-stone-900 px-2.5 py-0.5 rounded-full font-bold">
          ✨ 쿠팡 추천 다이나믹 딜
        </span>
        <span className="text-[10px] text-stone-500 font-bold">파트너스 활동</span>
      </div>

      {/* 쿠팡 다이나믹 배너가 렌더링될 영역 */}
      <div ref={bannerRef} className="flex justify-center items-center w-full min-h-[140px] overflow-hidden rounded-2xl border-2 border-stone-900 bg-white" />

      {/* 공정위 문구 준수 */}
      <p className="text-[10px] text-stone-400">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}

// 타입스크립트 에러 방지를 위한 전역 선언
declare global {
  interface Window {
    PartnersCoupang: any;
  }
}
