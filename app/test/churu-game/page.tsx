'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChuruGame() {
  const [cats, setCats] = useState([
    { id: 1, name: '사장이', emoji: '🐈', title: '탕비실의 무법자', affection: 0, maxAffection: 100, unlocked: true, desc: '각종 서류를 찢어놓는 주범.' },
    { id: 2, name: '박대리', emoji: '🐱', title: '야근 3일 차 삼색이', affection: 0, maxAffection: 200, unlocked: false, desc: '눈밑에 다크서클이 내려앉은 고양이.' },
    { id: 3, name: '이사님', emoji: '🦁', title: '사옥 최고 뚱냥이', affection: 0, maxAffection: 500, unlocked: false, desc: '법인카드로 츄르를 쓸어담는 거대 뚱냥이.' }
  ]);
  
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null); // 클릭해서 잡은 고양이
  const [churuCount, setChuruCount] = useState(10); 
  const [money, setMoney] = useState(5000); 
  const [log, setLog] = useState('사내 오피스를 돌아다니는 고양이를 클릭해서 츄르를 챙겨주세요!');

  // 고양이들이 사무실 내에서 돌아다니는 위치 좌표 (퍼센트 %)
  const [catPositions, setCatPositions] = useState([
    { id: 1, x: 20, y: 40, dir: 1 },
    { id: 2, x: 60, y: 55, dir: -1 },
    { id: 3, x: 40, y: 70, dir: 1 },
  ]);

  // 미니게임 상태
  const [isFeeding, setIsFeeding] = useState(false);
  const [gauge, setGauge] = useState(0);
  const [gaugeDir, setGaugeDir] = useState(4);
  const [bossWarning, setBossWarning] = useState(false);

  // 고양이들이 사무실 안에서 이리저리 걸어 다니는 로직 (움직임 연출)
  useEffect(() => {
    const walkInterval = setInterval(() => {
      setCatPositions(prev => prev.map(pos => {
        let nextX = pos.x + pos.dir * (Math.random() * 4 + 1);
        let nextDir = pos.dir;
        if (nextX > 85 || nextX < 10) {
          nextDir *= -1; // 벽에 부딪히면 방향 전환
        }
        return { ...pos, x: nextX, dir: nextDir };
      }));
    }, 600);
    return () => clearInterval(walkInterval);
  }, []);

  // 츄르 게이지 움직임
  useEffect(() => {
    let timer: any;
    if (isFeeding) {
      timer = setInterval(() => {
        setGauge((prev) => {
          if (prev >= 100) setGaugeDir(-5);
          if (prev <= 0) setGaugeDir(5);
          return Math.max(0, Math.min(100, prev + gaugeDir));
        });
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isFeeding, gaugeDir]);

  // 팀장님 출현 이벤트
  useEffect(() => {
    const bossInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        setBossWarning(true);
        setLog('🚨 경보: 팀장님이 사옥 복도로 시찰 나왔습니다! [일하는 척] 버튼을 누르세요!');
        setTimeout(() => setBossWarning(false), 4000);
      }
    }, 18000);
    return () => clearInterval(bossInterval);
  }, []);

  // 고양이를 클릭했을 때
  const handleCatClick = (catId: number) => {
    const targetCat = cats.find(c => c.id === catId);
    if (!targetCat?.unlocked) {
      alert('아직 친해지지 않거나 잠겨 있는 고양이입니다!');
      return;
    }
    setSelectedCatId(catId);
    setLog(`✨ ${targetCat.name}를(을) 붙잡았습니다! 츄르를 짜주세요.`);
  };

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
    
    if (gauge >= 40 && gauge <= 70) {
      scoreGain = 35;
      resultMsg = '✨ 대성공! 고양이가 눈을 감고 황홀해합니다! (+35)';
    } else if (gauge < 15 || gauge > 85) {
      scoreGain = 5;
      resultMsg = '💦 너무 적거나 흘려서 고양이가 시큰둥합니다. (+5)';
    }

    if (selectedCatId !== null) {
      setCats(prev => prev.map(cat => {
        if (cat.id === selectedCatId) {
          const nextAff = Math.min(cat.maxAffection, cat.affection + scoreGain);
          return { ...cat, affection: nextAff };
        }
        return cat;
      }));
    }
    setLog(resultMsg);

    // 다음 고양이 해금
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
    setLog('💼 완벽하게 오피스 엑셀 화면을 띄워 팀장님을 속였습니다. 월급 +500원 획득!');
  };

  const buyChuru = () => {
    if (money < 1000) {
      alert('잔고가 부족합니다! 월루(일하는 척)를 해서 돈을 모으세요.');
      return;
    }
    setMoney(m => m - 1000);
    setChuruCount(c => c + 5);
    setLog('🛒 편의점에서 츄르 5개 세트를 구매했습니다.');
  };

  const activeCat = cats.find(c => c.id === selectedCatId);

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
        
        {/* 상단 인트라넷 위장 헤더 */}
        <div className="bg-[#1e293b] text-white p-3 rounded-2xl flex justify-between items-center border-2 border-stone-900 shadow-md">
          <div className="text-xs flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse"></span>
            <span>사내 오피스 실시간 모니터링 v2.4</span>
          </div>
          <div className="text-xs bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-600 font-bold">
            💰 잔고: ₩{money.toLocaleString()}
          </div>
        </div>

        {/* 팀장님 경보 오버레이 */}
        {bossWarning && (
          <div className="bg-red-500 text-white p-4 rounded-2xl border-4 border-black text-center shadow-xl space-y-2 animate-bounce">
            <p className="text-lg font-black">🚨 팀장님 시찰 중! 들키기 전에 숨으세요!</p>
            <button
              onClick={fakeWork}
              className="px-6 py-2 bg-white text-red-600 text-base font-black rounded-xl border-2 border-black active:scale-95 transition"
            >
              💼 엑셀 창 띄우기 (일하는 척)
            </button>
          </div>
        )}

        {/* 메인 사무실 그래픽 맵 (고양이가 돌아다니는 공간) */}
        <div className="bg-[#FFFDF8] p-5 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-4">
          
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

          {/* 🏢 진짜 사내 오피스 그래픽 맵 박스 */}
          <div className="relative w-full h-64 bg-[#E2E8F0] border-[2.5px] border-stone-900 rounded-3xl overflow-hidden shadow-inner">
            
            {/* 사무실 바닥 및 책상 가구 인테리어 요소 (그래픽 느낌) */}
            <div className="absolute top-4 left-6 w-20 h-10 bg-stone-300 border-2 border-stone-700 rounded-lg flex items-center justify-center text-[10px] font-bold">💻 개발팀 책상</div>
            <div className="absolute top-4 right-6 w-20 h-10 bg-stone-300 border-2 border-stone-700 rounded-lg flex items-center justify-center text-[10px] font-bold">🖨️ 복사기 룸</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-12 bg-amber-200 border-2 border-stone-700 rounded-xl flex items-center justify-center text-xs font-bold shadow-md">☕ 탕비실 식탁</div>

            {/* 사무실 안을 돌아다니는 고양이들 (클릭 가능!) */}
            {catPositions.map((pos) => {
              const catInfo = cats.find(c => c.id === pos.id);
              if (!catInfo) return null;

              return (
                <div
                  key={pos.id}
                  onClick={() => handleCatClick(pos.id)}
                  className="absolute cursor-pointer transition-all duration-500 hover:scale-125 flex flex-col items-center group"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div className="text-3xl animate-bounce">{catInfo.emoji}</div>
                  <span className="text-[10px] bg-stone-900 text-white px-1.5 py-0.5 rounded-md font-bold shadow-sm whitespace-nowrap opacity-90 group-hover:bg-amber-500">
                    {catInfo.unlocked ? catInfo.name : '🔒 잠김'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 팝업: 고양이를 클릭했을 때만 나타나는 츄르 급여 창 */}
          {activeCat && (
            <div className="bg-[#FFF8E7] border-[2.5px] border-stone-900 rounded-2xl p-4 space-y-3 shadow-md animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold flex items-center gap-1">
                  <span>{activeCat.emoji}</span> <span>{activeCat.name}를 잡았다!</span>
                </h3>
                <button
                  onClick={() => setSelectedCatId(null)}
                  className="text-xs bg-stone-200 px-2 py-1 rounded-lg border border-stone-700 font-bold"
                >
                  ✕ 닫기
                </button>
              </div>

              <p className="text-xs text-stone-600">{activeCat.desc}</p>

              {/* 친밀도 게이지 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>친밀도</span>
                  <span>{activeCat.affection} / {activeCat.maxAffection}</span>
                </div>
                <div className="w-full h-3 bg-stone-200 rounded-full border-2 border-stone-900 overflow-hidden relative">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-100"
                    style={{ width: `${(activeCat.affection / activeCat.maxAffection) * 100}%` }}
                  />
                </div>
              </div>

              {/* 미니게임 츄르 짜기 */}
              {!isFeeding ? (
                <button
                  onClick={startFeeding}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-stone-900 text-base font-bold rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  🪄 츄르 짜주기 시작!
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-amber-900">파란색 구간(대성공 존)에 바가 왔을 때 버튼을 누르세요!</p>
                  <div className="w-full h-5 bg-stone-200 rounded-full border-2 border-stone-900 relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-[45%] w-[30%] bg-blue-300/80 border-x-2 border-blue-600" />
                    <div
                      className="absolute top-0 bottom-0 w-3 bg-rose-500 rounded-full border border-black"
                      style={{ left: `calc(${gauge}% - 6px)` }}
                    />
                  </div>
                  <button
                    onClick={stopFeeding}
                    className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]"
                  >
                    🛑 쭈우욱 짜기 멈춤!
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 상황 로그창 */}
          <div className="p-3 bg-stone-100 rounded-2xl border-2 border-stone-900 text-xs text-stone-700 font-semibold">
            💬 {log}
          </div>

          {/* 하단 고양이 도감 요약 */}
          <div className="pt-2 border-t-2 border-dashed border-stone-300 flex justify-around text-xs">
            {cats.map((cat) => (
              <span key={cat.id} className={`font-bold ${cat.unlocked ? 'text-stone-900' : 'text-stone-400'}`}>
                {cat.emoji} {cat.name} ({Math.floor((cat.affection / cat.maxAffection) * 100)}%)
              </span>
            ))}
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
