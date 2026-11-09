import Link from 'next/link';
import SmartBanner from '@/components/SmartBanner';

const TEST_LIST = [
  {
    id: 'churu-game',
    title: '사내 고양이 츄르주기 🐈',
    desc: '근무 중에 몰래 사내 고양이에게 츄르를 주고 팀장님 눈치를 피하는 완벽한 월루 타이쿤 게임!',
    emoji: '🐟',
    tag: '신규',
    accent: 'bg-amber-400 text-stone-900'
  },
  {
    id: 'fate-travel',
    title: '사주 X 성향 운명 여행지 진단',
    desc: '생년월일시와 나의 성향이 만났을 때, 전 세계에 숨겨진 운명의 땅은?',
    emoji: '✈️🔮',
    tag: '초강추',
    accent: 'bg-amber-800 text-white'
  },
  {
    id: 'quit-timer',
    title: '직장인 퇴사 충동 타이머',
    desc: '실시간 시한폭탄! 내가 사직서 던지기까지 남은 시간은?',
    emoji: '💣',
    tag: 'NEW 킬러',
    accent: 'bg-red-600 text-white'
  },
  {
    id: 'chiikawa',
    title: '먼가 작고 찌든 녀석들 테스트',
    desc: '눈물샘 찌이? 샤우팅 토끼? 나의 오피스 생존 캐릭터',
    emoji: '🌸',
    tag: '초인기',
    accent: 'bg-pink-500 text-white'
  },
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
            <path d="M102 11
