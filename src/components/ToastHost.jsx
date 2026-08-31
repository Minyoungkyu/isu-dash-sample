import { CheckCircle2, Info, Radio, X } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';

/**
 * ToastHost — 화면 하단 중앙에 쌓이는 가벼운 시각 피드백.
 * (목업: 실제 TTS/방송은 하지 않고 "전송됨 ✓" 같은 확인만 표시)
 */
const ICONS = {
  success: CheckCircle2,
  info: Info,
  broadcast: Radio,
};
const COLORS = {
  success: '#22c55e',
  info: '#38bdf8',
  broadcast: '#f59e0b',
};

export default function ToastHost() {
  const toasts = useUIStore((s) => s.toasts);
  const dismiss = useUIStore((s) => s.dismissToast);

  return (
    <div
      className="absolute left-1/2 flex flex-col items-center"
      style={{ bottom: 48, transform: 'translateX(-50%)', gap: 12, zIndex: 9000 }}
    >
      {toasts.map((t) => {
        const Icon = ICONS[t.type] ?? ICONS.info;
        const color = COLORS[t.type] ?? COLORS.info;
        return (
          <div
            key={t.id}
            className="toast-in flex items-center panel"
            style={{
              gap: 14,
              padding: '16px 22px',
              borderRadius: 14,
              borderColor: `${color}66`,
              minWidth: 360,
              boxShadow: `0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px ${color}33`,
            }}
          >
            <Icon style={{ width: 26, height: 26, color }} />
            <span className="font-bold text-white" style={{ fontSize: 18 }}>
              {t.message}
            </span>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-auto text-slate-500 hover:text-white transition-colors"
            >
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
