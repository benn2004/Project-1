import { useState, useRef, useCallback } from "react";

const CONFETTI_COLORS = ['#ff6b9d','#d63384','#a855f7','#fbbf24','#34d399','#60a5fa','#fb7185','#f472b6'];

function makeConfetti(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.2,
    dur: 1.8 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 7 + Math.random() * 10,
    angle: Math.random() * 360,
    circle: Math.random() > 0.5,
  }));
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: ['🌸','✨','💕','⭐','🎉','🌟','💫','🎈'][i % 8],
  left: 3 + Math.random() * 94,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 8,
  size: 14 + Math.random() * 12,
}));

export default function BPNGoInvite() {
  const [page, setPage] = useState('invite');
  const [noEscaped, setNoEscaped] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [confetti, setConfetti] = useState([]);
  const noRef = useRef(null);
  const wrapperRef = useRef(null);

  const moveNo = useCallback(() => {
    const btn = noRef.current;
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const bW = btn?.offsetWidth || 140;
    const bH = btn?.offsetHeight || 48;
    const wW = wrap.offsetWidth;
    const wH = wrap.offsetHeight;
    const x = 16 + Math.random() * Math.max(0, wW - bW - 32);
    const y = 16 + Math.random() * Math.max(0, wH - bH - 32);
    setNoEscaped(true);
    setNoPos({ x, y });
  }, []);

  const handleYes = () => {
    setPage('surprised');
    setConfetti(makeConfetti(90));
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.97)',
    borderRadius: '28px',
    padding: '44px 32px',
    boxShadow: '0 20px 60px rgba(180,70,140,0.18)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '420px',
    position: 'relative',
    zIndex: 5,
    animation: 'fadeIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
  };

  const yesBtnStyle = {
    background: 'linear-gradient(135deg, #e8638f, #b02870)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 36px',
    fontSize: '18px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
    boxShadow: '0 6px 22px rgba(200,50,120,0.35)',
    transition: 'transform 0.15s, filter 0.15s',
  };

  const noBtnStyle = {
    background: 'linear-gradient(135deg, #c4a3d4, #9060b0)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 26px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
    boxShadow: '0 4px 16px rgba(140,80,180,0.3)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(-5deg); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-110vh) rotate(20deg); opacity: 0; }
        }
        @keyframes confettiFall {
          0%   { transform: translateY(-30px) rotate(0deg); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.05); }
        }

        .emoji-bounce { animation: bounce 2s ease infinite; display: inline-block; }
        .yes-btn      { animation: pulse 2.5s ease infinite; }
        .yes-btn:hover { transform: scale(1.07) !important; filter: brightness(1.08) !important; animation: none !important; }
        .yes-btn:active { transform: scale(0.96) !important; }
      `}</style>

      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '560px',
          background: 'linear-gradient(150deg, #fde8f0 0%, #ede0ff 50%, #fde8f0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Nunito', 'Segoe UI', sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* ── Floating background particles ── */}
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
            animation: `floatUp ${p.dur}s ${p.delay}s linear infinite`,
          }}>{p.emoji}</div>
        ))}

        {/* ── Confetti ── */}
        {confetti.map(c => (
          <div key={c.id} style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: '-20px',
            width: `${c.size}px`,
            height: `${c.size}px`,
            background: c.color,
            borderRadius: c.circle ? '50%' : '3px',
            transform: `rotate(${c.angle}deg)`,
            pointerEvents: 'none',
            zIndex: 10,
            animation: `confettiFall ${c.dur}s ${c.delay}s ease-in forwards`,
          }} />
        ))}

        {/* ── NO button (escaped, absolute) ── */}
        {page === 'invite' && noEscaped && (
          <button
            ref={noRef}
            onMouseEnter={moveNo}
            onTouchStart={(e) => { e.preventDefault(); moveNo(); }}
            style={{
              ...noBtnStyle,
              position: 'absolute',
              left: `${noPos.x}px`,
              top: `${noPos.y}px`,
              zIndex: 999,
              transition: 'left 0.07s ease-out, top 0.07s ease-out',
            }}
          >
            Gak mau 🐾
          </button>
        )}

        {/* ════════════ PAGE 1: INVITE ════════════ */}
        {page === 'invite' && (
          <div style={cardStyle}>
            <div className="emoji-bounce" style={{ fontSize: '72px', marginBottom: '12px' }}>🐾</div>
            <h1 style={{ color: '#5c2a3a', fontSize: '24px', fontWeight: '900', lineHeight: 1.5, marginBottom: '8px' }}>
              🌸 Mau ke <span style={{ color: '#c04488' }}>BPN Go</span> bareng gue? 🌸
            </h1>
            <p style={{ color: '#b07090', fontSize: '14px', marginBottom: '30px' }}>
              (coba hover tombol di bawah 👀)
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="yes-btn" onClick={handleYes} style={yesBtnStyle}>
                IYA dong! 🥰
              </button>
              {!noEscaped && (
                <button
                  ref={noRef}
                  onMouseEnter={moveNo}
                  onTouchStart={(e) => { e.preventDefault(); moveNo(); }}
                  style={noBtnStyle}
                >
                  Gak mau 🐾
                </button>
              )}
            </div>
          </div>
        )}

        {/* ════════════ PAGE 2: SURPRISED ════════════ */}
        {page === 'surprised' && (
          <div style={cardStyle}>
            <div style={{ fontSize: '72px', marginBottom: '14px' }}>🥹</div>
            <h1 style={{ color: '#5c2a3a', fontSize: '26px', fontWeight: '900', marginBottom: '12px' }}>
              WAIT LO BENERAN MAU?? 😭
            </h1>
            <p style={{ color: '#9a6070', fontSize: '16px', marginBottom: '36px' }}>
              Gue udah siap-siap lo bakal nolak 😅
            </p>
            <button
              className="yes-btn"
              onClick={() => { setConfetti([]); setPage('details'); }}
              style={yesBtnStyle}
            >
              hehe lanjut dong →
            </button>
          </div>
        )}

        {/* ════════════ PAGE 3: EVENT DETAILS ════════════ */}
        {page === 'details' && (
          <div style={{ ...cardStyle, padding: '40px 28px' }}>
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>🎉</div>
            <h1 style={{ color: '#5c2a3a', fontSize: '32px', fontWeight: '900', marginBottom: '4px' }}>
              BPN Go!
            </h1>
            <p style={{ color: '#c04488', fontSize: '13px', fontWeight: '700', marginBottom: '26px' }}>
              Glad you didn't say no 💕
            </p>

            <div style={{
              background: 'linear-gradient(135deg, #fde8f0, #f0e0ff)',
              borderRadius: '18px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left',
            }}>
              {[
                { icon: '📅', label: 'Tanggal', val: '[Isi tanggal BPN Go di sini]' },
                { icon: '📍', label: 'Lokasi',  val: '[Lokasi acara], Balikpapan' },
                { icon: '⏰', label: 'Jam',     val: '[Jam mulai] WIB' },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: '800', color: '#5c2a3a', fontSize: '15px' }}>{label}</div>
                    <div style={{ color: '#7a4060', fontSize: '14px', marginTop: '2px' }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ color: '#9a6070', fontSize: '15px', lineHeight: 1.9 }}>
              Gue yang ngejemput ya 🥰<br />
              <span style={{ fontSize: '20px', letterSpacing: '4px' }}>♥ ♥ ♥ ♥ ♥</span><br />
              <em style={{ fontSize: '12px', color: '#c0a0b0' }}>
                Normal people text, gue bikin website. No big deal 😎
              </em>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
