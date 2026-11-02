import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-xs leading-relaxed text-slate-600 space-y-4">
        <h1 className="text-base font-bold text-slate-800">개인정보처리방침</h1>
        <p>본 사이트(이하 '서비스')는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.</p>
        
        <h2 className="font-bold text-slate-700 pt-2">1. 수집하는 개인정보</h2>
        <p>서비스는 회원가입 없이 이용 가능하며, 테스트 진행 시 선택한 답변 데이터는 서버에 별도 저장되지 않고 브라우저 내에서만 즉시 계산 후 소멸합니다.</p>
        
        <h2 className="font-bold text-slate-700 pt-2">2. 쿠키 및 광고 식별자</h2>
        <p>서비스는 구글(Google)을 포함한 제3자 광고 사업자의 광고를 게재할 수 있습니다. 구글 등의 제3자는 사용자의 이전 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(Cookie)를 사용할 수 있습니다.</p>
        
        <h2 className="font-bold text-slate-700 pt-2">3. 문의처</h2>
        <p>서비스 이용 및 프라이버시 관련 문의는 운영자 이메일(skpay93@gmail.com)로 연락 주시기 바랍니다.</p>
        
        <div className="pt-4 border-t border-slate-100">
          <Link href="/" className="text-indigo-600 font-bold hover:underline">← 홈으로 돌아가기</Link>
        </div>
      </div>
    </main>
  );
}
