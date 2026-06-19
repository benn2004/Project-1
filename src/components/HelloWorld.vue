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
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-6 sm:px-8 py-8 sm:py-11 text-center w-full max-w-[420px] relative z-[5] shadow-card flex flex-col justify-center min-h-[540px] sm:min-h-[620px] gap-5 sm:gap-8"
      :class="page === 'invite' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="space-y-2">
        <div class="text-base sm:text-xl font-bold text-rose-deep">
          Hai, Aziza Nur Injania 👀
        </div>
        <h1 class="text-lg sm:text-2xl font-black leading-relaxed text-rose-deep">
          mau ga ke <span class="text-pink-accent">BPN Go</span> sama aku?
        </h1>
      </div>

      <audio ref="audioRef" preload="auto" loop>
        <source src="/music.mp3" type="audio/mpeg">
      </audio>

      <div ref="buttonWrapperRef" class="relative w-full min-h-[300px] flex items-center justify-center gap-3 flex-wrap rounded-3xl bg-white/0 p-3">
        <button
          ref="yesBtnRef"
          class="animate-pulse-btn rounded-full bg-gradient-to-br from-[#e8638f] to-[#b02870] px-8 py-3 font-extrabold text-black text-lg shadow-yes transition duration-200 hover:scale-105 hover:brightness-110"
          @click="goToSurprised"
        >
          Sounds good
        </button>

        <button
          ref="noBtnRef"
          :class="[noEscaped ? 'absolute z-[999] shadow-md' : 'relative', 'rounded-full bg-gradient-to-br from-[#c4a3d4] to-[#9060b0] px-8 py-3 font-extrabold text-black text-lg shadow-no select-none whitespace-nowrap active:scale-95 transition-all duration-200']"
          :style="noEscaped ? { left: noPos.x + 'px', top: noPos.y + 'px' } : {}"
          @mouseenter="moveNo"
          @touchstart.prevent="moveNo"
        >
          {{ noText }}
        </button>
      </div>
    </div>

    <!-- Page 2: Surprised -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-6 sm:px-8 py-8 sm:py-11 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'surprised' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-5xl sm:text-[72px] mb-3.5">😆</div>
      <h1 class="text-xl sm:text-[26px] font-black mb-3 text-rose-deep">
        Not gonna lie,
      </h1>
      <p class="text-rose-mid text-base mb-9">
        I was hoping for that answer.
      </p>
      <button
        class="animate-pulse-btn rounded-full bg-gradient-to-br from-[#e8638f] to-[#b02870] px-6 sm:px-9 py-2.5 sm:py-3.5 text-base sm:text-lg font-extrabold text-white shadow-yes transition duration-200 hover:-translate-y-0.5 active:scale-95"
        @click="page = 'details'"
      >
        Let's go →
      </button>
    </div>

    <!-- Page 3: Details -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-5 sm:px-7 py-6 sm:py-10 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'details' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-4xl sm:text-[56px] mb-2">🎉</div>
      <h1 class="text-xl sm:text-[32px] font-black mb-1 text-rose-deep">BPN Go, here we come 🎉</h1>
      <p class="text-pink-accent text-sm sm:text-[15px] font-bold mb-2">
        Nothing too fancy. Just good music, good vibes, and hopefully good company too.
      </p>
      <p class="text-rose-mid text-sm sm:text-[15px] mb-3">
        Lokasi sudah fix di Citraland Balikpapan.
      </p>
      <p class="text-rose-mid text-sm sm:text-[15px] mb-4">
        tanggal 5 aja, biar sekalian nonton konsernya juga hehe
      </p>

      <div class="grid gap-3 mb-5">
        <div class="flex gap-3 items-start rounded-3xl bg-white/80 p-4 shadow-sm w-full">
          <span class="text-2xl leading-none">📅</span>
          <div class="flex flex-col text-left w-full gap-1">
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Tanggal</div>
            <div class="w-full"><DatePicker v-model="selectedDate" /></div>
            <div class="text-[#7a4060] text-sm mt-1">{{ info.date }}</div>
          </div>
        </div>

        <div class="flex gap-3 items-start rounded-3xl bg-white/80 p-4 shadow-sm w-full">
          <span class="text-2xl leading-none">📍</span>
          <div class="text-left w-full">
            <div class="font-extrabold text-rose-deep text-sm sm:text-[15px]">Tempat</div>
            <div class="text-[#7a4060] text-sm mt-0.5">{{ info.location }}</div>
            <div class="text-[#7a4060] text-sm mt-6 text-center">Ticket? Already secured ✅ You just need to show up.</div>
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
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-5 sm:px-7 py-6 sm:py-10 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'summary' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-4xl sm:text-[56px] mb-2">📌 (Screenshot this page yaa, send it to me so i know the date u picked)</div>
      <h1 class="text-xl sm:text-[32px] font-black mb-1 text-rose-deep">Ringkasan tanggal</h1>
      <p class="text-rose-mid text-sm mb-6">
        Ini tanggalnya ya, see yaa 💕
      </p>

      <div class="rounded-3xl bg-white/80 p-5 shadow-sm text-left text-sm text-rose-deep mb-6">
        <div class="mb-3 text-sm font-semibold text-rose-deep">Choosen Date:</div>
        <div class="text-base font-bold">{{ info.date }}</div>
        <div class="mt-3 text-sm text-[#7a4060]">loc 📍 : {{ info.location }}</div>
      </div>

      <p class="text-[#7a4060] text-sm sm:text-base text-center">
        See you on Sunday, {{ info.date }}.
        I'll pick you up at 17.00 Sharp.
        Don't keep me waiting 😌
        see you at {{ info.location }} on {{ info.date }}.
        Looking forward to spending the day with you.
      </p>

      <p class="text-rose-600 text-sm text-center mt-3 italic">
        A simple chat would've worked. But I figured you deserve something cooler.
      </p>

      <div class="mt-6 flex justify-center">
        <button
          class="rounded-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] px-6 py-3 text-sm sm:text-base font-extrabold text-white shadow-yes transition duration-200 hover:-translate-y-0.5 active:scale-95"
          @click="page = 'extra'"
        >
          Nextt →
        </button>
      </div>
    </div>

    <!-- Page 5: Extra -->
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[28px] px-5 sm:px-7 py-6 sm:py-10 text-center w-full max-w-[420px] relative z-[5] shadow-card"
      :class="page === 'extra' ? 'block animate-fade-in' : 'hidden'"
    >
      <div class="text-5xl sm:text-[72px] mb-4 float-emoji">💫✨</div>
      <h1 class="text-xl sm:text-[32px] font-black mb-4 text-rose-deep fade-item">
        Final message 📩
      </h1>
      <p class="text-rose-mid text-sm sm:text-base leading-relaxed mb-4 fade-item delay-1">
        Thanks for saying yes.
      </p>
      <p class="text-rose-mid text-sm sm:text-base leading-relaxed mb-4 fade-item delay-2">
        I'm genuinely looking forward to spending the day with you.
      </p>
      <p class="text-rose-mid text-sm sm:text-base leading-relaxed mb-4 fade-item delay-3">
        Now I officially have something to look forward to.
      </p>
      <p class="font-semibold text-rose-deep text-base sm:text-lg mb-4 fade-item delay-4">
        See you on {{ info.date }} ✨
      </p>
      <p class="text-sm italic text-[#9a6a86] fade-item delay-5">
        ----
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import DatePicker from './DatePicker.vue'

const info = reactive({
  date: 'Sabtu, 5 Juli 2026',
  location: 'Bpn go event, citraland Balikpapan',
})

const selectedDate = ref(new Date(2026, 6, 5))

const weekdaysName = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
const monthsName = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

function formatDate(d) {
  if (!d) return ''
  const dayName = weekdaysName[d.getDay()]
  return `${dayName}, ${d.getDate()} ${monthsName[d.getMonth()]} ${d.getFullYear()}`
}

const page = ref('invite')
const showFinalMessage = ref(false)

watch(selectedDate, (d) => {
  info.date = formatDate(d)
}, { immediate: true })

watch(page, (newPage) => {
  if (newPage === 'extra') {
    setTimeout(() => { showFinalMessage.value = true }, 300)
  } else {
    showFinalMessage.value = false
  }
})

const CONFETTI_COLORS = ['#ff6b9d','#d63384','#a855f7','#fbbf24','#34d399','#60a5fa','#fb7185','#f472b6']
const PARTICLE_EMOJIS = ['🌸','✨','💕','⭐','🎉','🌟','💫','🎈']

const noBtnRef = ref(null)
const yesBtnRef = ref(null)
const buttonWrapperRef = ref(null)
const audioRef = ref(null)

const noEscaped = ref(false)
const noPos = reactive({ x: 0, y: 0 })
const noText = ref("Nope 🐾")

const noTexts = [
  "Nope 🐾",
  "Yakin? 😏",
  "Ga bisa 🤣",
  "Kejar aku dulu 😎",
  "Coba lagi 🙈",
  "Wrong button 😌",
  "Klik yang pink aja ✨",
  "Ayo yang kiri 👉",
  "Wkwkwk 😭"
]

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
  const wrapper = buttonWrapperRef.value
  if (!btn || !wrapper) return

  const btnW = btn.offsetWidth || 130
  const btnH = btn.offsetHeight || 48
  const wrapperRect = wrapper.getBoundingClientRect()
  const margin = 16

  const maxX = wrapperRect.width - btnW - margin
  const maxY = wrapperRect.height - btnH - margin

  noPos.x = margin + Math.random() * Math.max(0, maxX)
  noPos.y = margin + Math.random() * Math.max(0, maxY)

  noText.value = noTexts[Math.floor(Math.random() * noTexts.length)]
  noEscaped.value = true
}

function goToSurprised() {
  audioRef.value?.play()
  page.value = 'surprised'
  nextTick(() => spawnConfetti())
}

onMounted(() => {
  createParticles()
  if (audioRef.value) {
    audioRef.value.load()
  }
})
</script>