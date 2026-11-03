'use client';

import { useState } from 'react';
import Link from 'next/link';

// 질문 7문항 (사주 성향 매칭을 위한 오행 성향 수집)
const QUESTIONS = [
  {
    text: "여행 준비할 때 당신의 '마음가짐'은?",
    a: { text: "초단위로 동선이랑 평점 확인하며 엑셀로 기록 📝", type: 'J' },
    b: { text: "여권이랑 지갑만 있으면 어디든 축제지, 일단 출발 🎒", type: 'P' }
  },
  {
    text: "낯선 여행지에 도착하자마자 몸이 반응하는 쪽은?",
    a: { text: "유명한 맛집, 액티비티, 랜드마크로 쉴 틈 없이 직진 🏃", type: 'E' },
    b: { text: "조용하고 풍경 좋은 골목길 카페나 공원 벤치에 착석 ☕", type: 'I' }
  },
  {
    text: "여행 중 예상치 못하게 비가 쏟아져 계획이 꼬인다면?",
    a: { text: "날씨 앱이랑 플랜B 실시간 가동, 실내 미술관/맛집 검색 🗺️", type: 'J' },
    b: { text: "카페 창가에 앉아서 빗소리 감상, 이것도 나름 감성이지 🌧️", type: 'P' }
  },
  {
    text: "어떤 숙소에서 잘 때 '돈값 했다'고 느껴지나요?",
    a: { text: "접근성 최고, 시끌벅적하고 교류가 활발한 게스트하우스나 가성비 호텔 🏨", type: 'E' },
    b: { text: "자연 속에 묻혀 조용하게 사색할 수 있는 감성 에어비앤비나 료칸 🌲", type: 'I' }
  },
  {
    text: "낯선 외국인 상인이 물건값을 바가지 씌우는 것 같을 때",
    a: { text: "기세로 밀어붙여 흥정하거나, 칼같이 거절하고 돌아섬 😤", type: 'FIRE' },
    b: { text: "말하기 피곤해서 그냥 사거나 조용히 다른 가게로 이동함 🤫", type: 'WATER' }
  },
  {
    text: "여행 중 가장 행복하다고 느끼는 순간은?",
    a: { text: "뜨거운 열정 속 쇼핑, 밤거리 야시장, 화려한 불빛 속 🏮", type: 'FIRE' },
    b: { text: "나무 가득한 숲, 바다, 고요한 유적지에서 불어오는 바람 🍃", type: 'WATER' }
  },
  {
    text: "나에게 세계 여행이란?",
    a: { text: "내 한계를 깨고 끊임없이 자극을 얻는 모험 🧭", type: 'FIRE' },
    b: { text: "바쁜 일상에서 벗어나 영혼을 채우는 힐링 🕯️", type: 'WATER' }
  }
];

// 사주 X 성향 조합별 맞춤 여행지 결과 데이터
interface TravelResult {
  title: string;
  sub: string;
  country: string;
  time: string;
  sajuEnergy: string;
  illustration: string; // 이모티콘 및 그래픽
  mustDo: string[];
  luckyItem: string;
  mate: string;
}

const RESULTS: Record<string, TravelResult> = {
  'EJ_FIRE': {
    title: "열정의 화(火) 기운 대폭발",
    sub: "당신의 운명 여행지",
    country: "미국 뉴욕 (New York)",
    time: "대한민국에서 비행기로 약 14시간",
    sajuEnergy: "사주에 가득한 뜨거운 열정과 진취적인 기운이 뉴욕의 끊임없는 에너지와 만나 잠들었던 야망을 깨웁니다. 한순간도 지루할 틈이 없는 불야성의 도시가 당신의 사주와 찰떡궁합입니다.",
    illustration: "🗽🌆✨",
    mustDo: ["타임스퀘어 밤거리 걷기", "브로드웨이 뮤지컬 관람", "엠파이어 스테이트 빌딩 야경"],
    luckyItem: "화려한 선글라스 & 가벼운 운동화",
    mate: "태국 치앙마이 (조용하고 차분한 상호보완)"
  },
  'EP_FIRE': {
    title: "자유로운 바람의 화(火) 기운",
    sub: "당신의 운명 여행지",
    country: "스페인 바르셀로나 (Barcelona)",
    time: "대한민국에서 비행기로 약 14시간 30분",
    sajuEnergy: "즉흥적이고 사교적인 당신의 기질은 정열적인 태양과 예술이 가득한 바르셀로나에서 빛을 발합니다. 사주의 자유로운 활력이 축제 같은 도시의 온도를 온전히 즐길 수 있게 돕습니다.",
    illustration: "🎡🇪🇸🏖️",
    mustDo: ["가우디 성당 앞에서 멍때리기", "보케리아 시장에서 타파스 투어", "바르셀네타 해변에서 일몰"],
    luckyItem: "카메라 & 동전 지갑",
    mate: "일본 교토 (사색과 여백을 채워줄 짝)"
  },
  'IJ_WATER': {
    title: "사색하는 수(水)와 토(土)의 조화",
    sub: "당신의 운명 여행지",
    country: "스위스 인터라켄 (Interlaken)",
    time: "대한민국에서 비행기로 약 12~13시간 (경유 포함)",
    sajuEnergy: "깊은 물과 단단한 흙의 기운이 마음의 안정을 주는 사주입니다. 거대한 자연과 평화로운 알프
