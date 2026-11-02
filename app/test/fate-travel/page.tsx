'use client';

import { useState } from 'react';
import Link from 'next/link';

// 질문 7문항 (사주 성향 매칭을 위한 오행 성향 수집)
const QUESTIONS = [
  {
    text: "여행 준비할 때 당신의 '마음가짐'은?",
    a: { text: "초단위로 동선이랑 평점 확인하며 엑셀로 기록 📝", type: 'J' },
    b: { text: "여권이랑 지갑만 있으면 어디든 축제지, 일단 출발 🎒", type: 'P' }
  },
  {
    text: "낯선 여행지에 도착하자마자 몸이 반응하는 쪽은?",
    a: { text: "유명한 맛집, 액티비티, 랜드마크로 쉴 틈 없이 직진 🏃", type: 'E' },
    b: { text: "조용하고 풍경 좋은 골목길 카페나 공원 벤치에 착석 ☕", type: 'I' }
  },
  {
    text: "여행 중 예상치 못하게 비가 쏟아져 계획이 꼬인다면?",
    a: { text: "날씨 앱이랑 플랜B 실시간 가동, 실내 미술관/맛집 검색 🗺️", type: 'J' },
    b: { text: "카페 창가에 앉아서 빗소리 감상, 이것도 나름 감성이지 🌧️", type: 'P' }
  },
  {
    text: "어떤 숙소에서 잘 때 '돈값 했다'고 느껴지나요?",
    a: { text: "접근성 최고, 시끌벅적하고 교류가 활발한 게스트하우스나 가성비 호텔 🏨", type: 'E' },
    b: { text: "자연 속에 묻혀 조용하게 사색할 수 있는 감성 에어비앤비나 료칸 🌲", type: 'I' }
  },
  {
    text: "낯선 외국인 상인이 물건값을 바가지 씌우는 것 같을 때",
    a: { text: "기세로 밀어붙여 흥정하거나, 칼같이 거절하고 돌아섬 😤", type: 'FIRE' },
    b: { text: "말하기 피곤해서 그냥 사거나 조용히 다른 가게로 이동함 🤫", type: 'WATER' }
  },
  {
    text: "여행 중 가장 행복하다고 느끼는 순간은?",
    a: { text: "뜨거운 열정 속 쇼핑, 밤거리 야시장, 화려한 불빛 속 🏮", type: 'FIRE' },
    b: { text: "나무 가득한 숲, 바다, 고요한 유적지에서 불어오는 바람 🍃", type: 'WATER' }
  },
  {
    text: "나에게 세계 여행이란?",
    a: { text: "내 한계를 깨고 끊임없이 자극을 얻는 모험 🧭", type: 'FIRE' },
    b: { text: "바쁜 일상에서 벗어나 영혼을 채우는 힐링 🕯️", type: 'WATER' }
  }
];

// 사주 X 성향 조합별 맞춤 여행지 결과 데이터
interface TravelResult {
  title: string;
  sub: string;
  country: string;
  time: string;
  sajuEnergy: string;
  illustration: string; // 이모티콘 및 그래픽
  desc: string;
  mustDo: string[];
  luckyItem: string;
  mate: string;
}

const RESULTS: Record<string, TravelResult> = {
  'EJ_FIRE': {
    title: "열정의 화(火) 기운 대폭발",
    sub: "당신의 운명 여행지",
    country: "미국 뉴욕 (New York)",
    time: "대한민국에서 비행기로 약 14시간",
    sajuEnergy: "사주에 가득한 뜨거운 열정과 진취적인 기운이 뉴욕의 끊임없는 에너지와 만나 잠들었던 야망을 깨웁니다. 한순간도 지루할 틈이 없는 불야성의 도시가 당신의 사주와 찰떡궁합입니다.",
    illustration: "🗽🌆✨",
    mustDo: ["타임스퀘어 밤거리 걷기", "브로드웨이 뮤지컬 관람", "엠파이어 스테이트 빌딩 야경"],
    luckyItem: "화려한 선글라스 & 가벼운 운동화",
    mate: "태국 치앙마이 (조용하고 차분한 상호보완)"
  },
  'EP_FIRE': {
    title: "자유로운 바람의 화(火) 기운",
    sub: "당신의 운명 여행지",
    country: "스페인 바르셀로나 (Barcelona)",
    time: "대한민국에서 비행기로 약 14시간 30분",
    sajuEnergy: "즉흥적이고 사교적인 당신의 기질은 정열적인 태양과 예술이 가득한 바르셀로나에서 빛을 발합니다. 사주의 자유로운 활력이 축제 같은 도시의 온도를 온전히 즐길 수 있게 돕습니다.",
    illustration: "🎡🇪🇸🏖️",
    mustDo: ["가우디 성당 앞에서 멍때리기", "보케리아 시장에서 타파스 투어", "바르셀네타 해변에서 일몰"],
    luckyItem: "카메라 & 동전 지갑",
    mate: "일본 교토 (사색과 여백을 채워줄 짝)"
  },
  'IJ_WATER': {
    title: "사색하는 수(水)와 토(土)의 조화",
    sub: "당신의 운명 여행지",
    country: "스위스 인터라켄 (Interlaken)",
    time: "대한민국에서 비행기로 약 12~13시간 (경유 포함)",
    sajuEnergy: "깊은 물과 단단한 흙의 기운이 마음의 안정을 주는 사주입니다. 거대한 자연과 평화로운 알프스가 당신의 복잡한 머릿속을 맑게 비워주고 오롯이 나에게 집중할 수 있는 최고의 여유를 선물합니다.",
    illustration: "🏔️🚂🌲",
    mustDo: ["융프라우요흐 기차 여행", "호숫가 산책로 걷기", "밤하늘 은하수 관찰"],
    luckyItem: "텀블러 & 아웃도어 바람막이",
    mate: "미국 뉴욕 (자극과 영감을 줄 활력의 짝)"
  },
  'IP_WATER': {
    title: "유유자적 흐르는 수(水) 기운",
    sub: "당신의 운명 여행지",
    country: "태국 치앙마이 (Chiang Mai)",
    time: "대한민국에서 비행기로 약 6시간",
    sajuEnergy: "물 흐르듯 평온하고 평화로운 기운을 지닌 사주입니다. 시간에 쫓기지 않고 한 달 살기 하듯 느릿하게 흘러가는 치앙마이의 숲과 카페들이 지친 당신의 영혼을 따뜻하게 안아줄 운명입니다.",
    illustration: "🏮🌿🐘",
    mustDo: ["올드타운 골목길 자전거 타기", "숲속 카페에서 독서", "야시장에서 팟타이 먹기"],
    luckyItem: "가벼운 에코백 & 드로잉 노트",
    mate: "스페인 바르셀로나 (잊었던 열정을 깨워줄 짝)"
  }
};

export default function FateTravelTest() {
  const [step, setStep] = useState<'intro' | 'saju' | 'quiz' | 'loading' | 'result'>('intro');
  const [birthYear, setBirthYear] = useState('1998');
  const [birthMonth, setBirthMonth] = useState('05');
  const [birthDay, setBirthDay] = useState('15');
  const [birthTime, setBirthTime] = useState('오후');
  const [birthHour, setBirthHour] = useState('14');
  const [quizIdx, setQuizIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ J: 0, P: 0, E: 0, I: 0, FIRE: 0, WATER: 0 });
  const [resKey, setResKey] = useState<string>('IJ_WATER');
  const [copied, setCopied] = useState(false);

  const handleSajuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('quiz');
  };

  const onSelect = (type: string) => {
    const nextScores = { ...scores, [type]: (scores[type] || 0) + 1 };
    setScores(nextScores);

    if (quizIdx + 1 < QUESTIONS.length) {
      setQuizIdx(quizIdx + 1);
    } else {
      // 결과 조합 분석
      const MBTI_J = nextScores.J > nextScores.P ? 'J' : 'P';
      const MBTI_E = nextScores.E > nextScores.I ? 'E' : 'I';
      const ELEMENT = nextScores.FIRE > nextScores.WATER ? 'FIRE' : 'WATER';
      
      const key = `${MBTI_E}${MBTI_J}_${ELEMENT}`;
      setResKey(RESULTS[key] ? key : 'IJ_WATER');
      
      setStep('loading');
      setTimeout(() => setStep('result'), 2200);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: '사주 X 성향 운명의 세계 여행지 진단 ✈️',
      text: `사주로 분석한 내 운명 여행지는: ${RESULTS[resKey].country}! 너도 태어난 시간 넣고 알아봐ㅋㅋㅋ`,
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

  const cur = RESULTS[resKey];

  return (
    <main className="min-h-screen bg-[#FFFDF9] py-8 px-4 flex justify-center text-stone-800 antialiased font-memoment">
      <div className="w-full max-w-md">

        {/* 1. 인트로 화면 */}
        {step === 'intro' && (
          <div className="bg-[#FCF9F2] p-8 rounded-[36px] shadow-md border-4 border-amber-900/10 text-center relative overflow-hidden">
            <span className="text-6xl block mb-4 animate-bounce">🧭</span>
            <span className="text-[11px] font-black tracking-widest text-amber-800 bg-amber-100 border border-amber-200 px-3.5 py-1 rounded-full">
              사주팔자 X 여행 성향
            </span>
            <h1 className="text-3xl font-bold text-stone-900 mt-4 leading-tight">
              태어난 시간으로 보는<br />운명의 세계 여행지 ✈️
            </h1>
            <p className="text-xs font-semibold text-stone-500 mt-3 mb-8 leading-relaxed">
              사주에 흐르는 오행의 기운과 나의 진짜 성향을 조합해,<br />
              전 세계 방방곡곡 중 나와 기운이 딱 맞는 최고의 여행지를 찾아줍니다.
            </p>

            <button
              onClick={() => setStep('saju')}
              className="w-full py-4 bg-amber-800 hover:bg-amber-900 text-white font-black text-base rounded-2xl shadow-lg transition active:scale-[0.98]"
            >
              운명의 여정 시작하기 (2분 소요)
            </button>
            <p className="text-[10px] text-stone-400 mt-4">사주 분석 데이터는 저장되지 않고 안전하게 폐기됩니다.</p>
          </div>
        )}

        {/* 2. 사주 입력 화면 */}
        {step === 'saju' && (
          <div className="bg-[#FCF9F2] p-7 rounded-[36px] shadow-md border-4 border-amber-900/10">
            <h2 className="text-2xl font-bold text-stone-900 mb-1">태어난 시간 입력 🕰️</h2>
            <p className="text-xs text-stone-500 mb-6 font-semibold">정확한 사주 오행 매칭을 위해 생년월일시를 선택해 주세요.</p>
            
            <form onSubmit={handleSajuSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">태어난 년도</label>
                  <input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-stone-300 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-800 text-center"
                    placeholder="YYYY"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">태어난 월</label>
                  <input
                    type="number"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-stone-300 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-800 text-center"
                    placeholder="MM"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">태어난 일</label>
                  <input
                    type="number"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-stone-300 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-800 text-center"
                    placeholder="DD"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">태어난 시간대</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBirthTime('오전')}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition ${birthTime === '오전' ? 'bg-amber-800 border-amber-800 text-white' : 'bg-white border-stone-300 text-stone-700'}`}
                  >
                    오전 (AM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBirthTime('오후')}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition ${birthTime === '오후' ? 'bg-amber-800 border-amber-800 text-white' : 'bg-white border-stone-300 text-stone-700'}`}
                  >
                    오후 (PM)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">상세 시간(시)</label>
                <select
                  value={birthHour}
                  onChange={(e) => setBirthHour(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-stone-300 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-800"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>{h}시</option>
                  ))}
                  <option value="Unknown">모름</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-black text-white font-black text-sm rounded-xl transition active:scale-[0.98] mt-4"
              >
                사주 입력 완료 후 성향 파악하기 ➔
              </button>
            </form>
          </div>
        )}

        {/* 3. 성향 퀴즈 화면 */}
        {step === 'quiz' && (
          <div className="bg-[#FCF9F2] p-7 rounded-[36px] shadow-md border-4 border-amber-900/10">
            <div className="w-full bg-stone-200 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-amber-800 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((quizIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-amber-800">문항 {quizIdx + 1} / {QUESTIONS.length}</span>
            <h2 className="text-lg font-bold text-stone-900 mt-1 mb-6 leading-relaxed">
              {QUESTIONS[quizIdx].text}
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => onSelect(QUESTIONS[quizIdx].a.type)}
                className="w-full p-4 text-left bg-white border-2 border-stone-200 hover:border-amber-800 rounded-2xl text-xs font-semibold text-stone-700 transition active:scale-[0.99]"
              >
                {QUESTIONS[quizIdx].a.text}
              </button>
              <button
                onClick={() => onSelect(QUESTIONS[quizIdx].b.type)}
                className="w-full p-4 text-left bg-white border-2 border-stone-200 hover:border-amber-800 rounded-2xl text-xs font-semibold text-stone-700 transition active:scale-[0.99]"
              >
                {QUESTIONS[quizIdx].b.text}
              </button>
            </div>
          </div>
        )}

        {/* 4. 사주 분석 로딩 */}
        {step === 'loading' && (
          <div className="text-center py-28">
            <div className="w-14 h-14 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-800">사주 오행 및 성향 융합 분석 중...</h3>
            <p className="text-xs text-stone-500 mt-1 font-semibold">동서남북 기운에 맞는 전 세계 공항 탐색 중 ✈️</p>
          </div>
        )}

        {/* 5. 최종 결과 레포트 */}
        {step === 'result' && (
          <div className="space-y-5">
            <div className="bg-[#FCF9F2] p-7 rounded-[42px] shadow-lg border-4 border-amber-900/10 text-center relative overflow-hidden">
              <span className="text-xs font-black text-amber-800 bg-amber-100 border border-amber-200 px-3.5 py-1 rounded-full">
                {cur.sub}
              </span>
              <h2 className="text-2xl font-black text-stone-900 mt-2">{cur.country}</h2>
              <span className="text-xs font-bold text-stone-500 bg-stone-200/50 px-2.5 py-0.5 rounded-md mt-1 inline-block">
                🕒 {cur.time}
              </span>

              {/* 일러스트 카드 (일러스트 따와서 예쁘게 하는 이미지 영역) */}
              <div className="my-6">
                <img src="/image_2.png" alt="Travel Saju Destiny" className="w-full h-auto rounded-3xl" />
              </div>

              {/* 사주 분석 총평 */}
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border border-stone-200 text-left space-y-2">
                <span className="text-[10px] font-bold text-amber-800">🔮 사주 오행 총평 [{cur.title}]</span>
                <p className="text-xs text-stone-700 leading-relaxed font-semibold">
                  {cur.sajuEnergy}
                </p>
              </div>

              {/* 머스트 두 액티비티 */}
              <div className="mt-4 pt-4 border-t-2 border-dashed border-stone-300/60 text-left">
                <h4 className="text-xs font-bold text-stone-900 mb-2">꼭 해봐야 할 운명 액티비티 📌</h4>
                <ul className="text-xs text-stone-600 space-y-1">
                  {cur.mustDo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-amber-800">•</span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 운명의 부적/아이템 & 궁합 */}
              <div className="grid grid-cols-2 gap-2 text-left mt-4 text-[11px]">
                <div className="p-3 bg-[#FFF] rounded-2xl border border-stone-200">
                  <span className="text-stone-800 font-bold block mb-0.5">🧧 행운의 동반 아이템</span>
                  <span className="text-stone-500 font-semibold">{cur.luckyItem}</span>
                </div>
                <div className="p-3 bg-[#FFF] rounded-2xl border border-stone-200">
                  <span className="text-stone-800 font-bold block mb-0.5">🤝 천생연분 동행자</span>
                  <span className="text-stone-500 font-semibold">{cur.mate}</span>
                </div>
              </div>
            </div>

            {/* 원클릭 카톡 단톡방 공유 버튼 */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleShare}
                className="w-full py-4 bg-[#FEE500] hover:bg-[#FDD800] text-black font-black text-sm rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>{copied ? "✅ 링크 복사 완료! 단톡방에 붙여넣기" : "단톡방에 내 운명 여행지 투척하기"}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setStep('intro'); setQuizIdx(0); setScores({ J: 0, P: 0, E: 0, I: 0, FIRE: 0, WATER: 0 }); }}
                  className="py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs rounded-xl border border-stone-700 transition"
                >
                  🔄 다시 점치기
                </button>
                <Link
                  href="/"
                  className="py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs text-center rounded-xl transition"
                >
                  🏠 연구소 홈으로
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
