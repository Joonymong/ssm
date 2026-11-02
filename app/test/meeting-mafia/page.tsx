'use client';

import { useState } from 'react';
import Link from 'next/link';

// 질문 10문항 (E vs I / T vs F 기반)
const QUESTIONS = [
  { text: "팀장이 '자, 다들 자유롭게 의견 좀 내봐~'라며 침묵을 깼을 때 나의 반응은?", a: { text: "침묵이 어색해서 일단 아무 말이나 뱉고 본다.", axis: 'E' }, b: { text: "노트북 모니터와 혼연일체가 되어 눈길을 차단한다.", axis: 'I' } },
  { text: "회의 중 팀장이 말도 안 되는 억지 아이디어를 던졌을 때", a: { text: "'팀장님, 그건 예산과 일정상 무리입니다' 바로 지른다.", axis: 'T' }, b: { text: "'아... 네에...' 하며 팀원들 표정부터 살핀다.", axis: 'F' } },
  { text: "내가 낸 기획안에 대해 임원이 '이거 누가 생각했어?'라고 물을 때", a: { text: "손 번쩍 들고 '제가 기획한 내용입니다!' 어필한다.", axis: 'E' }, b: { text: "칭찬인지 욕인지 눈치 채기 전까지 일단 가만히 있는다.", axis: 'I' } },
  { text: "회의가 길어져 퇴근 시간이 다가올 때 내 머릿속은?", a: { text: "'회의록 정리해서 언제 메일 보내지?' 잔여 업무 계산.", axis: 'T' }, b: { text: "'오늘 저녁 약속 취소해야 하나...' 밀려오는 서러움.", axis: 'F' } },
  { text: "다른 부서 선임이 우리 팀을 은근히 깎아내리며 공격할 때", a: { text: "지체 없이 마이크 잡고 조목조목 반박한다.", axis: 'E' }, b: { text: "속으로 주먹을 쥐고 회의 끝나고 팀원들과 분노를 나눈다.", axis: 'I' } },
  { text: "팀장이 '이번 프로젝트 총대 멜 사람?' 하며 시선을 돌릴 때", a: { text: "'선임님 이번에 여유 있으시잖아요?' 토스한다.", axis: 'E' }, b: { text: "급하게 볼펜을 떨어뜨려 책상 밑으로 숨는다.", axis: 'I' } },
  { text: "회의 내용 중 숫자가 틀린 걸 나 혼자 발견했을 때", a: { text: "발표자 흐름 끊기지 않게 바로 지적해서 수정한다.", axis: 'T' }, b: { text: "괜히 망신 주는 것 같아 조용히 메신저로 귓속말한다.", axis: 'F' } },
  { text: "정작 결론도 안 나고 1시간째 맴도는 회의를 볼 때", a: { text: "'시간 낭비 레전드네' 속으로 분당 단가 계산기 두드림.", axis: 'T' }, b: { text: "지쳐 쓰러져가는 팀원들의 영혼 나간 표정에 연민 느낌.", axis: 'F' } },
  { text: "회의 종료 직전, 팀장이 '마지막으로 질문 있는 사람?' 할 때", a: { text: "궁금했던 핵심 질문을 던져 매듭을 짓는다.", axis: 'E' }, b: { text: "'제발 아무도 질문하지 마라...' 온 우주의 기운을 모아 기도함.", axis: 'I' } },
  { text: "회의 끝나고 자리로 돌아가는 길에 내 행동은?", a: { text: "동료 붙잡고 '방금 회의 내용 완전 대환장 아니냐?' 떠든다.", axis: 'E' }, b: { text: "자리 가자마자 커피 한 모금 마시고 모니터 뒤로 숨는다.", axis: 'I' } }
];

// 결과 데이터 및 내장 일러스트 SVG
const RESULTS: Record<string, { title: string; subtitle: string; desc: string; icon: JSX.Element }> = {
  ET: {
    title: "회의실 암살 전문 저격수",
    subtitle: "논리 결여된 헛소리는 1초도 못 참는 행동파",
    desc: "침묵이 흐르는 회의실에서 가장 먼저 마이크를 잡거나 비논리적인 발언을 즉각 저격하는 유형입니다. 근거 없는 뜬구름 잡기 식 논의를 극도로 혐오하며, 회의의 목적과 아웃풋이 명확해야 직성이 풀립니다. 다만 너무 직설적인 팩트 폭격은 윗사람들의 표정을 굳게 만들 수 있으니 정무적인 완급 조절이 필요합니다.",
    icon: (
      <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" />
        <circle cx="35" cy="42" r="5" fill="#1E293B" />
        <circle cx="65" cy="42" r="5" fill="#1E293B" />
        <path d="M30 32 L42 36" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 32 L58 36" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 65 Q50 55 60 65" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
        <rect x="42" y="70" width="16" height="8" rx="2" fill="#EF4444" />
      </svg>
    )
  },
  EF: {
    title: "사회적 미소 발사기 (폭탄 토스 장인)",
    subtitle: "웃는 얼굴로 회의실 분위기 띄우고 일은 남에게 넘김",
    desc: "회의실의 무거운 정적을 깨뜨리는 분위기 메이커입니다. 팀장의 썰렁한 농담에도 가장 영혼 있는 리액션을 보여주며 갈등을 유연하게 넘깁니다. 하지만 총대를 매야 하는 위험한 순간이 오면 화려한 언변과 미소로 다른 사람에게 자연스럽게 일을 토스하는 고도의 생존 기술을 보유하고 있습니다.",
    icon: (
      <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
        <path d="M30 42 Q35 36 40 42" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M60 42 Q65 36 70 42" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M35 58 Q50 75 65 58" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
        <circle cx="28" cy="52" r="4" fill="#FCA5A5" />
        <circle cx="72" cy="52" r="4" fill="#FCA5A5" />
      </svg>
    )
  },
  IT: {
    title: "아이컨택 차단 방패병",
    subtitle: "모니터 뒤에 숨어 타자 치는 척하며 탈출 타이밍 계산",
    desc: "팀장과 절대로 눈을 마주치지 않는 완벽한 각도 제어 능력을 지녔습니다. 겉으로는 회의록을 맹렬히 타이핑하는 척하지만, 화면에는 퇴근 후 일정이나 이직 공고가 떠 있을 확률이 높습니다. 회의 도중 튀는 행동을 절대 하지 않으며, 회의가 끝나자마자 칼같이 자리로 복귀해 내 일만 깔끔히 처리합니다.",
    icon: (
      <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
        <rect x="25" y="38" width="20" height="12" rx="3" fill="#1E293B" />
        <rect x="55" y="38" width="20" height="12" rx="3" fill="#1E293B" />
        <line x1="45" y1="44" x2="55" y2="44" stroke="#1E293B" strokeWidth="3" />
        <line x1="40" y1="65" x2="60" y2="65" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <rect x="20" y="70" width="60" height="16" rx="3" fill="#94A3B8" />
      </svg>
    )
  },
  IF: {
    title: "회의실 투명인간 클로킹 요원",
    subtitle: "존재감 제로 상태로 숨소리조차 줄이며 무사퇴근 기도",
    desc: "회의실 구석 자리를 선점하고 온몸의 기운을 낮춰 배경과 일체화되는 평화주의자입니다. 누군가 나에게 돌발 질문을 던지면 심장이 요동치며 식은땀이 흐릅니다. 회의실 안에서 일어나는 모든 갈등과 날 선 피드백을 마음으로 받아내느라 회의만 끝나면 온몸에 진이 빠지는 극도의 소모를 겪습니다.",
    icon: (
      <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3" />
        <circle cx="36" cy="45" r="4" fill="#6D28D9" />
        <circle cx="64" cy="45" r="4" fill="#6D28D9" />
        <ellipse cx="50" cy="62" rx="6" ry="8" fill="#6D28D9" />
        <path d="M72 30 Q78 36 72 42" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M28 30 Q22 36 28 42" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
};

export default function MeetingMafiaPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, T: 0, F: 0 });
  const [resKey, setResKey] = useState('ET');

  const onSelect = (axis: 'E' | 'I' | 'T' | 'F') => {
    const next = { ...scores, [axis]: scores[axis] + 1 };
    setScores(next);
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      const eOrI = next.E >= next.I ? 'E' : 'I';
      const tOrF = next.T >= next.F ? 'T' : 'F';
      setResKey(`${eOrI}${tOrF}`);
      setStep('loading');
      setTimeout(() => setStep('result'), 1600);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md">
        {step === 'intro' && (
          <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
            <span className="text-6xl block mb-4">🕶️</span>
            <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Office Survival Vol.2
            </span>
            <h1 className="text-xl font-black text-slate-800 mt-3">회의실 침묵의 마피아 테스트</h1>
            <p className="text-xs text-slate-500 mt-2 mb-8 leading-relaxed">
              "자유롭게 의견 내봐"라는 말에 발동하는 나의 생존 본능 유형
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-md transition active:scale-[0.98]"
            >
              생존 등급 확인하기 (소요시간 1분)
            </button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mt-6">
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-amber-600">Q{idx + 1}.</span>
            <h2 className="text-base font-bold text-slate-800 mt-1 mb-6 leading-snug">
              {QUESTIONS[idx].text}
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => onSelect(QUESTIONS[idx].a.axis as any)}
                className="w-full p-4 text-left border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 hover:border-amber-500 hover:bg-amber-50/50 transition active:scale-[0.99]"
              >
                {QUESTIONS[idx].a.text}
              </button>
              <button
                onClick={() => onSelect(QUESTIONS[idx].b.axis as any)}
                className="w-full p-4 text-left border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 hover:border-amber-500 hover:bg-amber-50/50 transition active:scale-[0.99]"
              >
                {QUESTIONS[idx].b.text}
              </button>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="text-center py-28">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-sm font-bold text-slate-700">회의실 생존 지수를 판독 중입니다...</h3>
            <p className="text-xs text-slate-400 mt-1">마피아 검거율 계산 중</p>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-4 mt-6">
            <article className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
              <div className="my-2">{RESULTS[resKey].icon}</div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">
                TYPE : {resKey}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1 mb-1">
                {RESULTS[resKey].title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mb-4">
                "{RESULTS[resKey].subtitle}"
              </p>
              <div className="border-t border-slate-100 pt-4 text-left text-xs leading-relaxed text-slate-600">
                {RESULTS[resKey].desc}
              </div>
            </article>

            {/* 홈으로 및 다른 테스트 추천 */}
            <Link
              href="/"
              className="block w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-center text-xs rounded-2xl shadow-md transition"
            >
              👉 1편: 직장 상사 분노 성향 테스트 하러 가기
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
