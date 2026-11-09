'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChuruGame() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');

  const [cats, setCats] = useState([
    { id: 1, name: '사장이', emoji: '🐈', title: '탕비실의 무법자', affection: 0, maxAffection: 100, unlocked: true, desc: '각종 서류를 찢어놓는 주범.' },
    { id: 2, name: '박대리', emoji: '🐱', title: '야근 3일 차 삼색이', affection: 0, maxAffection: 200, unlocked: false, desc: '눈밑에 다크서클이 내려앉은 고양이.' },
    { id: 3, name: '이사님', emoji: '🦁', title: '사옥 최고 뚱냥이', affection: 0, maxAffection: 500, unlocked: false, desc: '법인카드로 츄르를 쓸어담는 거대 뚱냥이.' }
  ]);
  
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [churuCount, setChuruCount] = useState(3); 
  const [money, setMoney] = useState(1500); 
  const [log, setLog] = useState('사무실을 둘러보세요. 벨이 울리면 일거리를 처리해 돈을 벌 수 있습니다!');

  const [kusariCount, setKusariCount] = useState(0);
  const [activeCatOnMap, setActiveCatOnMap] = useState<{ id: number; x: number; y: number } | null>(null);

  // 🔔 책상별 긴급 업무 벨 상태 (어떤 책상에서 벨이 울리고 있는지)
  const [activeBellDesk, setActiveBellDesk] = useState<number | null>(null);

  const [isFeeding, setIsFeeding] = useState(false);
  const [gauge, setGauge] = useState(0);
  const [gaugeDir, setGaugeDir] = useState(5);
  const [bossWarning, setBossWarning] = useState(false);

  // ⏰ [고정 지출] 7초마다 250원 차감 (초반 난이도 살짝 완화)
  useEffect(() => {
    if (gameState !== 'playing') return;
    const expenseInterval = setInterval(() => {
      setMoney(m => {
        const nextMoney = m - 250;
        if (nextMoney <= 0) setGameState('gameover');
        return nextMoney;
      });
      setLog('💸 [고정 지출 발생] 커피값 및 점심 갹출비로 250원이 차감되었습니다.');
    }, 7000);
    return () => clearInterval(expenseInterval);
  }, [gameState]);

  // 🔔 [긴급 일거리 벨 시스템] 랜덤 책상(0~3번)에서 5~9초마다 벨 울림
  useEffect(() => {
    if (gameState !== 'playing') return;
    const bellInterval = setInterval(() => {
      if (activeBellDesk === null) {
        const randomDesk = Math.floor(Math.random() * 4); // 책상 4개 중 하나
        setActiveBellDesk(randomDesk);
        setLog('🔔 사내 책상 중 한 곳에서 급한 업무 벨이 울립니다! [처리하기]를 눌러 돈을 버세요!');
      }
    }, 7000);
    return () => clearInterval(bellInterval);
  }, [gameState, activeBellDesk]);

  // 🐈 [랜덤 고양이 스폰 시스템] 10~15초 간격
  useEffect(() => {
    if (gameState !== 'playing') return;
    const spawnInterval = setInterval(() => {
      if (!activeCatOnMap && selectedCatId === null) {
        const unlockedCats = cats.filter(c => c.unlocked);
        const randomCat = unlockedCats[Math.floor(Math.random() * unlockedCats.length)];
        
        setActiveCatOnMap({
          id: randomCat.id,
          x: Math.floor(Math.random() * 70) + 15,
          y: Math.floor(Math.random() * 50) + 25,
        });
        setLog(`👀 [제보] 책상 사이로 ${randomCat.name}가(이) 나타났습니다! (고양이를 누르거나 일을 하세요)`);
      }
    }, 12000);
    return () => clearInterval(spawnInterval);
  }, [gameState, activeCatOnMap, selectedCatId, cats]);

  // 츄르 게이지
  useEffect(() => {
    let timer: any;
    if (isFeeding) {
      timer = setInterval(() => {
        setGauge((prev) => {
          if (prev >= 100) setGaugeDir(-6);
          if (prev <= 0) setGaugeDir(6);
          return Math.max(0, Math.min(100, prev + gaugeDir));
        });
      }, 25);
    }
    return () => clearInterval(timer);
  }, [isFeeding, gaugeDir]);

  // 팀장님 급습
  useEffect(() => {
    if (gameState !== 'playing') return;
    const bossInterval = setInterval(() => {
      if (Math.random() < 0.25) {
        setBossWarning(true);
        setLog('🚨 경보: 팀장님이 급습했습니다! [일하는 척] 버튼을 눌러 위기를 모면하세요!');
        setTimeout(() => setBossWarning(false), 3500);
      }
    }, 15000);
    return () => clearInterval(bossInterval);
  }, [gameState]);

  // 🏢 빈 공간 클릭 시 쿠사리
  const handleOfficeClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.officeArea === 'true') {
      const nextKusari = kusariCount + 1;
      setKusariCount(nextKusari);
      setLog(`💥 헛다리를 짚어 **인사팀 책상 영역**을 건드렸습니다! 상사에게 따가운 눈총과 쿠사리를 먹었습니다 (${nextKusari}/3)`);
      if (nextKusari >= 3) setGameState('gameover');
    }
  };

  const handleCatCatch = (catId: number) => {
    const targetCat = cats.find(c => c.id === catId);
    if (!targetCat) return;

    setSelectedCatId(catId);
    setActiveCatOnMap(null);
    setLog(`✨ ${targetCat.name}를(을) 품에 안았습니다! 츄르를 짜주세요.`);
  };

  // 💼 긴급 일거리 처리하고 100원 벌기
  const handleResolveTask = (deskIdx: number) => {
    if (activeBellDesk === deskIdx) {
      setMoney(m => m + 100);
      setActiveBellDesk(null);
      setLog('📈 긴급 업무를 신속하게 처리하여 회사로부터 ₩100를 벌었습니다!');
    }
  };

  const startFeeding = () => {
    if (churuCount <= 0) {
      alert('츄르가 다 떨어졌습니다! 일거리를 처리해 돈을 벌고 츄르를 사세요.');
      return;
    }
    setChuruCount(c => c - 1);
    setIsFeeding(true);
    setGauge(0);
  };

  const stopFeeding = () => {
    setIsFeeding(false);
    
    if (gauge < 40 || gauge > 70) {
      const nextKusari = kusariCount + 1;
      setKusariCount(nextKusari);
      setLog(`💦 앗! 타이밍을 놓쳐 뿜어져 나온 츄르가 **상사의 정장 옷자락**에 척 하니 묻었습니다! (쿠사리 ${nextKusari}/3)`);
      setSelectedCatId(null);
      if (nextKusari >= 3) setGameState('gameover');
      return;
    }

    let scoreGain = 35;
    let resultMsg = '✨ 완벽한 타이밍! 고양이가 눈을 감고 황홀해합니다! (+35)';

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
    setSelectedCatId(null);

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
    setMoney(m => m + 200);
    setLog('💼 눈물겨운 엑셀 뷰로 팀장님을 속였습니다. 월급 +200원 획득!');
  };

  const buyChuru = () => {
    if (money < 800) {
      alert('잔고가 부족합니다! 각 책상에서 울리는 [긴급 일거리]를 처리해 돈을 모으세요!');
      return;
    }
    setMoney(m => m - 800);
    setChuruCount(c => c + 3);
    setLog('🛒 편의점에서 츄르 3개 세트를 구매했습니다.');
  };

  const activeCat = cats.find(c => c.id === selectedCatId);

  return (
    <main className="min-h-screen bg-[#F5F0E6] py-8 px-4 flex justify-center text-stone-900">
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
      />
      <style dangerouslySetInnerHTML={{ __html: `
        body, button, input, select, textarea {
          font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
      `}} />

      <div className="w-full max-w-md space-y-4">

        {/* 오리엔테이션 */}
        {gameState === 'intro' && (
          <div className="bg-[#FFFDF8] p-6 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-5 text-center">
            <span className="inline-block bg-amber-300 border-2 border-stone-900 px-3 py-0.5 rounded-full text-sm font-bold">
              🏢 픽셀 오피스 월루 타이쿤 + 알바 생존
            </span>
            <h1 className="text-3xl font-bold leading-snug">
              파산 위기 탈출!<br />긴급 일거리 처리 시스템
            </h1>

            <div className="bg-[#FFF8E7] p-4 rounded-2xl border-2 border-stone-900 text-left space-y-2 text-sm">
              <p>📌 <strong>생존 가이드:</strong></p>
              <p>1. 통장이 바닥나기 전에 책상에서 <strong>벨이 울리면 [처리하기]</strong>를 눌러 100원씩 벌 수 있습니다.</p>
              <p>2. 고양이를 외면하고 열심히 일거리를 처리해 파산을 면하세요!</p>
              <p>3. <strong>주의!</strong> 엉뚱한 빈 공간을 누르면 상사에게 **쿠사리(3회 누적 시 게임오버)**를 먹습니다.</p>
            </div>

            <button
              onClick={() => { setGameState('playing'); setKusariCount(0); setMoney(1500); setChuruCount(3); }}
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-stone-900 text-xl font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917]"
            >
              출근 및 게임 시작하기 🏢
            </button>
          </div>
        )}

        {/* 게임 플레이 */}
        {gameState === 'playing' && (
          <>
            <div className="bg-[#1e293b] text-white p-3 rounded-2xl flex justify-between items-center border-2 border-stone-900 shadow-md">
              <div className="text-xs flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse"></span>
                <span>쿠사리: <strong className="text-yellow-300">{kusariCount}/3</strong></span>
              </div>
              <div className="text-xs bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-600 font-bold">
                💰 잔고: <span className={money < 500 ? 'text-red-400 animate-ping' : 'text-emerald-400'}>₩{money.toLocaleString()}</span>
              </div>
            </div>

            {bossWarning && (
              <div className="bg-red-500 text-white p-4 rounded-2xl border-4 border-black text-center shadow-xl space-y-2 animate-bounce">
                <p className="text-lg font-black">🚨 팀장님 급습! 당장 일하는 척을 누르세요!</p>
                <button
                  onClick={fakeWork}
                  className="px-6 py-2 bg-white text-red-600 text-base font-black rounded-xl border-2 border-black active:scale-95 transition"
                >
                  💼 엑셀 창 띄우기 (월급 +200원)
                </button>
              </div>
            )}

            <div className="bg-[#FFFDF8] p-5 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-4">
              
              <div className="flex justify-between items-center">
                <span className="bg-amber-300 border-2 border-stone-900 px-3 py-1 rounded-full text-sm font-bold">
                  🐟 남은 츄르: {churuCount}개
                </span>
                <button
                  onClick={buyChuru}
                  className="text-xs bg-stone-100 hover:bg-stone-200 border-2 border-stone-900 px-3 py-1 rounded-xl font-bold"
                >
                  🛒 츄르 사기 (₩800)
                </button>
              </div>

              {/* 사무실 맵 (각 책상마다 벨이 울릴 수 있음) */}
              <div
                data-office-area="true"
                onClick={handleOfficeClick}
                className="relative w-full h-72 bg-[#CBD5E1] border-[2.5px] border-stone-900 rounded-3xl overflow-hidden shadow-inner cursor-crosshair select-none"
              >
                {/* 책상 0: 개발자 */}
                <div data-office-area="true" className="absolute top-6 left-6 w-24 h-16 bg-stone-400 border-2 border-stone-800 rounded-xl flex flex-col items-center justify-center text-xs font-bold shadow">
                  <span className="text-[10px]">👤 개발자 책상</span>
                  {activeBellDesk === 0 ? (
                    <button onClick={(e) => { e.stopPropagation(); handleResolveTask(0); }} className="mt-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded animate-bounce font-black">
                      🔔 처리하기 (+100)
                    </button>
                  ) : (
                    <div className="w-8 h-3 bg-stone-700 rounded-sm mt-1"></div>
                  )}
                </div>

                {/* 책상 1: 기획자 */}
                <div data-office-area="true" className="absolute top-6 right-6 w-24 h-16 bg-stone-400 border-2 border-stone-800 rounded-xl flex flex-col items-center justify-center text-xs font-bold shadow">
                  <span className="text-[10px]">👤 기획자 책상</span>
                  {activeBellDesk === 1 ? (
                    <button onClick={(e) => { e.stopPropagation(); handleResolveTask(1); }} className="mt-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded animate-bounce font-black">
                      🔔 처리하기 (+100)
                    </button>
                  ) : (
                    <div className="w-8 h-3 bg-stone-700 rounded-sm mt-1"></div>
                  )}
                </div>

                {/* 책상 2: 인사팀 (페널티 구역) */}
                <div data-office-area="true" className="absolute bottom-6 left-6 w-24 h-16 bg-rose-200 border-2 border-stone-800 rounded-xl flex flex-col items-center justify-center text-xs font-bold shadow">
                  <span className="text-[10px] text-rose-900">🗂️ 인사팀 책상</span>
                  {activeBellDesk === 2 ? (
                    <button onClick={(e) => { e.stopPropagation(); handleResolveTask(2); }} className="mt-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded animate-bounce font-black">
                      🔔 처리하기 (+100)
                    </button>
                  ) : (
                    <div className="w-8 h-3 bg-rose-400 rounded-sm mt-1"></div>
                  )}
                </div>

                {/* 책상 3: 마케터 */}
                <div data-office-area="true" className="absolute bottom-6 right-6 w-24 h-16 bg-stone-400 border-2 border-stone-800 rounded-xl flex flex-col items-center justify-center text-xs font-bold shadow">
                  <span className="text-[10px]">👤 마케터 책상</span>
                  {activeBellDesk === 3 ? (
                    <button onClick={(e) => { e.stopPropagation(); handleResolveTask(3); }} className="mt-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded animate-bounce font-black">
                      🔔 처리하기 (+100)
                    </button>
                  ) : (
                    <div className="w-8 h-3 bg-stone-700 rounded-sm mt-1"></div>
                  )}
                </div>

                {/* 랜덤 고양이 등장 */}
                {activeCatOnMap && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCatCatch(activeCatOnMap.id);
                    }}
                    className="absolute cursor-pointer animate-bounce transition-transform hover:scale-125 z-20 flex flex-col items-center"
                    style={{ left: `${activeCatOnMap.x}%`, top: `${activeCatOnMap.y}%` }}
                  >
                    <span className="text-4xl filter drop-shadow-md">🐈</span>
                    <span className="text-[11px] bg-amber-400 border border-stone-900 px-1.5 py-0.5 rounded font-black text-stone-900 shadow">
                      포획하기!
                    </span>
                  </div>
                )}

                {!activeCatOnMap && !activeCat && activeBellDesk === null && (
                  <div data-office-area="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs text-stone-600 font-bold bg-white/70 px-3 py-1 rounded-full border border-stone-400">
                      사무실 대기 중... 고양이 또는 업무 벨을 기다리세요 ☕
                    </span>
                  </div>
                )}
              </div>

              {activeCat && (
                <div className="bg-[#FFF8E7] border-[2.5px] border-stone-900 rounded-2xl p-4 space-y-3 shadow-md">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold flex items-center gap-1">
                      <span>{activeCat.emoji}</span> <span>{activeCat.name}를 잡았다!</span>
                    </h3>
                    <button
                      onClick={() => setSelectedCatId(null)}
                      className="text-xs bg-stone-200 px-2 py-1 rounded-lg border border-stone-700 font-bold"
                    >
                      ✕ 도망치기
                    </button>
                  </div>

                  <p className="text-sm text-stone-600">{activeCat.desc}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-bold">
                      <span>친밀도</span>
                      <span>{activeCat.affection} / {activeCat.maxAffection}</span>
                    </div>
                    <div className="w-full h-3.5 bg-stone-200 rounded-full border-2 border-stone-900 overflow-hidden relative">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-100"
                        style={{ width: `${(activeCat.affection / activeCat.maxAffection) * 100}%` }}
                      />
                    </div>
                  </div>

                  {!isFeeding ? (
                    <button
                      onClick={startFeeding}
                      className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-stone-900 text-lg font-bold rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]"
                    >
                      🪄 츄르 짜주기 시작!
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-amber-900">파란색 구간(대성공 존)에 바가 왔을 때 버튼을 누르세요!</p>
                      <div className="w-full h-5 bg-stone-200 rounded-full border-2 border-stone-900 relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-[40%] w-[30%] bg-blue-300/80 border-x-2 border-blue-600" />
                        <div
                          className="absolute top-0 bottom-0 w-3 bg-rose-500 rounded-full border border-black"
                          style={{ left: `calc(${gauge}% - 6px)` }}
                        />
                      </div>
                      <button
                        onClick={stopFeeding}
                        className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-base font-bold rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]"
                      >
                        🛑 쭈우욱 짜기 멈춤!
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="p-3 bg-stone-100 rounded-2xl border-2 border-stone-900 text-sm text-stone-700 font-semibold leading-relaxed">
                💬 {log}
              </div>

              <div className="pt-2 border-t-2 border-dashed border-stone-300 flex justify-around text-xs">
                {cats.map((cat) => (
                  <span key={cat.id} className={`font-bold text-sm ${cat.unlocked ? 'text-stone-900' : 'text-stone-400'}`}>
                    {cat.emoji} {cat.name} ({Math.floor((cat.affection / cat.maxAffection) * 100)}%)
                  </span>
                ))}
              </div>

            </div>
          </>
        )}

        {/* 게임 오버 */}
        {gameState === 'gameover' && (
          <div className="bg-[#FFFDF8] p-8 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] text-center space-y-5">
            <div className="text-6xl animate-bounce">🚨</div>
            <h2 className="text-3xl font-black text-rose-600">GAME OVER</h2>
            <p className="text-base text-stone-700 font-bold leading-relaxed">
              통장이 파산하거나 상사에게 쿠사리를 3회 먹었습니다! 열심히 일거리를 처리했어야죠 🏃‍♂️💨
            </p>

            <button
              onClick={() => { setGameState('intro'); setKusariCount(0); setMoney(1500); setChuruCount(3); setActiveCatOnMap(null); setSelectedCatId(null); setActiveBellDesk(null); }}
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-stone-900 text-lg font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917]"
            >
              🔄 정신 차리고 재입사하기
            </button>
          </div>
        )}

        <Link
          href="/"
          className="block w-full py-3 bg-white text-stone-900 text-base font-bold text-center rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917]"
        >
          🏠 연구소 홈으로 돌아가기
        </Link>

      </div>
    </main>
  );
}

import SmartBanner from '@/components/SmartBanner';

// 페이지 내부 return문 안의 원하는 위치에 배치
<SmartBanner />
