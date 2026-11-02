'use client';

import { useState } from 'react';
import Link from 'next/link';

// 질문 10문항 (눈물/불안 vs 광기/직진, 혼자 앓기 vs 주변 전파)
const QUESTIONS = [
  {
    text: "출근 직후 모니터를 켰는데 메신저 빨간 알림이 15개 쌓여있다!",
    a: { text: "바들바들 떨면서 식은땀 흘리고 심호흡부터 한다 💦", type: 'CHII' },
    b: { text: "'우라아아아앗!!' 외치며 광기로 폭풍 답장 갈긴다 ⚡", type: 'USA' }
  },
  {
    text: "팀장님이 갑자기 'OO씨, 잠깐 회의실로 와봐' 하고 부를 때",
    a: { text: "'내가 도대체 무슨 잘못을 했지?' 인생 주마등 스쳐 감 😭", type: 'CHII' },
    b: { text: "'어떻게든 되겠지~ 맛있는 거나 먹고 싶다' 생각하며 따라감 🍙", type: 'HACHI' }
  },
  {
    text: "업무량이 너무 많아서 오늘 안에 절대 못 끝낼 것 같을 때",
    a: { text: "귀여운 표정 지으며 동료한테 '이것 좀 봐주라아~' 슬쩍 넘김 🎀", type: 'MOMON' },
    b: { text: "말도 없이 타자 소리 쾅쾅 울리며 초인적인 힘으로 쳐냄 🥊", type: 'USA' }
  },
  {
    text: "동료가 일하다가 실수해서 안절부절못하고 있을 때 나의 행동은?",
    a: { text: "'괜찮아! 이 정도는 금방 고칠 수 있어!' 따뜻하게 다독여줌 💙", type: 'HACHI' },
    b: { text: "같이 멘붕 와서 둘이 탕비실 구석에서 훌쩍거림 🥺", type: 'CHII' }
  },
  {
    text: "점심시간, 맛있는 식당을 찾아가는 내 발걸음은?",
    a: { text: "폴짝폴짝 뛰어가며 '야하-! 뿌르르르!' 신나게 1등으로 도착 🏃", type: 'USA' },
    b: { text: "동료들한테 '내가 추천한 곳 진짜 맛있지? 칭찬해줘!' 어필함 ✨", type: 'MOMON' }
  },
  {
    text: "퇴근 10분 전, 상사가 '급한 거 하나만 더 해줘' 시켰을 때",
    a: { text: "속으로 울면서 '넵...' 하고 의자에 다시 주저앉음 🥲", type: 'CHII' },
    b: { text: "'에? 오늘 야근 수당 나오는 건가요?' 눈 땡그랗게 뜨고 팩폭 던짐 🍬", type: 'MOMON' }
  },
  {
    text: "어려운 프로젝트를 어찌어찌 성공적으로 끝마쳤을 때 내 반응은?",
    a: { text: "고생한 팀원들 한 명씩 찾아가서 감사 인사와 간식 건넴 🌸", type: 'HACHI' },
    b: { text: "사무실 천장 뚫을 기세로 기쁨의 기괴한 댄스를 춤 🕺", type: 'USA' }
  },
  {
    text: "퇴근길 만원 지하철에서 지친 내 멘탈을 회복하는 법은?",
    a: { text: "달콤한 디저트 사 들고 이불 속에 파묻혀 멍때리기 🍮", type: 'CHII' },
    b: { text: "친구한테 전화해서 '오늘 있었던 웃긴 썰' 풀며 털어내기 📞", type: 'HACHI' }
  },
  {
    text: "내가 생각하는 직장 생활의 궁극적인 모토는?",
    a: { text: "'어떻게든 굴러가겠지! 내일의 내가 해결한다!' 🍀", type: 'HACHI' },
    b: { text: "'귀여운 내가 왜 이런 노동을 해야 하지?' 납득 불가 👑", type: 'MOMON' }
  },
  {
    text: "상사가 내 기획안을 보며 '이게 뭐야? 다시 해와' 퇴짜 놨을 때",
    a: { text: "눈물이 핑 돌지만 옥상 가서 눈물 닦고 다시 고쳐봄 💧", type: 'CHII' },
    b: { text: "이상한 소리 내면서 5분 만에 기상천외한 안으로 수정해 감 🌪️", type: 'USA' }
  }
];

// 결과 데이터 및 몽글몽글 맞춤형 패러디 SVG 캐릭터
interface ChiikawaResult {
  title: string;
  charName: string;
  tagline: string;
  desc: string;
  bgGradient: string;
  cardBorder: string;
  badgeBg: string;
  bestMate: { name: string; emoji: string; desc: string };
  worstEnemy: { name: string; emoji: string; desc: string };
  svg: JSX.Element;
}

const RESULTS: Record<string, ChiikawaResult> = {
  CHII: {
    charName: "눈물샘 폭발 찌이",
    title: "바들바들 쫄보 생존러",
    tagline: "맨날 울먹거리지만 어찌어찌 야근 버텨내는 숨은 근성러",
    desc: "상사 목소리만 커져도 심장이 바닥으로 쿵 떨어지는 유리 멘탈의 소유자입니다. 매일 화장실에서 혼자 눈물 찔끔 흘리며 '나 퇴사할래...'를 중얼거리지만, 정작 할당된 일은 꼼꼼하게 다 끝내고 퇴근하는 끈기 만렙의 오피스 요정입니다.",
    bgGradient: "from-pink-100 via-rose-50 to-pink-50",
    cardBorder: "border-pink-300",
    badgeBg: "bg-pink-400 text-white",
    bestMate: { name: "초긍정 가르마냥", emoji: "💙", desc: "멘탈 터질 때마다 말없이 멘토링해줌" },
    worstEnemy: { name: "괴성 지르는 토끼", emoji: "⚡", desc: "갑자기 소리 질러서 내 심장 떨어뜨림" },
    svg: (
      <svg className="w-40 h-40 mx-auto drop-shadow-md" viewBox="0 0 160 160" fill="none">
        {/* 귀 쫑긋 */}
        <circle cx="50" cy="45" r="14" fill="#FFF" stroke="#FDA4AF" strokeWidth="4" />
        <circle cx="110" cy="45" r="14" fill="#FFF" stroke="#FDA4AF" strokeWidth="4" />
        {/* 찹쌀떡 얼굴 */}
        <ellipse cx="80" cy="90" rx="55" ry="48" fill="#FFF" stroke="#FDA4AF" strokeWidth="4" />
        {/* 눈물 글썽 땡글 눈 */}
        <ellipse cx="62" cy="85" rx="6" ry="8" fill="#1E293B" />
        <circle cx="60" cy="82" r="2.5" fill="#FFF" />
        <ellipse cx="98" cy="85" rx="6" ry="8" fill="#1E293B" />
        <circle cx="96" cy="82" r="2.5" fill="#FFF" />
        {/* 억울한 눈썹 */}
        <path d="M54 73 Q62 76 68 73" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M92 73 Q98 76 106 73" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 볼터치 */}
        <ellipse cx="50" cy="95" rx="8" ry="5" fill="#F43F5E" fillOpacity="0.3" />
        <ellipse cx="110" cy="95" rx="8" ry="5" fill="#F43F5E" fillOpacity="0.3" />
        {/* 눈물 방울 */}
        <ellipse cx="44" cy="88" rx="3.5" ry="5" fill="#38BDF8" />
        <ellipse cx="116" cy="88" rx="3.5" ry="5" fill="#38BDF8" />
        {/* 떨리는 시옷 입 */}
        <path d="M76 98 Q80 102 84 98" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    )
  },
  HACHI: {
    charName: "초긍정 가르마냥",
    title: "어떻게든 되겠지 마인드",
    tagline: "동료들 멘탈 지켜주는 오피스의 따뜻한 보석",
    desc: "회사에 대형 사고가 터져도 '뭐 어떻게든 풀리겠지~ 맛있는 거나 먹으러 가요!' 하며 분위기를 반전시키는 비타민 같은 존재입니다. 주변에 기운 없는 동료가 보이면 초콜릿을 쥐여주며 온기를 나누는, 모두가 탐내는 최고의 직장 동료입니다.",
    bgGradient: "from-sky-100 via-blue-50 to-indigo-50",
    cardBorder: "border-sky-300",
    badgeBg: "bg-sky-400 text-white",
    bestMate: { name: "눈물샘 폭발 찌이", emoji: "🥺", desc: "챙겨줄 때마다 고마워해서 뿌듯함" },
    worstEnemy: { name: "칭찬 갈취 날다람쥐", emoji: "👑", desc: "내 성과를 쏙 가로채 가려고 함" },
    svg: (
      <svg className="w-40 h-40 mx-auto drop-shadow-md" viewBox="0 0 160 160" fill="none">
        {/* 귀 */}
        <path d="M42 55 L32 30 L60 42 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M118 55 L128 30 L100 42 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3.5" strokeLinejoin="round" />
        {/* 얼굴 */}
        <ellipse cx="80" cy="92" rx="55" ry="48" fill="#FFF" stroke="#0284C7" strokeWidth="4" />
        {/* 파란 가르마 털 */}
        <path d="M42 64 C50 50, 70 56, 80 68 C90 56, 110 50, 118 64 C120 75, 120 85, 118 90 C110 75, 95 72, 80 78 C65 72, 50 75, 42 90 Z" fill="#38BDF8" />
        {/* 맑고 반짝이는 눈 */}
        <ellipse cx="62" cy="88" rx="6" ry="8" fill="#1E293B" />
        <circle cx="64" cy="85" r="2.5" fill="#FFF" />
        <ellipse cx="98" cy="88" rx="6" ry="8" fill="#1E293B" />
        <circle cx="100" cy="85" r="2.5" fill="#FFF" />
        {/* 핑크 볼 */}
        <ellipse cx="50" cy="98" rx="7" ry="4.5" fill="#FB7185" fillOpacity="0.4" />
        <ellipse cx="110" cy="98" rx="7" ry="4.5" fill="#FB7185" fillOpacity="0.4" />
        {/* 방긋 웃는 입 */}
        <path d="M74 98 Q80 106 86 98" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    )
  },
  USA: {
    charName: "광기의 샤우팅 토끼",
    title: "야하-! 노빠꾸 돌격대장",
    tagline: "이해할 수 없는 외계어를 구사하며 일은 1등으로 끝냄",
    desc: "말도 안 되는 일정이 떨어져도 당황하지 않습니다. '우라!! 야하-!!' 괴성을 지르며 기이한 에너지를 뿜어내고, 결국 제일 먼저 칼퇴해 버리는 맑은 눈의 광인입니다. 남의 눈치를 전혀 보지 않으며 직장 내 독보적인 마이웨이를 개척하고 있습니다.",
    bgGradient: "from-amber-100 via-yellow-50 to-orange-50",
    cardBorder: "border-amber-300",
    badgeBg: "bg-amber-400 text-slate-900",
    bestMate: { name: "광기의 샤우팅 토끼", emoji: "🌪️", desc: "말 안 통해도 둘이서 신나게 날뜀" },
    worstEnemy: { name: "눈물샘 폭발 찌이", emoji: "💧", desc: "내가 장난치면 자꾸 울어서 곤란함" },
    svg: (
      <svg className="w-40 h-40 mx-auto drop-shadow-md" viewBox="0 0 160 160" fill="none">
        {/* 길쭉한 토끼 귀 */}
        <ellipse cx="55" cy="35" rx="10" ry="25" fill="#FEF08A" stroke="#CA8A04" strokeWidth="4" />
        <ellipse cx="105" cy="35" rx="10" ry="25" fill="#FEF08A" stroke="#CA8A04" strokeWidth="4" />
        {/* 노란 찹쌀떡 얼굴 */}
        <ellipse cx="80" cy="95" rx="55" ry="46" fill="#FEF08A" stroke="#CA8A04" strokeWidth="4" />
        {/* 반쯤 감긴 광기의 땡글 눈 */}
        <circle cx="62" cy="90" r="7" fill="#1E293B" />
        <circle cx="64" cy="88" r="2.5" fill="#FFF" />
        <circle cx="98" cy="90" r="7" fill="#1E293B" />
        <circle cx="100" cy="88" r="2.5" fill="#FFF" />
        {/* 발그레 볼 */}
        <circle cx="48" cy="98" r="7" fill="#F87171" fillOpacity="0.4" />
        <circle cx="112" cy="98" r="7" fill="#F87171" fillOpacity="0.4" />
        {/* 벌린 삼각형 입 */}
        <path d="M74 100 Q80 112 86 100 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      </svg>
    )
  },
  MOMON: {
    charName: "칭찬 갈취 날다람쥐",
    title: "귀여움 원툴 앙큼 신입",
    tagline: "'칭찬해줘! 귀엽다고 해줘!' 일은 남한테 넘기는 천재",
    desc: "자신이 귀엽다는 사실을 200% 알고 이용하는 영악한 오피스 프린스/프린세스입니다. 귀찮은 업무가 생기면 특유의 앙증맞은 제스처로 다른 사람에게 떠넘기고, 남이 칭찬받을 때 쏙 끼어들어 스포트라이트를 독차지하는 뻔뻔하지만 미워할 수 없는 깍쟁이입니다.",
    bgGradient: "from-purple-100 via-pink-50 to-fuchsia-50",
    cardBorder: "border-purple-300",
    badgeBg: "bg-purple-400 text-white",
    bestMate: { name: "초긍정 가르마냥", emoji: "💙", desc: "내 앙탈과 변명을 다 받아줌" },
    worstEnemy: { name: "초긍정 가르마냥", emoji: "🥊", desc: "내 얄미운 짓을 너무 순수하게 바라봐서 양심 찔림" },
    svg: (
      <svg className="w-40 h-40 mx-auto drop-shadow-md" viewBox="0 0 160 160" fill="none">
        {/* 뾰족 털 귀 */}
        <path d="M42 55 C35 35, 45 25, 58 40 Z" fill="#FFF" stroke="#C084FC" strokeWidth="4" />
        <path d="M118 55 C125 35, 115 25, 102 40 Z" fill="#FFF" stroke="#C084FC" strokeWidth="4" />
        {/* 얼굴 */}
        <ellipse cx="80" cy="92" rx="55" ry="46" fill="#FFF" stroke="#C084FC" strokeWidth="4" />
        {/* 크고 똘망똘망한 눈 */}
        <ellipse cx="62" cy="85" rx="8" ry="11" fill="#4C1D95" />
        <circle cx="65" cy="81" r="3.5" fill="#FFF" />
        <circle cx="59" cy="89" r="2" fill="#FFF" />
        <ellipse cx="98" cy="85" rx="8" ry="11" fill="#4C1D95" />
        <circle cx="101" cy="81" r="3.5" fill="#FFF" />
        <circle cx="95" cy="89" r="2" fill="#FFF" />
        {/* 진한 핑크 볼 */}
        <ellipse cx="48" cy="98" rx="8" ry="5.5" fill="#EC4899" fillOpacity="0.4" />
        <ellipse cx="112" cy="98" rx="8" ry="5.5" fill="#EC4899" fillOpacity="0.4" />
        {/* 새침한 고양이 입 */}
        <path d="M72 98 Q76 103 80 98 Q84 103 88 98" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
};

export default function ChiikawaTestPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ CHII: 0, HACHI: 0, USA: 0, MOMON: 0 });
  const [resKey, setResKey] = useState<string>('CHII');
  const [copied, setCopied] = useState(false);

  const onSelect = (type: string) => {
    const nextScores = { ...scores, [type]: (scores[type] || 0) + 1 };
    setScores(nextScores);

    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      let maxKey = 'CHII';
      let maxVal = -1;
      Object.entries(nextScores).forEach(([k, v]) => {
        if (v > maxVal) {
          maxVal = v;
          maxKey = k;
        }
      });
      setResKey(maxKey);
      setStep('loading');
      setTimeout(() => setStep('result'), 1600);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: '먼가 작고 찌든 오피스 생존 테스트',
      text: `내 결과: [${RESULTS[resKey].charName}]! 너는 무슨 녀석 나올까?ㅋㅋㅋ`,
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
    <main className="min-h-screen bg-[#FFF9FA] py-10 px-4 flex justify-center text-slate-800 antialiased selection:bg-pink-300">
      <div className="w-full max-w-sm">

        {/* 1. 시작 화면 (구름 말풍선과 몽글몽글 핑크 파스텔 감성) */}
        {step === 'intro' && (
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-[36px] shadow-xl border-4 border-pink-200 text-center mt-4 relative overflow-hidden">
            <div className="text-6xl mb-3 animate-pulse">🌸</div>
            <span className="text-[11px] font-black tracking-widest text-pink-600 bg-pink-100 border border-pink-200 px-3.5 py-1 rounded-full uppercase">
              찌이카와 오피스 에디션
            </span>
            <h1 className="text-2xl font-black text-slate-800 mt-3 tracking-tight">
              먼가 작고 찌든 녀석들<br />오피스 생존 테스트
            </h1>
            <p className="text-xs font-bold text-slate-500 mt-2 mb-8 leading-relaxed">
              상사의 잔소리와 야근 속에서<br />
              나는 어떤 귀여운 생존 본능으로 버티고 있을까?
            </p>

            <button
              onClick={() => setStep('quiz')}
              className="w-full py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 hover:opacity-95 text-white font-black text-base rounded-2xl shadow-lg shadow-pink-300/50 transition active:scale-[0.98]"
            >
              내 캐릭터 알아보기 (소요시간 1분)
            </button>

            <p className="text-[11px] font-bold text-pink-400 mt-4">
              💖 지금까지 <span className="underline font-black text-pink-600">62,819명</span>의 찌든 녀석들이 참여했어요
            </p>
          </div>
        )}

        {/* 2. 퀴즈 화면 */}
        {step === 'quiz' && (
          <div className="bg-white p-7 rounded-[36px] shadow-xl border-4 border-pink-200 mt-4">
            <div className="w-full bg-pink-100 h-3 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-pink-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-black text-pink-500 tracking-wider">QUESTION {idx + 1}</span>
              <span className="text-[11px] font-bold text-slate-400">{idx + 1} / {QUESTIONS.length}</span>
            </div>
            <h2 className="text-base font-black text-slate-800 mt-1 mb-6 leading-relaxed">
              {QUESTIONS[idx].text}
            </h2>
            <div className="space-y-3.5">
              <button
                onClick={() => onSelect(QUESTIONS[idx].a.type)}
                className="w-full p-4 text-left bg-pink-50/60 hover:bg-pink-100/70 border-2 border-pink-200 hover:border-pink-300 rounded-2xl text-xs font-bold text-slate-700 transition active:scale-[0.99] leading-snug"
              >
                {QUESTIONS[idx].a.text}
              </button>
              <button
                onClick={() => onSelect(QUESTIONS[idx].b.type)}
                className="w-full p-4 text-left bg-pink-50/60 hover:bg-pink-100/70 border-2 border-pink-200 hover:border-pink-300 rounded-2xl text-xs font-bold text-slate-700 transition active:scale-[0.99] leading-snug"
              >
                {QUESTIONS[idx].b.text}
              </button>
            </div>
          </div>
        )}

        {/* 3. 로딩 화면 */}
        {step === 'loading' && (
          <div className="text-center py-28">
            <div className="w-14 h-14 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-base font-black text-slate-700">오피스 영혼을 분석하는 중...</h3>
            <p className="text-xs text-pink-400 mt-1 font-bold">바들바들 떨림 지수 측정 중 💦</p>
          </div>
        )}

        {/* 4. 결과 화면 */}
        {step === 'result' && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-b ${cur.bgGradient} p-7 rounded-[36px] shadow-2xl border-4 ${cur.cardBorder} text-center relative overflow-hidden`}>
              
              {/* 캐릭터 일러스트 */}
              <div className="my-2">{cur.svg}</div>

              {/* 캐릭터 타이틀 & 네임택 */}
              <span className={`text-[11px] font-black px-3 py-1 rounded-full ${cur.badgeBg} inline-block uppercase tracking-wider mb-2 shadow-sm`}>
                {cur.title}
              </span>
              <h2 className="text-2xl font-black text-slate-800 mt-0.5">{cur.charName}</h2>
              <p className="text-xs font-bold text-slate-600 mt-1">"{cur.tagline}"</p>

              {/* 상세 진단문 */}
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/80 text-xs font-semibold leading-relaxed text-slate-700 text-left mt-5 shadow-sm">
                {cur.desc}
              </div>

              {/* 궁합 박스 */}
              <div className="grid grid-cols-2 gap-2 text-left mt-4 text-[11px]">
                <div className="p-3 bg-white/90 rounded-2xl border border-emerald-200 shadow-sm">
                  <span className="text-emerald-700 font-black block mb-0.5">
                    {cur.bestMate.emoji} 환상의 짝꿍
                  </span>
                  <strong className="text-slate-800 text-xs block truncate">{cur.bestMate.name}</strong>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{cur.bestMate.desc}</p>
                </div>
                <div className="p-3 bg-white/90 rounded-2xl border border-rose-200 shadow-sm">
                  <span className="text-rose-700 font-black block mb-0.5">
                    {cur.worstEnemy.emoji} 환장의 상극
                  </span>
                  <strong className="text-slate-800 text-xs block truncate">{cur.worstEnemy.name}</strong>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{cur.worstEnemy.desc}</p>
                </div>
              </div>

            </div>

            {/* 원클릭 카카오톡/SNS 공유 버튼 */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleShare}
                className="w-full py-4 bg-[#FEE500] hover:bg-[#FDD800] text-black font-black text-sm rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>{copied ? "✅ 링크 복사 완료! 단톡방에 붙여넣기" : "단톡방에 내 캐릭터 공유하기"}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setStep('intro'); setIdx(0); }}
                  className="py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition"
                >
                  🔄 다시 하기
                </button>
                <Link
                  href="/"
                  className="py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs text-center rounded-xl transition"
                >
                  🏠 홈으로 가기
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
