import { useEffect, useRef } from 'react';
import { LayoutGrid, Radio, ChevronLeft } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { ZONES } from '@/lib/mock/zones';
import { EVENTS } from '@/lib/mock/events';
import ZoneSummaryPanel from '@/sections/ZoneSummaryPanel';
import EventFeedPanel from '@/sections/EventFeedPanel';

/**
 * LeftDock — 좌측 엣지 탭 + 접이식 드로어 (공사구역현황 / 실시간이벤트).
 * SideDock(우측)의 좌우 대칭 버전. 기본 접힘, 탭 클릭 시 왼쪽에서 슬라이드.
 */
const RAIL_W = 76;
const DRAWER_W = 920;
const GAP = 14;

function Tab({ active, onClick, icon: Icon, label, badge, badgeColor }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center transition-all"
      style={{
        width: RAIL_W, gap: 12, padding: '22px 0',
        borderRadius: '0 14px 14px 0',
        background: active ? '#38bdf8' : 'rgba(10,20,34,0.92)',
        border: `1px solid ${active ? '#38bdf8' : 'rgba(56,189,248,0.35)'}`,
        borderLeft: 'none',
        boxShadow: active ? '6px 0 24px rgba(56,189,248,0.4)' : '6px 0 20px rgba(0,0,0,0.4)',
        color: active ? '#04121a' : '#e2e8f0', cursor: 'pointer',
      }}
    >
      <Icon style={{ width: 30, height: 30 }} />
      <span className="font-black" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontSize: 20, letterSpacing: '0.15em' }}>{label}</span>
      {badge != null && (
        <span className="font-black" style={{ fontSize: 15, minWidth: 30, textAlign: 'center', padding: '3px 6px', borderRadius: 8, background: active ? 'rgba(4,18,26,0.25)' : `${badgeColor}22`, color: active ? '#04121a' : badgeColor, border: active ? 'none' : `1px solid ${badgeColor}66` }}>
          {badge}
        </span>
      )}
    </button>
  );
}

export default function LeftDock() {
  const leftDock = useUIStore((s) => s.leftDock);
  const toggle = useUIStore((s) => s.toggleLeftDock);
  const close = useUIStore((s) => s.closeLeftDock);
  const open = leftDock !== null;
  const rootRef = useRef(null);

  // 바깥 클릭 시 닫기 (capture 단계 → 마커 stopPropagation 에도 동작)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    const id = setTimeout(() => document.addEventListener('mousedown', onDown, true), 0);
    return () => { clearTimeout(id); document.removeEventListener('mousedown', onDown, true); };
  }, [open, close]);

  const dangerEvents = EVENTS.filter((e) => e.level === 'danger').length;

  return (
    <div
      ref={rootRef}
      className="absolute flex"
      style={{
        top: 184, bottom: 24, left: 24,
        transform: open ? 'translateX(0)' : `translateX(-${DRAWER_W + GAP}px)`,
        transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        zIndex: 4000, gap: GAP, pointerEvents: 'auto',
      }}
    >
      {/* 드로어 */}
      <div className="relative" style={{ width: DRAWER_W, height: '100%' }}>
        {open && (
          <button
            onClick={close}
            title="접기"
            className="absolute flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            style={{ top: 20, right: 20, width: 40, height: 40, borderRadius: 10, zIndex: 10 }}
          >
            <ChevronLeft style={{ width: 24, height: 24 }} />
          </button>
        )}
        <div style={{ height: '100%', display: leftDock === 'zones' ? 'block' : 'none' }}>
          <ZoneSummaryPanel />
        </div>
        <div style={{ height: '100%', display: leftDock === 'events' ? 'block' : 'none' }}>
          <EventFeedPanel />
        </div>
      </div>

      {/* 탭 레일 */}
      <div className="flex flex-col justify-center" style={{ gap: 16 }}>
        <Tab active={leftDock === 'zones'} onClick={() => toggle('zones')} icon={LayoutGrid} label="구역" badge={`${ZONES.length}`} badgeColor="#38bdf8" />
        <Tab active={leftDock === 'events'} onClick={() => toggle('events')} icon={Radio} label="이벤트" badge={dangerEvents > 0 ? `⚠${dangerEvents}` : '정상'} badgeColor={dangerEvents > 0 ? '#ff3b5c' : '#22c55e'} />
      </div>
    </div>
  );
}
