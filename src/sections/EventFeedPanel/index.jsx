import { Radio, Siren, Activity, DoorOpen, Wrench, Video, ClipboardCheck, CloudSun } from 'lucide-react';
import { EVENTS } from '@/lib/mock/events';

/**
 * EventFeedPanel — 실시간 이벤트/알림 피드 (출입·SOS·센서·장비·CCTV 타임라인).
 */
const EVENT_ICONS = { sos: Siren, sensor: Activity, access: DoorOpen, equip: Wrench, cctv: Video, tbm: ClipboardCheck, env: CloudSun };
const LEVEL = {
  danger: { color: '#ff3b5c', bg: 'rgba(255,59,92,0.1)' },
  warn: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  info: { color: '#38bdf8', bg: 'rgba(56,189,248,0.06)' },
};

export default function EventFeedPanel() {
  return (
    <div className="flex flex-col h-full panel" style={{ padding: 24, gap: 16 }}>
      <div className="flex items-center" style={{ gap: 12 }}>
        <Radio style={{ width: 28, height: 28, color: '#38bdf8' }} />
        <span className="font-black text-cyan-300" style={{ fontSize: 24 }}>실시간 이벤트</span>
        <span className="ml-auto flex items-center text-emerald-400 font-bold" style={{ gap: 6, fontSize: 14 }}>
          <span className="live-blink" style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e' }} /> LIVE
        </span>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto thin-scroll flex flex-col" style={{ gap: 8 }}>
        {EVENTS.map((e) => {
          const Icon = EVENT_ICONS[e.kind] ?? Activity;
          const lv = LEVEL[e.level] ?? LEVEL.info;
          return (
            <div key={e.id} className="flex items-start" style={{ gap: 12, padding: '13px 15px', borderRadius: 12, background: lv.bg, borderLeft: `4px solid ${lv.color}` }}>
              <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 9, background: `${lv.color}22`, flex: '0 0 auto', marginTop: 1 }}>
                <Icon className={e.level === 'danger' ? 'live-blink' : ''} style={{ width: 19, height: 19, color: lv.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center" style={{ gap: 8 }}>
                  <span className="font-mono font-bold text-slate-400" style={{ fontSize: 14 }}>{e.time}</span>
                  <span className="font-black" style={{ fontSize: 12, color: lv.color, background: `${lv.color}22`, padding: '2px 8px', borderRadius: 6 }}>{e.zone}</span>
                </div>
                <div className="text-white font-bold" style={{ fontSize: 16, marginTop: 3, lineHeight: 1.35 }}>{e.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
