<script setup>
    import { onBeforeUnmount, ref, watch } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { LocaleKey } from '@/localization/keys'

    const props = defineProps({
        score: { type: Number, default: 0 }
    })

    const displayedScore = ref(props.score)
    const isAnimating = ref(false)
    let animationFrame = 0

    const stopAnimation = () => {
        cancelAnimationFrame(animationFrame)
        animationFrame = 0
        isAnimating.value = false
    }

    const animateScore = (from, to) => {
        stopAnimation()
        if (from === to) {
            displayedScore.value = to
            return
        }

        isAnimating.value = true
        const duration = 900
        const start = performance.now()
        const delta = to - from

        const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - progress, 3)
            displayedScore.value = Math.round(from + delta * eased)

            if (progress < 1) {
                animationFrame = requestAnimationFrame(tick)
                return
            }

            displayedScore.value = to
            isAnimating.value = false
            animationFrame = 0
        }

        animationFrame = requestAnimationFrame(tick)
    }

    watch(
        () => props.score,
        (next, prev) => {
            if (next === prev) return
            if (next <= prev) {
                stopAnimation()
                displayedScore.value = next
                return
            }
            animateScore(displayedScore.value, next)
        }
    )

    onBeforeUnmount(() => stopAnimation())
</script>

<template>
    <div class="score-board" :class="{ 'is-animating': isAnimating }">
        <div class="score-board-main">
            <LocalizedText class="score-board-label" :locale-key="LocaleKey.SCORE" />
            <span class="score-board-value">{{ displayedScore }}</span>
        </div>
    </div>
</template>

<style scoped>
    .score-board {
        display: grid;
        justify-items: center;
        gap: 0.2rem;
    }

    .score-board-main {
        display: grid;
        justify-items: center;
        gap: 0.05rem;
    }

    .score-board-label {
        font-size: var(--font-size-xs);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        color: var(--color-ink-dim);
    }

    .score-board-value {
        font-family: var(--font-display);
        font-size: clamp(1.85rem, 6vw, 2.6rem);
        font-weight: var(--font-weight-semibold);
        line-height: 1;
        letter-spacing: var(--letter-spacing-display);
        color: var(--color-ink);
        transition:
            transform var(--duration-base) var(--ease-out),
            color var(--duration-fast) var(--ease-soft);
    }

    .score-board.is-animating .score-board-value {
        color: var(--color-red-soft);
        transform: scale(1.08);
    }
</style>
