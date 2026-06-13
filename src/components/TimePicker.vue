<template>
  <div class="w-full">
    <label class="sr-only">Pilih jam</label>
    <div class="bg-purple-100 border border-purple-200 rounded-2xl shadow-sm px-4 py-3 h-12 flex items-center w-full focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-400">
      <button @click="toggle" type="button" class="w-full text-left text-sm text-purple-800 font-semibold flex items-center gap-2">
        <span class="text-lg">⏰</span>
        <span>{{ display }}</span>
      </button>
    </div>

    <div v-if="open" class="mt-2 bg-purple-100 border border-purple-200 rounded-2xl shadow-sm p-3 w-full">
      <div class="text-xs text-rose-mid mb-2">Pilih jam</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="t in times"
          :key="t"
          @click="selectTime(t)"
          :class="[
            'py-2 px-3 text-sm rounded-lg transition text-rose-deep',
            t === selectedTime ? 'bg-purple-600 text-white font-bold' : 'bg-purple-200 hover:bg-purple-300'
          ]"
        >
          <span class="block">{{ t }}</span>
        </button>
      </div>
      <div class="mt-3 flex items-center gap-3">
        <div class="text-sm text-rose-mid">Selected:</div>
        <div class="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">{{ selectedTime || '—' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emits = defineEmits(['update:modelValue'])

const open = ref(false)
function toggle() { open.value = !open.value }

const selectedTime = ref(props.modelValue || '')

watch(() => props.modelValue, (v) => {
  selectedTime.value = v || ''
})

// generate hours 17:00 - 19:00 step 1 hour (start from 5 PM)
const times = computed(() => {
  const arr = []
  for (let h = 17; h <= 19; h++) {
    const hh = String(h).padStart(2, '0')
    arr.push(`${hh}:00`)
  }
  return arr
})

const display = computed(() => (selectedTime.value ? selectedTime.value : 'Pilih jam'))

function selectTime(t) {
  selectedTime.value = t
  emits('update:modelValue', t)
  open.value = false
}
</script>
