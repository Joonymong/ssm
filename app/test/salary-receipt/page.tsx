'use client';

import { useState } from 'react';
import Link from 'next/link';

// 질문 10문항 (소비 패턴: 즉흥 홧김비용 vs 현실 도피 장비빨 / 소액 탕진 vs 거액 질주)
const QUESTIONS = [
  { text: "월요일 아침 출근길, 지하철 안에서 내 손가락은?", a: { text: "일단 출근 전 당 충전용 배민/사이렌오더 결제", type: 'FOOD' }, b: { text: "SNS 광고에 뜬 감성 아이템 무지성 결제", type: 'SHOP' } },
  { text: "상사한테 영문도 모르고 억울하게 까인 날 점심 메뉴는?", a: { text: "마라탕 소고기 3번 추가 + 꿔바로우로 위장 폭행", type: 'FOOD' }, b: { text: "밥맛 떨어져서 카페 가서 7천 원짜리 시그니처 음료 테이크아웃", type: 'HEAL' } },
  { text: "오후 3시 40분, 업무 집중력 바닥났을 때 켜는 화면은?", a: { text: "올리브영 세일 / 무신사 장바구니 기웃거리기", type: 'SHOP' }, b: { text: "에어비앤비 / 항공권 가격 비교하며 현실 도피", type: 'ESCAPE' } },
  { text: "퇴근 10분 전, 상사가 야근 일거리를 던졌을 때 내 대처는?", a: { text: "퇴근길 카카오 택시 블랙/블루 바로 호출", type: 'HEAL' }, b: { text: "'이러려고 돈 버나' 주말 호캉스 예약 결제창 열기", type: 'ESCAPE' } },
  { text: "동기들과 탕비실에서 상사 뒷담화 후 찾아오는 공허함에는?", a: { text: "배달앱 켜서 퇴근 후 먹을 야식+맥주 풀세트 선주문", type: 'FOOD' }, b: { text: "'이직 공부나 해야지' 자격증 책/인강 12개월 할부", type: 'SHOP' } },
  { text: "월급날 통장에 찍힌 숫자를 확인한 직후 든 생각은?", a: { text: "한 달 동안 고생한 나를 위한 오마카세/명품 선물 검색", type: 'SHOP' }, b: { text: "카드값 빠져나가기 전에 당장 이번 주말 여행지 서치", type: 'ESCAPE' } },
  { text: "약속 없는 금요일 밤, 침대에 누워 인스타 보다가 꽂힌 물건은?", a: { text: "삶의 질을 높여준다는 힐링 룸스프레이/조명 바로 구매", type: 'HEAL' }, b: { text: "야식 랭킹 1위 매운 닭발 세트 터치", type: 'FOOD' } },
  { text: "회사 메신저 알림 소리만 들어도 심장이 덜컥 내려앉을 때", a: { text: "노이즈 캔슬링 신형 헤드폰 최저가 검색", type: 'HEAL' }, b: { text: "퇴사 후 갈 한 달 살기 숙소 찜 목록 채우기", type: 'ESCAPE' } },
  { text: "나에게 '시발비용(홧김비용)'이란?", a: { text: "순간의 분노를 잠재워주는 가장 확실한 알약", type: 'FOOD' }, b: { text: "숨 막히는 오피스를 탈출하기 위한 생존 비상금", type: 'ESCAPE' } },
  { text: "통장 잔고 4자리 숫자를 봤을 때 내 솔직한 심정은?", a: { text: "'어차피 다음 달의 내가 갚겠지' 미래의 나에게 토스", type: 'SHOP' }, b: { text: "'병원비 안 든 게 어디냐, 정신 건강 지켰다' 정신 승리", type: 'HEAL' } }
];

// 4가지 영수증 결과 데이터
interface ReceiptResult {
  code: string;
  title: string;
  subtitle: string;
  totalLoss: string;
  items: Array<{ name: string; price: string }>;
  verdict: string;
  leakCause: string;
}

const RESULTS: Record<string, ReceiptResult> = {
  FOOD: {
    code: "RCPT-FATAL-01",
    title: "위장 폭행 홧김 배달러",
    subtitle: "상사의 폭언을 탄수화물과 당분으로 틀어막은 자",
    totalLoss: "₩ 1,480,000",
    items: [
      { name: "마라탕 소고기 4회 추가 및 꿔바로우", price: "₩ 38,000" },
      { name: "야근 분노 진정용 디저트 릴레이 배달", price: "₩ 26,500" },
      { name: "출근 거부 반응 방어용 고카페인 라떼", price: "₩ 7,500" },
      { name: "심야 홧김 맥주 및 편의점 털기", price: "₩ 42,000" }
    ],
    verdict: "당신의 월급은 대부분 음식물 쓰레기와 뱃살로 환전되었습니다. 분노를 입으로 씹어 삼키는 타입으로, 상사 때문에 망가진 위장과 텅 빈 통장이 동시에 비명을 지르고 있습니다.",
    leakCause: "직장 상사 스트레스 ➡️ 도파민 결핍 ➡️ 탄수화물 폭식 누수"
  },
  SHOP: {
    code: "RCPT-SHOP-02",
    title: "장바구니 쾌락 도파민 중독자",
    subtitle: "업무시간 엑셀 뒤에서 택배 상자 20개 쌓아둔 자",
    totalLoss: "₩ 2,130,000",
    items: [
      { name: "회의 도중 홧김에 지른 한정판 스니커즈", price: "₩ 289,000" },
      { name: "기분 전환용 향수 및 룸스프레이 3종", price: "₩ 145,000" },
      { name: "포장도 안 뜯고 쌓아둔 쿠팡 로켓 배송 묶음", price: "₩ 118,000" },
      { name: "이직 결심용 쓰지 않는 프리미엄 다이어리", price: "₩ 35,000" }
    ],
    verdict: "택배 상자를 뜯을 때의 3초 도파민으로 하루를 버티는 유형입니다. 결제할 때만 짜릿하고 정작 도착하면 뜯지도 않은 상자가 방구석에 산더미처럼 쌓여 있는 것이 특징입니다.",
    leakCause: "상사 잔소리 회피용 결제 버튼 광클"
  },
  HEAL: {
    code: "RCPT-HEAL-03",
    title: "오피스 생존 장비병 환자",
    subtitle: "내 돈으로 사무실 내 안락함을 구축하려 한 자",
    totalLoss: "₩ 1,890,000",
    items: [
      { name: "인체공학 버티컬 마우스 및 저소음 키보드", price: "₩ 210,000" },
      { name: "상사 목소리 차단용 노이즈 캔슬링 헤드폰", price: "₩ 420,000" },
      { name: "퇴근 10분 전 탈출용 카카오택시 블랙", price: "₩ 52,000" },
      { name: "속 터지는 뒷목 진정용 안마기 및 영양제", price: "₩ 165,000" }
    ],
    verdict: "회사가 주는 고통을 내 돈 들여 방어하는 호구형 생존러입니다. 장비는 이미 실리콘밸리 수석 개발자 수준이지만 정작 통장은 0원에 수렴해 퇴사를 못 하는 뫼비우스의 띠에 갇혔습니다.",
    leakCause: "상사의 소음 및 물리적 스트레스 방어 비용 과다"
  },
  ESCAPE: {
    code: "RCPT-ESC-04",
    title: "퇴사 망상 현실 도피러",
    subtitle: "몸은 사무실에 두고 영혼은 이미 발리에 가 있는 자",
    totalLoss: "₩ 2,950,000",
    items: [
      { name: "분노 폭발 후 충동 결제한 5성급 호캉스 1박", price: "₩ 480,000" },
      { name: "언젠가 갈 퇴사 기념 해외여행 특가 항공권", price: "₩ 890,000" },
      { name: "퇴근길 우울증 방어용 주말 글램핑 예약", price: "₩ 260,000" },
      { name: "도피성 취미 원데이 클래스 수강권 3매", price: "₩ 195,000" }
    ],
    verdict: "사무실에 1초도 더 있기 싫어 돈으로 시간과 공간을 사버리는 탈출형입니다. 큰 덩어리의 지출이 잦아 통장이 스치듯 지나가며, 카드값 결제일이 다가오면 다시 얌전한 직장인으로 복귀합니다.",
    leakCause: "오피스 현실 부정을 위한 시공간 탈출 비용"
  }
};

export default function SalaryReceiptTest() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ FOOD: 0, SHOP: 0, HEAL: 0, ESCAPE: 0 });
  const [resKey, setResKey] = useState<string>('FOOD');

  const onSelect = (type: string) => {
    const nextScores = { ...scores, [type]: (scores[type] || 0) + 1 };
    setScores(nextScores);

    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      let maxKey = 'FOOD';
      let maxVal = -1;
      Object.entries(nextScores).forEach(([k, v]) => {
        if (v > maxVal) {
          maxVal = v;
          maxKey = k;
        }
      });
      setResKey(maxKey);
      setStep('loading');
      setTimeout(() => setStep('result'), 1800);
    }
  };

  const currentResult = RESULTS[resKey];

  return (
    <main className="min-h-screen bg-neutral-900 py-10 px-4 flex justify-center text-slate-800">
      <div className="w-full max-w-md">
        {/* 1. 시작 화면 */}
        {step === 'intro' && (
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center border-4 border-dashed border-neutral-300 mt-6">
            <span className="text-6xl block mb-3">🧾</span>
            <span className="text-[11px] font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
              2026 Office Receipt
            </span>
            <h1 className="text-2xl font-black text-neutral-900 mt-3">월급 탈곡기 영수증 테스트</h1>
            <p className="text-xs text-neutral-500 mt-2 mb-8 leading-relaxed">
              "스쳐 지나간 280만 원, 범인은 직장 상사 홧김비용이었다"
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition active:scale-[0.98]"
            >
              내 탕진 영수증 출력하기 (1분)
            </button>
          </div>
        )}

        {/* 2. 질문 화면 */}
        {step === 'quiz' && (
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-neutral-200 mt-6">
            <div className="w-full bg-neutral-100 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-rose-600 h-full transition-all duration-300"
                style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-black text-rose-600">ITEM {idx + 1} / 10</span>
            <h2 className="text-base font-bold text-neutral-900 mt-1 mb-6 leading-snug">
              {QUESTIONS[idx].text}
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => onSelect(QUESTIONS[idx].a.type)}
                className="w-full p-4 text-left border-2 border-neutral-200 rounded-2xl text-xs font-bold text-neutral-700 hover:border-rose-500 hover:bg-rose-50/40 transition active:scale-[0.99]"
              >
                {QUESTIONS[idx].a.text}
              </button>
              <button
                onClick={() => onSelect(QUESTIONS[idx].b.type)}
                className="w-full p-4 text-left border-2 border-neutral-200 rounded-2xl text-xs font-bold text-neutral-700 hover:border-rose-500 hover:bg-rose-50/40 transition active:scale-[0.99]"
              >
                {QUESTIONS[idx].b.text}
              </button>
            </div>
          </div>
        )}

        {/* 3. 영수증 출력 중 로딩 */}
        {step === 'loading' && (
          <div className="text-center py-28 text-white">
            <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-base font-black">카드 승인 내역 조회 중...</h3>
            <p className="text-xs text-neutral-400 mt-1">상사 홧김비용 바코드 인쇄 중</p>
          </div>
        )}

        {/* 4. 진짜 편의점 영수증 UI 결과창 */}
        {step === 'result' && (
          <div className="space-y-4">
            <div className="bg-[#FAF9F5] p-6 shadow-2xl rounded-sm border-t-8 border-rose-600 font-mono relative overflow-hidden">
              {/* 영수증 상단 헤더 */}
              <div className="text-center border-b border-dashed border-neutral-400 pb-4 mb-4">
                <h3 className="text-lg font-black tracking-widest text-neutral-900">OFFICE SLIP</h3>
                <p className="text-[10px] text-neutral-500">2026-11-02 18:00:00 / POS: #042</p>
                <span className="text-[11px] font-bold text-rose-600 mt-1 inline-block">
                  [{currentResult.code}]
                </span>
              </div>

              {/* 영수증 타이틀 */}
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-neutral-500">당신의 탕진 유형</span>
                <h2 className="text-xl font-black text-neutral-900 mt-1">{currentResult.title}</h2>
                <p className="text-[11px] text-neutral-600 mt-1 font-sans">"{currentResult.subtitle}"</p>
              </div>

              {/* 항목별 구매 내역 */}
              <div className="border-t border-b border-neutral-300 py-3 my-4 text-xs space-y-2">
                <div className="flex justify-between font-bold text-[10px] text-neutral-500 border-b border-neutral-200 pb-1">
                  <span>항목명 (상사 분노 내역)</span>
                  <span>금액</span>
                </div>
                {currentResult.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-[11px] text-neutral-800">
                    <span className="truncate pr-2 font-sans">{item.name}</span>
                    <span className="font-bold shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* 합계 금액 */}
              <div className="flex justify-between items-center py-2 text-base font-black border-b-2 border-neutral-800">
                <span>총 증발 금액</span>
                <span className="text-rose-600">{currentResult.totalLoss}</span>
              </div>

              {/* 누수 원인 & 판결 요약 */}
              <div className="mt-4 pt-2 text-xs font-sans space-y-2">
                <div className="p-2.5 bg-neutral-100 rounded text-[11px]">
                  <strong className="text-neutral-900 block mb-0.5">🚨 주요 누수 원인:</strong>
                  <span className="text-neutral-600">{currentResult.leakCause}</span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed pt-2">
                  {currentResult.verdict}
                </p>
              </div>

              {/* 하단 바코드 그래픽 */}
              <div className="mt-8 pt-4 border-t border-dashed border-neutral-400 text-center">
                <div className="h-10 bg-neutral-900 mx-auto w-3/4 flex justify-around items-stretch py-1 px-2">
                  <div className="w-1 bg-white h-full" />
                  <div className="w-2 bg-white h-full" />
                  <div className="w-0.5 bg-white h-full" />
                  <div className="w-2 bg-white h-full" />
                  <div className="w-1 bg-white h-full" />
                  <div className="w-3 bg-white h-full" />
                </div>
                <p className="text-[9px] text-neutral-400 mt-1 tracking-widest">
                  8809123 456789 (NO REFUND)
                </p>
              </div>

              {/* 영수증 지그재그 하단 컷팅 효과 */}
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-neutral-900" style={{ clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0, 100% 100%, 0 100%)' }} />
            </div>

            {/* 홈으로 및 다음 테스트 추천 */}
            <Link
              href="/"
              className="block w-full py-4 bg-white hover:bg-neutral-100 text-neutral-900 font-black text-center text-xs rounded-2xl shadow-xl transition"
            >
              👉 오늘의 성향 연구소 홈으로 가기
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
