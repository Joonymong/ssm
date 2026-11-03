'use client';

import { useState } from 'react';
import Link from 'next/link';

// 1. 명리학 10천간 (태어난 날의 기운)
const CHEONGAN = [
  { hanja: '甲', kor: '갑목(거목)', element: 'WOOD', desc: '곧게 뻗어나가는 추진력과 성장을 좋아하는 기운' },
  { hanja: '乙', kor: '을목(들꽃)', element: 'WOOD', desc: '어디서든 유연하게 적응하고 낭만을 즐기는 기운' },
  { hanja: '丙', kor: '병화(태양)', element: 'FIRE', desc: '화려하고 에너지가 넘치며 주목받길 좋아하는 기운' },
  { hanja: '丁', kor: '정화(별빛)', element: 'FIRE', desc: '섬세한 감수성과 예술적 영감이 가득한 기운' },
  { hanja: '戊', kor: '무토(큰산)', element: 'EARTH', desc: '듬직하고 스케일이 크며 웅장한 것을 선호하는 기운' },
  { hanja: '己', kor: '기토(정원)', element: 'EARTH', desc: '다정하고 아늑하며 맛있는 것과 안정을 찾는 기운' },
  { hanja: '庚', kor: '경금(바위)', element: 'METAL', desc: '결단력이 빠르고 세련된 문명과 액티비티를 즐기는 기운' },
  { hanja: '辛', kor: '신금(보석)', element: 'METAL', desc: '깔끔하고 안목이 높으며 남다른 감도를 추구하는 기운' },
  { hanja: '壬', kor: '임수(대양)', element: 'WATER', desc: '자유분방하고 틀에 박힌 것을 싫어하는 넓은 바다의 기운' },
  { hanja: '癸', kor: '계수(봄비)', element: 'WATER', desc: '차분하게 사색하고 감성적인 골목과 물가를 좋아하는 기운' }
];

const JIJI_HOURS = [
  { label: '자시 (23:30 ~ 01:29)', name: '자시(水)', element: 'WATER' },
  { label: '축시 (01:30 ~ 03:29)', name: '축시(土)', element: 'EARTH' },
  { label: '인시 (03:30 ~ 05:29)', name: '인시(木)', element: 'WOOD' },
  { label: '묘시 (05:30 ~ 07:29)', name: '묘시(木)', element: 'WOOD' },
  { label: '진시 (07:30 ~ 09:29)', name: '진시(土)', element: 'EARTH' },
  { label: '사시 (09:30 ~ 11:29)', name: '사시(火)', element: 'FIRE' },
  { label: '오시 (11:30 ~ 13:29)', name: '오시(火)', element: 'FIRE' },
  { label: '미시 (13:30 ~ 15:29)', name: '미시(土)', element: 'EARTH' },
  { label: '신시 (15:30 ~ 17:29)', name: '신시(金)', element: 'METAL' },
  { label: '유시 (17:30 ~ 19:29)', name: '유시(金)', element: 'METAL' },
  { label: '술시 (19:30 ~ 21:29)', name: '술시(土)', element: 'EARTH' },
  { label: '해시 (21:30 ~ 23:29)', name: '해시(水)', element: 'WATER' },
  { label: '태어난 시간 모름', name: '시간미상', element: 'NONE' }
];

// 2. 사주 오행(5) x 성향 조합(4: 도시활기 / 도시낭만 / 자연모험 / 자연휴양) = 20개 맞춤 여행지
interface TravelSpot {
  country: string;
  city: string;
  flight: string;
  vibeTitle: string;
  whyMatch: string;
  mustGo: string[];
  illust: { bg: string; sky: string; icons: string[]; landmark: string; caption: string };
}

const TRAVEL_DB: Record<string, TravelSpot> = {
  // [목(WOOD) 기운 매칭]
  WOOD_CITY_ACTIVE: {
    country: '호주 (Australia)',
    city: '시드니 & 본다이 비치',
    flight: '한국에서 직항 약 10시간 15분',
    vibeTitle: '생동하는 목(木) 기운 × 활기찬 시티 액티브파',
    whyMatch: '뻗어나가는 나무(木) 사주에 도심의 활기와 액티브한 성향이 더해졌습니다! 세련된 오페라하우스 도심 라이프와 본다이 비치 서핑, 왕립 식물원이 어우러진 시드니가 당신의 텐션을 최고조로 끌어올립니다.',
    mustGo: ['본다이 비치 해안 산책로 & 서핑 강습', '달링하버 루프탑 바에서 야경 감상', '로열 보타닉 가든 잔디밭 피크닉'],
    illust: { bg: '#dcfce7', sky: '#bae6fd', landmark: '⛵', icons: ['🐨', '🏄', '🌿'], caption: '푸른 바다와 거대 식물원이 공존하는 시드니' }
  },
  WOOD_CITY_CHILL: {
    country: '일본 (Japan)',
    city: '교토 아라시야마 & 가모강',
    flight: '한국에서 간사이 직항 약 1시간 45분 (+기차 1시간)',
    vibeTitle: '푸른 목(木) 기운 × 아기자기한 감성 산책파',
    whyMatch: '초목의 싱그러운 사주 기운에 조용하고 감성적인 도시 산책 성향이 만났습니다. 하늘 끝까지 뻗은 대나무숲(치쿠린)을 걷고 가모강변 찻집에서 말차를 마실 때 머릿속이 가장 맑아집니다.',
    mustGo: ['아라시야마 대나무숲 새벽 산책', '가모강변 다다미 카페에서 말차 디저트', '기온거리 목조 골목 노을 구경'],
    illust: { bg: '#d9f99d', sky: '#fef08a', landmark: '🎋', icons: ['🍵', '🦊', '🏮'], caption: '대나무 바람 소리와 찻향이 흐르는 교토' }
  },
  WOOD_NATURE_ACTIVE: {
    country: '인도네시아 (Indonesia)',
    city: '발리 우붓 & 바투르산',
    flight: '한국에서 직항 약 7시간',
    vibeTitle: '울창한 목(木) 기운 × 정글 탐험가 성향',
    whyMatch: '생명력 넘치는 목(木) 기운에 모험을 즐기는 자연파 성향이 결합되었습니다. 우붓의 끝없는 계단식 논과 열대 정글 스윙, 화산 일출 지프 투어가 당신 안의 야생적 에너지를 깨워줍니다.',
    mustGo: ['뜨갈랄랑 계단식 논 & 정글 스윙', '바투르 화산 지프 일출 투어', '우붓 몽키포레스트 & 정글 인피니티풀'],
    illust: { bg: '#bbf7d0', sky: '#fed7aa', landmark: '🌴', icons: ['🐒', '🌋', '🥥'], caption: '열대 우림의 생명력이 폭발하는 발리 우붓' }
  },
  WOOD_NATURE_CHILL: {
    country: '태국 (Thailand)',
    city: '치앙마이 고산 숲마을',
    flight: '한국에서 직항 약 5시간 30분',
    vibeTitle: '온화한 목(木) 기운 × 느긋한 숲속 힐링파',
    whyMatch: '나무와 화초의 사주를 지닌 당신이 조용한 자연 휴양을 선택했군요! 바쁜 일정 없이 치앙마이의 큰 나무 그늘 아래 로스터리 카페에 앉아 새소리를 듣는 것만으로도 1년 치 운기가 충전됩니다.',
    mustGo: ['메캄퐁 고산 숲속 마을 카페에서 멍때리기', '반캉왓 예술가 마을 공방 구경', '숲속 아로마 마사지 & 나이트마켓'],
    illust: { bg: '#ecfccb', sky: '#fde68a', landmark: '🐘', icons: ['🌳', '☕', '🏮'], caption: '초록빛 그늘 아래 느리게 흐르는 치앙마이' }
  },

  // [화(FIRE) 기운 매칭]
  FIRE_CITY_ACTIVE: {
    country: '스페인 (Spain)',
    city: '바르셀로나 (Barcelona)',
    flight: '한국에서 직항 약 14시간',
    vibeTitle: '타오르는 화(火) 기운 × 정열의 핫플 사냥꾼',
    whyMatch: '태양처럼 뜨거운 사주(火)와 활동적인 도시파 성향이 만나 정열의 끝판왕 바르셀로나가 점지되었습니다. 가우디의 강렬한 건축물과 밤늦게까지 이어지는 타파스 파티가 당신과 100% 공명합니다.',
    mustGo: ['사그라다 파밀리아 성당 빛의 향연 감상', '바르셀로네타 해변 펍에서 샹그리아', '보케리아 시장 먹방 & 고딕지구 야행'],
    illust: { bg: '#fed7aa', sky: '#fecdd3', landmark: '🏰', icons: ['☀️', '💃', '🍷'], caption: '태양과 예술, 축제가 멈추지 않는 바르셀로나' }
  },
  FIRE_CITY_CHILL: {
    country: '프랑스 (France)',
    city: '니스 & 남프랑스 해안 (Nice)',
    flight: '한국에서 파리 경유 약 15시간',
    vibeTitle: '따스한 화(火) 기운 × 낭만 예술 유랑가',
    whyMatch: '밝고 따뜻한 불(火)의 감성에 여유로운 낭만파 성향이 더해졌습니다. 빡빡한 관광 대신 지중해의 찬란한 햇살이 쏟아지는 니스 해변 파라솔 아래서 와인을 마시며 샤갈 미술관을 거니는 코스가 딱입니다.',
    mustGo: ['영국인의 산책로 해변 비치베드 일광욕', '에즈(Eze) 절벽 마을 선인장 정원 산책', '샤갈·마티스 미술관 감상'],
    illust: { bg: '#fef08a', sky: '#7dd3fc', landmark: '🏖️', icons: ['🎨', '🍋', '🥂'], caption: '지중해의 따스한 햇살이 부서지는 남프랑스 니스' }
  },
  FIRE_NATURE_ACTIVE: {
    country: '미국 (USA)',
    city: '하와이 빅아일랜드 & 마우이',
    flight: '한국에서 호놀룰루 직항 약 8시간 30분',
    vibeTitle: '폭발하는 화(火) 기운 × 대자연 액티비티파',
    whyMatch: '강렬한 불(火)의 사주와 대자연 모험 성향이 충돌해 살아있는 화산섬 하와이를 가리킵니다! 붉은 용암 대지 위를 걷고 헬기 투어와 서핑을 즐기며 엄청난 에너지를 받아갈 수 있습니다.',
    mustGo: ['킬라우에아 화산 국립공원 트레킹', '할레아칼라 분화구 구름 위 일출', '만타레이(대형 가오리) 야간 스노클링'],
    illust: { bg: '#fca5a5', sky: '#fde047', landmark: '🌋', icons: ['🌺', '🏄', '🐢'], caption: '살아 숨 쉬는 대지의 열기, 하와이 화산섬' }
  },
  FIRE_NATURE_CHILL: {
    country: '모로코 (Morocco)',
    city: '사하라 사막 & 마라케시',
    flight: '한국에서 경유 포함 약 16시간',
    vibeTitle: '은은한 별빛 화(火) 기운 × 감성 사색가',
    whyMatch: '내면에 타오르는 촛불·별빛(丁火) 기운과 고요한 사색을 좋아하는 성향이 만났습니다. 붉은 모래사막 한가운데서 모닥불을 피워놓고 쏟아지는 은하수를 바라볼 때 평생 잊지 못할 전율을 느낍니다.',
    mustGo: ['사하라 사막 럭셔리 글램핑 & 별구경', '마조렐 정원의 이국적인 코발트블루 산책', '루프탑 테라스에서 민트티 마시며 노을 보기'],
    illust: { bg: '#fdba74', sky: '#312e81', landmark: '🐪', icons: ['🌙', '✨', '⛺'], caption: '붉은 사막 위로 별빛이 쏟아지는 사하라의 밤' }
  },

  // [토(EARTH) 기운 매칭]
  EARTH_CITY_ACTIVE: {
    country: '이탈리아 (Italy)',
    city: '로마 (Rome) 고대 제국 투어',
    flight: '한국에서 직항 약 13시간',
    vibeTitle: '묵직한 토(土) 기운 × 역사·핫플 완전정복파',
    whyMatch: '뿌리 깊고 웅장한 대지(土)의 사주에 부지런히 돌아다니는 성향이 더해졌습니다. 발길 닿는 곳마다 2천 년 역사의 콜로세움과 분수가 솟아있고, 골목마다 젤라또와 파스타가 넘치는 로마가 천생연분입니다.',
    mustGo: ['콜로세움 & 포로 로마노 고대 유적 투어', '트레비 분수 동전 던지기 & 야경 투어', '트라스테베레 골목 로컬 화덕피자 & 와인'],
    illust: { bg: '#fde68a', sky: '#bae6fd', landmark: '🏛️', icons: ['🍕', '🛵', '⛲'], caption: '도시 전체가 거대한 노천 박물관인 로마' }
  },
  EARTH_CITY_CHILL: {
    country: '체코 (Czechia)',
    city: '프라하 & 체스키크룸로프',
    flight: '한국에서 직항 약 11시간 30분',
    vibeTitle: '단단한 토(土) 기운 × 동화 속 중세 낭만파',
    whyMatch: '안정감 있는 흙과 돌(土)의 사주에 여유로운 도시 감성이 결합되었습니다. 주황색 지붕이 끝없이 펼쳐진 프라하 성벽 아래서 코젤 흑맥주를 마시며 까를교의 노을을 바라보는 시간이 최고의 보약입니다.',
    mustGo: ['까를교 새벽 물안개 & 황혼 산책', '프라하 성 스타벅스 전망대에서 지붕 구경', '체스키크룸로프 성곽 마을 1박 2일 유랑'],
    illust: { bg: '#fed7aa', sky: '#e9d5ff', landmark: '🏰', icons: ['🍺', '🎻', '🦢'], caption: '붉은 지붕과 중세의 시간이 멈춘 프라하' }
  },
  EARTH_NATURE_ACTIVE: {
    country: '미국 (USA)',
    city: '그랜드캐니언 & 앤텔로프 캐니언',
    flight: '한국에서 라스베이거스 직항 약 11시간 30분',
    vibeTitle: '광활한 대지 토(土) 기운 × 대자연 로드트립파',
    whyMatch: '거대한 산과 대지(戊土)의 기운을 타고난 데다 역동적인 성향까지 갖추셨군요! 지구의 나이를 그대로 보여주는 붉은 대협곡을 오픈카로 가로지르며 압도적인 대지의 기운을 온몸으로 흡수하세요.',
    mustGo: ['그랜드캐니언 사우스림 일출 직관', '앤텔로프 캐니언 빛의 협곡 투어', '홀스슈밴드 절벽 & 사막 캠핑카 불멍'],
    illust: { bg: '#fdba74', sky: '#7dd3fc', landmark: '🏜️', icons: ['🚙', '🦅', '🌵'], caption: '수억 년 대지의 에너지를 품은 그랜드캐니언' }
  },
  EARTH_NATURE_CHILL: {
    country: '이탈리아 (Italy)',
    city: '토스카나 시골 와이너리 평원',
    flight: '한국에서 로마 직항 약 13시간 (+렌터카/기차 2시간)',
    vibeTitle: '비옥한 정원 토(土) 기운 × 미식·전원 힐링파',
    whyMatch: '따뜻하고 포용력 넓은 비옥한 땅(己土)의 사주에 평화로운 안식을 추구하는 성향입니다. 초록빛 구릉지 위에 세워진 고성 농장(아그리투리스모)에 머물며 갓 짜낸 올리브유와 와인을 즐기세요.',
    mustGo: ['발도르차 사이프러스 나무 언덕길 산책', '몬탈치노 고성 와이너리 브루넬로 시음', '시골 농장 숙소 수영장에서 낮잠'],
    illust: { bg: '#d9f99d', sky: '#fef9c3', landmark: '🏡', icons: ['🍷', '🫒', '🌻'], caption: '황금빛 햇살과 포도밭이 넘실대는 토스카나' }
  },

  // [금(METAL) 기운 매칭]
  METAL_CITY_ACTIVE: {
    country: '미국 (USA)',
    city: '뉴욕 맨해튼 (New York)',
    flight: '한국에서 직항 약 14시간',
    vibeTitle: '예리한 금(金) 기운 × 트렌드 최전선 시티파',
    whyMatch: '세련되고 결단력 있는 금(金) 기운과 도심의 화려함을 즐기는 성향이 만났습니다! 하늘을 찌르는 마천루와 브로드웨이 뮤지컬, 최첨단 루프탑 전망대가 당신의 높은 안목과 성취욕을 완벽히 채워줍니다.',
    mustGo: ['서밋(SUMMIT) 통유리 전망대 야경', '브로드웨이 오리지널 뮤지컬 관람', '소호(SoHo) 편집샵 쇼핑 & 재즈바'],
    illust: { bg: '#e2e8f0', sky: '#fda4af', landmark: '🗽', icons: ['🚕', '🏙️', '🎭'], caption: '세상에서 가장 세련된 마천루의 숲, 뉴욕' }
  },
  METAL_CITY_CHILL: {
    country: '오스트리아 (Austria)',
    city: '빈(비엔나) & 잘츠부르크',
    flight: '한국에서 직항 약 12시간',
    vibeTitle: '보석 같은 신금(辛金) 기운 × 우아한 취향파',
    whyMatch: '보석처럼 정교하고 품격 있는 사주(金)에 차분하고 우아한 성향을 지니셨네요. 번잡한 관광지 대신 대리석 궁전 미술관에서 클림트의 황금빛 그림을 감상하고, 백 년 된 카페에서 비엔나커피를 마시는 일정이 찰떡입니다.',
    mustGo: ['벨베데레 궁전에서 클림트 〈키스〉 감상', '카페 센트럴에서 아인슈페너와 자허토르테', '빈 국립오페라극장 공연 관람'],
    illust: { bg: '#f1f5f9', sky: '#fef08a', landmark: '🎻', icons: ['👑', '☕', '🖼️'], caption: '황실의 기품과 클래식 선율이 흐르는 비엔나' }
  },
  METAL_NATURE_ACTIVE: {
    country: '캐나다 (Canada)',
    city: '밴프 & 로키산맥 국립공원',
    flight: '한국에서 캘거리 경유 약 12시간',
    vibeTitle: '강인한 바위 경금(庚金) 기운 × 설산 탐험가',
    whyMatch: '거대한 바위산(金)의 기운과 액티브한 자연파 성향이 결합되었습니다. 깎아지른 듯한 로키산맥의 바위 봉우리들과 레이크 루이스에서 카누를 저으며 대자연의 청량한 공기를 들이마실 때 가슴이 뻥 뚫립니다.',
    mustGo: ['레이크 루이스 에메랄드 호수 카누 타기', '콜롬비아 대빙원 설상차(아이스 익스플로러)', '밴프 설퍼산 곤돌라 & 야외 온천'],
    illust: { bg: '#cbd5e1', sky: '#bae6fd', landmark: '🏔️', icons: ['🛶', '🦌', '🌲'], caption: '거대한 바위산과 빙하 호수가 빛나는 로키산맥' }
  },
  METAL_NATURE_CHILL: {
    country: '스위스 (Switzerland)',
    city: '체르마트 & 인터라켄',
    flight: '한국에서 취리히 직항 약 12시간 30분',
    vibeTitle: '티 없이 맑은 금(金) 기운 × 알프스 신선놀음파',
    whyMatch: '맑고 정갈한 금(金) 기운을 타고났지만 몸이 힘든 것보다 평화로운 휴식을 선호하시는군요. 힘겹게 등산할 필요 없이 산악열차를 타고 올라가 통창 샬레에서 하얀 만년설 마테호른을 바라보는 코스가 최고입니다.',
    mustGo: ['고르너그라트 산악열차 타고 마테호른 감상', '알프스 뷰 인피니티 온천 스파', '통나무 산장 테라스에서 퐁듀와 화이트와인'],
    illust: { bg: '#f8fafc', sky: '#7dd3fc', landmark: '🚂', icons: ['🏔️', '🧀', '🥂'], caption: '만년설 봉우리를 기차 타고 누비는 스위스 알프스' }
  },

  // [수(WATER) 기운 매칭]
  WATER_CITY_ACTIVE: {
    country: '싱가포르 & 홍콩',
    city: '마리나베이 & 빅토리아 하버',
    flight: '한국에서 직항 약 4~6시간',
    vibeTitle: '역동하는 수(水) 기운 × 화려한 나이트 시티파',
    whyMatch: '바다와 강물이 모여드는 수(水) 기운에 지루한 걸 못 참는 도심 액티브 성향이 만났습니다! 바다 위에 떠 있는 미래도시 같은 야경과 루프탑 인피니티풀, 미슐랭 야시장이 당신의 오감을 깨워줍니다.',
    mustGo: ['마리나베이 샌즈 인피니티풀 & 레이저쇼', '클락키 리버보트 타며 강변 펍 투어', '가든스 바이 더 베이 슈퍼트리 야경'],
    illust: { bg: '#bae6fd', sky: '#1e1b4b', landmark: '🌃', icons: ['🍸', '🚢', '🦁'], caption: '바다 위 화려한 불빛이 잠들지 않는 항구 도시' }
  },
  WATER_CITY_CHILL: {
    country: '포르투갈 (Portugal)',
    city: '포르투 (Porto) 강변 마을',
    flight: '한국에서 약 14시간 (직항/경유)',
    vibeTitle: '감성 충만 계수(癸水) 기운 × 노을빛 유랑가',
    whyMatch: '잔잔하게 흐르는 물(水)의 사주와 여유로운 골목 산책 성향이 완벽하게 포개졌습니다. 도우루 강물 위로 주황빛 노을이 윤슬처럼 부서지고 거리마다 기타 버스킹이 흐르는 포르투에서 진정한 행복을 느낍니다.',
    mustGo: ['루이스 1세 다리 위에서 강변 일몰 감상', '도우루 강변 와이너리 포트와인 시음', '바다 옆을 달리는 클래식 전차(트램) 타기'],
    illust: { bg: '#93c5fd', sky: '#fed7aa', landmark: '🌉', icons: ['🚋', '🍷', '🎸'], caption: '강물 위 노을과 와인 향기가 흐르는 포르투' }
  },
  WATER_NATURE_ACTIVE: {
    country: '아이슬란드 (Iceland)',
    city: '골든서클 & 남부 빙하 해안',
    flight: '한국에서 경유 포함 약 14~15시간',
    vibeTitle: '거침없는 임수(壬水) 기운 × 지구 끝 탐험가',
    whyMatch: '큰 바다와 빙하를 뜻하는 수(水) 기운에 남들과 다른 특별한 모험을 갈망하는 성향이 만났습니다! 쏟아지는 거대 폭포 뒤를 걸어가고 푸른 빙하 동굴과 밤하늘의 오로라를 마주하는 일생일대의 여정입니다.',
    mustGo: ['블루라군 대형 화산 노천 온천욕', '스카프타펠 푸른 빙하 트레킹 & 폭포 투어', '겨울 밤하늘 초록빛 오로라 헌팅'],
    illust: { bg: '#a5f3fc', sky: '#0f172a', landmark: '🧊', icons: ['🌌', '♨️', '🐋'], caption: '빙하와 폭포, 오로라가 춤추는 물의 나라 아이슬란드' }
  },
  WATER_NATURE_CHILL: {
    country: '타히티 보라보라섬 & 몰디브',
    city: '산호초 수상 방갈로 라군',
    flight: '한국에서 약 10~13시간',
    vibeTitle: '평온한 수(水) 기운 × 물아일체 럭셔리 휴양파',
    whyMatch: '맑은 물(水)의 기운을 타고났으며 복잡한 사람들과 동선에서 완전히 벗어나고 싶은 성향입니다. 방문을 열면 곧바로 에메랄드빛 따뜻한 바다로 풍덩 뛰어든 뒤 해먹에서 낮잠을 자는 수상 방갈로가 당신의 천국입니다.',
    mustGo: ['수상 방갈로 테라스에서 바로 바다 스노클링', '산호초 라군 위에서 즐기는 플로팅 조식', '선셋 세일링 요트 투어 & 해변 스파'],
    illust: { bg: '#67e8f9', sky: '#e0f2fe', landmark: '🏝️', icons: ['🐠', '🍹', '🌺'], caption: '에메랄드빛 바다 위 오롯이 나만 존재하는 낙원' }
  }
};

// 실제 양력 생년월일시 -> 일간 및 오행 분포 계산
function calculateSaju(year: number, month: number, day: number, hourIdx: number) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / 86400000);
  
  const dayStemIdx = ((diffDays % 10) + 10) % 10;
  const yearStemIdx = ((year - 4) % 10 + 10) % 10;
  
  const dayMaster = CHEONGAN[dayStemIdx];
  const yearStem = CHEONGAN[yearStemIdx];
  const hourInfo = JIJI_HOURS[hourIdx] || JIJI_HOURS[12];

  let monthElement = 'EARTH';
  if ([2, 3, 4].includes(month)) monthElement = 'WOOD';
  else if ([5, 6, 7].includes(month)) monthElement = 'FIRE';
  else if ([8, 9, 10].includes(month)) monthElement = 'METAL';
  else if ([11, 12, 1].includes(month)) monthElement = 'WATER';

  const counts: Record<string, number> = { WOOD: 1, FIRE: 1, EARTH: 1, METAL: 1, WATER: 1 };
  counts[dayMaster.element] += 3;
  counts[monthElement] += 2;
  counts[yearStem.element] += 1;
  if (hourInfo.element !== 'NONE') counts[hourInfo.element] += 2;

  return { dayMaster, monthElement, hourInfo, counts };
}

export default function FateTravelTest() {
  const [step, setStep] = useState<'input' | 'result'>('input');

  // 1. 사주 입력 상태
  const [birthYear, setBirthYear] = useState(1995);
  const [birthMonth, setBirthMonth] = useState(5);
  const [birthDay, setBirthDay] = useState(15);
  const [hourIdx, setHourIdx] = useState(6);

  // 2. 성향 밸런스 4대 축 (이 조합에 따라 결과가 완전히 달라짐)
  const [prefScene, setPrefScene] = useState<'CITY' | 'NATURE'>('CITY');       // 도시문명 vs 대자연
  const [prefTempo, setPrefTempo] = useState<'ACTIVE' | 'CHILL'>('ACTIVE');    // 알찬모험 vs 느긋휴양
  const [prefStyle, setPrefStyle] = useState<'BOOST' | 'HEAL'>('BOOST');       // 내 본성 기운 극대화 vs 지친 멘탈 보충(용신)
  const [prefPlan, setPrefPlan] = useState<'J' | 'P'>('P');                    // 꼼꼼계획 vs 즉흥낭만

  const [copied, setCopied] = useState(false);

  const saju = calculateSaju(birthYear, birthMonth, birthDay, hourIdx);

  // 사주 오행 + 성향 4축을 결합해 최종 여행지 키 산출
  const getCombinedKey = () => {
    let targetElem = saju.dayMaster.element;

    if (prefStyle === 'HEAL') {
      // '지친 멘탈 보충' 선택 시: 내 사주에서 가장 부족한 오행 + 내 성향(J/P)이 원하는 기운을 결합
      const sorted = Object.entries(saju.counts).sort((a, b) => a[1] - b[1]);
      targetElem = sorted[0][0];
    } else {
      // '내 잠재력 폭발' 선택 시: 일간 기운과 태어난 계절 기운 중 성향과 맞는 쪽 선택
      if (prefPlan === 'J' && saju.monthElement !== saju.dayMaster.element) {
        targetElem = saju.dayMaster.element;
      }
    }

    return `${targetElem}_${prefScene}_${prefTempo}`;
  };

  const resultKey = getCombinedKey();
  const spot = TRAVEL_DB[resultKey] || TRAVEL_DB.WOOD_NATURE_CHILL;

  const handleShare = async () => {
    const shareData = {
      title: '사주 × 성향 운명의 세계 여행지 ✈️',
      text: `[${birthYear}.${birthMonth}.${birthDay}생] 내 사주(${saju.dayMaster.kor})와 여행 성향을 합친 운명 여행지는 👉 ${spot.country} ${spot.city}! (${spot.flight})`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="kkuk-theme min-h-screen bg-[#F5F0E6] py-8 px-4 flex justify-center text-stone-900">
      <div className="w-full max-w-md">
        
        {step === 'input' && (
          <div className="bg-[#FFFDF8] p-6 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-6">
            
            {/* 타이틀 영역 */}
            <div className="text-center space-y-1.5">
              <span className="inline-block bg-amber-300 border-2 border-stone-900 px-3 py-0.5 rounded-full text-sm font-bold">
                🧭 생년월일시 사주 × 나의 여행 성향
              </span>
              <h1 className="text-3xl font-bold leading-snug pt-1">
                사주와 성향으로 조합하는<br />운명의 세계 여행지
              </h1>
            </div>

            {/* 손그림 느낌 일러스트 박스 */}
            <div className="bg-[#E8F4F8] border-[2.5px] border-stone-900 rounded-2xl p-4 relative overflow-hidden">
              <svg viewBox="0 0 320 125" className="w-full h-32">
                <circle cx="45" cy="30" r="16" fill="#fde047" stroke="#1c1917" strokeWidth="2.5" />
                <path d="M0 105 Q80 85 160 105 T320 100 L320 125 L0 125 Z" fill="#fef08a" stroke="#1c1917" strokeWidth="2.5" />
                <text x="20" y="100" fontSize="32">🗼</text>
                <text x="70" y="102" fontSize="28">🗽</text>
                <text x="215" y="102" fontSize="30">🏔️</text>
                <text x="265" y="102" fontSize="30">🏝️</text>
                <g>
                  <rect x="120" y="55" width="75" height="44" rx="10" fill="#f97316" stroke="#1c1917" strokeWidth="2.5" />
                  <text x="135" y="50" fontSize="38">🧳</text>
                  <text x="172" y="45" fontSize="24">✈️</text>
                </g>
              </svg>
              <p className="text-center text-sm text-stone-700 mt-1 font-bold">
                태어난 시간(사주)과 아래 성향 스위치 4개를 조합해 보세요!
              </p>
            </div>

            {/* STEP 1: 태어난 날짜와 시간 */}
            <div className="bg-[#FFF8E7] p-4 rounded-2xl border-2 border-stone-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">① 태어난 날짜와 시간</span>
                <span className="text-xs bg-amber-200 border border-stone-900 px-2.5 py-0.5 rounded-full font-bold">
                  내 일주: {saju.dayMaster.hanja}({saju.dayMaster.kor})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-stone-600 block mb-1">연도(년)</label>
                  <input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(Number(e.target.value))}
                    className="w-full p-2 bg-white border-2 border-stone-900 rounded-xl text-center text-lg font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1">월</label>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(Number(e.target.value))}
                    className="w-full p-2 bg-white border-2 border-stone-900 rounded-xl text-center text-lg font-bold"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}월</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1">일</label>
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(Number(e.target.value))}
                    className="w-full p-2 bg-white border-2 border-stone-900 rounded-xl text-center text-lg font-bold"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}일</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-600 block mb-1">태어난 시간</label>
                <select
                  value={hourIdx}
                  onChange={(e) => setHourIdx(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border-2 border-stone-900 rounded-xl text-base font-bold"
                >
                  {JIJI_HOURS.map((h, i) => (
                    <option key={i} value={i}>{h.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* STEP 2: 나의 평소 성향 4가지 조합 */}
            <div className="bg-[#FFF8E7] p-4 rounded-2xl border-2 border-stone-900 space-y-3.5">
              <div className="text-lg font-bold">② 나의 여행 성향 밸런스 (직접 선택)</div>

              {/* 성향 1: 풍경 취향 */}
              <div className="space-y-1">
                <span className="text-xs text-stone-600 block">Q1. 비행기 내렸을 때 더 설레는 풍경은?</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrefScene('CITY')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefScene === 'CITY' ? 'bg-amber-300 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    🏙️ 매력적인 도시·골목
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrefScene('NATURE')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefScene === 'NATURE' ? 'bg-amber-300 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    🏞️ 압도적인 대자연·바다
                  </button>
                </div>
              </div>

              {/* 성향 2: 여행 템포 */}
              <div className="space-y-1">
                <span className="text-xs text-stone-600 block">Q2. 내가 추구하는 여행 에너지 템포는?</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrefTempo('ACTIVE')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefTempo === 'ACTIVE' ? 'bg-rose-200 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    🔥 핫플·액티비티 정복
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrefTempo('CHILL')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefTempo === 'CHILL' ? 'bg-rose-200 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    🍵 느긋한 산책·칠링 휴식
                  </button>
                </div>
              </div>

              {/* 성향 3: 현재 필요한 사주 처방 */}
              <div className="space-y-1">
                <span className="text-xs text-stone-600 block">Q3. 지금 나에게 더 필요한 여행의 목적은?</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrefStyle('BOOST')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefStyle === 'BOOST' ? 'bg-emerald-200 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    ⚡ 내 타고난 기운 극대화
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrefStyle('HEAL')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefStyle === 'HEAL' ? 'bg-emerald-200 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    💧 부족한 기운 채워 힐링
                  </button>
                </div>
              </div>

              {/* 성향 4: 계획성 */}
              <div className="space-y-1">
                <span className="text-xs text-stone-600 block">Q4. 평소 나의 일정 소화 스타일은?</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrefPlan('J')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefPlan === 'J' ? 'bg-sky-200 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    📝 동선·예약 완벽 준비파
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrefPlan('P')}
                    className={`p-2.5 rounded-xl border-2 border-stone-900 text-base transition ${
                      prefPlan === 'P' ? 'bg-sky-200 shadow-[2px_2px_0px_#1c1917] font-bold' : 'bg-white text-stone-500'
                    }`}
                  >
                    🎒 발길 닿는 대로 즉흥파
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('result')}
              className="w-full py-4 bg-amber-300 hover:bg-amber-400 text-stone-900 text-xl font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] transition"
            >
              사주 × 성향 조합 결과 보기 ✈️
            </button>
          </div>
        )}

        {/* 결과 리포트 화면 */}
        {step === 'result' && (
          <div className="space-y-4">
            <div className="bg-[#FFFDF8] p-6 rounded-[32px] border-[3px] border-stone-900 shadow-[6px_6px_0px_#1c1917] space-y-5">
              
              {/* 상단 헤더 */}
              <div className="text-center space-y-1">
                <span className="inline-block bg-amber-200 border-2 border-stone-900 px-3 py-0.5 rounded-full text-sm font-bold">
                  {birthYear}년 {birthMonth}월 {birthDay}일 ({saju.hourInfo.name}) × 성향 매칭
                </span>
                <p className="text-sm text-amber-900 font-bold pt-1">{spot.vibeTitle}</p>
                <h2 className="text-3xl font-bold text-stone-900">{spot.country}</h2>
                <p className="text-2xl font-bold text-amber-800">{spot.city}</p>
                <div className="inline-block bg-white border-2 border-stone-900 px-3.5 py-1 rounded-xl text-base font-bold mt-1 shadow-[2px_2px_0px_#1c1917]">
                  ✈️ {spot.flight}
                </div>
              </div>

              {/* 여행지 맞춤 일러스트 포스터 */}
              <div className="border-[2.5px] border-stone-900 rounded-2xl overflow-hidden shadow-[3px_3px_0px_#1c1917]">
                <svg viewBox="0 0 320 155" className="w-full h-40" style={{ backgroundColor: spot.illust.sky }}>
                  <circle cx="265" cy="35" r="20" fill="#fde047" stroke="#1c1917" strokeWidth="2.5" />
                  <path d="M0 110 Q90 80 180 110 T320 100 L320 155 L0 155 Z" fill={spot.illust.bg} stroke="#1c1917" strokeWidth="2.5" />
                  <text x="130" y="105" fontSize="54">{spot.illust.landmark}</text>
                  <text x="45" y="120" fontSize="34">{spot.illust.icons[0]}</text>
                  <text x="225" y="120" fontSize="34">{spot.illust.icons[1]}</text>
                  <text x="80" y="55" fontSize="28">{spot.illust.icons[2]}</text>
                </svg>
                <div className="bg-stone-900 text-white text-center py-1.5 text-sm">
                  ✨ {spot.illust.caption}
                </div>
              </div>

              {/* 사주 + 성향 결합 상세 분석 */}
              <div className="bg-[#FFF8E7] p-4 rounded-2xl border-2 border-stone-900 space-y-2">
                <div className="text-lg font-bold text-amber-950 border-b border-stone-300 pb-1">
                  🔮 사주({saju.dayMaster.kor}) × 내 성향 조합 풀이
                </div>
                <p className="text-base text-stone-800 leading-relaxed">
                  • <strong>타고난 사주 본성:</strong> {saju.dayMaster.desc}<br />
                  • <strong>성향 결합 결론:</strong> {spot.whyMatch}
                </p>
              </div>

              {/* 어디를 가면 좋은지 추천 코스 */}
              <div className="bg-white p-4 rounded-2xl border-2 border-stone-900 space-y-2">
                <div className="text-lg font-bold text-stone-900">
                  📍 이곳에 가면 꼭 해봐야 할 코스
                </div>
                <ul className="text-base text-stone-800 space-y-1">
                  {spot.mustGo.map((item, idx) => (
                    <li key={idx}>✔ {item}</li>
                  ))}
                </ul>
                <div className="pt-2 mt-2 border-t border-dashed border-stone-300 text-sm text-stone-600">
                  💡 <strong>{prefPlan === 'J' ? '계획파(J) 맞춤 팁' : '즉흥파(P) 맞춤 팁'}:</strong>{' '}
                  {prefPlan === 'J'
                    ? '인기 전망대와 근교 투어는 한국에서 미리 패스를 예매해 가면 동선 스트레스가 0이 됩니다!'
                    : '숙소만 잡아두고 현지인이 붐비는 노천카페나 골목길에 발길 닿는 대로 들어가 보세요!'}
                </div>
              </div>

            </div>

            <button
              onClick={handleShare}
              className="w-full py-4 bg-[#FEE500] hover:bg-[#FDD800] text-stone-900 text-lg font-bold rounded-2xl border-[3px] border-stone-900 shadow-[4px_4px_0px_#1c1917] active:translate-x-[2px] active:translate-y-[2px] transition"
            >
              {copied ? '✅ 링크 복사 완료! 단톡방에 붙여넣기' : '💬 친구들에게 내 사주 여행지 공유하기'}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStep('input')}
                className="py-3 bg-stone-800 text-white text-base rounded-xl border-2 border-stone-900"
              >
                🔄 성향 바꿔서 다른 조합 보기
              </button>
              <Link
                href="/"
                className="py-3 bg-white text-stone-900 text-base text-center rounded-xl border-2 border-stone-900"
              >
                🏠 연구소 홈으로
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
