import { useEffect } from 'react';
import { X, Phone, MapPin, User, Wrench, Activity } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { EQUIP_KIND_LABEL, EQUIP_STATUS } from '@/lib/mock/equipment';
import TtsComposer from '@/components/TtsComposer';

/**
 * EquipPopup (#7) — 중장비 핀 클릭 시 팝업.
 *  - 장비 정보 + 운전자
 *  - 통화 버튼 (목업: 토스트 피드백만)
 *  - 타자 입력 → TTS 음성 전송 (장비 운전실 스피커, 목업)
 */
function InfoRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      <Icon style={{ width: 20, height: 20, color: color ?? '#94a3b8' }} />
      <span className="text-slate-400 font-bold" style={{ fontSize: 15, width: 70 }}>
        {label}
      </span>
      <span className="text-white font-bold" style={{ fontSize: 17 }}>
        {value}
      </span>
    </div>
  );
}

export default function EquipPopup({ inCell = false, eq: eqProp, onClose }) {
  const selectedEquip = useUIStore((s) => s.selectedEquip);
  const closeEquip = useUIStore((s) => s.closeEquip);
  const pushToast = useUIStore((s) => s.pushToast);
  const splitView = useUIStore((s) => s.splitView);

  const eq = eqProp ?? selectedEquip;
  const close = onClose ?? closeEquip;

  useEffect(() => {
    if (!eq) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [eq, close]);

  if (!eq) return null;
  if (!inCell && splitView) return null; // 4분할 시 스테이지 팝업 숨김(SplitView 가 칸 안에 렌더)

  const st = EQUIP_STATUS[eq.status] ?? EQUIP_STATUS.idle;

  const call = () => pushToast(`${eq.name} 운전자와 통화 연결 중…`, 'info');

  return (
    <>
      <div className="absolute inset-0 fade-in" style={{ background: 'rgba(0,0,0,0.55)', zIndex: 6000 }} onClick={close} />
      <div
        className="absolute pop-in flex flex-col"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: inCell ? '92%' : 760,
          maxWidth: 760,
          maxHeight: inCell ? '92%' : undefined,
          overflowY: inCell ? 'auto' : undefined,
          zIndex: 6100,
          background: 'rgba(6,12,22,0.98)',
          border: '1px solid rgba(245,158,11,0.45)',
          borderRadius: 20,
          boxShadow: '0 0 60px rgba(245,158,11,0.22), 0 30px 80px rgba(0,0,0,0.75)',
          padding: inCell ? 16 : 28,
          gap: inCell ? 12 : 20,
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center" style={{ gap: 14 }}>
          <span
            className="flex items-center justify-center"
            style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)' }}
          >
            <Wrench style={{ width: 26, height: 26, color: '#f59e0b' }} />
          </span>
          <div className="flex flex-col">
            <span className="font-black text-white" style={{ fontSize: 24 }}>
              {eq.name}
            </span>
            <span className="text-amber-400 font-bold" style={{ fontSize: 15 }}>
              {EQUIP_KIND_LABEL[eq.kind]} · {eq.id}
            </span>
          </div>
          <span
            className="ml-auto font-black"
            style={{ fontSize: 16, color: st.color, background: `${st.color}22`, border: `1.5px solid ${st.color}`, padding: '6px 16px', borderRadius: 999 }}
          >
            {st.label}
          </span>
          <button
            onClick={close}
            className="flex items-center justify-center bg-white/10 hover:bg-rose-500/85 text-white transition-colors"
            style={{ width: 40, height: 40, borderRadius: 10, marginLeft: 8 }}
          >
            <X style={{ width: 22, height: 22 }} />
          </button>
        </div>

        {/* 정보 */}
        <div
          className="flex flex-col"
          style={{ gap: 14, padding: '18px 20px', borderRadius: 14, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(148,163,184,0.15)' }}
        >
          <InfoRow icon={User} label="운전자" value={`${eq.operator} (${eq.phone})`} color="#38bdf8" />
          <InfoRow icon={Activity} label="작업내용" value={eq.task} color="#22c55e" />
          <InfoRow icon={MapPin} label="위치" value={eq.zone} color="#f59e0b" />
        </div>

        {/* 통화 */}
        <button
          onClick={call}
          className="flex items-center justify-center font-black text-white transition-all"
          style={{
            gap: 12,
            padding: '16px',
            borderRadius: 14,
            fontSize: 19,
            background: 'linear-gradient(180deg, #22c55e, #16a34a)',
            boxShadow: '0 6px 20px rgba(34,197,94,0.4)',
          }}
        >
          <Phone style={{ width: 22, height: 22 }} />
          운전자와 통화
        </button>

        {/* 구분선 */}
        <div style={{ height: 1, background: 'rgba(148,163,184,0.18)' }} />

        {/* 타자 → TTS 전송 */}
        <TtsComposer
          targetLabel={`${eq.name} 운전실`}
          accent="#f59e0b"
          presets={['안전거리를 확보하세요.', '작업을 잠시 중단해 주세요.', '후방에 작업자가 있습니다. 주의하세요.']}
        />
      </div>
    </>
  );
}
