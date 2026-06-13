<template>
  <div
    id="app"
    ref="appRef"
    class="relative w-full min-h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6"
    style="background: linear-gradient(150deg, #fde8f0 0%, #ede0ff 50%, #fde8f0 100%);"
  >
    <!-- Floating particles -->
    <div
      v-for="(p, i) in particles"
      :key="'particle-' + i"
      class="absolute pointer-events-none user-select-none z-0 animate-float-up"
      :style="p.style"
    >
      {{ p.emoji }}
    </div>

    <!-- Confetti -->
    <div
      v-for="c in confettiPieces"
      :key="c.id"
      class="absolute pointer-events-none z-10 animate-confetti-fall"
      :style="c.style"
    ></div>

    <!-- Page 1: Invite -->
    <div
      class="bg-white/97 rounded-2xl sm:rounded-[28px] px-6 sm:px-8 py-8 sm:py-11 text-center w-full max-w-[420px] relative z-[5] shadow-lg"
      :class="page === 'invite' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="inline-block animate-bounce-emoji text-5xl sm:text-[72px] mb-3">🐾</div>

      <h1 class="text-xl sm:text-2xl font-black leading-relaxed mb-2 text-rose-deep">
        🌸 Mau ke <span class="text-pink-accent">BPN Go</span> bareng aku? 🌸
      </h1>

      <div class="flex items-center justify-center flex-wrap gap-3">
        <button
          ref="yesBtnRef"
          class="animate-pulse-btn bg-gradient-to-br from-[#e8638f] to-[#b02870] hover:scale-110 hover:brightness-110 active:scale-95 text-white border-none rounded-full px-6 sm:px-9 py-2.5 sm:py-3.5 text-sm sm:text-lg font-extrabold cursor-pointer shadow-lg transition-all duration-200"
          @click="goToSurprised"
        >
          IYA dong! 🥰
        </button>

        <button
          ref="noBtnRef"
          class="no-btn bg-gradient-to-br from-[#c4a3d4] to-[#9060b0] hover:shadow-lg active:scale-95 text-white border-none rounded-full px-5 sm:px-6.5 py-2 sm:py-3 text-xs sm:text-base font-bold cursor-pointer shadow-md select-none whitespace-nowrap transition-all duration-200"
          :class="{ 'fixed z-[999]': noEscaped }"
          :style="noEscaped ? { left: noPos.x + 'px', top: noPos.y + 'px' } : {}"
          @mouseenter="moveNo"
          @touchstart.prevent="moveNo"
        >
          Gak mau 🐾
        </button>
      </div>
    </div>

    <!-- Page 2: Surprised -->
    <div
      class="bg-white/97 rounded-2xl sm:rounded-[28px] px-6 sm:px-8 py-8 sm:py-11 text-center w-full max-w-[420px] relative z-[5] shadow-lg"
      :class="page === 'surprised' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-5xl sm:text-[72px] mb-3.5">🥹</div>
      <h1 class="text-lg sm:text-[26px] font-black mb-3 text-rose-deep">
        WAIT LO BENERAN MAU?? 😭
      </h1>
      <p class="text-rose-mid text-sm sm:text-base mb-9">
        Gue udah siap-siap lo bakal nolak 😅
      </p>
      <button
        class="animate-pulse-btn bg-gradient-to-br from-[#e8638f] to-[#b02870] hover:scale-110 hover:brightness-110 active:scale-95 text-white border-none rounded-full px-6 sm:px-9 py-2.5 sm:py-3.5 text-sm sm:text-lg font-extrabold cursor-pointer shadow-lg transition-all duration-200"
        @click="page = 'details'"
      >
        hehe lanjut dong →
      </button>
    </div>

    <!-- Page 3: Details -->
    <div
      class="bg-white/97 rounded-2xl sm:rounded-[28px] px-6 sm:px-7 py-8 sm:py-10 text-center w-full max-w-[420px] relative z-[5] shadow-lg"
      :class="page === 'details' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-4xl sm:text-[56px] mb-2">🎉</div>
      <h1 class="text-2xl sm:text-[32px] font-black mb-1 text-rose-deep">BPN Go!</h1>
      <p class="text-pink-accent text-xs sm:text-[13px] font-bold mb-6">
        Glad you didn't say no 💕
      </p>

      <div class="bg-gradient-to-br from-[#fde8f0] to-[#f0e0ff] rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 text-left">
        <div class="flex gap-2 sm:gap-3 items-start mb-3">
          <span class="text-lg sm:text-[22px] leading-none flex-shrink-0">📅</span>
          <div>
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Tanggal</div>
            <div class="text-[#7a4060] text-xs sm:text-sm mt-0.5">{{ info.tanggal }}</div>
          </div>
        </div>
        <div class="flex gap-2 sm:gap-3 items-start mb-3">
          <span class="text-lg sm:text-[22px] leading-none flex-shrink-0">📍</span>
          <div>
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Lokasi</div>
            <div class="text-[#7a4060] text-xs sm:text-sm mt-0.5">{{ info.lokasi }}</div>
          </div>
        </div>
        <div class="flex gap-2 sm:gap-3 items-start">
          <span class="text-lg sm:text-[22px] leading-none flex-shrink-0">⏰</span>
          <div>
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Jam</div>
            <div class="text-[#7a4060] text-xs sm:text-sm mt-0.5">{{ info.jam }}</div>
          </div>
        </div>
      </div>

      <p class="text-rose-mid text-sm sm:text-[15px] leading-loose">
        Gue yang ngejemput ya 🥰<br />
        <span class="text-base sm:text-xl" style="letter-spacing: 4px;">♥ ♥ ♥ ♥ ♥</span><br />
        <em class="text-xs text-rose-softer">
          Normal people text, gue bikin website. No big deal 😎
        </em>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'

/* ══════════════════════════════════════════════════
 *  ✏️  GANTI INFO ACARA DI SINI
 * ══════════════════════════════════════════════════ */
const info = reactive({
  tanggal: 'Sabtu, 5 Juli 2026',
  lokasi: 'Lapangan Merdeka, Balikpapan',
  jam: '08.00 WITA',
})
/* ══════════════════════════════════════════════════ */

const CONFETTI_COLORS = ['#ff6b9d', '#d63384', '#a855f7', '#fbbf24', '#34d399', '#60a5fa', '#fb7185', '#f472b6']
const PARTICLE_EMOJIS = ['🌸', '✨', '💕', '⭐', '🎉', '🌟', '💫', '🎈']

const appRef = ref(null)
const noBtnRef = ref(null)
const yesBtnRef = ref(null)

const page = ref('invite')
const noEscaped = ref(false)
const noPos = reactive({ x: 0, y: 0 })

const particles = ref([])
const confettiPieces = ref([])
let confettiCounter = 0

function createParticles() {
  const arr = []
  for (let i = 0; i < 18; i++) {
    const left = 3 + Math.random() * 94
    const dur = 6 + Math.random() * 8
    const del = Math.random() * 8
    const size = 14 + Math.random() * 12
    arr.push({
      emoji: PARTICLE_EMOJIS[i % PARTICLE_EMOJIS.length],
      style: {
        left: left + '%',
        bottom: '-40px',
        fontSize: size + 'px',
        animationDuration: dur + 's',
        animationDelay: del + 's',
      },
    })
  }
  particles.value = arr
}

function spawnConfetti() {
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 100
    const delay = Math.random() * 1.2
    const dur = 1.8 + Math.random() * 2
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
    const size = 7 + Math.random() * 10
    const angle = Math.random() * 360
    const circle = Math.random() > 0.5

    const id = confettiCounter++
    confettiPieces.value.push({
      id,
      style: {
        left: x + '%',
        top: '-20px',
        width: size + 'px',
        height: size + 'px',
        background: color,
        borderRadius: circle ? '50%' : '3px',
        transform: `rotate(${angle}deg)`,
        animationDuration: dur + 's',
        animationDelay: delay + 's',
      },
    })

    setTimeout(() => {
      confettiPieces.value = confettiPieces.value.filter((c) => c.id !== id)
    }, (dur + delay + 0.5) * 1000)
  }
}

function moveNo() {
  const btn = noBtnRef.value
  const app = appRef.value
  if (!btn || !app) return

  const bW = btn.offsetWidth || 80
  const bH = btn.offsetHeight || 40
  const wW = window.innerWidth
  const wH = window.innerHeight

  // Ensure button stays within viewport bounds
  const maxX = Math.max(0, wW - bW - 16)
  const maxY = Math.max(0, wH - bH - 16)
  
  const x = 16 + Math.random() * maxX
  const y = 16 + Math.random() * maxY

  noEscaped.value = true
  noPos.x = x
  noPos.y = y
}

function goToSurprised() {
  page.value = 'surprised'
  nextTick(() => spawnConfetti())
}

onMounted(() => {
  createParticles()
})
</script>