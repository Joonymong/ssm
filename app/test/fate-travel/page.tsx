'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TravelResult {
  title: string;
  sub: string;
  country: string;
  time: string;
  sajuEnergy: string;
  bgGradient: string;
  mainEmoji: string;
  subEmojis: string;
  mustDo: string[];
  luckyItem: string;
  mate: string;
  artwork: JSX.Element;
}

const RESULTS: Record<string, TravelResult> = {
  EJ_FIRE: {
    title: "열정의 화(火) 기운 대폭발",
    sub: "잠든 야망을 깨우는 운명 여행지",
    country: "미국 뉴욕 (New York)",
    time: "한국에서 비행기로 약 14시간",
    sajuEnergy: "사주에 가득한 뜨겁고 진취적인 불(火)의 기운이 뉴욕의 화려한 에너지와 강하게 공명합니다. 끊임없이 돌아가는 타임스퀘어의 불빛과 거대한 빌딩 숲이 당신에게 새로운 야망과 영감을 채워줄 최적의 운명지입니다.",
    bgGradient: "from-amber-500 to-rose-600",
    mainEmoji: "🗽",
    subEmojis: "🚕 🌆 🎭",
    mustDo: ["타임스퀘어 붉은 계단에서 밤 야경 보기", "브로드웨이에서 심장을 울리는 뮤지컬 관람", "센트럴파크에서 베이글 씹으며 뉴요커 구경"],
    luckyItem: "선글라스 & 빈티지 스니커즈",
    mate: "치앙마이 유형 (차분한 힐링 메이트)",
    artwork: (
      <svg className="w-full h-32 mx-auto" viewBox="0 0 200 100" fill="none">
        <rect width="200" height="100" rx="16" fill="#F43F5E" fillOpacity="0.1" />
        <text x="35" y="65" className="text-5xl">🗽</text>
        <text x="110" y="55" className="text-3xl">🌆</text>
        <text x="85" y="75" className="text-2xl">🚕</text>
        <circle cx="170" cy="30" r="15" fill="#FCD34D" className="animate-pulse" />
        <path d="M10 90 L190 90" stroke="#E11D48" strokeWidth="3" strokeDasharray="4 4" />
      </svg>
    )
  },
  EP_FIRE: {
    title: "자유로운 태양의 화(火) 기운",
    sub: "예술과 낭만이 흐르는 운명 여행지",
    country: "스페인 바르셀로나",
    time: "한국에서 비행기로 약 14시간 30분",
    sajuEnergy: "어디에도 얽매이기 싫어하는 자유로운 사주 기질이 정열적인 지중해 태양을 받아 폭발합니다. 파도치는 구엘 공원의 가우디 곡선들과 해변의 노천카페들이 당신이 가진 천생 예술가적 활력을 깨워줍니다.",
    bgGradient: "from-orange-400 to-amber-500",
    mainEmoji: "🏰",
    subEmojis: "☀️ 🍷 🏖️",
    mustDo: ["사그라다 파밀리아 성당에서 멍하니 감상", "보케리아 시장에서 현지 타파스에 샹그리아 한잔", "바르셀로네타 해변 모래사장에서 노을 보기"],
    luckyItem: "필름 카메라 & 크로스백",
    mate: "스위스 인터라켄 (계획적이고 든든한 메이트)",
    artwork: (
      <svg className="w-full h-32 mx-auto" viewBox="0 0 200 100" fill="none">
        <rect width="200" height="100" rx="16" fill="#F59E0B" fillOpacity="0.1" />
        <text x="30" y="65" className="text-5xl">🏰</text>
        <text x="110" y="65" className="text-4xl">🏖️</text>
        <text x="80" y="50" className="text-2xl">☀️</text>
        <path d="M10 85 Q 50 75, 100 85 T 190 85" stroke="#D97706" strokeWidth="3" fill="none" />
      </svg>
    )
  },
  IJ_WATER: {
    title: "맑은 수(水)와 산(山)의 조화",
    sub: "복잡한 머릿속을 비워줄 은빛 운명지",
    country: "스위스 인터라켄",
    time: "한국에서 비행기로 약 13시간 (경유)",
    sajuEnergy: "깊은 물과 단단한 대지의 기운이 마음의 안정을 주는 사주입니다. 거대한 알프스 설산과 에메랄드빛 호수가 당신의 모든 스트레스와 복잡한 생각을 맑게 비워주고, 오롯이 나에게 집중할 수 있는 평화를 선물합니다.",
    bgGradient: "from-sky-500 to-teal-600",
    mainEmoji: "🏔️",
    subEmojis: "🚂 🌲 🧀",
    mustDo: ["융프라우요흐 산악열차 타고 만년설 밟기", "에메랄드빛 툰 호수 유람선 타기", "따뜻한 통창 산장에서 치즈 퐁듀 맛보기"],
    luckyItem: "보온 텀블러 & 아웃도어 바람막이",
    mate: "미국 뉴욕 (텐션을 채워줄 에너지 메이트)",
    artwork: (
      <svg className="w-full h-32 mx-auto" viewBox="0 0 200 100" fill="none">
        <rect width="200" height="100" rx="16" fill="#0EA5E9" fillOpacity="0.1" />
        <path d="M20 90 L60 30 L100 90 L140 40 L180 90" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
        <text x="80" y="80" className="text-5xl">🏔️</text>
        <text x="140" y="70" className="text-3xl">🚂</text>
        <text x="15" y="40" className="text-2xl">🌲</text>
      </svg>
    )
  },
  IP_WATER: {
    title: "유유자적 흐르는 수(水)와 목(木)의 기운",
    sub: "지친 영혼을 안아줄 숲속 운명지",
    country: "태국 치앙마이",
    time: "한국에서 비행기로 약 5시간 30분",
    sajuEnergy: "물 흐르듯 온화하고 숲처럼 편안한 사주 기운입니다. 시간에 쫓기지 않고 한 달 살기 하듯 느릿하게 흘러가는 치앙마이의 숲속 로스터리 카페와 골목들이 방전된 당신의 내면을 따뜻하게 안아줄 완벽한 휴식처입니다.",
    bgGradient: "from-emerald-600 to-amber-600",
    mainEmoji: "🐘",
    subEmojis: "🏮 🌿 ☕",
    mustDo: ["올드타운 골목길 자전거 타고 구석구석 돌기", "숲속 야외 카페에서 시원한 음료 마시며 일기 쓰기", "일요일 밤 나이트마켓 야시장에서 로컬 푸드 먹기"],
    luckyItem: "에코백 & 가벼운 드로잉 노트",
    mate: "스페인 바르셀로나 (잊었던 의욕을 깨워줄 짝)",
    artwork: (
      <svg className="w-full h-32 mx-auto" viewBox="0 0 200 100" fill="none">
        <rect width="200" height="100" rx="16" fill="#10B981" fillOpacity="0.1" />
        <text x="35" y="65" className="text-5xl">🐘</text>
        <text x="105" y="55" className="text-3xl">🌿</text>
        <text x="135" y="75" className="text-2xl">🏮</text>
        <circle cx="165" cy="40" r="12" fill="#34D399" fillOpacity="0.3" />
        <path d="M10 80 C 60 90, 120 70, 190 80" stroke="#059669" strokeWidth="3" fill="none" />
      </svg>
    )
  }
};

export default function FateTravelTest() {
  const [step, setStep] = useState<'intro' | 'play' | 'loading' | 'result'>('intro');
  
  // 사주 입력 정보
  const [birthYear, setBirthYear] = useState('1998');
  const [birthMonth, setBirthMonth] = useState('05');
  const [birthDay, setBirthDay] = useState('15');
  const [birthTime, setBirthTime] = useState('오후');
  const [birthHour, setBirthHour] = useState('14');

  // 4개 성향 다이얼 (다이얼 시뮬레이터)
  const [dialE, setDialE] = useState(50); // 외향/내향 (E ↔ I)
  const [dialJ, setDialJ] = useState(50); // 계획/즉흥 (J ↔ P)
  const [dialF, setDialF] = useState(50); // 열정/고요 (FIRE ↔ WATER)
  const [dialA, setDialA] = useState(50); // 활동/사색 (ACT ↔ THK)

  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false); // 나침반 회전 상태

  const calculateResult = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      const eOrI = dialE >= 50 ? 'E' : 'I';
      const jOrP = dialJ >= 50 ? 'J' : 'P';
      const elem = dialF >= 50 ? 'FIRE' : 'WATER';
      
      const key = `${eOrI}${jOrP}_${elem}`;
      setStep('result');
    }, 1800);
  };

  const getSajuKey = () => {
    const eOrI = dialE >= 50 ? 'E' : 'I';
    const jOrP = dialJ >= 50 ? 'J' : 'P';
    const elem = dialF >= 50 ? 'FIRE' : 'WATER';
    return `${eOrI}${jOrP}_${elem}`;
  };

  const cur = RESULTS[getSajuKey()] || RESULTS['IJ_WATER'];

  const handleShare = async () => {
    const shareData = {
      title: '사주 X 성향 운명의 세계 여행지 ✈️',
      text: `내 사주 기운이 점지한 운명 여행지는 [${cur.country}]! (${cur.time}) 너도 다이얼 돌리고 알아봐ㅋㅋㅋ`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] py-8 px-4 flex justify-center text-stone-800">
      <style>{`
        @font-face {
          font-family: 'MemomentKkukkkuk';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2403@1.0/MemomentKkukkkuk.woff2') format('woff2');
          font-weight: normal;
          font-display: swap;
        }
        .kkuk-font, .kkuk-font * {
          font-family: 'MemomentKkukkkuk', "Pretendard Variable", cursive, sans-serif !important;
        }
      `}</style>

      <div className="w-full max-w-md kkuk-font">
        
        {/* 1. 시작 화면 */}
        {step === 'intro' && (
          <div className="bg-[#FFF9ED] p-7 rounded-[32px] border-2 border-stone-800 text-center space-y-5">
            <div className="bg-amber-100/60 border-2 border-stone-800 rounded-2xl p-4">
              <span className="text-5xl block mb-2 animate-bounce">🧭</span>
              <h2 className="text-sm font-bold text-amber-900">사주 명반 x 성향 만다라 분석</h2>
            </div>

            <div>
              <span className="text-xs bg-amber-800 text-white px-3.5 py-1 rounded-full uppercase tracking-widest">
                나침반 시뮬레이터
              </span>
              <h1 className="text-2xl font-black text-stone-900 mt-3.5 leading-snug">
                사주 X 성향 기운으로 찾는<br />운명의 세계 여행지
              </h1>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                출생일시와 나의 평소 성향 다이얼을 직접 조절해<br />
                우주적 기운과 가장 잘 공명하는 지구상의 도시를 찾아보세요.
              </p>
            </div>

            <button
              onClick={() => setStep('play')}
              className="w-full py-4 bg-amber-300 hover:bg-amber-400 text-stone-900 font-bold text-lg rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] transition"
            >
              사주 나침반 조작하러 가기 ➔
            </button>
          </div>
        )}

        {/* 2. 대화형 다이얼 사주 입력 화면 (실제 나침반 조작) */}
        {step === 'play' && (
          <div className="bg-[#FFF9ED] p-6 rounded-[32px] border-2 border-stone-800 space-y-6">
            
            {/* 상단 사주 나침반 그래픽 (돌아가거나 실시간 반응) */}
            <div className="text-center">
              <div className="relative w-36 h-36 mx-auto mb-2 flex items-center justify-center">
                <div 
                  className={`absolute inset-0 border-4 border-dashed border-amber-800/40 rounded-full transition-transform duration-1000 ${isRotating ? 'animate-spin' : ''}`}
                  style={{ transform: `rotate(${(dialE + dialJ + dialF + dialA) * 1.5}deg)` }}
                />
                <div className="text-4xl">🔮</div>
                <div className="absolute top-1 text-stone-500 font-bold text-[9px]">北 (水)</div>
                <div className="absolute bottom-1 text-stone-500 font-bold text-[9px]">南 (火)</div>
                <div className="absolute left-1 text-stone-500 font-bold text-[9px]">西 (金)</div>
                <div className="absolute right-1 text-stone-500 font-bold text-[9px]">東 (木)</div>
              </div>
              <p className="text-[10px] text-stone-500">다이얼과 사주를 설정할 때마다 나침반이 반응합니다.</p>
            </div>

            {/* 사주 텍스트 필드 */}
            <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 space-y-3">
              <span className="text-xs font-bold text-amber-900 block border-b border-stone-100 pb-1.5">🕒 태어난 때 (사주 사입)</span>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 mb-0.5">태어난 년</span>
                  <input type="number" value={birthYear} onChange={e=>setBirthYear(e.target.value)} className="p-2 border border-stone-400 rounded-lg text-center" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 mb-0.5">월</span>
                  <input type="number" value={birthMonth} onChange={e=>setBirthMonth(e.target.value)} className="p-2 border border-stone-400 rounded-lg text-center" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-500 mb-0.5">일</span>
                  <input type="number" value={birthDay} onChange={e=>setBirthDay(e.target.value)} className="p-2 border border-stone-400 rounded-lg text-center" />
                </div>
              </div>
            </div>

            {/* 대화형 다이얼 & 슬라이더 (사용자 감성 직접 튜닝) */}
            <div className="space-y-4 p-4 bg-white rounded-2xl border-2 border-stone-800">
              <span className="text-xs font-bold text-amber-900 block border-b border-stone-100 pb-1.5">📊 나의 평소 기운 조절</span>
              
              {/* E vs I */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className={dialE < 40 ? 'opacity-50' : ''}>🏃 왁자지껄 활발함</span>
                  <span className={dialE >= 40 ? 'opacity-50' : ''}>☕ 조용하고 혼자가 좋아</span>
                </div>
                <input type="range" min="0" max="100" value={dialE} onChange={e=>setDialE(Number(e.target.value))} className="w-full accent-amber-800 cursor-pointer h-1.5 bg-stone-100 rounded-full" />
              </div>

              {/* J vs P */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className={dialJ < 40 ? 'opacity-50' : ''}>📝 초단위 꼼꼼한 계획</span>
                  <span className={dialJ >= 40 ? 'opacity-50' : ''}>🎒 바람 따라 즉흥 발길</span>
                </div>
                <input type="range" min="0" max="100" value={dialJ} onChange={e=>setDialJ(Number(e.target.value))} className="w-full accent-amber-800 cursor-pointer h-1.5 bg-stone-100 rounded-full" />
              </div>

              {/* FIRE vs WATER */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className={dialF < 40 ? 'opacity-50' : ''}>🔥 뜨거운 열정 & 직진</span>
                  <span className={dialF >= 40 ? 'opacity-50' : ''}>🌊 차분히 스며드는 고요</span>
                </div>
                <input type="range" min="0" max="100" value={dialF} onChange={e=>setDialF(Number(e.target.value))} className="w-full accent-amber-800 cursor-pointer h-1.5 bg-stone-100 rounded-full" />
              </div>
            </div>

            {/* 연사 실행 */}
            <button
              onClick={calculateResult}
              disabled={isRotating}
              className="w-full py-4 bg-amber-800 hover:bg-amber-900 text-white font-bold text-lg rounded-2xl shadow-[4px_4px_0px_#1c1917] border-2 border-stone-900 active:translate-x-[2px] active:translate-y-[2px] transition flex items-center justify-center gap-2"
            >
              <span>{isRotating ? '⏳ 사주 판 대조 중...' : '🔮 나침반 돌려 사주 점치기'}</span>
            </button>
          </div>
        )}

        {/* 3. 로딩 연출 */}
        {step === 'loading' && (
          <div className="bg-[#FFF9ED] p-8 rounded-[32px] border-2 border-stone-800 text-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold">동서남북 기운 대조 중...</h3>
            <p className="text-xs text-stone-500">당신의 사주와 기운이 가장 강하게 공명하는 공항 탐색 중 ✈️</p>
          </div>
        )}

        {/* 4. 결과 리포트 */}
        {step === 'result' && (
          <div className="space-y-4">
            <div className="bg-[#FFF9ED] p-6 rounded-[32px] border-2 border-stone-800 shadow-[4px_4px_0px_#1c1917] text-center space-y-5">
              
              <div className="space-y-1">
                <span className="text-[10px] bg-amber-200 border border-stone-800 px-3 py-0.5 rounded-full inline-block">
                  {birthYear}년 {birthMonth}월 {birthDay}일 {birthTime} {birthHour}시 사주 점괘
                </span>
                <p className="text-xs text-amber-900 font-bold mt-1.5">{cur.sub}</p>
                <h2 className="text-3xl font-black text-stone-900 mt-1">{cur.country}</h2>
                <span className="text-xs bg-white border border-stone-800 px-2.5 py-0.5 rounded-lg mt-2 inline-block">
                  ✈️ {cur.time}
                </span>
              </div>

              {/* 내장 SVG 일러스트 카드 (절대 안 깨짐) */}
              <div className="border-2 border-stone-800 rounded-3xl overflow-hidden bg-white shadow-inner">
                {cur.artwork}
              </div>

              {/* 총평 */}
              <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 text-left space-y-1">
                <span className="text-xs font-bold text-amber-900">🔮 사주오행 기운 분석 [ {cur.title} ]</span>
                <p className="text-xs text-stone-600 leading-relaxed font-semibold">{cur.sajuEnergy}</p>
              </div>

              {/* 버킷리스트 */}
              <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 text-left">
                <span className="text-xs font-bold text-stone-900 block mb-2">📌 가서 꼭 해야 할 운명 버킷리스트</span>
                <ul className="text-xs text-stone-600 space-y-1">
                  {cur.mustDo.map((item, idx) => (
                    <li key={idx} className="flex gap-1">
                      <span>•</span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 사주 럭키 아이템 & 메이트 */}
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                <div className="p-3 bg-white rounded-2xl border-2 border-stone-800">
                  <strong className="block text-[10px] text-amber-900 mb-0.5">🍀 행운의 아이템</strong>
                  <span className="font-semibold">{cur.luckyItem}</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border-2 border-stone-800">
                  <strong className="block text-[10px] text-amber-900 mb-0.5">🤝 천생연분 메이트</strong>
                  <span className="font-semibold truncate block">{cur.mate}</span>
                </div>
              </div>

            </div>

            {/* 원클릭 카톡 단톡방 공유 */}
            <button
              onClick={handleShare}
              className="w-full py-4 bg-[#FEE500] hover:bg-[#FDD800] text-stone-900 font-bold text-base rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] transition flex items-center justify-center gap-2"
            >
              <span>💬</span>
              <span>{copied ? "✅ 링크 복사 완료! 단톡방에 붙여넣기" : "단톡방에 내 운명 여행지 투척하기"}</span>
            </button>

            {/* 다시 하기 & 홈 */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setStep('intro'); }}
                className="py-3 bg-stone-800 hover:bg-stone-700 text-white text-xs rounded-xl border-2 border-stone-900 transition"
              >
                🔄 다시 점치기
              </button>
              <Link
                href="/"
                className="py-3 bg-white hover:bg-stone-50 text-stone-900 text-xs text-center rounded-xl border-2 border-stone-900 transition"
              >
                🏠 연구소 홈으로
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
