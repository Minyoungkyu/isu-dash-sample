import { CCTV_LIST } from '@/lib/mock/cctv';
import { EQUIP_LIST } from '@/lib/mock/equipment';

/**
 * MapLegend — 지도 좌하단 범례. 핀 형태/색이 무엇을 뜻하는지 안내.
 */
function Swatch({ shape, color, children }) {
  const radius = shape === 'circle' ? '50%' : shape === 'diamond' ? '5px' : '5px';
  const rotate = shape === 'diamond' ? 'rotate(45deg)' : 'none';
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: radius,
          transform: rotate,
          background: `linear-gradient(160deg, ${color}, ${color}cc)`,
          border: '2px solid rgba(255,255,255,0.85)',
          boxShadow: `0 0 8px ${color}77`,
          flex: '0 0 auto',
        }}
      />
      <span className="text-slate-200 font-bold" style={{ fontSize: 15 }}>
        {children}
      </span>
    </div>
  );
}

export default function MapLegend() {
  const cctvOnline = CCTV_LIST.filter((c) => c.status === 'online').length;
  const equipRunning = EQUIP_LIST.filter((e) => e.status === 'running').length;

  return (
    <div
      className="absolute z-[500] panel"
      style={{ left: 24, bottom: 24, padding: '18px 22px', borderRadius: 16, minWidth: 260 }}
    >
      <div className="text-cyan-300 font-black" style={{ fontSize: 16, marginBottom: 14 }}>
        범례
      </div>
      <div className="flex flex-col" style={{ gap: 11 }}>
        <Swatch shape="circle" color="#22d3ee">
          CCTV 회전형(PTZ)
        </Swatch>
        <Swatch shape="square" color="#22d3ee">
          CCTV 고정형
        </Swatch>
        <Swatch shape="square" color="#64748b">
          CCTV 오프라인
        </Swatch>
        <div style={{ height: 1, background: 'rgba(148,163,184,0.2)', margin: '3px 0' }} />
        <Swatch shape="diamond" color="#cbd5e1">
          중장비
        </Swatch>
      </div>
      <div
        className="text-slate-400 font-bold"
        style={{ fontSize: 13, marginTop: 14, lineHeight: 1.5 }}
      >
        CCTV {CCTV_LIST.length}대 (가동 {cctvOnline}) · 중장비 {EQUIP_LIST.length}대 (운행 {equipRunning})
        <br />
        핀을 클릭하면 상세 팝업이 열립니다.
      </div>
    </div>
  );
}
