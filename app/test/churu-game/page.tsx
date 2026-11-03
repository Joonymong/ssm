'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChuruGame() {
  // 게임 단계: 'intro'(시작 설명) -> 'playing'(플레이 중) -> 'gameover'(쿠사리 3회 초과로 게임오버)
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover'>('intro');

  const [cats, setCats] = useState([
    { id: 1, name: '사장이', emoji: '🐈', title: '탕비실의 무법자', affection: 0, maxAffection: 100, unlocked: true, desc: '각종 서류를 찢어놓는 주범.' },
    { id: 2, name: '박대리', emoji: '🐱', title: '야근 3일 차 삼색이', affection: 0, maxAffection: 200, unlocked: false, desc: '눈밑에 다크서클이 내려앉은 고양이.' },
    { id: 3, name: '이사님', emoji: '🦁', title: '사옥 최고 뚱냥이', affection: 0, maxAffection: 500, unlocked: false, desc: '법인카드로 츄르를 쓸어담는 거대 뚱냥이.' }
  ]);
  
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [churuCount, setChuruCount] = useState(10); 
  const [money, setMoney] = useState(5000); 
  const [log, setLog] = useState('사내 오피스를 돌아다니는 고양이를 클릭해서 츄르를 챙겨주세요!');

  // 쿠사리(경고) 횟수 0 ~ 3회
  const [kusariCount, setKusariCount] = useState(0);

  const [catPositions, setCatPositions] = useState([
    { id: 1, x: 20, y: 40, dir: 1 },
    { id: 2, x: 60, y: 55, dir: -1 },
    { id: 3, x: 40, y: 70, dir: 1 },
  ]);

  const [isFeeding, setIsFeeding] = useState(false);
  const [gauge, setGauge] = useState(0);
  const [gaugeDir, setGaugeDir] = useState(4);
  const [bossWarning, setBossWarning] = useState(false);

  // 고양이 이동 로직
  useEffect(() => {
    if (gameState !== 'playing') return;
    const walkInterval = setInterval(() => {
      setCatPositions(prev => prev.map(pos => {
        let nextX = pos.x + pos.dir * (Math.random() * 4 + 1);
        let nextDir = pos.dir;
        if (nextX > 85 || nextX < 10) nextDir *= -1;
        return { ...pos, x: nextX, dir: nextDir };
      }));
    }, 600);
    return () => clearInterval(walkInterval);
  }, [gameState]);

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

  // 팀장님 출현 이벤트 (랜덤 타이밍)
  useEffect(() => {
    if (gameState !== 'playing') return;
    const bossInterval = setInterval(() => {
      if (Math.random() < 0.25) {
        setBossWarning(true);
        setLog('🚨 경보: 팀장님이 뒤쪽으로 다가오고 있습니다! [일하는 척] 버튼을 누르세요!');
        setTimeout(() => {
          setBossWarning(false);
        }, 4500);
      }
    }, 15000);
    return () => clearInterval(bossInterval);
  }, [gameState]);

  // 고양이를 누른 줄 알았는데 상사 발등을 누른 경우 (랜덤 확률 또는 오인 클릭)
  const handleCatClick = (catId: number) => {
    // 20% 확률로 고양이가 아니라 팀장님 발등을 찍는 돌발 상황 발생!
    if (Math.random() < 0.18) {
      const nextKusari = kusariCount + 1;
      setKusariCount(nextKusari);
      setLog(`💥 아이쿠! 고양인 줄 알고 클릭했더니 **팀장님 발등**을 쾅 밟았습니다! (쿠사리 ${nextKusari}/3)`);
      if (nextKusari >= 3) {
        setGameState('gameover');
      }
      return;
    }

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
    
    // 타이밍 실패 시 (대성공 존 40~70 외의 곳에서 멈추면 상사 옷에 츄르 발사)
    if (gauge < 40 || gauge > 70) {
      const nextKusari = kusariCount + 1;
      setKusariCount(nextKusari);
      setLog(`💦 앗! 타이밍을 놓쳐 뿜어져 나온 츄르가 **팀장님의 명품 정장 옷자락**에 척 하니 묻었습니다! (쿠사리 ${nextKusari}/3)`);
      setSelectedCatId(null);
      if (nextKusari >= 3) {
        setGameState('gameover');
      }
      return;
    }

    // 대성공
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
    setMoney(m => m + 500);
    setLog('💼 완벽하게 엑셀 화면을 띄워 팀장님을 속였습니다. 월급 +500원 획득!');
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
        .kkuk-theme, .kkuk-theme * {
          font-family: 'Gaegu', cursive, sans-serif !important;
          font-weight: 700;
        }
      `}} />

      <div className="w-full max-w-md space-y-4">

        {/* ==================== 1. 시작 전 안내 (오리엔테이션) ==================== */}
        {gameState === 'intro' && (
          <div className="bg-[#FFFDF8] p-6 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-5 text-center">
            <span className="inline-block bg-amber-300 border-2 border-stone-900 px-3 py-0.5 rounded-full text-sm font-bold">
              🐱 월루 타이쿤: 사내 고양이 지키기
            </span>
            <h1 className="text-3xl font-bold leading-snug">
              근무 중 몰래 츄르 주기<br />& 팀장님 눈치 생존 게임
            </h1>

            <div className="bg-[#FFF8E7] p-4 rounded-2xl border-2 border-stone-900 text-left space-y-2.5 text-sm">
              <p>📌 <strong>게임 규칙 및 미션 안내:</strong></p>
              <p>1. 사무실을 돌아다니는 고양이를 클릭해 츄르를 주세요.</p>
              <p>2. <strong>주의!</strong> 칠칠맞게 고양인 줄 알고 클릭했는데 알고 보니 <strong>상사의 발등</strong>을 찍을 수 있습니다.</p>
              <p>3. <strong>주의!</strong> 츄르 짜기 타이밍을 놓치면 <strong>상사 정장 옷자락에 츄르가 척!</strong> 묻습니다.</p>
              <p className="text-rose-600 font-black">🚨 위 사유로 상사에게 쿠사리를 총 <strong>3번</strong> 먹으면 바로 인사평가 F와 함께 **게임 오버**됩니다!</p>
            </div>

            <button
              onClick={() => { setGameState('playing'); setKusariCount(0); }}
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-stone-900 text-xl font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] transition"
            >
              출근 및 게임 시작하기 🏢
            </button>
          </div>
        )}

        {/* ==================== 2. 게임 플레이 화면 ==================== */}
        {gameState === 'playing' && (
          <>
            <div className="bg-[#1e293b] text-white p-3 rounded-2xl flex justify-between items-center border-2 border-stone-900 shadow-md">
              <div className="text-xs flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse"></span>
                <span>인사평가 쿠사리: <strong className="text-yellow-300 text-sm">{kusariCount} / 3</strong></span>
              </div>
              <div className="text-xs bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-600 font-bold">
                💰 잔고: ₩{money.toLocaleString()}
              </div>
            </div>

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

            <div className="bg-[#FFFDF8] p-5 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-4">
              
              <div className="flex justify-between items-center">
                <span className="bg-amber-300 border-2 border-stone-900 px-3 py-1 rounded-full text-sm font-bold">
                  🐟 남은 츄르: {churuCount}개
                </span>
                <button
                  onClick={buyChuru}
                  className="text-xs bg-stone-100 hover:bg-stone-200 border-2 border-stone-900 px-3 py-1 rounded-xl font-bold"
                >
                  🛒 츄르 사기 (₩1,000)
                </button>
              </div>

              {/* 사무실 맵 */}
              <div className="relative w-full h-64 bg-[#E2E8F0] border-[2.5px] border-stone-900 rounded-3xl overflow-hidden shadow-inner">
                <div className="absolute top-4 left-6 w-20 h-10 bg-stone-300 border-2 border-stone-700 rounded-lg flex items-center justify-center text-[11px] font-bold">💻 개발팀 책상</div>
                <div className="absolute top-4 right-6 w-20 h-10 bg-stone-300 border-2 border-stone-700 rounded-lg flex items-center justify-center text-[11px] font-bold">🖨️ 복사기 룸</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-12 bg-amber-200 border-2 border-stone-700 rounded-xl flex items-center justify-center text-sm font-bold shadow-md">☕ 탕비실 식탁</div>

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
                      <span className="text-xs bg-stone-900 text-white px-1.5 py-0.5 rounded-md font-bold shadow-sm whitespace-nowrap opacity-90 group-hover:bg-amber-500">
                        {catInfo.unlocked ? catInfo.name : '🔒 잠김'}
                      </span>
                    </div>
                  );
                })}
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
                      ✕ 닫기
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
                      <p className="text-xs font-bold text-amber-900">파란색 구간(대성공 존)에 바가 왔을 때 버튼을 누르세요! (실패 시 상사 옷에 묻음)</p>
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

        {/* ==================== 3. 게임 오버 화면 ==================== */}
        {gameState === 'gameover' && (
          <div className="bg-[#FFFDF8] p-8 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] text-center space-y-5">
            <div className="text-6xl animate-bounce">🚨</div>
            <h2 className="text-3xl font-black text-rose-600">GAME OVER</h2>
            <p className="text-base text-stone-700 font-bold leading-relaxed">
              상사의 발등을 찍거나 정장에 츄르를 묻히는 대참사를 일으켜 <strong>쿠사리 3회 누적</strong>으로 인사평가 F를 받았습니다... 회사를 떠날 시간입니다! 🏃‍♂️💨
            </p>

            <button
              onClick={() => { setGameState('intro'); setKusariCount(0); }}
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-stone-900 text-lg font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917]"
            >
              🔄 정신 차리고 재입사하기 (다시 하기)
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
