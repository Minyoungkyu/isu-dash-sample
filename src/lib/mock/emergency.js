/**
 * CCTV 자동감지 비상상황 (시연용).
 * 헤더 버튼으로 트리거 → 해당 CCTV 를 자동 선택하고 팝업을 '비상 감지' 상태로 띄운다.
 *  - camId: 이 상황이 감지되는 CCTV (cctv.js 의 id)
 *  - accent: 상황 배지/아이콘 강조색 (팝업 프레임 자체는 공통 적색 경보)
 *  - icon: lucide 아이콘 키 (컴포넌트 매핑은 사용처에서)
 */
export const EMERGENCIES = {
  collapse: {
    label: '근로자 쓰러짐',
    sub: '작업자 이상거동·쓰러짐 자동 감지',
    accent: '#ff3b5c',
    icon: 'user',
    camId: 'CAM-01',
    presets: [
      '정문 출입구 근로자 이상 징후 감지 및 쓰러짐 발생',
      '현장 관리자 및 보건관리자 즉시 출동 바람',
    ],
  },
  fire: {
    label: '화재 발생',
    sub: '연기·화염 패턴 자동 감지',
    accent: '#f97316',
    icon: 'flame',
    camId: 'CAM-04',
    presets: [
      '2블록 굴착부 화재발생',
      '화재발생으로 안전한 곳으로 신속하게 대피해 주십시오',
    ],
  },
  nohelmet: {
    label: '안전모 미착용',
    sub: 'PPE(안전모) 미착용 자동 감지',
    accent: '#eab308',
    icon: 'hardhat',
    camId: 'CAM-08',
    presets: [
      '안전모 착용은 모두의 안전을 지키는 일 입니다',
      '안전모 미착용시 벌금이 있습니다',
    ],
  },
  intrusion: {
    label: '경계 침입',
    sub: '경계구역 무단 침입 자동 감지',
    accent: '#a855f7',
    icon: 'shield',
    camId: 'CAM-12',
    presets: [
      '이 구역은 위험구역입니다. 즉시 다른 장소로 이동해주세요',
      '안전을 위해 통제구역 밖으로 신속히 대피하시기 바랍니다',
    ],
  },
};

// 헤더 버튼 배치 순서
export const EMERGENCY_ORDER = ['collapse', 'fire', 'nohelmet', 'intrusion'];
