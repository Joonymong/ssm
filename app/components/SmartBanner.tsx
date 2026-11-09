'use client';

import { useState, useEffect } from 'react';

// 페이지별 / 관심사별 추천 상품 DB (쿠팡 파트너스 링크를 여기에 넣어주세요)
const RECOMMEND_ITEMS: Record<string, { title: string; desc: string; emoji: string; link: string; tag: string }> = {
  cat: {
    title: '집사무실 필수! 국산 무항생제 프리미엄 츄르 대용량 세트',
    desc: '고양이의 마음을 사로잡고 사내 인싸가 되는 가장 빠른 길.',
    emoji: '🐈',
    link: 'https://link.coupang.com/a/your-cat-link', // 👈 본인 쿠팡파트너스 링크로 변경
    tag: '고양이/집사 추천'
  },
  travel: {
    title: '기내 반입 20인치 확장형 가성비 여행용 캐리어',
    desc: '운명의 여행지로 떠날 때 꼭 필요한 튼튼하고 가벼운 캐리어.',
    emoji: '🧳',
    link: 'https://link.coupang.com/a/your-travel-link', // 👈 본인 쿠팡파트너스 링크로 변경
    tag: '여행/아웃도어'
  },
  default: {
    title: '직장인 허리 3단 받침 메모리폼 목쿠션 & 방석 세트',
    desc: '몰래 월루할 때도, 열일할 때도 내 허리와 목을 지켜주는 필수템.',
    emoji: '💺',
    link: 'https://link.coupang.com/a/your-office-link', // 👈 본인 쿠팡파트너스 링크로 변경
    tag: '직장인 베스트'
  }
};

export default function SmartBanner({ context = 'default' }: { context?: 'cat' | 'travel' | 'default' }) {
  const [item, setItem] = useState(RECOMMEND_ITEMS.default);

  useEffect(() => {
    if (context && RECOMMEND_ITEMS[context]) {
      setItem(RECOMMEND_ITEMS[context]);
    } else {
      const keys = Object.keys(RECOMMEND_ITEMS);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setItem(RECOMMEND_ITEMS[randomKey]);
    }
  }, [context]);

  return (
    <div className="p-4 bg-white rounded-3xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917] space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs bg-amber-200 border-2 border-stone-900 px-2.5 py-0.5 rounded-full font-bold">
          ✨ 맞춤형 AI 추천 딜
        </span>
        <span className="text-[10px] text-stone-500 font-bold">쿠팡 파트너스 활동</span>
      </div>

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-3 bg-[#FFF8E7] rounded-2xl border-2 border-stone-900 hover:bg-amber-100 transition block group"
      >
        <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
        <div className="flex-1">
          <span className="text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded font-bold">
            {item.tag}
          </span>
          <h3 className="text-sm font-bold text-stone-900 mt-1 leading-snug">{item.title}</h3>
          <p className="text-xs text-stone-600 mt-0.5">{item.desc}</p>
        </div>
        <span className="text-xs font-bold bg-amber-400 border-2 border-stone-900 px-3 py-2 rounded-xl shadow-[2px_2px_0px_#1c1917]">
          구매 ➔
        </span>
      </a>
      
      {/* 공정위 문구 준수 */}
      <p className="text-[10px] text-stone-400 text-center">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}
