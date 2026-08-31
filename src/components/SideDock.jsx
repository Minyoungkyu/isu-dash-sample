import { useEffect, useRef } from 'react';
import { CloudSun, Watch, ChevronRight } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { useWeather } from '@/lib/mock/weather';
import { WORKERS } from '@/lib/mock/smartband';
import WeatherPanel from '@/sections/WeatherPanel';
import SmartBandPanel from '@/sections/SmartBandPanel';

/**
 * SideDock (#1) — 우측 엣지 탭 + 접이식 드로어.
 * 스마트밴드/기상 패널은 기본 접힘. 탭 클릭 시 슬라이드로 펼쳐진다.
 * 탭 자체에 요약(현재기온 / SOS·위험 인원)을 표시해 접힌 상태에서도 한눈에.
 */
const RAIL_W = 76;
const DRAWER_W = 1000;
const GAP = 14;

function Tab({ active, onClick, icon: Icon, label, badge, badgeColor, accent }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center transition-all"
      style={{
        width: RAIL_W,
        gap: 12,
        padding: '22px 0',
        borderRadius: '14px 0 0 14px',
        background: active ? accent : 'rgba(10,20,34,0.92)',
        border: `1px solid ${active ? accent : 'rgba(56,189,248,0.35)'}`,
        borderRight: 'none',
        boxShadow: active ? `-6px 0 24px ${accent}66` : '-6px 0 20px rgba(0,0,0,0.4)',
        color: active ? '#04121a' : '#e2e8f0',
        cursor: 'pointer',
      }}
    >
      <Icon style={{ width: 30, height: 30 }} />
      <span
        className="font-black"
        style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontSize: 20, letterSpacing: '0.15em' }}
      >
        {label}
      </span>
      {badge != null && (
        <span
          className="font-black"
          style={{
            fontSize: 15,
            minWidth: 30,
            textAlign: 'center',
            padding: '3px 6px',
            borderRadius: 8,
            background: active ? 'rgba(4,18,26,0.25)' : `${badgeColor}22`,
            color: active ? '#04121a' : badgeColor,
            border: active ? 'none' : `1px solid ${badgeColor}66`,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function SideDock() {
  const dock = useUIStore((s) => s.dock);
  const toggleDock = useUIStore((s) => s.toggleDock);
  const closeDock = useUIStore((s) => s.closeDock);
  const weather = useWeather();

  const open = dock !== null;
  const tl = weather?.trafficLight ?? {};
  const alertCount = WORKERS.filter((w) => w.status === 'sos' || w.status === 'danger').length;
  const rootRef = useRef(null);

  // 바깥 클릭 시 닫기 (capture 단계 → 마커 stopPropagation 에도 동작)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) closeDock();
    };
    const id = setTimeout(() => document.addEventListener('mousedown', onDown, true), 0);
    return () => { clearTimeout(id); document.removeEventListener('mousedown', onDown, true); };
  }, [open, closeDock]);

  return (
    <div
      ref={rootRef}
      className="absolute flex"
      style={{
        top: 184,
        bottom: 24,
        right: 24,
        transform: open ? 'translateX(0)' : `translateX(${DRAWER_W + GAP}px)`,
        transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        zIndex: 4000,
        gap: GAP,
        pointerEvents: 'auto',
      }}
    >
      {/* 탭 레일 */}
      <div className="flex flex-col justify-center" style={{ gap: 16 }}>
        <Tab
          active={dock === 'weather'}
          onClick={() => toggleDock('weather')}
          icon={CloudSun}
          label="기상"
          badge={`${weather?.current?.taC ?? '--'}°`}
          badgeColor={tl.color || '#38bdf8'}
          accent="#38bdf8"
        />
        <Tab
          active={dock === 'smartband'}
          onClick={() => toggleDock('smartband')}
          icon={Watch}
          label="밴드"
          badge={alertCount > 0 ? `⚠${alertCount}` : '정상'}
          badgeColor={alertCount > 0 ? '#ff3b5c' : '#22c55e'}
          accent="#38bdf8"
        />
      </div>

      {/* 드로어 */}
      <div className="relative" style={{ width: DRAWER_W, height: '100%' }}>
        {/* 닫기 버튼 */}
        {open && (
          <button
            onClick={closeDock}
            title="접기"
            className="absolute flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            style={{ top: 20, right: 20, width: 40, height: 40, borderRadius: 10, zIndex: 10 }}
          >
            <ChevronRight style={{ width: 24, height: 24 }} />
          </button>
        )}
        <div style={{ height: '100%', display: dock === 'weather' ? 'block' : 'none' }}>
          <WeatherPanel />
        </div>
        <div style={{ height: '100%', display: dock === 'smartband' ? 'block' : 'none' }}>
          <SmartBandPanel />
        </div>
      </div>
    </div>
  );
}
