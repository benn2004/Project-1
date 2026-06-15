<template>
  <div
    id="app"
    ref="appRef"
    class="relative w-full min-h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-no-repeat bg-fixed"
    style="background: radial-gradient(circle at top left, rgba(251,146,60,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(168,85,247,0.14), transparent 32%), linear-gradient(150deg, #fde8f0 0%, #ede0ff 50%, #fde8f0 100%);"
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

    <!-- Top emoji background -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden">
      <span class="absolute left-3 top-4 text-4xl text-white/40 animate-float-up" style="animation-duration: 9s; animation-delay: 0s;">✨</span>
      <span class="absolute left-24 top-8 text-5xl text-white/30 animate-float-up" style="animation-duration: 11s; animation-delay: 1s;">🛵</span>
      <span class="absolute right-16 top-6 text-4xl text-white/35 animate-float-up" style="animation-duration: 10s; animation-delay: 0.5s;">💕</span>
      <span class="absolute right-6 top-14 text-3xl text-white/35 animate-float-up" style="animation-duration: 8s; animation-delay: 1.2s;">⭐</span>
    </div>

    <!-- Page 1: Invite -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-6 sm:px-8 py-8 sm:py-11 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'invite' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/80 shadow-yes animate-bounce-emoji text-5xl sm:text-[72px] mb-4">
        🐾
      </div>

      <h1 class="text-xl sm:text-2xl font-black leading-relaxed mb-2 text-rose-deep">
         mau ga ke <span class="text-pink-accent">BPN Go</span> sama aku? 
      </h1>
      <p class="text-rose-mid text-sm sm:text-base mb-7">
      </p>

      <div class="flex items-center justify-center gap-3 flex-wrap">
        <button
          ref="yesBtnRef"
          class="animate-pulse-btn rounded-full bg-gradient-to-br from-[#e8638f] to-[#b02870] px-6 py-3 font-extrabold text-black shadow-yes transition duration-200 hover:scale-105 hover:brightness-110"
          @click="goToSurprised"
        >
          IYA dong! 
        </button>

        <button
          v-if="!noEscaped"
          ref="noBtnRef"
          class="rounded-full bg-gradient-to-br from-[#c4a3d4] to-[#9060b0] px-6 py-3 font-bold text-black shadow-no transition duration-200 hover:-translate-y-0.5 active:scale-95"
          @mouseenter="moveNo"
          @touchstart.prevent="moveNo"
        >
          Gak mau 🐾
        </button>
      </div>

      <button
        v-if="noEscaped"
        ref="noBtnRef"
        class="fixed z-[999] bg-gradient-to-br from-[#c4a3d4] to-[#9060b0] hover:shadow-lg active:scale-95 text-black border-none rounded-full px-5 sm:px-6.5 py-2 sm:py-3 text-xs sm:text-base font-bold cursor-pointer shadow-md select-none whitespace-nowrap transition-all duration-200"
        :style="{ left: noPos.x + 'px', top: noPos.y + 'px' }"
        @mouseenter="moveNo"
        @touchstart.prevent="moveNo"
      >
        Gak mau 🐾
      </button>
    </div>

    <!-- Page 2: Surprised -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-6 sm:px-8 py-8 sm:py-11 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'surprised' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-5xl sm:text-[72px] mb-3.5">😆</div>
      <h1 class="text-lg sm:text-[26px] font-black mb-3 text-rose-deep">
        Beneran mauuu
      </h1>
      <p class="text-rose-mid text-sm sm:text-base mb-9">
        Gabisa dibatalin lohh
      </p>
      <button
        class="animate-pulse-btn rounded-full bg-gradient-to-br from-[#e8638f] to-[#b02870] px-6 sm:px-9 py-2.5 sm:py-3.5 text-sm sm:text-lg font-extrabold text-white shadow-yes transition duration-200 hover:-translate-y-0.5 active:scale-95"
        @click="page = 'details'"
      >
        oke lanjutttttt →
      </button>
    </div>

    <!-- Page 3: Details -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-6 sm:px-7 py-8 sm:py-10 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'details' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-4xl sm:text-[56px] mb-2">🎉</div>
      <h1 class="text-2xl sm:text-[32px] font-black mb-1 text-rose-deep">Yuk ke BPN Go!</h1>
      <p class="text-pink-accent text-xs sm:text-[13px] font-bold mb-2">
        Pilih tanggalnya dulu ya.
      </p>
      <p class="text-rose-mid text-xs sm:text-[13px] mb-3">
        Lokasi sudah fix di Citraland Balikpapan.
      </p>
      <p class="text-rose-mid text-xs sm:text-[13px] mb-6">
        tanggal 5 aja, biar sekalian nonton konsernya juga hehe
      </p>

      <div class="grid gap-3 mb-6">
        <div class="flex gap-3 items-start rounded-3xl bg-white/80 p-4 shadow-sm w-full">
          <span class="text-2xl leading-none">📅</span>
          <div class="flex flex-col text-left w-full gap-1">
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Tanggal</div>
            <div class="w-full"><DatePicker v-model="selectedDate" /></div>
            <div class="text-[#7a4060] text-xs sm:text-sm mt-1">{{ info.date }}</div>
          </div>
        </div>

        <div class="flex gap-3 items-start rounded-3xl bg-white/80 p-4 shadow-sm w-full">
          <span class="text-2xl leading-none">📍</span>
          <div class="text-left w-full">
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Tempat</div>
            <div class="text-[#7a4060] text-xs sm:text-sm mt-0.5">{{ info.location }}</div>
            <div class="text-[#7a4060] text-[15px] sm:text-xs mt-10 text-center">✨ Btw, I've bought the ticket already ✨</div>
          </div>
        </div>
      </div>

      <button
        class="rounded-full bg-gradient-to-br from-[#e8638f] to-[#b02870] px-6 py-3 text-sm sm:text-base font-extrabold text-white shadow-yes transition duration-200 hover:-translate-y-0.5 active:scale-95"
        @click="page = 'summary'"
      >
        Oke siap! →
      </button>
    </div>

    <!-- Page 4: Summary -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-6 sm:px-7 py-8 sm:py-10 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'summary' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-4xl sm:text-[56px] mb-2">📌</div>
      <h1 class="text-2xl sm:text-[32px] font-black mb-1 text-rose-deep">Ringkasan tanggal</h1>
      <p class="text-rose-mid text-xs sm:text-[13px] mb-6">
        Ini tanggalnya ya, see yaa 💕
      </p>

      <div class="rounded-3xl bg-white/80 p-5 shadow-sm text-left text-sm text-rose-deep mb-6">
        <div class="mb-3 text-sm font-semibold text-rose-deep">Tanggal terpilih</div>
        <div class="text-base font-bold">{{ info.date }}</div>
        <div class="mt-3 text-xs text-[#7a4060]">Tempat: {{ info.location }}</div>
      </div>

      <p class="text-[#7a4060] text-sm sm:text-base text-center">
        ill pick u up at 17.00 sharp, Be Ready!
        see you at {{ info.location }} on {{ info.date }}. can't wait to have fun with youuu 🐾
      </p>

      <p class="text-rose-500 text-xs sm:text-sm text-center mt-4 italic">
        Normal People Text, i made this eazy😎😎😎, 💫Dont forget to screenshot this page and send to me💫
</p>
      
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import DatePicker from './DatePicker.vue'

/* ══════════════════════════════════════════════════
 *  ✏️  GANTI INFO ACARA DI SINI
 * ══════════════════════════════════════════════════ */
const info = reactive({
  date: 'Sabtu, 5 Juli 2026',
  location: 'Bpn go event, citraland Balikpapan',
})

// Date picker state and formatting
const selectedDate = ref(new Date(2026, 6, 5))

const weekdaysName = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
const monthsName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

function formatDate(d){
  if(!d) return ''
  const dayName = weekdaysName[d.getDay()]
  return `${dayName}, ${d.getDate()} ${monthsName[d.getMonth()]} ${d.getFullYear()}`
}

watch(selectedDate, (d) => {
  info.date = formatDate(d)
}, { immediate: true })

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