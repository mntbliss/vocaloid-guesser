<script setup>
    import { computed, ref } from 'vue'


    const volume = defineModel({ type: Number, required: true })

    const trackElement = ref(null)

    const fillPercent = computed(() => Math.round(Math.min(1, Math.max(0, volume.value)) * 100))

    const setFromClientY = (clientY) => {
        const track = trackElement.value
        if (!track) return

        const rect = track.getBoundingClientRect()
        if (rect.height <= 0) return

        // Bottom = 0%, top = 100%
        const next = (rect.bottom - clientY) / rect.height
        volume.value = Math.min(1, Math.max(0, Math.round(next * 100) / 100))
    }

    const onPointerDown = (event) => {
        if (event.button !== 0) return
        event.currentTarget.setPointerCapture?.(event.pointerId)
        setFromClientY(event.clientY)
    }

    const onPointerMove = (event) => {
        if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) return
        setFromClientY(event.clientY)
    }

    const onKeydown = (event) => {
        const step = event.shiftKey ? 0.1 : 0.05
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
            event.preventDefault()
            volume.value = Math.min(1, Math.round((volume.value + step) * 100) / 100)
            return
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
            event.preventDefault()
            volume.value = Math.max(0, Math.round((volume.value - step) * 100) / 100)
        }
    }
</script>

<template>
    <div
        class="volume-slider"
        role="slider"
        tabindex="0"
        aria-label="Volume"
        aria-orientation="vertical"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="fillPercent"
        :aria-valuetext="`${fillPercent}%`"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @keydown="onKeydown">
        <div ref="trackElement" class="volume-slider-track">
            <div class="volume-slider-fill" :style="{ height: `${fillPercent}%` }" />
            <div class="volume-slider-thumb" :style="{ bottom: `${fillPercent}%` }" />
        </div>
        <span class="volume-slider-label" aria-hidden="true">{{ fillPercent }}%</span>
    </div>
</template>

<style scoped>
    .volume-slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        width: var(--volume-slider-width);
        height: var(--volume-slider-height);
        cursor: ns-resize;
        touch-action: none;
        user-select: none;
    }

    .volume-slider:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 3px;
        border-radius: 999px;
    }

    .volume-slider-track {
        position: relative;
        flex: 1 1 auto;
        width: 100%;
        min-height: 0;
        border-radius: 999px;
        overflow: visible;
        background: rgba(20, 12, 14, 0.72);
        border: 1px solid rgba(232, 160, 160, 0.38);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0.35rem 0.9rem rgba(0, 0, 0, 0.28);
    }

    .volume-slider-fill {
        position: absolute;
        left: 2px;
        right: 2px;
        bottom: 2px;
        border-radius: inherit;
        background: linear-gradient(180deg, var(--color-red-soft) 0%, var(--color-red) 55%, var(--color-red-deep) 100%);
        pointer-events: none;
    }

    .volume-slider-thumb {
        position: absolute;
        left: 50%;
        width: 1.15rem;
        height: 1.15rem;
        border-radius: 50%;
        background: var(--color-ink);
        border: 2px solid var(--color-red-soft);
        box-shadow: 0 0.2rem 0.45rem rgba(0, 0, 0, 0.35);
        transform: translate(-50%, 50%);
        pointer-events: none;
        z-index: 1;
    }

    .volume-slider-label {
        flex: 0 0 auto;
        font-size: 0.65rem;
        font-weight: var(--font-weight-semibold);
        letter-spacing: 0.04em;
        color: var(--color-ink-muted);
        line-height: 1;
    }
</style>
