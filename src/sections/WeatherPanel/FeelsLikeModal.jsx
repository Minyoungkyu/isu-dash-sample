import { useEffect } from 'react';
import { Thermometer, X, Calculator, ListChecks, ShieldAlert, Wind, Droplets } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { useWeather } from '@/lib/mock/weather';

/**
 * FeelsLikeModal (#8) — 체감온도계 상세.
 * 샘플의 계산식/4단계 임계/안전수칙 로직·내용을 그대로 유지하고 UI만 새로 디자인.
 *  ① 현재 상태(체감온도 + 입력값)  ② 계산식(여름/겨울/간절기)
 *  ③ 4단계 임계 기준(적용 척도)     ④ 단계별 현장 안전수칙
 */
const SEASON_LABEL = {
  summer: '여름철 · 폭염 기준',
  winter: '겨울철 · 한파 기준',
  mild: '간절기 · 실제 기온',
};
const SUMMER_STEPS = [
  { level: 'green', emoji: '😊', label: '관심', color: '#22c55e' },
  { level: 'yellow', emoji: '😓', label: '주의', color: '#eab308' },
  { level: 'orange', emoji: '😰', label: '경고', color: '#f97316' },
  { level: 'red', emoji: '🥵', label: '위험', color: '#ef4444' },
];
const WINTER_STEPS = [
  { level: 'green', emoji: '😊', label: '관심', color: '#22c55e' },
  { level: 'yellow', emoji: '😣', label: '주의', color: '#eab308' },
  { level: 'orange', emoji: '😨', label: '경고', color: '#f97316' },
  { level: 'red', emoji: '🥶', label: '위험', color: '#ef4444' },
];
const f1 = (v) => (v == null ? '–' : Number(v).toFixed(1).replace(/\.0$/, ''));

function summerRanges(t) {
  const w = t?.warn ?? 31, a = t?.alert ?? 33, d = t?.danger ?? 35;
  return [`${f1(w)}℃ 미만`, `${f1(w)} ~ ${f1(a)}℃`, `${f1(a)} ~ ${f1(d)}℃`, `${f1(d)}℃ 이상`];
}
function winterRanges(t) {
  const w = t?.winter_warn ?? -3.2, a = t?.winter_alert ?? -10.5, d = t?.winter_danger ?? -15.4;
  return [`${f1(w)}℃ 이상`, `${f1(a)} ~ ${f1(w)}℃`, `${f1(d)} ~ ${f1(a)}℃`, `${f1(d)}℃ 미만`];
}

const SUMMER_GUIDE = [
  '평상 작업. 수분 수시 섭취·충분한 휴식.',
  '시간당 10분 이상 그늘 휴식, 물 자주 마시기.',
  '매시간 15분 휴식, 14~17시 옥외작업 자제, 2인 1조 상호관찰.',
  '옥외작업 원칙적 중지(불가피 시 단시간), 응급대응체계 점검.',
];
const WINTER_GUIDE = [
  '평상 작업. 방한복·장갑 착용.',
  '따뜻한 물 섭취, 작업 전 준비운동.',
  '매시간 온열 휴식, 노출 부위 보호, 미끄럼 주의.',
  '작업 단축·중지 검토, 동상·저체온 주의, 2인 1조.',
];

const FORMULAS = [
  {
    key: 'summer', tag: '여름철 (5~9월)',
    desc: '기온 + 습도 → 습구온도(Tw) 기반 기상청 여름철 체감온도식. 습할수록 체감온도 ↑.',
    formula: '체감 = −0.2442 + 0.55399·Tw + 0.45535·Ta − 0.0022·Tw² + 0.00278·Tw·Ta + 3.0',
    note: 'Tw(습구온도)는 기온(Ta)·습도(RH)로 Stull 근사식을 통해 산출.',
  },
  {
    key: 'winter', tag: '겨울철 (11~3월)',
    desc: '기온 + 풍속 → 바람냉각지수(JAG/TI). 바람이 강할수록 체감온도 ↓.',
    formula: '체감 = 13.12 + 0.6215·T − 11.37·V^0.16 + 0.3965·T·V^0.16  (V: 풍속 km/h)',
    note: '적용범위: 기온 ≤ 10℃ 그리고 풍속 ≥ 1.3 m/s. 벗어나면 실제 기온 사용.',
  },
  {
    key: 'mild', tag: '간절기 (4·10월)',
    desc: '공식 적용범위 밖 → 실제 기온을 그대로 사용(폭염 기준으로 단계 판정).',
    formula: '체감 = 실제 기온',
    note: null,
  },
];

function Card({ title, icon, children, style }) {
  return (
    <div
      className="flex flex-col"
      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: 22, ...style }}
    >
      {title && (
        <div className="flex items-center text-cyan-300 font-black" style={{ gap: 10, fontSize: 20, marginBottom: 16 }}>
          {icon}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export default function FeelsLikeModal() {
  const open = useUIStore((s) => s.feelsLikeOpen);
  const close = useUIStore((s) => s.closeFeelsLike);
  const data = useWeather();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  const current = data?.current ?? {};
  const tl = data?.trafficLight ?? {};
  const season = tl.season === 'winter' ? 'winter' : tl.season === 'mild' ? 'mild' : 'summer';
  const thresholds = tl.thresholds ?? {};
  const activeScale = season === 'winter' ? 'winter' : 'summer';
  const steps = activeScale === 'winter' ? WINTER_STEPS : SUMMER_STEPS;
  const ranges = activeScale === 'winter' ? winterRanges(thresholds) : summerRanges(thresholds);
  const guide = activeScale === 'winter' ? WINTER_GUIDE : SUMMER_GUIDE;
  const scaleColor = season === 'winter' ? '#60a5fa' : season === 'mild' ? '#94a3b8' : '#fb923c';

  return (
    <>
      <div className="absolute inset-0 fade-in" style={{ background: 'rgba(0,0,0,0.65)', zIndex: 6400 }} onClick={close} />
      <div
        className="absolute pop-in flex flex-col"
        style={{
          left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 2000, maxHeight: 1500,
          zIndex: 6500,
          background: 'rgba(4,10,20,0.99)',
          border: '1px solid rgba(56,189,248,0.5)',
          borderRadius: 22,
          boxShadow: '0 0 80px rgba(0,174,239,0.35), 0 30px 90px rgba(0,0,0,0.8)',
          padding: '28px 34px 32px',
          gap: 22,
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center border-b border-white/10" style={{ gap: 14, paddingBottom: 18 }}>
          <Thermometer style={{ width: 32, height: 32, color: '#38bdf8' }} />
          <span className="font-black text-cyan-300 flex-1" style={{ fontSize: 30 }}>
            체감온도계 상세
          </span>
          <span
            className="font-black self-start"
            style={{ fontSize: 17, color: scaleColor, background: `${scaleColor}22`, border: `1.5px solid ${scaleColor}`, padding: '8px 18px', borderRadius: 999 }}
          >
            적용 척도 · {SEASON_LABEL[season]}
          </span>
          <button
            onClick={close}
            className="flex items-center justify-center bg-white/10 hover:bg-rose-500/85 text-white transition-colors"
            style={{ width: 44, height: 44, borderRadius: 12, marginLeft: 8 }}
          >
            <X style={{ width: 24, height: 24 }} />
          </button>
        </div>

        {/* 본문 2열 */}
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* 좌: 현재 상태 + 계산식 */}
          <div className="flex flex-col" style={{ gap: 22 }}>
            {/* 현재 상태 */}
            <Card>
              <div className="flex items-center" style={{ gap: 30 }}>
                <div className="flex flex-col items-center" style={{ minWidth: 220 }}>
                  <span className="text-slate-400 font-bold" style={{ fontSize: 16 }}>
                    현재 체감온도
                  </span>
                  <span className="font-black" style={{ fontSize: 78, lineHeight: 1.05, color: tl.color || '#fff' }}>
                    {f1(current.feelsLikeC)}
                    <span style={{ fontSize: 34 }}>℃</span>
                  </span>
                  <div className="flex items-center" style={{ gap: 10, marginTop: 6 }}>
                    <span style={{ fontSize: 36 }}>{tl.emoji}</span>
                    <span className="font-black" style={{ fontSize: 26, color: tl.color || '#fff' }}>
                      {tl.label}
                    </span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3" style={{ gap: 12 }}>
                  <InputChip icon={Thermometer} label="기온" value={`${f1(current.taC)}℃`} />
                  <InputChip icon={Droplets} label="습도" value={`${current.humidityPct ?? '–'}%`} />
                  <InputChip icon={Wind} label="풍속" value={`${current.wind?.speedMs != null ? current.wind.speedMs.toFixed(1) : '–'}`} unit="m/s" />
                </div>
              </div>
            </Card>

            {/* 계산식 */}
            <Card title="체감온도 계산식" icon={<Calculator style={{ width: 20, height: 20 }} />}>
              <div className="text-slate-300" style={{ fontSize: 16, marginBottom: 14, lineHeight: 1.5 }}>
                실제 기온에 <b className="text-cyan-200">습도·바람</b>을 반영해 사람이 실제로 느끼는 온도. <b className="text-cyan-200">월 기준</b>으로 여름/겨울 공식이 자동 전환됩니다.
              </div>
              <div className="flex flex-col" style={{ gap: 10 }}>
                {FORMULAS.map((r) => {
                  const active = season === r.key;
                  return (
                    <div
                      key={r.key}
                      style={{
                        borderRadius: 12, padding: '14px 16px',
                        background: active ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.03)',
                        border: active ? '1.5px solid rgba(56,189,248,0.6)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <div className="flex items-center" style={{ gap: 10, marginBottom: 6 }}>
                        <span className="font-black" style={{ fontSize: 17, color: active ? '#7dd3fc' : '#cbd5e1' }}>
                          {r.tag}
                        </span>
                        {active && (
                          <span className="font-black" style={{ fontSize: 13, color: '#0b1220', background: '#38bdf8', padding: '3px 10px', borderRadius: 999 }}>
                            현재 적용
                          </span>
                        )}
                      </div>
                      <div className="text-slate-300" style={{ fontSize: 15, lineHeight: 1.45, marginBottom: 8 }}>
                        {r.desc}
                      </div>
                      <div className="text-slate-200 font-mono" style={{ fontSize: 14.5, background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '10px 12px', wordBreak: 'break-word' }}>
                        {r.formula}
                      </div>
                      {r.note && (
                        <div className="text-slate-400" style={{ fontSize: 14, lineHeight: 1.4, marginTop: 8 }}>
                          · {r.note}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* 우: 임계표 + 안전수칙 */}
          <div className="flex flex-col" style={{ gap: 22 }}>
            {/* 4단계 임계 기준 */}
            <Card title="4단계 임계 기준" icon={<ListChecks style={{ width: 20, height: 20 }} />}>
              <div className="text-slate-500 font-bold" style={{ fontSize: 14, marginBottom: 12 }}>
                관리자 설정값(체감온도 기준) · 현재 적용 척도 기준 표기
              </div>
              <div className="flex flex-col" style={{ gap: 8 }}>
                {steps.map((s, i) => {
                  const on = s.level === tl.level;
                  return (
                    <div
                      key={s.level}
                      className="flex items-center"
                      style={{
                        gap: 16, padding: '14px 16px', borderRadius: 12,
                        background: on ? `${s.color}22` : 'rgba(255,255,255,0.03)',
                        border: on ? `1.5px solid ${s.color}` : '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <span style={{ fontSize: 28, width: 38, textAlign: 'center' }}>{s.emoji}</span>
                      <span className="font-black" style={{ fontSize: 18, color: s.color, width: 60 }}>
                        {s.label}
                      </span>
                      <span className="text-slate-200 font-mono" style={{ fontSize: 16 }}>
                        {ranges[i]}
                      </span>
                      {on && (
                        <span className="ml-auto font-black" style={{ fontSize: 14, color: s.color }}>
                          ● 현재
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 안전수칙 */}
            <Card title="단계별 현장 안전수칙" icon={<ShieldAlert style={{ width: 20, height: 20 }} />}>
              <div className="text-slate-500 font-bold" style={{ fontSize: 14, marginBottom: 12 }}>
                {activeScale === 'winter' ? '한파' : '폭염'} 단계별 권고 조치 · 현재 단계 강조
              </div>
              <div className="flex flex-col" style={{ gap: 9 }}>
                {steps.map((s, i) => {
                  const on = s.level === tl.level;
                  return (
                    <div
                      key={s.level}
                      className="flex items-start"
                      style={{
                        gap: 12, padding: '12px 14px', borderRadius: 11,
                        background: on ? `${s.color}1f` : 'rgba(255,255,255,0.03)',
                        border: on ? `1.5px solid ${s.color}` : '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <span style={{ fontSize: 22, marginTop: 1 }}>{s.emoji}</span>
                      <span className="font-black shrink-0" style={{ fontSize: 16, color: s.color, width: 48 }}>
                        {s.label}
                      </span>
                      <span className="text-slate-200" style={{ fontSize: 15.5, lineHeight: 1.45 }}>
                        {guide[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        <div className="text-right text-slate-500 font-bold" style={{ fontSize: 14 }}>
          제공기관: 기상청 · 체감온도는 월 기준 여름/겨울 공식 자동 적용 (목업)
        </div>
      </div>
    </>
  );
}

function InputChip({ icon: Icon, label, value, unit }) {
  return (
    <div className="flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 8px', gap: 6 }}>
      <Icon style={{ width: 22, height: 22, color: '#38bdf8' }} />
      <span className="text-slate-400 font-bold" style={{ fontSize: 14 }}>
        {label}
      </span>
      <span className="text-white font-black font-mono" style={{ fontSize: 24 }}>
        {value}
        {unit && <span style={{ fontSize: 14, marginLeft: 2 }}>{unit}</span>}
      </span>
    </div>
  );
}
