'use client';

import { useState } from 'react';
import Link from 'next/link';

// 10천간 & 12지지 실제 명리학 데이터
const CHEONGAN = [
  { hanja: '甲', kor: '갑목(큰 나무)', element: 'WOOD', color: '#16a34a', trait: '곧게 뻗어나가는 리더십과 성장을 추구하는 기운' },
  { hanja: '乙', kor: '을목(화초·덩굴)', element: 'WOOD', color: '#22c55e', trait: '유연한 적응력과 어딜 가나 살아남는 끈기 있는 기운' },
  { hanja: '丙', kor: '병화(태양)', element: 'FIRE', color: '#ef4444', trait: '정열적이고 화려하며 숨김없이 발산하는 뜨거운 기운' },
  { hanja: '丁', kor: '정화(촛불·별빛)', element: 'FIRE', color: '#f97316', trait: '은은하고 따뜻한 감성과 깊은 예술적 영감을 품은 기운' },
  { hanja: '戊', kor: '무토(거대한 산)', element: 'EARTH', color: '#d97706', trait: '묵직하고 포용력이 넓으며 흔들리지 않는 대지의 기운' },
  { hanja: '己', kor: '기토(비옥한 정원)', element: 'EARTH', color: '#eab308', trait: '실속 있고 다정하며 내 사람을 챙기는 온화한 땅의 기운' },
  { hanja: '庚', kor: '경금(원석·바위)', element: 'METAL', color: '#64748b', trait: '결단력이 빠르고 맺고 끊음이 확실한 강인한 바위의 기운' },
  { hanja: '辛', kor: '신금(보석)', element: 'METAL', color: '#94a3b8', trait: '섬세하고 예리하며 남다른 안목과 품격을 지닌 보석의 기운' },
  { hanja: '壬', kor: '임수(넓은 바다)', element: 'WATER', color: '#0284c7', trait: '스케일이 크고 자유로우며 어디든 흘러가는 거침없는 바다의 기운' },
  { hanja: '癸', kor: '계수(봄비·옹달샘)', element: 'WATER', color: '#38bdf8', trait: '지혜롭고 사색을 즐기며 조용히 스며드는 맑은 물의 기운' }
];

const JIJI_HOURS = [
  { label: '자시 (23:30 ~ 01:29)', name: '子(자·쥐)', element: 'WATER' },
  { label: '축시 (01:30 ~ 03:29)', name: '丑(축·소)', element: 'EARTH' },
  { label: '인시 (03:30 ~ 05:29)', name: '寅(인·호랑이)', element: 'WOOD' },
  { label: '묘시 (05:30 ~ 07:29)', name: '卯(묘·토끼)', element: 'WOOD' },
  { label: '진시 (07:30 ~ 09:29)', name: '辰(진·용)', element: 'EARTH' },
  { label: '사시 (09:30 ~ 11:29)', name: '巳(사·뱀)', element: 'FIRE' },
  { label: '오시 (11:30 ~ 13:29)', name: '午(오·말)', element: 'FIRE' },
  { label: '미시 (13:30 ~ 15:29)', name: '未(미·양)', element: 'EARTH' },
  { label: '신시 (15:30 ~ 17:29)', name: '申(신·원숭이)', element: 'METAL' },
  { label: '유시 (17:30 ~ 19:29)', name: '酉(유·닭)', element: 'METAL' },
  { label: '술시 (19:30 ~ 21:29)', name: '戌(술·개)', element: 'EARTH' },
  { label: '해시 (21:30 ~ 23:29)', name: '亥(해·돼지)', element: 'WATER' },
  { label: '태어난 시간 모름', name: '미상', element: 'NONE' }
];

// 오행 x 성향(동적/정적) 매칭 10대 세계 여행지 데이터베이스
