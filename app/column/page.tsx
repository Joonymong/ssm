import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '직장 심리 연구 리포트 | 오늘의 성향 연구소',
  description: '직장 내 갈등 대처와 오피스 번아웃 예방을 위한 심리학적 가이드',
};

export default function ColumnPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-12 text-slate-700 leading-relaxed">
        
        {/* 상단 네비게이션 */}
        <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold text-indigo-600 hover:underline">
            ← 성향 연구소 홈으로
          </Link>
          <span className="text-[11px] font-semibold text-slate-400">오피스 심리 가이드</span>
        </div>

        {/* 칼럼 1 */}
        <article className="space-y-4">
          <header className="space-y-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              갈등 관리 리포트
            </span>
            <h1 className="text-2xl font-black text-slate-900 leading-snug">
              직장 내 비합리적 지시와 상사 갈등, 심리학적으로 대처하는 3단계 방어 기제
            </h1>
            <p className="text-xs text-slate-400">게시일: 2026. 11. 02 | 작성: 오늘의 성향 연구소 오피스랩</p>
          </header>

          <section className="space-y-3 text-sm text-slate-600 pt-2">
            <p>
              현대 조직 생활에서 개인이 경험하는 직무 스트레스의 상당 부분은 업무 자체의 난이도보다 대인 관계, 특히 상하 관계의 소통 부재와 감정 소모에서 기인합니다. 상사의 모호하거나 비합리적인 지시는 직원의 자기효능감을 떨어뜨리고 만성적인 무기력증을 유발하기 쉽습니다. 이러한 오피스 갈등 상황에서 감정적 소진을 최소화하고 자아를 지키는 실천적인 심리학적 전략을 3단계로 정리합니다.
            </p>

            <h2 className="text-base font-bold text-slate-800 pt-2">
              1. 사건과 감정의 객관적 분리 (인지적 재구조화)
            </h2>
            <p>
              상사의 비판이나 날 선 피드백을 마주했을 때, 뇌는 이를 개인의 인격에 대한 위협으로 인지하기 쉽습니다. 그러나 피드백의 '감정적 어조'와 '업무적 사실'을 분리해 해석하는 인지적 분리 연습이 필요합니다. "상사가 나를 싫어해서 비난한다"는 감정적 해석을 멈추고, "상사가 현재 일정 압박으로 인해 불안을 표출하고 있으며, 수정해야 할 업무 데이터는 A 항목이다"라고 사실 위주로 재정의하는 것이 감정 방어의 첫걸음입니다.
            </p>

            <h2 className="text-base font-bold text-slate-800 pt-2">
              2. 쿠션어(Cushion Language)와 메타 질문의 활용
            </h2>
            <p>
              비합리적이거나 방향성이 자주 바뀌는 상사에게 무조건적인 순응이나 즉각적인 반박은 모두 역효과를 낳습니다. '쿠션어'를 배치한 질문형 커뮤니케이션을 활용해야 합니다. 예를 들어 "그건 지난주 말씀과 다릅니다"라고 직설적으로 맞서기보다, "말씀해주신 방향을 검토해보니 지난주 합의된 일정과 충돌하는 지점이 발생합니다. 우선순위를 어느 쪽에 먼저 둘지 가이드를 주실 수 있습니까?"와 같이 상대에게 판단 책임을 정중히 돌려주는 방식이 효과적입니다.
            </p>

            <h2 className="text-base font-bold text-slate-800 pt-2">
              3. 업무 데이터의 텍스트 아카이빙
            </h2>
            <p>
              구두 지시가 빈번한 환경일수록 지시 사항의 왜곡이 발생하기 쉽습니다. 구두 지시 후에는 슬랙, 잔디, 혹은 이메일과 같은 사내 메신저를 통해 "금일 구두로 지시해주신 [프로젝트 명] 관련 변경 사항 요약본을 공유해 드립니다" 형태로 텍스트 흔적을 남겨두는 습관이 향후 발생할 책임 공방에서 가장 안전한 보호막 역할을 합니다.
            </p>
          </section>
        </article>

        <hr className="border-slate-100" />

        {/* 칼럼 2 */}
        <article className="space-y-4">
          <header className="space-y-2">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
              소비 심리 리포트
            </span>
            <h2 className="text-2xl font-black text-slate-900 leading-snug">
              월급 증발의 주범, '스트레스성 보상 소비(시발비용)' 통제 가이드
            </h2>
            <p className="text-xs text-slate-400">게시일: 2026. 11. 02 | 작성: 오늘의 성향 연구소 오피스랩</p>
          </header>

          <section className="space-y-3 text-sm text-slate-600 pt-2">
            <p>
              힘든 하루를 보낸 후 배달앱으로 야식을 주문하거나, 장바구니에 담아둔 물건을 충동 결제하는 행위는 단순한 낭비벽이 아닙니다. 행동경제학과 심리학에서는 이를 극심한 감정 소모를 보상받고자 하는 뇌의 단기 도파민 충전 기제로 설명합니다. 회사가 가져간 통제권을 '결제'라는 즉각적 행동으로 되찾으려는 일종의 심리적 반작용인 셈입니다.
            </p>

            <h3 className="text-base font-bold text-slate-800 pt-2">
              1. 72시간 지연 결제 법칙 (도파민 쿨다운)
            </h3>
            <p>
              분노나 서러움으로 인해 결제 충동이 일어났을 때, 물건을 장바구니에 담는 행위까지만 진행하고 결제는 정확히 72시간 뒤로 미룹니다. 장바구니에 담는 과정만으로도 뇌는 일정한 보상감을 획득합니다. 흥분 상태가 가라앉은 3일 뒤 장바구니를 다시 확인하면, 본래 필요치 않았던 물건의 70% 이상을 스스로 삭제할 수 있게 됩니다.
            </p>

            <h3 className="text-base font-bold text-slate-800 pt-2">
              2. 감정 비용의 회계 분리
            </h3>
            <p>
              무조건적인 절약은 오히려 폭발적인 보복 소비로 이어집니다. 생활비 통장과 별개로 '멘탈 케어 전용 비상금'을 월 10~15만 원 수준으로 명확히 책정하는 것을 권장합니다. 정해진 예산 한도 내에서 쓰는 택시비나 디저트는 죄책감을 유발하지 않으며, 감정 해소라는 제 기능을 충실히 수행할 수 있습니다.
            </p>
          </section>
        </article>

        {/* 하단 푸터 */}
        <div className="pt-8 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-block py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition"
          >
            👉 나의 직장 성향 테스트 진단하러 가기
          </Link>
        </div>

      </div>
    </main>
  );
}
