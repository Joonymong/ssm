import Link from 'next/link';

// 앞으로 테스트가 늘어나면 이 목록에 한 줄씩 추가만 하면 됩니다.
const TEST_LIST = [
  {
    id: 'office-boss',
    title: '직장 상사 분노 성향 테스트',
    subtitle: '극대노 상황에서 드러나는 나의 오피스 생존 본능',
    emoji: '🔥',
    badge: '인기'
  },
  {
    id: 'meeting-mafia',
    title: '회의실 침묵의 마피아 테스트',
    subtitle: '"자유롭게 의견 내봐" 소리에 반응하는 생존 유형',
    emoji: '🕶️',
    badge: 'NEW'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">MIND LAB</span>
          <h1 className="text-2xl font-black text-slate-800 mt-2">오늘의 성향 연구소</h1>
          <p className="text-sm text-slate-500 mt-1">1분 만에 알아보는 내 진짜 성향</p>
        </header>

        <div className="space-y-4">
          {TEST_LIST.map((test) => (
            <Link
              key={test.id}
              href={`/test/${test.id}`}
              className="block p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl p-3 bg-slate-50 rounded-xl">{test.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-slate-800 text-sm">{test.title}</h2>
                    <span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full">{test.badge}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{test.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-12 text-center text-xs text-slate-400">
          <p>© 2026 Mind Lab. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
