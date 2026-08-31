/**
 * 중장비 목업 데이터. 각 공구 근처로 분산 배치.
 *  - kind: excavator(굴착기) | crane(크레인) | dump(덤프) | loader(로더) | pump(펌프카)
 *  - status: 'running'(운행중) | 'idle'(대기) | 'stopped'(정지)
 *  - 핀 클릭 → 팝업(통화 / 타자→TTS 전송)
 */
export const EQUIP_LIST = [
  // 브라운스톤 양양
  { id: 'EQ-01', name: '굴착기 01', kind: 'excavator', status: 'running', operator: '김철수', phone: '010-1234-0001', lat: 37.6038, lng: 126.6530, zone: '브라운스톤 양양', task: '1블록 터파기' },
  { id: 'EQ-02', name: '타워크레인 01', kind: 'crane', status: 'running', operator: '이영호', phone: '010-1234-0002', lat: 37.6048, lng: 126.6545, zone: '브라운스톤 양양', task: '자재 양중' },
  // 마곡 SH
  { id: 'EQ-03', name: '덤프트럭 03', kind: 'dump', status: 'idle', operator: '박민재', phone: '010-1234-0003', lat: 37.5725, lng: 126.6255, zone: '마곡 SH', task: '토사 반출 대기' },
  { id: 'EQ-04', name: '로더 02', kind: 'loader', status: 'running', operator: '정대현', phone: '010-1234-0004', lat: 37.5715, lng: 126.6268, zone: '마곡 SH', task: '자재 상차' },
  // 부천광희 재건축
  { id: 'EQ-05', name: '굴착기 02', kind: 'excavator', status: 'stopped', operator: '최윤성', phone: '010-1234-0005', lat: 37.6185, lng: 126.6895, zone: '부천광희 재건축', task: '점검 중' },
  // 이수페타시스 5공장
  { id: 'EQ-06', name: '펌프카 01', kind: 'pump', status: 'running', operator: '한지훈', phone: '010-1234-0006', lat: 37.5852, lng: 126.7145, zone: '이수페타시스 5공장', task: '4블록 타설' },
  { id: 'EQ-07', name: '덤프트럭 05', kind: 'dump', status: 'running', operator: '오세준', phone: '010-1234-0007', lat: 37.5845, lng: 126.7158, zone: '이수페타시스 5공장', task: '토사 반출' },
  // 브라운스톤 월곡센트럴
  { id: 'EQ-08', name: '타워크레인 02', kind: 'crane', status: 'idle', operator: '강태우', phone: '010-1234-0008', lat: 37.6418, lng: 126.6255, zone: '브라운스톤 월곡센트럴', task: '대기' },
];

export const EQUIP_KIND_LABEL = {
  excavator: '굴착기',
  crane: '크레인',
  dump: '덤프트럭',
  loader: '로더',
  pump: '펌프카',
};

export const EQUIP_STATUS = {
  running: { label: '운행중', color: '#22c55e' },
  idle: { label: '대기', color: '#eab308' },
  stopped: { label: '정지', color: '#94a3b8' },
};
