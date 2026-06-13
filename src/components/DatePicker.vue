<template>
  <div class="relative inline-block text-left w-full">
    <button @click="toggle" type="button" class="w-full text-left rounded-2xl p-3 bg-white/80 shadow-sm">
      <div class="text-sm font-extrabold text-rose-deep">{{ display }}</div>
      <div class="text-xs text-rose-mid">Klik untuk memilih tanggal</div>
    </button>

    <div v-if="open" class="absolute mt-2 z-50 w-72">
      <div class="rounded-2xl p-0 bg-gradient-to-r from-pink-300/60 via-purple-300/50 to-indigo-200/40 shadow-lg">
        <div class="bg-white rounded-xl p-4">
          <div class="flex items-center justify-center mb-2">
            <div class="font-bold text-rose-deep">Juli 2026</div>
          </div>

          <div class="grid grid-cols-7 gap-1 text-center text-xs text-rose-mid mb-2">
            <div v-for="d in weekdays" :key="d" class="font-semibold">{{ d }}</div>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <div v-for="n in startBlank" :key="'b'+n" class="h-9"></div>
            <button
              v-for="d in daysInMonth"
              :key="d"
              @click="selectDay(d)"
              :class="['h-9 rounded-md text-sm', isSelected(d) ? 'bg-rose-deep text-white' : 'hover:bg-gray-100']"
            >
              {{ d }}
            </button>
            <!-- fill remaining cells to keep layout stable -->
            <div v-for="n in remainingCells" :key="'f'+n" class="h-9"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ modelValue: { type: [Date, String, null], default: null } })
const emits = defineEmits(['update:modelValue'])


// Lock view to July 2026 and only allow days 1-5
const open = ref(false)
const viewMonth = ref(6) // July (0-based)
const viewYear = ref(2026)
const selected = ref(props.modelValue ? new Date(props.modelValue) : null)

watch(() => props.modelValue, (v) => {
  selected.value = v ? new Date(v) : null
  if (selected.value) {
    viewMonth.value = selected.value.getMonth()
    viewYear.value = selected.value.getFullYear()
  }
})

const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const weekdays = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']

const startBlank = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  return first.getDay()
})

// Only show days 1..5 as requested
const daysInMonth = computed(() => {
  return [1,2,3,4,5]
})

const remainingCells = computed(() => {
  // total cells including blanks and days should fill at least 35 cells (5 rows)
  const used = startBlank.value + daysInMonth.value.length
  const total = 35
  return Math.max(0, total - used)
})

const display = computed(() => {
  if (!selected.value) return 'Pilih tanggal'
  const d = selected.value
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
})

function toggle() { open.value = !open.value }
function prevMonth() { /* disabled: fixed to July 2026 */ }
function nextMonth() { /* disabled: fixed to July 2026 */ }
function selectDay(d) {
  if (d < 1 || d > 5) return
  const date = new Date(viewYear.value, viewMonth.value, d)
  selected.value = date
  emits('update:modelValue', date)
  open.value = false
}

function isSelected(d) {
  return selected.value && selected.value.getFullYear() === viewYear.value && selected.value.getMonth() === viewMonth.value && selected.value.getDate() === d
}
</script>
