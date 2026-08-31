/**
 * 스마트밴드 목업 데이터 — 실제 운용 대시보드 필드에 맞춤.
 * 실제 수신 생체값: 산소포화도(SpO2 %) · 피부온도(℃).
 *  - online: 밴드 연결/신호 여부 (상태 표시등). false면 값은 '---'
 *  - locReg: 위치정보 등록 여부
 *  - status: 'normal' | 'caution' | 'danger' | 'sos' | 'offline'
 *  - company(원도급/협력사) + team(세부소속) 2줄 표기
 */
export const BAND_STATUS = {
  normal: { label: '정상', color: '#22c55e' },
  caution: { label: '주의', color: '#eab308' },
  danger: { label: '위험', color: '#f97316' },
  sos: { label: 'SOS', color: '#ff3b5c' },
  offline: { label: '미수신', color: '#64748b' },
};

// 현장 종합 KPI (실제 대시보드 상단 지표) — 사이트 전체 규모
export const SMARTBAND_KPI = {
  attendance: 435, // 금일 출력 인원
  tbm: 435, // TBM 이수자
  gateways: 6, // 동작 중인 게이트웨이
  // sos 는 WORKERS 에서 파생
};

// ※ 이름·소속은 전부 가상(익명) 목업 데이터입니다. 실존 인물/업체와 무관합니다.
export const WORKERS = [
  { id: 'W-1042', name: '김민준', company: '대한건설', team: '골조팀', online: true, spo2: 98, skinTemp: 34.2, locReg: true, zone: '브라운스톤 양양', lastSeen: '방금', status: 'normal' },
  { id: 'W-1043', name: '이서연', company: '대한건설', team: '안전보건팀', online: true, spo2: 97, skinTemp: 34.8, locReg: true, zone: '브라운스톤 양양', lastSeen: '방금', status: 'normal' },
  { id: 'W-1044', name: '박도윤', company: '대한건설', team: '철근팀', online: true, spo2: 93, skinTemp: 37.1, locReg: true, zone: '마곡 SH', lastSeen: '1분 전', status: 'caution' },
  { id: 'W-1045', name: '최지우', company: '대한건설', team: '설비팀', online: true, spo2: 99, skinTemp: 33.9, locReg: true, zone: '부천광희 재건축', lastSeen: '방금', status: 'normal' },
  { id: 'W-1046', name: '정하준', company: '대한건설', team: '골조팀', online: true, spo2: 91, skinTemp: 37.6, locReg: true, zone: '마곡 SH', lastSeen: '방금', status: 'danger' },
  { id: 'W-1047', name: '강시우', company: '대한건설', team: '전기팀', online: false, spo2: null, skinTemp: null, locReg: false, zone: '-', lastSeen: '12분 전', status: 'offline' },
  { id: 'W-1048', name: '윤예준', company: '대한건설', team: '철근팀', online: true, spo2: 98, skinTemp: 34.1, locReg: true, zone: '브라운스톤 양양', lastSeen: '방금', status: 'normal' },
  { id: 'W-1049', name: '임주원', company: '미래ENG', team: '보통인부', online: true, spo2: 88, skinTemp: 38.2, locReg: true, zone: '부천광희 재건축', lastSeen: '방금', status: 'sos' },
  { id: 'W-1050', name: '한이안', company: '대한건설', team: '형틀목공', online: true, spo2: 97, skinTemp: 34.5, locReg: true, zone: '브라운스톤 양양', lastSeen: '방금', status: 'normal' },
  { id: 'W-1051', name: '오건우', company: '대한건설', team: '설비팀', online: false, spo2: null, skinTemp: null, locReg: false, zone: '-', lastSeen: '34분 전', status: 'offline' },
  { id: 'W-1052', name: '신유찬', company: '한울설비', team: '설비팀', online: true, spo2: 96, skinTemp: 35.0, locReg: true, zone: '이수페타시스 5공장', lastSeen: '방금', status: 'normal' },
  { id: 'W-1053', name: '조준서', company: '미래ENG', team: '철근팀', online: true, spo2: 94, skinTemp: 36.9, locReg: true, zone: '마곡 SH', lastSeen: '1분 전', status: 'caution' },
  { id: 'W-1054', name: '배승우', company: '미래ENG', team: '전기팀', online: true, spo2: 98, skinTemp: 33.7, locReg: true, zone: '부천광희 재건축', lastSeen: '방금', status: 'normal' },
  { id: 'W-1055', name: '남지호', company: '미래ENG', team: '보통인부', online: true, spo2: 95, skinTemp: 36.3, locReg: false, zone: '이수페타시스 5공장', lastSeen: '방금', status: 'caution' },
];

// SOS 팝업 시연용 대상
export const SOS_DEMO_WORKER = WORKERS.find((w) => w.status === 'sos') ?? WORKERS[0];
