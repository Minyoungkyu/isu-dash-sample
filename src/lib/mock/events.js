/**
 * 실시간 이벤트/알림 목업 데이터 (좌측 이벤트 피드용).
 *  - kind: 'sos' | 'sensor' | 'access' | 'equip' | 'cctv' | 'tbm' | 'env'
 *  - level: 'danger' | 'warn' | 'info'
 * 최신순 정렬.
 */
export const EVENTS = [
  { id: 1, time: '12:59:04', kind: 'sos', level: 'danger', zone: '부천광희 재건축', message: 'SOS 호출 발생 — 임주원 (미래ENG)' },
  { id: 2, time: '12:57:41', kind: 'sensor', level: 'danger', zone: '마곡 SH', message: '피부온도 임계 초과 37.6℃ — 정하준' },
  { id: 3, time: '12:55:12', kind: 'access', level: 'warn', zone: '부천광희 재건축', message: '위험구역 미승인 출입 감지 (지하 2층)' },
  { id: 4, time: '12:53:38', kind: 'cctv', level: 'warn', zone: '부천광희 재건축', message: 'CAM-06 신호 끊김 — 점검 필요' },
  { id: 5, time: '12:51:20', kind: 'equip', level: 'info', zone: '마곡 SH', message: '굴착기 02 정지 — 점검 진입' },
  { id: 6, time: '12:49:55', kind: 'env', level: 'warn', zone: '전체', message: '체감온도 경고 단계 진입 (33.6℃)' },
  { id: 7, time: '12:47:02', kind: 'access', level: 'info', zone: '브라운스톤 양양', message: '정문 출입 — 근로자 12명 입장' },
  { id: 8, time: '12:44:31', kind: 'tbm', level: 'info', zone: '전체', message: 'TBM 이수 완료 435명 집계' },
  { id: 9, time: '12:41:17', kind: 'equip', level: 'info', zone: '이수페타시스 5공장', message: '펌프카 01 타설 작업 시작' },
  { id: 10, time: '12:38:49', kind: 'sensor', level: 'warn', zone: '마곡 SH', message: '산소포화도 저하 93% — 박도윤' },
  { id: 11, time: '12:35:26', kind: 'cctv', level: 'info', zone: '브라운스톤 양양', message: 'CAM-08 PTZ 프리셋 순찰 시작' },
  { id: 12, time: '12:32:10', kind: 'access', level: 'info', zone: '브라운스톤 양양', message: '후문 차량 출입 — 레미콘 3대' },
];
