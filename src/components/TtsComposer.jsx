import { useState } from 'react';
import { Send, Volume2 } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';

/**
 * TtsComposer — "관리자가 입력한 문구 → 현장 스피커로 TTS 송출" UI.
 * (목업: 실제 TTS 변환/재생은 하지 않음. 전송 시 토스트로 시각 피드백만)
 *
 * CCTV 팝업(#3) / 중장비 팝업(#7) / 전체 일괄방송(#4) 에서 공용 사용.
 *
 * props
 *  - targetLabel: 송출 대상 표기 (예: "정문 출입구 스피커", "전체 CCTV 12대")
 *  - presets: 빠른 문구 버튼 배열
 *  - toastType: 'success' | 'broadcast'
 *  - accent: 강조색
 */
const DEFAULT_PRESETS = [
  '안전모를 착용해 주세요.',
  '작업구역 밖으로 이동해 주세요.',
  '잠시 후 중장비가 이동합니다. 주의하세요.',
];

export default function TtsComposer({
  targetLabel = '현장 스피커',
  presets = DEFAULT_PRESETS,
  toastType = 'success',
  accent = '#38bdf8',
}) {
  const [text, setText] = useState('');
  const pushToast = useUIStore((s) => s.pushToast);

  const send = () => {
    const msg = text.trim();
    if (!msg) return;
    // 목업: 실제 송출 없음 → 토스트로 확인만
    pushToast(`${targetLabel} 송출됨 ✓`, toastType);
    setText('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      <div className="flex items-center text-slate-400 font-bold" style={{ gap: 8, fontSize: 15 }}>
        <Volume2 style={{ width: 18, height: 18, color: accent }} />
        <span>
          방송 대상: <span className="text-white">{targetLabel}</span>
        </span>
      </div>

      {/* 빠른 문구 */}
      <div className="flex flex-wrap" style={{ gap: 8 }}>
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setText(p)}
            className="text-slate-300 hover:text-white transition-colors"
            style={{
              fontSize: 14,
              padding: '7px 12px',
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.28)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 입력 + 전송 */}
      <div className="flex items-stretch" style={{ gap: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="방송할 내용을 입력하세요…"
          className="flex-1 text-white outline-none"
          style={{
            fontSize: 17,
            padding: '14px 18px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(148,163,184,0.28)',
          }}
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          className="flex items-center font-black text-white transition-all disabled:opacity-40"
          style={{
            gap: 10,
            padding: '0 26px',
            borderRadius: 12,
            fontSize: 17,
            background: `linear-gradient(180deg, ${accent}, ${accent}cc)`,
            boxShadow: `0 6px 20px ${accent}55`,
          }}
        >
          <Send style={{ width: 20, height: 20 }} />
          전송
        </button>
      </div>
    </div>
  );
}
