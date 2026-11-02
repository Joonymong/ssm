'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 현실감 넘치는 8단계 퇴사 수명 결정 시나리오
const SCENARIOS = [
  {
    situation: "월요일 오전 8시 40분, 9호선 급행 지하철 안",
    question: "앞사람 백팩에 얼굴이 짓눌린 채 회사 단톡방 알림이 울렸다.",
    choices: [
      {
        text: "숨 참고 모른 척하며 에어팟 노이즈 캔슬링을 켠다.",
        deltaHours: -18,
        reaction: "멘탈 내구도 소폭 갉아먹힘 (-18시간)"
      },
      {
        text: "단톡 열어보고 팀장의 '오늘 9시 회의' 공지에 깊은 한숨.",
        deltaHours: -48,
        reaction: "출근 전부터 분노 게이지 과열 (-48시간)"
      }
    ]
  },
  {
    situation: "오전 10시 30분, 기습 회의실",
    question: "팀장이 3일 밤새 만든 기획서를 쓱 훑더니 '이거 말고 저번 주 느낌으로 가자'고 한다.",
    choices: [
      {
        text: "'아 네, 어떤 포인트를 살릴까요?' 사회적 미소 장착.",
        deltaHours: -36,
        reaction: "가식 유지 비용으로 수명 삭감 (-36시간)"
      },
      {
        text: "순간 턱 근육이 굳으며 주먹을 쥐고 벽을 쳐다본다.",
        deltaHours: -72,
        reaction: "살의 충동 발생, 유통기한 급락 (-72시간)"
      }
    ]
  },
  {
    situation: "오후 12시 10분, 구내식당 혹은 점심시간",
    question: "상사가 '오늘 점심은 내가 쏠 테니 다 같이 부대찌개 가자'고 한다.",
    choices: [
      {
        text: "공짜 밥에 감사하며 라면 사리 2개 흡입하고 정신 승리.",
        deltaHours: +24,
        reaction: "탄수화물 수혈로 일시적 수명 연장 (+24시간)"
      },
      {
        text: "혼자 쉬고 싶었는데... 밥 먹는 내내 상사 군대 무용담 청취.",
        deltaHours: -30,
        reaction: "소화불량 및 청각적 고문 (-30시간)"
      }
    ]
  },
  {
    situation: "오후 3시 40분, 카페인 고갈의 시간",
    question: "옆자리 동기가 메신저 비밀 귓속말로 '나 이직 면접 붙었음' 링크를 보냈다.",
    choices: [
      {
        text: "'미쳤다 축하해!' 부러움과 박탈감에 잡포털 앱을 켠다.",
        deltaHours: -55,
        reaction: "현타 폭발, 당장 이력서 수정 돌입 (-55시간)"
      },
      {
        text: "'나도 데려가...' 눈물 흘리며 동기 서랍 속 과자를 뺏어 먹는다.",
        deltaHours: -20,
        reaction: "잔여 동료애 상실로 수명 단축 (-20시간)"
      }
    ]
  },
  {
    situation: "오후 5시 50분, 퇴근 10분 전의 탕비실",
    question: "상사가 다가와 'OO씨 바빠? 요거 오늘 취합만 해서 넘겨주면 되는데~' 서류 투척.",
    choices: [
      {
        text: "'약속 있어서 내일 아침 일찍 처리하겠습니다' 거절 시도.",
        deltaHours: -15,
        reaction: "상사 눈치 보느라 식은땀 (-15시간)"
      },
      {
        text: "거절 못 하고 모니터 앞에 털썩 주저앉아 배민을 켠다.",
        deltaHours: -80,
        reaction: "야근 확정, 오피스 생명력 수직 낙하 (-80시간)"
      }
    ]
  },
  {
    situation: "밤 9시 20분, 텅 빈 사무실 야근 현장",
    question: "결국 혼자 남아 엑셀을 두드리고 있다. 이때 폰 화면에 뜬 알림은?",
    choices: [
      {
        text: "통장에 찍힌 [급여 입금: 3,240,000원] 알림 팝업!",
        deltaHours: +96,
        reaction: "자본주의 알약 투약, 기적의 호흡 연장 (+96시간)"
      },
      {
        text: "친구들이 불금 즐기며 보낸 단톡방 삼겹살 짠 사진.",
        deltaHours: -64,
        reaction: "서러움 대폭발, 퇴사 의지 최고조 (-64시간)"
      }
    ]
  },
  {
    situation: "퇴근길 밤 10시 45분, 버스 정류장 앞",
    question: "상사로부터 슬랙 멘션: '아까 준 파일 4행 숫자 다시 확인바람'",
    choices: [
      {
        text: "알림 끄고 폰을 주머니에 쑤셔 넣은 뒤 맥주 4캔을 산다.",
        deltaHours: -25,
        reaction: "알코올로 간신히 진정 (-25시간)"
      },
      {
        text: "버스 정류장에서 덜덜 떨며 노트북 열고 수정해서 보낸다.",
        deltaHours: -90,
        reaction: "인간으로서의 자존감 완전 붕괴 (-90시간)"
      }
    ]
  },
  {
    situation: "일요일 밤 11시 30분, 취침 직전 침대",
    question: "내일이 월요일이라는 사실을 인지하는 순간 심장 박동이 빨라진다.",
    choices: [
      {
        text: "'어차피 로또도 안 됐는데 가야지...' 체념하고 눈을 감는다.",
        deltaHours: +10,
        reaction: "노예 근성 발동으로 생명줄 유지 (+10시간)"
      },
      {
        text: "유튜브에서 '퇴사 브이로그', '세계여행' 영상 새벽 3시까지 정주행.",
        deltaHours: -50,
        reaction: "수면 부족 + 망상 과다로 임계점 도달 (-50시간)"
      }
    ]
  }
];

// 결과 등급 데이터
const RESULTS = [
  {
    threshold: 48,
    status: "🚨 CODE RED : 시한폭탄 폭발 직전",
    badge: "퇴사 충동 99.8%",
    title: "영혼 가출 직전의 시한부 직장인",
    desc: "지금 당장 사직서를 품고 있지 않은 게 기적입니다. 상사의 숨소리 하나에도 마우스나 키보드를 던지고 뛰쳐나갈 위험 상태입니다. 조속히 연차를 내거나 탕비실에서 긴급 멍때리기를 처방받으세요.",
    cause: "만성적인 야근과 인정받지 못한 감정 노동 누적",
    item: "사직서 템플릿 파일 및 노이즈 캔슬링 헤드폰"
  },
  {
    threshold: 120,
    status: "⚠️ CODE ORANGE : 멘탈 금속 피로",
    badge: "퇴사 충동 75%",
    title: "위태위태한 줄타기 버티기 요원",
    desc: "입으로는 '퇴사하고 치킨집 차린다'를 하루 14번 외치지만, 카드값 결제일 알림을 보며 매일 아침 좀비처럼 일어나는 전형적인 K-직장인입니다. 주말 1박 2일 휴식으로 간신히 배터리 10%를 채우고 연명하고 있습니다.",
    cause: "통장 잔고와 인내심의 위험한 줄다리기",
    item: "비타민 밀크씨슬 2알과 주말 호캉스 예약권"
  },
  {
    threshold: 9999,
    status: "🟢 CODE GREEN : 해탈의 경지",
    badge: "오피스 좀비 1급",
    title: "영혼을 분리한 자본주의 머신",
    desc: "회사에서 자아를 완전히 분리하는 데 성공했습니다. 상사가 화를 내도 '월급 주는 기계가 소음을 내는구나' 하고 넘길 수 있는 해탈의 경지에 올랐습니다. 웬만한 풍파에는 끄떡없이 정년까지 버틸 수 있는 강철 멘탈입니다.",
    cause: "완벽한 자아 분리와 월급 입금일 중심의 사고방식",
    item: "모니터 뒤에 숨겨둔 간식 바구니"
  }
];

export default function QuitTimerPage() {
  const [step, setStep] = useState<'intro' | 'play' | 'loading' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hours, setHours] = useState(168); // 초기 수명 7일(168시간)
  const [floatingEffect, setFloatingEffect] = useState<{ text: string; positive: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  // 시간 포맷 (일, 시간, 분, 초)
  const formatTime = (totalHours: number) => {
    const safeH = Math.max(0, totalHours);
    const d = Math.floor(safeH / 24);
    const h = safeH % 24;
    return { d, h };
  };

  const handleChoice = (delta: number) => {
    // 플로팅 텍스트 애니메이션
    setFloatingEffect({
      text: delta > 0 ? `+${delta}h` : `${delta}h`,
      positive: delta > 0
    });

    const nextHours = Math.max(0, hours + delta);
    setHours(nextHours);

    setTimeout(() => {
      setFloatingEffect(null);
      if (currentIdx + 1 < SCENARIOS.length) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setStep('loading');
        setTimeout(() => setStep('result'), 1800);
      }
    }, 650);
  };

  const currentResult = RESULTS.find(r => hours <= r.threshold) || RESULTS[RESULTS.length - 1];
  const { d, h } = formatTime(hours);

  const handleShare = async () => {
    const shareData = {
      title: '직장인 퇴사 시한폭탄 타이머',
      text: `내 퇴사까지 남은 잔여 수명: [${d}일 ${h}시간]! 너는 며칠 남았냐?ㅋㅋㅋ`,
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
    <main className="min-h-screen bg-neutral-950 text-slate-100 py-10 px-4 flex justify-center antialiased selection:bg-red-600">
      <div className="w-full max-w-sm flex flex-col justify-between relative">

        {/* 상단 시한폭탄 경보 대시보드 (고정 헤더) */}
        <div className="bg-neutral-900 border-2 border-red-600/60 rounded-3xl p-4 shadow-[0_0_25px_rgba(239,68,68,0.25)] relative overflow-hidden mb-6">
          <div className="flex justify-between items-center text-[10px] font-black text-red-400 tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              OFFICE LIFE COUNTER
            </span>
            <span className="bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800">
              {step === 'play' ? `STAGE ${currentIdx + 1}/8` : 'LIVE STATUS'}
            </span>
          </div>

          <div className="text-center py-2 relative">
            <p className="text-[11px] text-neutral-400 font-bold mb-1">나의 잔여 오피스 유통기한</p>
            
            {/* 시한폭탄 전광판 폰트 효과 */}
            <div className="font-mono text-4xl font-black text-red-500 tracking-tight flex items-center justify-center gap-1 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
              <span>{d}</span>
              <span className="text-base text-neutral-500 font-sans">일</span>
              <span>{h.toString().padStart(2, '0')}</span>
              <span className="text-base text-neutral-500 font-sans">시간</span>
            </div>

            {/* 시간 차감/증가 플로팅 애니메이션 */}
            {floatingEffect && (
              <div
                className={`absolute inset-0 flex items-center justify-center font-black text-3xl animate-bounce pointer-events-none ${
                  floatingEffect.positive ? 'text-emerald-400 drop-shadow-[0_0_8px_#34d399]' : 'text-red-500 drop-shadow-[0_0_8px_#ef4444]'
                }`}
              >
                {floatingEffect.text}
              </div>
            )}
          </div>

          {/* 게이지 바 */}
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-3 border border-neutral-700">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (hours / 168) * 100)}%` }}
            />
          </div>
        </div>

        {/* 1. 시작 화면 */}
        {step === 'intro' && (
          <div className="bg-neutral-900 border border-neutral-800 p-7 rounded-3xl text-center space-y-6">
            <div className="text-6xl animate-pulse">💣</div>
            <div>
              <span className="text-[11px] font-black text-red-400 bg-red-950/60 border border-red-800 px-3 py-1 rounded-full uppercase tracking-widest">
                Real-time Simulation
              </span>
              <h1 className="text-2xl font-black text-white mt-3">
                직장인 퇴사 충동 타이머
              </h1>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                상사의 헛소리와 월요병 앞에서<br />
                당신이 사직서를 던지기까지 남은 시간은 얼마일까요?
              </p>
            </div>

            <div className="p-3.5 bg-neutral-950/80 rounded-2xl border border-neutral-800 text-left text-xs text-neutral-400 space-y-1.5">
              <p className="font-bold text-neutral-200">⚠️ 규칙:</p>
              <p>• 기본 제공 수명: <strong>7일 (168시간)</strong></p>
              <p>• 선택에 따라 수명이 즉각 차감되거나 연장됩니다.</p>
              <p>• 0시간에 도달하면 즉각 퇴사 경보가 발령됩니다.</p>
            </div>

            <button
              onClick={() => setStep('play')}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:opacity-90 text-white font-black text-base rounded-2xl shadow-[0_0_20px_rgba(225,29,72,0.4)] transition active:scale-[0.98]"
            >
              타이머 가동 시작 (1분 소요)
            </button>
          </div>
        )}

        {/* 2. 시뮬레이션 선택지 화면 */}
        {step === 'play' && (
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-5">
            <div>
              <span className="text-[10px] font-black text-orange-400 tracking-wider uppercase block">
                📍 {SCENARIOS[currentIdx].situation}
              </span>
              <h2 className="text-base font-bold text-white mt-1.5 leading-snug">
                {SCENARIOS[currentIdx].question}
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {SCENARIOS[currentIdx].choices.map((c, i) => (
                <button
                  key={i}
                  disabled={floatingEffect !== null}
                  onClick={() => handleChoice(c.deltaHours)}
                  className="w-full p-4 text-left bg-neutral-950 hover:bg-neutral-800 border-2 border-neutral-800 hover:border-red-500/70 rounded-2xl text-xs font-semibold text-neutral-200 transition active:scale-[0.99] leading-relaxed relative overflow-hidden group"
                >
                  <span className="block mb-1">{c.text}</span>
                  <span className={`text-[10px] font-bold ${c.deltaHours > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {c.reaction}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. 연산 로딩 */}
        {step === 'loading' && (
          <div className="text-center py-28">
            <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-black text-white">오피스 멘탈 내구도 분석 중...</h3>
            <p className="text-xs text-neutral-400 mt-1">사직서 결재 가능성 시뮬레이션 완료 중</p>
          </div>
        )}

        {/* 4. 최종 결과 리포트 */}
        {step === 'result' && (
          <div className="space-y-4">
            <div className="bg-neutral-900 border-2 border-red-600 p-6 rounded-3xl text-center space-y-4 shadow-2xl relative">
              <span className="text-xs font-black text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800 uppercase tracking-wider">
                {currentResult.status}
              </span>

              <div>
                <h2 className="text-2xl font-black text-white mt-1">{currentResult.title}</h2>
                <p className="text-xs font-bold text-red-400 mt-0.5">[{currentResult.badge}]</p>
              </div>

              {/* 최종 시한폭탄 게이지 스탬프 */}
              <div className="p-4 bg-black/60 rounded-2xl border border-neutral-800 text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">최종 남은 생존 시간</span>
                  <span className="text-red-500 font-mono font-black text-base">{d}일 {h}시간</span>
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed border-t border-neutral-800 pt-2">
                  {currentResult.desc}
                </div>
              </div>

              {/* 세부 진단 리포트 */}
              <div className="space-y-2 text-left text-xs font-sans">
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <strong className="text-neutral-200 block mb-0.5">💥 주요 붕괴 원인:</strong>
                  <span className="text-neutral-400">{currentResult.cause}</span>
                </div>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <strong className="text-neutral-200 block mb-0.5">💊 필수 생존 처방 아이템:</strong>
                  <span className="text-neutral-400">{currentResult.item}</span>
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
                <span>{copied ? "✅ 링크 복사 완료! 단톡방에 붙여넣기" : "단톡방에 내 잔여 수명 공유하기"}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setStep('intro'); setCurrentIdx(0); setHours(168); }}
                  className="py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition"
                >
                  🔄 다시 측정하기
                </button>
                <Link
                  href="/"
                  className="py-3 bg-neutral-200 hover:bg-white text-black font-bold text-xs text-center rounded-xl transition"
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
