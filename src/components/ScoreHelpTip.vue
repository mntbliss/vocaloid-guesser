<script setup>
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { DIFFICULTY_CONFIG, Difficulty, SCORE_CONFIG } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'
    import { useLocalization } from '@/localization/useLocalization'

    const { localize } = useLocalization()

    const rootElement = ref(null)
    const isOpen = ref(false)

    const difficultyRows = computed(() =>
        [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map((id) => {
            const config = DIFFICULTY_CONFIG[id]
            const nameKey =
                id === Difficulty.EASY
                    ? LocaleKey.EASY
                    : id === Difficulty.MEDIUM
                      ? LocaleKey.MEDIUM
                      : LocaleKey.HARD

            return {
                id,
                name: localize(nameKey),
                tries: config.maxTries,
                seconds: config.previewSeconds,
                multiplier: config.multiplier
            }
        })
    )

    const close = () => {
        isOpen.value = false
    }

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    const onDocumentPointerDown = (event) => {
        if (!isOpen.value) return
        if (rootElement.value?.contains(event.target)) return
        close()
    }

    const onKeydown = (event) => {
        if (event.key === 'Escape') close()
    }

    onMounted(() => {
        document.addEventListener('pointerdown', onDocumentPointerDown)
        document.addEventListener('keydown', onKeydown)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('pointerdown', onDocumentPointerDown)
        document.removeEventListener('keydown', onKeydown)
    })
</script>

<template>
    <div ref="rootElement" class="score-help">
        <button
            type="button"
            class="score-help-trigger"
            :aria-expanded="isOpen"
            aria-haspopup="dialog"
            :title="localize(LocaleKey.SCORE_HELP_TITLE)"
            @click="toggle">
            ?
        </button>

        <div
            v-if="isOpen"
            class="score-help-panel acrylic"
            role="dialog"
            :aria-label="localize(LocaleKey.SCORE_HELP_TITLE)">
            <p class="score-help-heading">
                <LocalizedText :locale-key="LocaleKey.SCORE_HELP_TITLE" />
            </p>
            <ul class="score-help-list">
                <li>
                    <LocalizedText
                        :locale-key="LocaleKey.SCORE_HELP_SONG"
                        :params="{ points: SCORE_CONFIG.baseSongPoints }" />
                </li>
                <li>
                    <LocalizedText
                        :locale-key="LocaleKey.SCORE_HELP_VOCALOIDS"
                        :params="{
                            correct: SCORE_CONFIG.vocaloidCorrect,
                            wrong: SCORE_CONFIG.vocaloidWrong
                        }" />
                </li>
                <li>
                    <LocalizedText :locale-key="LocaleKey.SCORE_HELP_DIFFICULTY" />
                </li>
            </ul>

            <ul class="score-help-diffs">
                <li v-for="row in difficultyRows" :key="row.id">
                    <span class="score-help-diff-name">{{ row.name }}</span>
                    <span class="score-help-diff-meta">
                        {{
                            localize(LocaleKey.SCORE_HELP_DIFF_ROW, {
                                tries: row.tries,
                                seconds: row.seconds,
                                multiplier: row.multiplier
                            })
                        }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .score-help {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .score-help-trigger {
        width: 1.55rem;
        height: 1.55rem;
        border-radius: 50%;
        border: 1px solid rgba(232, 160, 160, 0.35);
        background: rgba(255, 236, 238, 0.08);
        color: rgba(243, 228, 230, 0.55);
        font-size: 0.85rem;
        font-weight: var(--font-weight-bold);
        line-height: 1;
        cursor: pointer;
        transition:
            color var(--duration-fast) var(--ease-soft),
            border-color var(--duration-fast) var(--ease-soft),
            background-color var(--duration-fast) var(--ease-soft);
    }

    .score-help-trigger:hover,
    .score-help-trigger[aria-expanded='true'] {
        color: var(--color-ink);
        border-color: rgba(232, 160, 160, 0.55);
        background: rgba(212, 132, 132, 0.18);
    }

    .score-help-trigger:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 2px;
    }

    .score-help-panel {
        position: absolute;
        top: calc(100% + 0.45rem);
        right: 0;
        z-index: calc(var(--z-header) + 12);
        width: min(19.5rem, calc(100vw - 1.5rem));
        padding: 0.85rem 0.9rem;
        border-radius: 0.9rem;
        text-align: left;
    }

    .score-help-heading {
        margin: 0 0 0.55rem;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
        letter-spacing: 0.02em;
        color: var(--color-ink);
    }

    .score-help-list {
        margin: 0;
        padding-left: 1.05rem;
        display: grid;
        gap: 0.4rem;
        color: var(--color-ink-muted);
        font-size: var(--font-size-xs);
        line-height: 1.4;
    }

    .score-help-diffs {
        margin: 0.7rem 0 0;
        padding: 0.55rem 0 0;
        border-top: 1px solid rgba(232, 160, 160, 0.22);
        list-style: none;
        display: grid;
        gap: 0.35rem;
    }

    .score-help-diffs li {
        display: grid;
        grid-template-columns: 4.5rem 1fr;
        gap: 0.45rem;
        align-items: baseline;
        font-size: var(--font-size-xs);
    }

    .score-help-diff-name {
        font-weight: var(--font-weight-semibold);
        color: var(--color-ink);
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .score-help-diff-meta {
        color: var(--color-ink-muted);
    }
</style>
