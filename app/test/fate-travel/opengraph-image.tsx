import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '사주 × 성향 운명의 세계 여행지 진단';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#FFFDF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '12px solid #1c1917',
          padding: '50px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 메인 카드 박스 */}
        <div
          style={{
            backgroundColor: '#FFF8E7',
            border: '6px solid #1c1917',
            borderRadius: '28px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '10px 10px 0px #1c1917',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* 상단 둥근 뱃지 */}
          <div
            style={{
              backgroundColor: '#fde047',
              border: '4px solid #1c1917',
              padding: '10px 32px',
              borderRadius: '99px',
              fontSize: 26,
              fontWeight: '900',
              color: '#1c1917',
              marginBottom: '20px',
              boxShadow: '4px 4px 0px #1c1917',
              display: 'flex',
            }}
          >
            🧭 사주 오행 × 여행 성향 운명 진단
          </div>

          {/* 메인 타이틀 */}
          <div style={{ fontSize: 34, color: '#92400e', fontWeight: 'bold', marginBottom: '12px', display: 'flex' }}>
            내 사주가 점지한 운명의 세계 여행지는?
          </div>
          
          <div style={{ fontSize: 60, color: '#1c1917', fontWeight: '900', textAlign: 'center', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ✈️ 지구상 단 하나의 기운 맞춤 도시 🌍
          </div>

          {/* 하단 버튼 느낌의 콜투액션 */}
          <div style={{ 
            fontSize: 28, 
            color: '#1c1917', 
            marginTop: '35px', 
            background: '#ffffff', 
            padding: '14px 40px', 
            borderRadius: '18px', 
            border: '4px solid #1c1917', 
            fontWeight: 'bold',
            boxShadow: '5px 5px 0px #1c1917',
            display: 'flex'
          }}>
            👉 1분 만에 내 사주 여행지 확인하기
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
