/**
 * CCTV 목업 데이터. 각 공구(멀리 떨어진 5곳) 근처로 분산 배치.
 *  - type: 'rotating'(회전형/PTZ) | 'fixed'(고정형)  → 지도 핀 모양이 달라짐
 *  - status: 'online' | 'offline'
 *  - hasSpeaker: 현장 방송용 스피커 탑재 여부 (TTS 송출 대상)
 */
export const CCTV_LIST = [
  // 브라운스톤 양양 (검단)
  { id: 'CAM-01', name: '정문 출입구', type: 'rotating', status: 'online', hasSpeaker: true, lat: 37.6050, lng: 126.6525, zone: '브라운스톤 양양' },
  { id: 'CAM-02', name: '1블록 타워크레인', type: 'fixed', status: 'online', hasSpeaker: true, lat: 37.6035, lng: 126.6548, zone: '브라운스톤 양양' },
  { id: 'CAM-08', name: '현장사무소 앞', type: 'rotating', status: 'online', hasSpeaker: true, lat: 37.6055, lng: 126.6552, zone: '브라운스톤 양양' },
  // 마곡 SH (청라)
  { id: 'CAM-03', name: '자재 야적장', type: 'fixed', status: 'online', hasSpeaker: false, lat: 37.5730, lng: 126.6248, zone: '마곡 SH' },
  { id: 'CAM-09', name: '흙막이 계측구간', type: 'fixed', status: 'online', hasSpeaker: false, lat: 37.5712, lng: 126.6272, zone: '마곡 SH' },
  // 부천광희 재건축 (마전)
  { id: 'CAM-04', name: '2블록 굴착부', type: 'rotating', status: 'online', hasSpeaker: true, lat: 37.6190, lng: 126.6888, zone: '부천광희 재건축' },
  { id: 'CAM-05', name: '가설도로 진입', type: 'rotating', status: 'online', hasSpeaker: true, lat: 37.6172, lng: 126.6912, zone: '부천광희 재건축' },
  { id: 'CAM-06', name: '3블록 지하층', type: 'fixed', status: 'offline', hasSpeaker: true, lat: 37.6188, lng: 126.6915, zone: '부천광희 재건축' },
  // 이수페타시스 5공장 (가정)
  { id: 'CAM-07', name: '레미콘 대기소', type: 'fixed', status: 'online', hasSpeaker: false, lat: 37.5858, lng: 126.7138, zone: '이수페타시스 5공장' },
  { id: 'CAM-10', name: '후문 차량통제', type: 'rotating', status: 'online', hasSpeaker: true, lat: 37.5842, lng: 126.7162, zone: '이수페타시스 5공장' },
  // 브라운스톤 월곡센트럴 (불로)
  { id: 'CAM-11', name: '가설 게이트', type: 'fixed', status: 'online', hasSpeaker: true, lat: 37.6428, lng: 126.6238, zone: '브라운스톤 월곡센트럴' },
  { id: 'CAM-12', name: '경계 펜스 남측', type: 'fixed', status: 'online', hasSpeaker: false, lat: 37.6412, lng: 126.6262, zone: '브라운스톤 월곡센트럴' },
];

export const CCTV_TYPE_LABEL = {
  rotating: '회전형(PTZ)',
  fixed: '고정형',
};
