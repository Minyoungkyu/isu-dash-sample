import { useState } from 'react';
import { Layers, Map as MapIcon, Satellite } from 'lucide-react';
import { SITE } from '@/lib/mock/site';
import { useUIStore } from '@/stores/useUIStore';
import MapLegend from './MapLegend';
import ZoneSwitcher from './ZoneSwitcher';

/**
 * MapPanel — 지도 "프레임/크롬"만 담당 (실제 지도는 MapLayer 가 스케일 밖에서 렌더).
 *  - #map-slot: 지도가 겹쳐질 투명 자리표시자 (MapLayer 가 추적)
 *  - 타이틀 / 구역 스위처 / 범례 / 베이스맵 셀렉터(hover) 는 여기서 스케일과 함께 표시
 */
const BASEMAPS = [
  { key: 'base', label: '지도', icon: MapIcon },
  { key: 'satellite', label: '위성', icon: Satellite },
  { key: 'hybrid', label: '하이브리드', icon: Layers },
];

function BasemapControl() {
  const basemap = useUIStore((s) => s.basemap);
  const setBasemap = useUIStore((s) => s.setBasemap);
  const [hovered, setHovered] = useState(false);
  const cur = BASEMAPS.find((b) => b.key === basemap) ?? BASEMAPS[2];
  const CurIcon = cur.icon;

  return (
    <div
      className="absolute z-[500]"
      style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <div className="flex items-center panel fade-in" style={{ gap: 4, padding: 6, borderRadius: 12 }}>
          {BASEMAPS.map((b) => {
            const Icon = b.icon;
            const on = basemap === b.key;
            return (
              <button
                key={b.key}
                onClick={() => setBasemap(b.key)}
                className="flex items-center font-black transition-all"
                style={{ gap: 8, padding: '10px 20px', borderRadius: 9, cursor: 'pointer', fontSize: 16, background: on ? '#38bdf8' : 'transparent', color: on ? '#04121a' : '#cbd5e1' }}
              >
                <Icon style={{ width: 19, height: 19 }} />
                {b.label}
              </button>
            );
          })}
        </div>
      ) : (
        // 평소엔 작은 핸들만 (hover 시 셀렉터 노출)
        <div
          className="flex items-center panel"
          style={{ gap: 8, padding: '9px 16px', borderRadius: 999, opacity: 0.6, cursor: 'pointer' }}
        >
          <CurIcon style={{ width: 18, height: 18, color: '#38bdf8' }} />
          <span className="font-bold text-slate-200" style={{ fontSize: 14 }}>{cur.label}</span>
        </div>
      )}
    </div>
  );
}

export default function MapPanel() {
  return (
    <div
      className="relative h-full w-full"
      style={{ borderRadius: 22, border: '1px solid var(--line-cyan)', pointerEvents: 'none' }}
    >
      {/* 지도 자리표시자 (투명) — MapLayer 가 추적 */}
      <div id="map-slot" style={{ position: 'absolute', inset: 0, borderRadius: 22 }} />

      {/* 타이틀 */}
      <div className="absolute z-[500] flex items-center" style={{ top: 20, left: 24, gap: 12, pointerEvents: 'auto' }}>
        <div className="flex items-center panel" style={{ gap: 12, padding: '12px 20px', borderRadius: 14 }}>
          <span className="font-black text-cyan-300" style={{ fontSize: 22, letterSpacing: '0.02em' }}>현장 관제 지도</span>
          <span className="text-slate-400 font-bold" style={{ fontSize: 15 }}>{SITE.name}</span>
        </div>
      </div>

      <ZoneSwitcher />
      <BasemapControl />
      <MapLegend />
    </div>
  );
}
