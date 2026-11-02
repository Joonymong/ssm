import Link from 'next/link';

const TEST_LIST = [
  {
    id: 'salary-receipt',
    title: '월급 탈곡기 영수증 테스트',
    desc: '스쳐 지나간 280만 원, 내 돈 증발시킨 상사 홧김비용 청구서',
    emoji: '🧾',
    tag: 'HOT',
    accent: 'bg-rose-600'
  },
  {
    id: 'meeting-mafia',
    title: '회의실 침묵의 마피아 테스트',
    desc: '"자유롭게 의견 내봐" 소리에 반응하는 오피스 생존 유형',
    emoji: '🕶️',
    tag: '생존',
    accent: 'bg-amber-500 text-black'
  },
  {
    id: 'friend-grade',
    title: '나의 친구관계 성적표 진단',
    desc: '나는 몇 점짜리 친구일까? 우정 에너지 소모율 측정',
    emoji: '📊',
    tag: 'NEW',
    accent: 'bg-purple-600'
  },
  {
    id: 'office-boss',
    title: '직장 상사 분노 성향 테스트',
    desc: '극대노 상황에서 발동하는 나의 오피스 본능',
    emoji: '🔥',
    tag: '클래식',
    accent: 'bg-blue-600'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen comic-dots py-10 px-4 flex justify-center text-slate-950">
      <div className="w-full max-w-sm flex flex-col justify-between">
        
        {/* 상단 헤더: 큼직하고 선명한 타이틀 */}
        <header className="text-center relative pt-2 mb-4">
          <div className="absolute right-1 -top-2 text-3xl animate-bounce select-none">
            💥
          </div>
          
          <div className="inline-block bg-white border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] text-xs font-black tracking-wider uppercase mb-2">
            🗯️ MIND LAB
          </div>

          <h1 className="text-3xl font-black tracking-tight text-black drop-shadow-[2px_2px_0px_#fff]">
            오늘의 성향 연구소
          </h1>
          
          <p className="text-sm font-bold text-slate-900 mt-2 bg-white px-3 py-1 rounded-full border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
            1분 만에 까발리는 오피스 생존 본능
          </p>
        </header>

        {/* 메인 캐릭터: 피곤냥 */}
        <section className="text-center relative my-2">
          <span className="absolute left-4 top-2 bg-black text-white text-xs font-black px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#fff] z-10">
            피곤냥
          </span>

          <svg className="w-48 h-48 mx-auto drop-shadow-md" viewBox="0 0 200 200" fill="none">
            {/* 고양이 몸체 */}
            <path d="M50 190 C40 140, 50 100, 60 70 C70 40, 85 40, 95 65 C105 40, 120 40, 130 70 C140 100, 150 140, 140 190 Z" fill="white" stroke="black" strokeWidth="4" />
            {/* 귀 */}
            <path d="M65 65 L50 35 L80 50 Z" fill="#F1F5F9" stroke="black" strokeWidth="4" strokeLinejoin="round" />
            <path d="M125 65 L140 35 L110 50 Z" fill="#F1F5F9" stroke="black" strokeWidth="4" strokeLinejoin="round" />
            {/* 쳐진 억울한 눈 */}
            <path d="M75 95 Q85 90 90 100" stroke="black" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M115 100 Q120 90 130 95" stroke="black" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* 코 & 삐뚤빼뚤 입 */}
            <path d="M102 105 L98 112 H106 Z" fill="black" />
            <path d="M102 112 Q95 125 85 122" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M102 112 Q110 125 120 122" stroke="black" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* 턱살 주름 */}
            <path d="M92 135 Q102 140 112 135" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* 수염 */}
            <line x1="55" y1="110" x2="40" y2="108" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <line x1="55" y1="120" x2="38" y2="124" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <line x1="145" y1="110" x2="160" y2="108" stroke="black" strokeWidth="3" strokeLinecap="round" />
            <line x1="145" y1="120" x2="162" y2="124" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </section>

        {/* 테스트 카드 리스트: 텍스트 크기와 명도 대폭 강화 */}
        <section className="space-y-3.5 my-3">
          {TEST_LIST.map((test) => (
            <Link
              key={test.id}
              href={`/test/${test.id}`}
              className="block p-4 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-3xl p-2.5 bg-slate-50 border-2 border-black rounded-xl shrink-0">
                  {test.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-black text-black truncate">{test.title}</h2>
                    <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full border border-black shrink-0 ${test.accent}`}>
                      {test.tag}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-1">{test.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* 칼럼 배너: 글자 크기와 대비 개선 */}
        <div className="p-4 bg-amber-100 border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] flex items-center justify-between mb-6">
          <div className="pr-2">
            <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded">필독 리포트</span>
            <h3 className="text-sm font-black text-black mt-1">상사 갈등 & 번아웃 대처법</h3>
            <p className="text-[11px] font-bold text-slate-800 mt-0.5">심리학적 3단계 방어 기제</p>
          </div>
          <Link
            href="/column"
            className="text-xs font-black bg-black hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-black shadow-[2px_2px_0px_#fff] transition shrink-0"
          >
            읽기 →
          </Link>
        </div>

        {/* 푸터 */}
        <footer className="text-center text-xs font-black text-slate-800 border-t-2 border-black/20 pt-4 pb-2 space-y-1.5">
          <p>© 2026 Mind Lab. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-xs font-bold text-black underline">
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/column">연구소 리포트</Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
