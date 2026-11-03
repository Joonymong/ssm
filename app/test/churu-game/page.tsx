'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChuruGame() {
  const [cats, setCats] = useState([
    { id: 1, name: '사장이', emoji: '🐈', title: '탕비실의 무법자', affection: 0, maxAffection: 100, unlocked: true, desc: '각종 서류를 찢어놓는 주범. 츄르에 아주 사족을 못 씁니다.' },
    { id: 2, name: '박대리', emoji: '🐱', title: '야근 3일 차 삼색이', affection: 0, maxAffection: 200, unlocked: false, desc: '눈밑에 다크서클이 내려앉은 고양이. 쓰다듬으면 골골송을 부릅니다.' },
    { id: 3, name: '이사님', emoji: '🦁', title: '사옥 최고 뚱냥이', affection: 0, maxAffection: 500, unlocked: false, desc: '법인카드 카테고리를 츄르로 바꿔버린 전설의 거대 뚱냥이.' }
  ]);
  
  const [selectedCatId, setSelectedCatId] = useState(1);
  const [churuCount, setChuruCount] = useState(10); 
  const [money, setMoney] = useState(5000); 
  const [log, setLog] = useState('사내 복도 구석에서 고양이를 발견했습니다. 츄르를 짜주세요!');
  
  // 미니게임 상태
  const [isFeeding, setIsFeeding] = useState(false);
  const [gauge, setGauge] = useState(0);
  const [gaugeDir, setGaugeDir] = useState(3);
  
  // 팀장님 눈치 시스템
  const [bossWarning, setBossWarning] = useState(false);

  const currentCat = cats.find(c => c.id === selectedCatId) || cats[0];

  // 츄르 게이지 움직임
  useEffect(() => {
    let timer: any;
    if (isFeeding) {
      timer = setInterval(() => {
        setGauge((prev) => {
          if (prev >= 100) setGaugeDir(-4);
          if (prev <= 0) setGaugeDir(4);
          return Math.max(0, Math.min(100, prev + gaugeDir));
        });
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isFeeding, gaugeDir]);

  // 팀장님 출현 이벤트
  useEffect(() => {
    const bossInterval = setInterval(() => {
      if (Math.random() < 0.25) {
        setBossWarning(true);
        setLog('🚨 경보: 팀장님이 뒤쪽 복사기로 다가오고 있습니다! [일하는 척] 버튼을 누르세요!');
        setTimeout(() => {
          setBossWarning(false);
        }, 4000);
      }
    }, 15000);
    return () => clearInterval(bossInterval);
  }, []);

  const startFeeding = () => {
    if (churuCount <= 0) {
      alert('츄르가 다 떨어졌습니다! 편의점에서 츄르를 충전하세요.');
      return;
    }
    setChuruCount(c => c - 1);
    setIsFeeding(true);
    setGauge(0);
  };

  const stopFeeding = () => {
    setIsFeeding(false);
    
    let scoreGain = 15;
    let resultMsg = '츄르를 무난하게 급여했습니다. (+15)';
    
    if (gauge >= 45 && gauge <= 75) {
      scoreGain = 35;
      resultMsg = '✨ 대성공! 고양이가 눈을 감고 황홀해합니다! (+35)';
    } else if (gauge < 15 || gauge > 90) {
      scoreGain = 5;
      resultMsg = '💦 너무 적거나 흘렸습니다... 고양이가 시큰둥합니다. (+5)';
    }

    setCats(prev => prev.map(cat => {
      if (cat.id === selectedCatId) {
        const nextAff = cat.affection + scoreGain;
        return { ...cat, affection: Math.min(cat.maxAffection, nextAff) };
      }
      return cat;
    }));

    setLog(resultMsg);

    setTimeout(() => {
      setCats(prev => prev.map((cat, idx) => {
        if (idx > 0 && prev[idx - 1].affection >= prev[idx - 1].maxAffection) {
          return { ...cat, unlocked: true };
        }
        return cat;
      }));
    }, 100);
  };

  const fakeWork = () => {
    setBossWarning(false);
    setMoney(m => m + 500);
    setLog('💼 완벽하게 엑셀 화면을 띄워 팀장님을 속였습니다. 월급 +500원 획득!');
  };

  const buyChuru = () => {
    if (money < 1000) {
      alert('잔고가 부족합니다! 열심히 일하는 척(월루)해서 돈을 모으세요.');
      return;
    }
    setMoney(m => m - 1000);
    setChuruCount(c => c + 5);
    setLog('🛒 편의점에서 츄르 5개 세트를 구매했습니다.');
  };

  return (
    <main className="kkuk-theme min-h-screen bg-[#F5F0E6] py-8 px-4 flex justify-center text-stone-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');
        @font-face {
          font-family: 'MemomentKkukkkuk';
          src: url('/kkuk.ttf') format('truetype'), url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/MemomentKkukkkuk.woff2') format('woff2');
          font-weight: normal; font-display: swap;
        }
        .kkuk-theme, .kkuk-theme * {
          font-family: 'MemomentKkukkkuk', 'Gaegu', cursive, sans-serif !important;
        }
      `}} />

      <div className="w-full max-w-md space-y-4">
        
        {/* 상단 위장 헤더 */}
        <div className="bg-[#1e293b] text-white p-3 rounded-2xl flex justify-between items-center border-2 border-stone-900 shadow-md">
          <div className="text-xs flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse"></span>
            <span>사내 인트라넷 v2.4 (근태 관리 중)</span>
          </div>
          <div className="text-xs bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-600 font-bold">
            💰 잔고: ₩{money.toLocaleString()}
          </div>
        </div>

        {/* 팀장님 경보 오버레이 */}
        {bossWarning && (
          <div className="bg-red-500 text-white p-4 rounded-2xl border-4 border-black text-center shadow-xl space-y-2">
            <p className="text-lg font-black">🚨 팀장님 시찰 중! 들키기 전에 숨으세요!</p>
            <button
              onClick={fakeWork}
              className="px-6 py-2 bg-white text-red-600 text-base font-black rounded-xl border-2 border-black active:scale-95 transition"
            >
              💼 엑셀 창 띄우기 (일하는 척)
            </button>
          </div>
        )}

        {/* 메인 고양이 육성 구역 */}
        <div className="bg-[#FFFDF8] p-6 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-5 text-center">
          
          <div className="flex justify-between items-center">
            <span className="bg-amber-300 border-2 border-stone-900 px-3 py-1 rounded-full text-xs font-bold">
              🐟 남은 츄르: {churuCount}개
            </span>
            <button
              onClick={buyChuru}
              className="text-xs bg-stone-100 hover:bg-stone-200 border-2 border-stone-900 px-3 py-1 rounded-xl font-bold"
            >
              🛒 츄르 사기 (₩1,000)
            </button>
          </div>

          {/* 고양이 아파트 */}
          <div className="bg-[#E8F4F8] border-[2.5px] border-stone-900 rounded-3xl p-6 relative">
            <div className="text-7xl mb-2">{currentCat.emoji}</div>
            <h2 className="text-2xl font-bold">{currentCat.name}</h2>
            <p className="text-xs text-amber-800 font-bold mb-2">[{currentCat.title}]</p>
            <p className="text-xs text-stone-600 bg-white/80 p-2 rounded-xl border border-stone-300 inline-block font-semibold">
              {currentCat.desc}
            </p>

            {/* 호감도 게이지 */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>친밀도</span>
                <span>{currentCat.affection} / {currentCat.maxAffection}</span>
              </div>
              <div className="w-full h-4 bg-stone-200 rounded-full border-2 border-stone-900 overflow-hidden relative">
                <div
                  className="h-full bg-emerald-400 transition-all duration-100"
                  style={{ width: `${(currentCat.affection / currentCat.maxAffection) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 츄르 짜기 미니게임 구간 */}
          <div className="space-y-3">
            {!isFeeding ? (
              <button
                onClick={startFeeding}
                className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-stone-900 text-lg font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] transition"
              >
                🪄 츄르 짜주기 시작!
              </button>
            ) : (
              <div className="space-y-3 bg-[#FFF8E7] p-4 rounded-2xl border-2 border-stone-900">
                <p className="text-xs font-bold text-amber-900">파란색 구간(대성공 존)에 바가 들어왔을 때 버튼을 누르세요!</p>
                
                {/* 안정화된 게이지 바 */}
                <div className="w-full h-6 bg-stone-200 rounded-full border-2 border-stone-900 relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-[45%] w-[30%] bg-blue-300/80 border-x-2 border-blue-600" />
                  <div
                    className="absolute top-0 bottom-0 w-3 bg-rose-500 rounded-full border border-black"
                    style={{ left: `calc(${gauge}% - 6px)` }}
                  />
                </div>

                <button
                  onClick={stopFeeding}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white text-base font-bold rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  🛑 쭈우욱 짜기 멈춤!
                </button>
              </div>
            )}
          </div>

          {/* 로그창 */}
          <div className="p-3 bg-stone-100 rounded-2xl border-2 border-stone-900 text-xs text-stone-700 font-semibold">
            💬 {log}
          </div>

          {/* 도감 선택 바 */}
          <div className="pt-2 border-t-2 border-dashed border-stone-300">
            <p className="text-xs font-bold text-stone-500 mb-2">사내 고양이 도감 선택</p>
            <div className="grid grid-cols-3 gap-2">
              {cats.map((cat) => (
                <button
                  key={cat.id}
                  disabled={!cat.unlocked}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-2 rounded-xl border-2 border-stone-900 text-xs font-bold transition ${
                    selectedCatId === cat.id ? 'bg-amber-300 shadow-[2px_2px_0px_#1c1917]' : cat.unlocked ? 'bg-white' : 'bg-stone-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {cat.unlocked ? `${cat.emoji} ${cat.name}` : '🔒 잠김'}
                </button>
              ))}
            </div>
          </div>

        </div>

        <Link
          href="/"
          className="block w-full py-3 bg-white text-stone-900 text-sm font-bold text-center rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917]"
        >
          🏠 연구소 홈으로 돌아가기
        </Link>

      </div>
    </main>
  );
}
