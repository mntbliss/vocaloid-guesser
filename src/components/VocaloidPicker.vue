<script setup>
    import VocaloidBadge from '@/components/VocaloidBadge.vue'
    import { VOCALOID_LIST } from '@/configs/vocaloids'

    const selectedIds = defineModel('selectedIds', { type: Array, default: () => [] })

    defineProps({
        disabled: { type: Boolean, default: false }
    })

    const isSelected = (vocaloidId) => selectedIds.value.includes(vocaloidId)

    const toggle = (vocaloidId) => {
        const index = selectedIds.value.indexOf(vocaloidId)
        if (index >= 0) {
            selectedIds.value = selectedIds.value.filter((id) => id !== vocaloidId)
            return
        }
        selectedIds.value = [...selectedIds.value, vocaloidId]
    }
</script>

<template>
    <div class="vocaloid-picker">
        <p class="vocaloid-picker-label">Who’s singing?</p>
        <div class="vocaloid-picker-track no-scrollbar" role="group" aria-label="Vocaloid picks">
            <button
                v-for="vocaloid in VOCALOID_LIST"
                :key="vocaloid.id"
                type="button"
                class="vocaloid-picker-item"
                :class="{ 'is-selected': isSelected(vocaloid.id) }"
                :disabled="disabled"
                :aria-pressed="isSelected(vocaloid.id)"
                :title="vocaloid.name"
                @click="toggle(vocaloid.id)">
                <VocaloidBadge :vocaloid-id="vocaloid.id" size="lg" />
                <span class="vocaloid-picker-name">{{ vocaloid.short }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .vocaloid-picker {
        width: 100%;
        display: grid;
        gap: 0.35rem;
    }

    .vocaloid-picker-label {
        margin: 0;
        font-size: var(--font-size-xs);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        color: var(--color-ink-dim);
        text-align: center;
    }

    .vocaloid-picker-track {
        display: flex;
        gap: 0.55rem;
        overflow-x: auto;
        padding: 0.2rem 0.15rem 0.35rem;
        scroll-snap-type: x proximity;
        justify-content: center;
    }

    .vocaloid-picker-item {
        flex: 0 0 auto;
        scroll-snap-align: center;
        display: grid;
        justify-items: center;
        gap: 0.25rem;
        padding: 0.35rem 0.45rem;
        border-radius: 0.85rem;
        border: 1px solid transparent;
        color: var(--color-ink-muted);
        cursor: pointer;
        transition:
            border-color var(--duration-fast) var(--ease-soft),
            background-color var(--duration-fast) var(--ease-soft),
            color var(--duration-fast) var(--ease-soft),
            transform var(--duration-fast) var(--ease-soft);
    }

    .vocaloid-picker-item:hover:not(:disabled) {
        color: var(--color-ink);
        background: rgba(212, 132, 132, 0.12);
    }

    .vocaloid-picker-item.is-selected {
        color: var(--color-ink);
        border-color: rgba(232, 160, 160, 0.55);
        background: rgba(212, 132, 132, 0.22);
        box-shadow: 0 0 0 1px rgba(212, 132, 132, 0.2);
    }

    .vocaloid-picker-item:disabled {
        opacity: 0.55;
        cursor: default;
    }

    .vocaloid-picker-item:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 2px;
    }

    .vocaloid-picker-name {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        letter-spacing: 0.04em;
    }

    .vocaloid-picker-item :deep(.vocaloid-badge-lg) {
        width: 2.35rem;
        height: 2.35rem;
    }
</style>
