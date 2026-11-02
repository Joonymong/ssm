'use client';

import { useState } from 'react';
import Link from 'next/link';

// 질문 10문항 (관계 성향: 에너지 소비 vs 충전 / 칼차단 vs 무한포용)
const QUESTIONS = [
  { text: "주말 약속 1시간 전, 친구가 '오늘 너무 피곤한데 미루면 안 될까?' 카톡을 보냈다.", a: { text: "'오예! 집에서 누워있어야지' 속으로 환호하며 쿨하게 수락한다.", type: 'INDIPENDENT' }, b: { text: "이미 풀메/세팅 다 끝났는데... 서운함과 분노가 차오른다.", type: 'DEVOTED' } },
  { text: "친구가 나와 다른 친구 사이에서 은근히 나를 소외시키는 느낌이 들 때", a: { text: "'그래 너네끼리 잘 놀아라' 조용히 감정적 거리두기에 돌입한다.", type: 'DEFENSIVE' }, b: { text: "밤새 잠 못 이루며 '내가 뭘 서운하게 했나?' 곱씹는다.", type: 'DEVOTED' } },
  { text: "친구가 매번 만나기만 하면 자기 연애/직장 한탄만 2시간째 쏟아낼 때", a: { text: "'그래서 어떻게 하고 싶은데?' 해결책을 던져 대화를 끝내려 한다.", type: 'SOLVER' }, b: { text: "영혼까지 털리면서도 고개 끄덕이며 리액션 머신이 되어준다.", type: 'DEVOTED' } },
  { text: "오랜만에 만난 친구가 은근히 내 연봉이나 소지품을 떠보며 비교할 때", a: { text: "가소롭다는 눈빛으로 대충 웃어넘기고 속으로 관계 정리 명단에 올린다.", type: 'DEFENSIVE' }, b: { text: "불편한 분위기 만들기 싫어서 칭찬해주며 화제를 돌린다.", type: 'INDIPENDENT' } },
  { text: "카톡 읽씹(1 사라지고 답장 없음)을 당했을 때 내 뇌내 회로", a: { text: "'바쁜가 보지' 하고 1초 만에 잊어버린다.", type: 'INDIPENDENT' }, b: { text: "'내가 아까 말을 잘못했나?' 이전 대화창을 위로 올려 복기한다.", type: 'DEVOTED' } },
  { text: "친구가 큰 잘못을 저지르고 울면서 사과할 때 나의 태도는?", a: { text: "사과는 받지만 예전과 같은 온도로 지내는 건 불가능하다.", type: 'DEFENSIVE' }, b: { text: "마음이 약해져서 '다신 그러지 마' 하고 결국 품어준다.", type: 'DEVOTED' } },
  { text: "내가 생각하는 가장 이상적인 친구와의 만남 주기는?", a: { text: "반년에 한 번 봐도 어제 본 것처럼 편한 미니멀 만남.", type: 'INDIPENDENT' }, b: { text: "사소한 일상도 메신저로 실시간 공유하는 끈끈한 유대.", type: 'SOLVER' } },
  { text: "친구의 생일, 선물을 고를 때 나의 기준은?", a: { text: "카카오톡 위시리스트나 실용적인 기프티콘으로 깔끔하게.", type: 'SOLVER' }, b: { text: "친구가 흘려 말했던 취향을 기억해두고 감동 카드까지 준비.", type: 'DEVOTED' } },
  { text: "단톡방에서 친구들끼리 의견이 갈려 미묘한 기싸움이 시작될 때", a: { text: "알림 끄고 팝콘 뜯으며 상황 종료될 때까지 관망한다.", type: 'INDIPENDENT' }, b: { text: "분위기 풀려고 뜬금없는 유머 짤을 올리며 중재를 시도한다.", type: 'SOLVER' } },
  { text: "나에게 '진짜 친구'란 어떤 존재인가?", a: { text: "각자의 삶을 존중하며 서로에게 짐이 되지 않는 느슨한 연대.", type: 'DEFENSIVE' }, b: { text: "내 모든 치부와 결핍까지 안전하게 털어놓을 수 있는 안식처.", type: 'SOLVER' } }
];

interface FriendResult {
  grade: string;
  badge: string;
  title: string;
  tagline: string;
  energyPercent: number;
  traits: string[];
  bestFriend: string;
  worstFriend: string;
  diagnosis: string;
  accentColor: string;
}

const RESULTS: Record<string, FriendResult> = {
  INDIPENDENT: {
    grade: "A-",
    badge: "사회적 거리두기 1급",
    title: "산소호흡기형 미니멀리스트",
    tagline: "친구는 좋지만 내 침대와 혼자만의 시간이 3배 더 소중함",
    energyPercent: 42,
    traits: [
      "카톡 안 읽은 숫자 99+ 유지해도 죄책감 0%",
      "갑자기 파토 난 주말 약속에 내심 희열 느낌",
      "남 일에 참견 안 하고 내 삶에도 간섭 거부"
    ],
    bestFriend: "똑같이 연락 뜸해도 편한 쿨한 개인주의자",
    worstFriend: "매일 카톡 안 하면 '변했다' 징징대는 감정 과몰입러",
    diagnosis: "혼자만의 충전 시간이 필수인 유형입니다. 친구를 싫어하는 게 아니라 관계에 낭비되는 에너지를 본능적으로 방어합니다. 억지로 모임에 나가기보다 깊고 좁은 무공해 관계를 유지할 때 멘탈이 가장 평온합니다.",
    accentColor: "from-sky-500 to-indigo-600"
  },
  DEVOTED: {
    grade: "S+",
    badge: "우정 지분율 99% 대주주",
    title: "영혼 갈아 넣는 인간 방음벽",
    tagline: "친구 고민 듣다가 내 수명이 먼저 깎여나가는 감정 호구",
    energyPercent: 95,
    traits: [
      "친구 생일 3주 전부터 선물 고민에 시달림",
      "상대방 작은 표정 변화에도 '나 때문인가' 자책",
      "부탁 거절 못 해서 결국 내 일정 다 꼬임"
    ],
    bestFriend: "내 헌신을 당연하게 여기지 않고 보답해주는 성숙한 인연",
    worstFriend: "단물만 쏙 빼먹고 필요할 때만 찾는 감정 뱀파이어",
    diagnosis: "주변 사람의 감정 쓰레기통 역할을 자처하기 쉽습니다. 상대를 챙기느라 정작 본인의 마음은 멍투성이가 됩니다. '모두에게 좋은 사람일 필요는 없다'는 사실을 기억하고 의도적인 거절 연습이 시급합니다.",
    accentColor: "from-rose-500 to-pink-600"
  },
  DEFENSIVE: {
    grade: "B+",
    badge: "손절 레이더 상시 가동 중",
    title: "철벽 바리케이드 심사위원",
    tagline: "선 넘는 순간 조용히 영구 차단 목록으로 이동",
    energyPercent: 28,
    traits: [
      "상대방이 무례하게 굴면 겉으론 웃고 속으론 손절 각 재기",
      "비밀이나 약점은 절대 먼저 오픈하지 않음",
      "관계에 상처받기 싫어서 애초에 기대치를 0으로 세팅"
    ],
    bestFriend: "선 넘지 않고 서로의 경계를 지켜주는 예의 바른 사람",
    worstFriend: "친하다는 핑계로 사생활 캐묻고 선 넘는 오지랖퍼",
    diagnosis: "과거 인간관계에서 깊은 내상을 입었을 확률이 높습니다. 자기 방어 기제가 매우 뛰어나 손해 볼 일은 적지만, 새로운 인연이 내 마음의 벽을 넘기까지 지나치게 가혹한 심사 기준을 적용하고 있습니다.",
    accentColor: "from-amber-500 to-orange-600"
  },
  SOLVER: {
    grade: "A+",
    badge: "팩트 기반 우정 해결사",
    title: "인간관계 솔루션 상담소장",
    tagline: "징징거림에는 데이터와 해결책으로 맞받아치는 현실파",
    energyPercent: 68,
    traits: [
      "친구 연애사 들으면 '당장 헤어져' 결론부터 제시",
      "말뿐인 위로보다 맛있는 밥 사주는 게 낫다고 생각",
      "친구들 모임에서 약속 장소, 동선 도맡아 예약"
    ],
    bestFriend: "티키타카 잘 통하고 논리적인 대화가 되는 친구",
    worstFriend: "답정너 질문해놓고 조언해주면 삐지는 감정 과부하러",
    diagnosis: "친구들에게 가장 든든한 멘토이자 기둥입니다. 다만 친구가 원하는 것이 '논리적 솔루션'이 아니라 단순한 '영혼 없는 맞장구'일 때도 있다는 점을 인정하면 관계가 한층 부드러워집니다.",
    accentColor: "from-emerald-500 to-teal-600"
  }
};

export default function FriendGradeTest() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ INDIPENDENT: 0, DEVOTED: 0, DEFENSIVE: 0, SOLVER: 0 });
  const [resKey, setResKey] = useState<string>('INDIPENDENT');

  const onSelect = (type: string) => {
    const nextScores = { ...scores, [type]: (scores[type] || 0) + 1 };
    setScores(nextScores);

    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      let maxKey = 'INDIPENDENT';
      let maxVal = -1;
      Object.entries(nextScores).forEach(([k, v]) => {
        if (v > maxVal) {
          maxVal = v;
          maxKey = k;
        }
      });
      setResKey(maxKey);
      setStep('loading');
      setTimeout(() => setStep('result'), 1700);
    }
  };

  const cur = RESULTS[resKey];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-10 px-4 flex justify-center text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
      <div className="w-full max-w-md relative">
        
        {/* 은은한 배경 오로라 빛 효과 */}
        <div className="absolute top-10 -left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* 1. 시작 화면 */}
        {step === 'intro' && (
          <div className="relative backdrop-blur-xl bg-white/[0.07] border border-white/20 p-8 rounded-3xl shadow-2xl text-center mt-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30">
              📊
            </div>
            <span className="text-[11px] font-black tracking-widest text-purple-300 uppercase bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full">
              Relationship Report
            </span>
            <h1 className="text-2xl font-black text-white mt-4 tracking-tight">
              나의 친구관계 성적표 진단
            </h1>
            <p className="text-xs text-slate-300 mt-2 mb-8 leading-relaxed">
              나는 과연 몇 점짜리 친구일까?<br />
              숨겨진 우정 방어 기제와 에너지 소모율 정밀 분석
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white font-black text-sm rounded-2xl shadow-xl shadow-purple-600/30 transition active:scale-[0.98]"
            >
              내 우정 성적표 발급받기 (1분)
            </button>
          </div>
        )}

        {/* 2. 질문 화면 */}
        {step === 'quiz' && (
          <div className="relative backdrop-blur-xl bg-white/[0.08] border border-white/20 p-6 rounded-3xl shadow-2xl mt-6">
            <div className="w-full bg-white/10 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-purple-300 tracking-wider">QUESTION {idx + 1}</span>
              <span className="text-[11px] text-slate-400 font-semibold">{idx + 1} / {QUESTIONS.length}</span>
            </div>
            <h2 className="text-base font-bold text-white mt-1 mb-6 leading-relaxed">
              {QUESTIONS[idx].text}
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => onSelect(QUESTIONS[idx].a.type)}
                className="w-full p-4 text-left backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-purple-400/60 rounded-2xl text-xs font-semibold text-slate-200 transition active:scale-[0.99] leading-snug"
              >
                {QUESTIONS[idx].a.text}
              </button>
              <button
                onClick={() => onSelect(QUESTIONS[idx].b.type)}
                className="w-full p-4 text-left backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-purple-400/60 rounded-2xl text-xs font-semibold text-slate-200 transition active:scale-[0.99] leading-snug"
              >
                {QUESTIONS[idx].b.text}
              </button>
            </div>
          </div>
        )}

        {/* 3. 로딩 화면 */}
        {step === 'loading' && (
          <div className="text-center py-28">
            <div className="w-14 h-14 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-base font-black text-white">관계 데이터 채점 중...</h3>
            <p className="text-xs text-purple-300/80 mt-1">감정 소모율 및 손절 방어벽 측정 중</p>
          </div>
        )}

        {/* 4. 고퀄리티 성적표 결과 카드 */}
        {step === 'result' && (
          <div className="space-y-4">
            <div className="relative backdrop-blur-2xl bg-white/[0.09] border border-white/25 rounded-3xl p-6 shadow-2xl overflow-hidden">
              
              {/* 상단 뱃지 & 등급 */}
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">
                    {cur.badge}
                  </span>
                  <h2 className="text-xl font-black text-white mt-1">{cur.title}</h2>
                  <p className="text-[11px] text-slate-300 mt-0.5">"{cur.tagline}"</p>
                </div>
                <div className={`px-4 py-2 rounded-2xl bg-gradient-to-br ${cur.accentColor} text-white font-black text-2xl shadow-lg shrink-0 ml-2`}>
                  {cur.grade}
                </div>
              </div>

              {/* 관계 에너지 소모율 게이지 */}
              <div className="my-5 p-4 rounded-2xl bg-black/20 border border-white/10">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">⚡ 관계 시 감정 소모율</span>
                  <span className="text-purple-300">{cur.energyPercent}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${cur.accentColor} transition-all duration-500`}
                    style={{ width: `${cur.energyPercent}%` }}
                  />
                </div>
              </div>

              {/* 핵심 특징 3가지 */}
              <div className="space-y-2 mb-5">
                <h4 className="text-[11px] font-bold text-slate-400 tracking-wider">주요 성향 분석표</h4>
                {cur.traits.map((trait, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-xs text-slate-200">
                    <span className="text-purple-400 font-bold">✔</span>
                    <span>{trait}</span>
                  </div>
                ))}
              </div>

              {/* 종합 처방 진단문 */}
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-xs leading-relaxed text-slate-300 mb-5">
                <strong className="text-white block mb-1">📋 우정 처방전:</strong>
                {cur.diagnosis}
              </div>

              {/* 환상의 짝꿍 & 환장의 상극 */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400 font-black block mb-1">💚 잘 맞는 인연</span>
                  <p className="text-slate-300 text-[10px] leading-tight">{cur.bestFriend}</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <span className="text-rose-400 font-black block mb-1">💔 피해야 할 상극</span>
                  <p className="text-slate-300 text-[10px] leading-tight">{cur.worstFriend}</p>
                </div>
              </div>

            </div>

            {/* 홈으로 및 다른 테스트 버튼 */}
            <Link
              href="/"
              className="block w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-center text-xs rounded-2xl shadow-xl transition"
            >
              👉 연구소 홈으로 가서 다른 테스트 하기
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
