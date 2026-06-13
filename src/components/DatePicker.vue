<template>
  <div class="w-full">
    <label class="sr-only">Pilih tanggal</label>
    <div class="bg-white border border-pink-200 rounded-2xl shadow-sm px-4 py-3 h-12 flex items-center w-full focus-within:ring-2 focus-within:ring-pink-300 focus-within:border-pink-400">
      <input
        type="date"
        :min="minDate"
        :max="maxDate"
        :value="isoValue"
        @input="onInput"
        class="w-full h-full bg-transparent outline-none text-sm text-rose-deep"
        aria-label="Tanggal acara"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ modelValue: { type: [Date, String, null], default: null } })
const emits = defineEmits(['update:modelValue'])

// min/max locked to 2026-07-01 .. 2026-07-05
const minDate = '2026-07-01'
const maxDate = '2026-07-05'

const isoValue = computed(() => {
  if (!props.modelValue) return ''
  const d = props.modelValue instanceof Date ? props.modelValue : new Date(props.modelValue)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
})

function onInput(e) {
  const v = e.target.value
  if (!v) {
    emits('update:modelValue', null)
    return
  }
  const d = new Date(v + 'T00:00:00')
  // clamp within allowed range
  if (v < minDate || v > maxDate) return
  emits('update:modelValue', d)
}
</script>
