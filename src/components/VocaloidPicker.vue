<script setup>
    import { onBeforeUnmount, ref } from 'vue'


    import VocaloidBadge from '@/components/VocaloidBadge.vue'
    import LocalizedText from '@/components/LocalizedText.vue'
    import { VOCALOID_LIST } from '@/configs/vocaloids'
    import { LocaleKey } from '@/localization/keys'
    import { useLocalization } from '@/localization/useLocalization'

    const selectedIds = defineModel('selectedIds', { type: Array, default: () => [] })

    defineProps({
        disabled: { type: Boolean, default: false }
    })

    const { getVocaloidLabel } = useLocalization()

    const trackElement = ref(null)
    const isDragging = ref(false)
    let dragStartX = 0
    let dragScrollLeft = 0
    let dragMoved = false

    const isSelected = (vocaloidId) => selectedIds.value.includes(vocaloidId)

    const toggle = (vocaloidId) => {
        if (dragMoved) return

        const index = selectedIds.value.indexOf(vocaloidId)
        if (index >= 0) {
            selectedIds.value = selectedIds.value.filter((id) => id !== vocaloidId)
            return
        }
        selectedIds.value = [...selectedIds.value, vocaloidId]
    }

    const onWheel = (event) => {
        if (!trackElement.value) return
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

        event.preventDefault()
        trackElement.value.scrollLeft += event.deltaY
    }

    const onPointerDown = (event) => {
        if (!trackElement.value || event.button !== 0) return

        isDragging.value = true
        dragMoved = false
        dragStartX = event.clientX
        dragScrollLeft = trackElement.value.scrollLeft
        trackElement.value.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event) => {
        if (!isDragging.value || !trackElement.value) return

        const delta = event.clientX - dragStartX
        if (Math.abs(delta) > 4) dragMoved = true
        trackElement.value.scrollLeft = dragScrollLeft - delta
    }

    const endDrag = (event) => {
        if (!isDragging.value) return
        isDragging.value = false
        trackElement.value?.releasePointerCapture?.(event.pointerId)
    }

    onBeforeUnmount(() => {
        isDragging.value = false
    })
</script>

<template>
    <div class="vocaloid-picker">
        <LocalizedText class="vocaloid-picker-label" tag="p" :locale-key="LocaleKey.WHOS_SINGING" />
        <div
            ref="trackElement"
            class="vocaloid-picker-track"
            :class="{ 'is-dragging': isDragging }"
            role="group"
            aria-label="Vocaloid picks"
            @wheel="onWheel"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="endDrag"
            @pointercancel="endDrag">
            <button
                v-for="vocaloid in VOCALOID_LIST"
                :key="vocaloid.id"
                type="button"
                class="vocaloid-picker-item"
                :class="{ 'is-selected': isSelected(vocaloid.id) }"
                :disabled="disabled"
                :aria-pressed="isSelected(vocaloid.id)"
                :title="getVocaloidLabel(vocaloid.id)"
                @click="toggle(vocaloid.id)">
                <VocaloidBadge :vocaloid-id="vocaloid.id" size="lg" />
                <span class="vocaloid-picker-name">{{ getVocaloidLabel(vocaloid.id) }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .vocaloid-picker {
        width: var(--vocaloid-picker-width);
        max-width: 100%;
        display: grid;
        gap: 0.35rem;
    }

    @media (min-width: 64rem) {
        .vocaloid-picker {
            width: var(--vocaloid-picker-width-desktop);
        }
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
        gap: var(--vocaloid-picker-gap);
        overflow-x: auto;
        overscroll-behavior-x: contain;
        padding: 0.25rem 0.2rem 0.45rem;
        scroll-snap-type: x proximity;
        justify-content: flex-start;
        cursor: grab;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: var(--color-red-muted) transparent;
    }

    .vocaloid-picker-track.is-dragging {
        cursor: grabbing;
        scroll-snap-type: none;
    }

    .vocaloid-picker-track::-webkit-scrollbar {
        height: 4px;
    }

    .vocaloid-picker-track::-webkit-scrollbar-thumb {
        background: var(--color-red-muted);
        border-radius: 999px;
    }

    .vocaloid-picker-item {
        flex: 0 0 auto;
        scroll-snap-align: start;
        display: grid;
        justify-items: center;
        gap: 0.2rem;
        padding: var(--vocaloid-picker-item-pad);
        border-radius: 0.85rem;
        border: 1px solid transparent;
        color: var(--color-ink-muted);
        cursor: pointer;
        user-select: none;
        touch-action: pan-x;
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
        width: var(--vocaloid-picker-avatar);
        height: var(--vocaloid-picker-avatar);
        pointer-events: none;
    }
</style>
