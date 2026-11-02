'use client';

import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  { text: "아침 8시 50분, 상사가 '일찍 와서 청소할 사람?' 단톡을 올렸다.", a: { text: "동기방에 공유하며 '누구 갈 사람?' 띄운다.", axis: 'E' }, b: { text: "읽씹 유지하며 8시 59분에 들어간다.", axis: 'I' } },
  { text: "내 아이디어를 상사가 자기 성과처럼 회의에서 발표했다.", a: { text: "회의 끝나고 바로 찾아가 내 기획임을 짚는다.", axis: 'E' }, b: { text: "자리로 돌아와 조용히 초안 백업을 떠둔다.", axis: 'I' } },
  { text: "영문도 모르고 까인 날, 퇴근 후 내 행동은?", a: { text: "동료 불러서 맥주 마시며 3시간 동안 욕한다.", axis: 'E' }, b: { text: "칼퇴 후 휴대폰 무음하고 침대로 직행한다.", axis: 'I' } },
  { text: "점심시간, 상사가 '짜장면 통일할까?' 눈치를 준다.", a: { text: "'저는 짬뽕 땡기는데요!' 외친다.", axis: 'E' }, b: { text: "'네, 저도 짜장면이요' 메뉴판을 덮는다.", axis: 'I' } },
  { text: "탕비실에서 상사 이야기 중 문이 벌컥 열릴 것 같다.", a: { text: "자연스럽게 다른 화제로 말을 돌린다.", axis: 'E' }, b: { text: "심장이 굳어 컵만 씻는 척한다.", axis: 'I' } },
  { text: "나를 더 미치게 만드는 상사의 유형은?", a: { text: "방향성 계속 바꾸는 무능한 상사", axis: 'T' }, b: { text: "면전에 대고 비꼬는 무례한 상사", axis: 'F' } },
  { text: "결재 완료된 기획서를 던지며 '내가 언제 이랬어?' 할 때", a: { text: "컨펌 메일과 메신저 기록을 뒤진다.", axis: 'T' }, b: { text: "'진짜 사람인가?' 인류애가 바닥난다.", axis: 'F' } },
  { text: "'너 이거 생각하고 쓴 거 맞아?' 피드백을 들었을 때", a: { text: "어디가 논리적으로 틀렸는지 따진다.", axis: 'T' }, b: { text: "내 노력을 부정당한 것 같아 서럽다.", axis: 'F' } },
  { text: "퇴근 10분 전, '내일까지 간단히 정리해 둬' 일을 던질 때", a: { text: "'간단하면 직접 10분 만에 하시든가' 계산한다.", axis: 'T' }, b: { text: "퇴근 후 내 일상이 짓밟혀 울컥한다.", axis: 'F' } },
  { text: "회식 자리에서 '너는 다 좋은데 그게 문제야' 훈수를 둘 때", a: { text: "'본인 성과나 챙기시지' 팩트를 센다.", axis: 'T' }, b: { text: "남들 앞에서 굳이 망신을 주는 태도에 정떨어진다.", axis: 'F' } }
];

const RESULTS: Record<string, { title: string; desc: string }> = {
  ET: { title: "팩트 폭격기 소총수", desc: "업무의 효율성과 논리적 인과관계를 중시하는 현실적인 행동파입니다. 부당한 상황을 마주하면 팩트와 데이터를 기반으로 원인을 명확히 짚어야 직성이 풀립니다." },
  EF: { title: "탕비실 고발 뉴스 앵커", desc: "사람 간의 존중과 팀워크를 중시하는 공감 중심 외향파입니다. 상사의 무례한 태도에 분노하며, 마음 맞는 동료들과 대화를 통해 스트레스를 해소합니다." },
  IT: { title: "무표정 속 노동법 변호사", desc: "겉으로는 평정심을 유지하지만 뒤에서는 차분하게 증거를 수집하는 전략가입니다. 부당한 지시에 감정을 낭비하지 않고 이직 포트폴리오를 업데이트합니다." },
  IF: { title: "영혼 분리 AI 인형", desc: "조직 내 마찰을 피하고자 자신을 낮추는 배려형 인재입니다. 눈앞에서는 고개를 숙이지만 깊은 내상을 입으므로, 상사의 감정과 본인의 가치를 분리하는 연습이 필요합니다." }
};

export default function TestPage() {
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
      setTimeout(() => setStep('result'), 1500);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md">
        {step === 'intro' && (
          <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-12">
            <span className="text-5xl block mb-4">🔥</span>
            <h1 className="text-xl font-black text-slate-800">직장 상사 분노 성향 테스트</h1>
            <p className="text-xs text-slate-500 mt-2 mb-6">내 오피스 생존 본능과 숨겨진 분노 유형 분석</p>
            <button onClick={() => setStep('quiz')} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition">
              테스트 시작하기 (소요시간 1분)
            </button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-6">
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6">
              <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-indigo-600">Q{idx + 1}.</span>
            <h2 className="text-base font-bold text-slate-800 mt-1 mb-6 leading-snug">{QUESTIONS[idx].text}</h2>
            <div className="space-y-3">
              <button onClick={() => onSelect(QUESTIONS[idx].a.axis as any)} className="w-full p-4 text-left border border-slate-200 rounded-xl text-sm font-medium hover:border-indigo-500 hover:bg-indigo-50 transition">
                {QUESTIONS[idx].a.text}
              </button>
              <button onClick={() => onSelect(QUESTIONS[idx].b.axis as any)} className="w-full p-4 text-left border border-slate-200 rounded-xl text-sm font-medium hover:border-indigo-500 hover:bg-indigo-50 transition">
                {QUESTIONS[idx].b.text}
              </button>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="text-center py-24">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-700">성향 분석 중...</p>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-4 mt-6">
            <article className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-indigo-600">유형 코드: {resKey}</span>
              <h2 className="text-xl font-black text-slate-800 mt-1 mb-3">{RESULTS[resKey].title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{RESULTS[resKey].desc}</p>
            </article>

            <Link href="/" className="block w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-center text-xs rounded-xl transition">
              👉 다른 테스트 더 보러 가기 (홈으로)
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
