import { useEffect } from 'react';
import { Siren, Phone, Check, Droplet, Thermometer, MapPin, Watch } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';

/**
 * SosAlertPopup (#6) — 스마트밴드 SOS 신호 수신 시 즉시 뜨는 경보 팝업.
 * (목업: 헤더의 "SOS 발생" 버튼 또는 표의 SOS 근로자 클릭으로 시연)
 */
function Vital({ icon: Icon, label, value, unit, color }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ padding: '18px 10px', borderRadius: 14, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', gap: 8 }}
    >
      <Icon style={{ width: 26, height: 26, color }} />
      <span className="text-slate-400 font-bold" style={{ fontSize: 14 }}>
        {label}
      </span>
      <span className="font-black text-white" style={{ fontSize: 30, lineHeight: 1 }}>
        {value}
        {unit && <span style={{ fontSize: 16, marginLeft: 3 }}>{unit}</span>}
      </span>
    </div>
  );
}

export default function SosAlertPopup() {
  const w = useUIStore((s) => s.sosWorker);
  const close = useUIStore((s) => s.closeSos);
  const pushToast = useUIStore((s) => s.pushToast);

  useEffect(() => {
    if (!w) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [w, close]);

  if (!w) return null;

  const ack = () => {
    pushToast(`${w.name} SOS 상황 확인 처리됨 ✓`, 'success');
    close();
  };
  const call = () => pushToast(`${w.name} 근로자에게 통화 연결 중…`, 'info');

  return (
    <>
      {/* 붉은 경보 플래시 backdrop */}
      <div className="absolute inset-0 sos-flash" style={{ background: 'rgba(0,0,0,0.6)', zIndex: 7000 }} />
      <div
        className="absolute pop-in flex flex-col"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 720,
          zIndex: 7100,
          background: 'rgba(20,6,10,0.98)',
          border: '2px solid #ff3b5c',
          borderRadius: 22,
          boxShadow: '0 0 80px rgba(255,59,92,0.5), 0 30px 80px rgba(0,0,0,0.8)',
          padding: 32,
          gap: 22,
        }}
      >
        {/* 헤더 */}
        <div className="flex flex-col items-center" style={{ gap: 10 }}>
          <div className="flex items-center" style={{ gap: 14 }}>
            <Siren className="live-blink" style={{ width: 40, height: 40, color: '#ff3b5c' }} />
            <span className="font-black" style={{ fontSize: 36, color: '#ff3b5c', letterSpacing: '0.04em' }}>
              SOS 긴급 상황 발생
            </span>
          </div>
          <span className="text-rose-200 font-bold" style={{ fontSize: 17 }}>
            스마트밴드에서 긴급 호출 신호가 수신되었습니다
          </span>
        </div>

        {/* 근로자 정보 */}
        <div
          className="flex items-center"
          style={{ gap: 16, padding: '18px 22px', borderRadius: 16, background: 'rgba(255,59,92,0.1)', border: '1px solid rgba(255,59,92,0.4)' }}
        >
          <div
            className="flex items-center justify-center font-black text-white"
            style={{ width: 64, height: 64, borderRadius: '50%', background: '#ff3b5c', fontSize: 26 }}
          >
            {w.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white" style={{ fontSize: 28 }}>
              {w.name}
            </span>
            <span className="text-rose-200 font-bold" style={{ fontSize: 16 }}>
              {w.company} · {w.trade} · {w.id}
            </span>
          </div>
          <div className="ml-auto flex items-center text-white font-bold" style={{ gap: 8, fontSize: 18 }}>
            <MapPin style={{ width: 22, height: 22, color: '#ff3b5c' }} />
            {w.zone}
          </div>
        </div>

        {/* 생체 데이터 */}
        <div className="grid grid-cols-3" style={{ gap: 12 }}>
          <Vital icon={Droplet} label="산소포화도" value={w.spo2 ?? '-'} unit="%" color="#ff3b5c" />
          <Vital icon={Thermometer} label="피부온도" value={w.skinTemp ?? '-'} unit="℃" color="#f97316" />
          <Vital icon={Watch} label="최근 수신" value={w.lastSeen} color="#38bdf8" />
        </div>

        {/* 액션 */}
        <div className="grid grid-cols-2" style={{ gap: 14 }}>
          <button
            onClick={call}
            className="flex items-center justify-center font-black text-white transition-all"
            style={{ gap: 12, padding: 18, borderRadius: 14, fontSize: 20, background: 'linear-gradient(180deg,#22c55e,#16a34a)', boxShadow: '0 6px 20px rgba(34,197,94,0.4)' }}
          >
            <Phone style={{ width: 24, height: 24 }} />
            근로자 통화
          </button>
          <button
            onClick={ack}
            className="flex items-center justify-center font-black text-white transition-all"
            style={{ gap: 12, padding: 18, borderRadius: 14, fontSize: 20, background: 'linear-gradient(180deg,#ff3b5c,#e11d48)', boxShadow: '0 6px 20px rgba(255,59,92,0.45)' }}
          >
            <Check style={{ width: 24, height: 24 }} />
            상황 확인
          </button>
        </div>
      </div>
    </>
  );
}
