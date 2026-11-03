import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '사주 × 성향 운명의 세계 여행지 진단';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { city?: string } }) {
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
          padding: '40px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 상단 뱃지 */}
        <div
          style={{
            backgroundColor: '#fde047',
            border: '4px solid #1c1917',
            padding: '10px 24px',
            borderRadius: '99px',
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1c1917',
            marginBottom: '20px',
          }}
        >
          🧭 사주 오행 × 여행 성향 운명 진단
        </div>

        {/* 메인 타이틀 박스 */}
        <div
          style={{
            backgroundColor: '#FFF8E7',
            border: '6px solid #1c1917',
            borderRadius: '32px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '10px 10px 0px #1c1917',
          }}
        >
          <div style={{ fontSize: 36, color: '#78350f', fontWeight: 'bold', marginBottom: '10px' }}>
            나의 운명의 세계 여행지는?
          </div>
          <div style={{ fontSize: 64, color: '#1c1917', fontWeight: '900', textAlign: 'center' }}>
            🌍 지구상 단 하나의 기운 맞춤 도시
          </div>
          <div style={{ fontSize: 32, color: '#44403c', marginTop: '20px', background: 'white', padding: '10px 30px', borderRadius: '16px', border: '3px solid #1c1917' }}>
            ✈️ 지금 바로 내 사주 여행지 확인하기
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
