/**
 * 날씨 목업 데이터 — 샘플 대시보드 /api/weather 응답 shape 를 그대로 이식.
 * (WeatherPanel / FeelsLikeModal 의 로직·계산식 재사용을 위해 필드 구조 유지)
 *
 * 그룹: current / forecast / rainHourly / trafficLight
 * 오늘(2026-08-21) 기준 → 여름철(summer) 척도.
 */
export const WEATHER = {
  current: {
    taC: 31.4, // 기온
    feelsLikeC: 33.6, // 체감온도
    humidityPct: 68, // 습도
    pm10: { value: 42, grade: 2, label: '보통' },
    pm25: { value: 28, grade: 2, label: '보통' },
    wind: { directionLabel: '남서', speedMs: 3.2, strength: 'mid' }, // strength: low|mid|high
    waveM: 0.6,
    waveStrength: 'low',
  },
  forecast: {
    days: [
      { label: '오늘', icon: 'sun', tMax: 33, tMin: 25, isToday: true },
      { label: '금', icon: 'cloud-sun', tMax: 32, tMin: 24, isToday: false },
      { label: '토', icon: 'cloud-rain', tMax: 28, tMin: 23, isToday: false },
      { label: '일', icon: 'cloud-rain', tMax: 27, tMin: 22, isToday: false },
      { label: '월', icon: 'cloud', tMax: 30, tMin: 23, isToday: false },
      { label: '화', icon: 'sun', tMax: 32, tMin: 24, isToday: false },
    ],
  },
  // 시간별 강수확률(POP %)
  rainHourly: [
    { hour: 15, popPct: 10 },
    { hour: 16, popPct: 20 },
    { hour: 17, popPct: 30 },
    { hour: 18, popPct: 60 },
    { hour: 19, popPct: 80 },
    { hour: 20, popPct: 70 },
    { hour: 21, popPct: 40 },
    { hour: 22, popPct: 20 },
  ],
  // 체감온도 신호등 (4단계)
  trafficLight: {
    level: 'orange', // green|yellow|orange|red
    label: '경고',
    emoji: '😰',
    color: '#f97316',
    season: 'summer', // summer|winter|mild
    thresholds: {
      warn: 31,
      alert: 33,
      danger: 35,
      winter_warn: -3.2,
      winter_alert: -10.5,
      winter_danger: -15.4,
    },
  },
};

// 샘플의 useWeather() 훅 대체 — 목업이라 정적 객체를 그대로 반환.
export function useWeather() {
  return WEATHER;
}
