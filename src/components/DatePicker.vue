<template>
  <div class="relative inline-block text-left w-full">
    <button @click="toggle" type="button" class="w-full text-left rounded-2xl p-3 bg-white/80 shadow-sm">
      <div class="text-sm font-extrabold text-rose-deep">{{ display }}</div>
      <div class="text-xs text-rose-mid">Klik untuk memilih tanggal</div>
    </button>

    <div v-if="open" class="absolute mt-2 bg-white rounded-2xl shadow-lg p-4 z-50 w-72">
      <div class="flex items-center justify-between mb-2">
        <button @click="prevMonth" class="px-2 py-1 hover:bg-gray-100 rounded">‹</button>
        <div class="font-bold">{{ months[viewMonth] }} {{ viewYear }}</div>
        <button @click="nextMonth" class="px-2 py-1 hover:bg-gray-100 rounded">›</button>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ modelValue: { type: [Date, String, null], default: null } })
const emits = defineEmits(['update:modelValue'])

const open = ref(false)
const viewDate = ref(props.modelValue ? new Date(props.modelValue) : new Date())
const viewMonth = ref(viewDate.value.getMonth())
const viewYear = ref(viewDate.value.getFullYear())
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

const daysInMonth = computed(() => {
  return new Array(new Date(viewYear.value, viewMonth.value + 1, 0).getDate()).fill(0).map((_, i) => i + 1)
})

const display = computed(() => {
  if (!selected.value) return 'Pilih tanggal'
  const d = selected.value
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
})

function toggle() { open.value = !open.value }
function prevMonth() { if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- } else viewMonth.value-- }
function nextMonth() { if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ } else viewMonth.value++ }
function selectDay(d) {
  const date = new Date(viewYear.value, viewMonth.value, d)
  selected.value = date
  emits('update:modelValue', date)
  open.value = false
}

function isSelected(d) {
  return selected.value && selected.value.getFullYear() === viewYear.value && selected.value.getMonth() === viewMonth.value && selected.value.getDate() === d
}
</script>
