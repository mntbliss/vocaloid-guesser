<script setup>
    import { onBeforeUnmount, ref, watch } from 'vue'


    const props = defineProps({
        score: { type: Number, default: 0 },
        triesLeft: { type: Number, default: 0 },
        maxTries: { type: Number, default: 0 },
        warnTries: { type: Boolean, default: false }
    })

    const displayedScore = ref(props.score)
    const isAnimating = ref(false)
    let animationFrame = 0

    const animateScore = (from, to) => {
        cancelAnimationFrame(animationFrame)
        if (from === to) {
            displayedScore.value = to
            isAnimating.value = false
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
        }

        animationFrame = requestAnimationFrame(tick)
    }

    watch(
        () => props.score,
        (next, prev) => {
            if (next === prev) return
            if (next < prev) {
                displayedScore.value = next
                isAnimating.value = false
                return
            }
            animateScore(prev ?? displayedScore.value, next)
        }
    )

    onBeforeUnmount(() => cancelAnimationFrame(animationFrame))
</script>

<template>
    <div class="score-board" :class="{ 'is-animating': isAnimating }">
        <div class="score-board-main">
            <span class="score-board-label">Score</span>
            <span class="score-board-value">{{ displayedScore }}</span>
        </div>
        <p class="score-board-tries" :class="{ 'is-warn': warnTries }">
            Tries {{ triesLeft }}/{{ maxTries }}
        </p>
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
        font-size: clamp(2rem, 7vw, 3rem);
        line-height: 1;
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-ink);
        transition: transform var(--duration-base) var(--ease-out), color var(--duration-fast) var(--ease-soft);
    }

    .score-board.is-animating .score-board-value {
        color: var(--color-red-soft);
        transform: scale(1.08);
    }

    .score-board-tries {
        margin: 0;
        font-size: var(--font-size-xs);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        color: var(--color-ink-dim);
    }

    .score-board-tries.is-warn {
        color: var(--color-red-soft);
    }
</style>
