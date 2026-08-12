<script setup>
    import { computed, nextTick, ref } from 'vue'


    import VocaloidBadge from '@/components/VocaloidBadge.vue'
    import LocalizedText from '@/components/LocalizedText.vue'
    import { youtubeUrl } from '@/data/tracks'
    import { LocaleKey } from '@/localization/keys'
    import { useLocalization } from '@/localization/useLocalization'

    const props = defineProps({
        modelValue: { type: String, default: '' },
        options: { type: Array, default: () => [] },
        canSubmit: { type: Boolean, default: false },
        canSkip: { type: Boolean, default: false },
        revealedTrack: { type: Object, default: null },
        guessedTrack: { type: Object, default: null },
        pickedVocaloids: { type: Array, default: () => [] },
        resultCorrect: { default: null },
        score: { type: Object, default: null },
        flash: { type: String, default: null },
        triesLeft: { type: Number, default: null },
        maxTries: { type: Number, default: null },
        showTries: { type: Boolean, default: false }
    })

    const emit = defineEmits(['update:modelValue', 'select', 'submit', 'skip'])

    const { localize, getTrackLabel } = useLocalization()

    const isOpen = ref(false)
    const rootElement = ref(null)

    const hasOptions = computed(() => props.options.length > 0)
    const isRevealed = computed(() => Boolean(props.revealedTrack))

    const triesLabel = computed(() => {
        if (!props.showTries) return ''
        return `(${props.triesLeft}/${props.maxTries})`
    })

    const yourPanelTone = computed(() => (props.resultCorrect ? 'correct' : 'wrong'))

    const onInput = (event) => {
        isOpen.value = true
        emit('update:modelValue', event.target.value)
    }

    const onFocus = () => {
        isOpen.value = true
    }

    const onBlur = async () => {
        await nextTick()
        if (rootElement.value?.contains(document.activeElement)) return
        isOpen.value = false
    }

    const onSelect = (track) => {
        emit('select', track)
        isOpen.value = false
    }

    const onKeydown = (event) => {
        if (event.key === 'Escape') {
            isOpen.value = false
            return
        }

        if (event.key === 'Enter') {
            event.preventDefault()
            if (props.canSubmit) {
                emit('submit')
                return
            }
            if (props.options[0]) onSelect(props.options[0])
        }
    }

    const formatPoints = (value) => (value > 0 ? `+${value}` : `${value}`)
</script>

<template>
    <div
        ref="rootElement"
        class="guess"
        :class="{
            'is-flash-wrong': flash === 'wrong' && !isRevealed,
            'is-flash-correct': flash === 'correct' && !isRevealed,
            'is-revealed': isRevealed
        }">
        <div v-if="!isRevealed" class="guess-row">
            <div class="guess-field">
                <label class="visually-hidden" for="guess-input">Guess the track</label>
                <input
                    id="guess-input"
                    class="guess-input acrylic"
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    :placeholder="localize(LocaleKey.GUESS_PLACEHOLDER)"
                    :value="modelValue"
                    @input="onInput"
                    @focus="onFocus"
                    @blur="onBlur"
                    @keydown="onKeydown" />

                <ul v-if="isOpen && hasOptions" class="guess-dropdown acrylic no-scrollbar" role="listbox">
                    <li v-for="track in options" :key="track.id">
                        <button
                            type="button"
                            class="guess-option"
                            role="option"
                            @mousedown.prevent="onSelect(track)">
                            <span class="guess-option-title truncate">{{ getTrackLabel(track) }}</span>
                        </button>
                    </li>
                </ul>
            </div>

            <button
                type="button"
                class="acrylic-btn guess-submit"
                :class="{
                    'has-tries': showTries,
                    'is-tries-warn': flash === 'wrong'
                }"
                :disabled="!canSubmit"
                :aria-label="showTries ? `Guess ${triesLabel}` : 'Guess'"
                @click="emit('submit')">
                <span class="guess-submit-stack">
                    <LocalizedText :locale-key="LocaleKey.GUESS" />
                    <span v-if="showTries" class="guess-submit-tries">{{ triesLabel }}</span>
                </span>
            </button>

            <button
                v-if="canSkip"
                type="button"
                class="acrylic-btn guess-submit"
                @click="emit('skip')">
                <LocalizedText :locale-key="LocaleKey.SKIP_TRACK" />
            </button>
        </div>

        <div v-else class="guess-result">
            <div class="guess-panels">
                <section class="guess-panel acrylic" :class="`is-${yourPanelTone}`">
                    <h3 class="guess-panel-title">
                        <LocalizedText :locale-key="LocaleKey.YOUR_GUESS" />
                    </h3>
                    <div class="guess-panel-vocaloids">
                        <VocaloidBadge
                            v-for="vocaloidId in pickedVocaloids"
                            :key="`picked-${vocaloidId}`"
                            :vocaloid-id="vocaloidId"
                            size="lg" />
                        <span v-if="!pickedVocaloids.length" class="guess-panel-empty">—</span>
                    </div>
                    <p class="guess-panel-song">
                        {{ guessedTrack ? getTrackLabel(guessedTrack) : '—' }}
                    </p>
                </section>

                <section class="guess-panel acrylic is-correct">
                    <h3 class="guess-panel-title">
                        <LocalizedText :locale-key="LocaleKey.CORRECT_GUESS" />
                    </h3>
                    <div class="guess-panel-vocaloids">
                        <VocaloidBadge
                            v-for="vocaloidId in revealedTrack.vocaloids"
                            :key="`actual-${vocaloidId}`"
                            :vocaloid-id="vocaloidId"
                            size="lg" />
                    </div>
                    <p class="guess-panel-song">{{ getTrackLabel(revealedTrack) }}</p>
                </section>
            </div>

            <div class="guess-result-footer">
                <div v-if="score" class="guess-score">
                    <span>{{ localize(LocaleKey.SONG_POINTS, { points: formatPoints(score.songPoints) }) }}</span>
                    <span>{{ localize(LocaleKey.VOCALOID_POINTS, { points: formatPoints(score.vocaloidPoints) }) }}</span>
                    <span class="guess-score-total">{{ localize(LocaleKey.TOTAL_POINTS, { points: formatPoints(score.total) }) }}</span>
                </div>
                <a
                    class="acrylic-btn guess-follow"
                    :href="youtubeUrl(revealedTrack.youtubeId)"
                    target="_blank"
                    rel="noopener noreferrer">
                    <LocalizedText :locale-key="LocaleKey.FOLLOW_CREATOR" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .guess {
        width: 100%;
        display: grid;
        gap: 0.55rem;
    }

    .guess-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--guess-row-gap);
        align-items: start;
    }

    .guess-field {
        position: relative;
        flex: 1 1 12rem;
        min-width: 0;
    }

    .guess-submit {
        flex: 0 0 auto;
        height: var(--guess-input-height);
        padding-inline: 1.1rem;
        border-radius: var(--guess-input-radius);
    }

    .guess-submit.has-tries {
        padding-block: 0.2rem;
    }

    .guess-submit-stack {
        display: grid;
        justify-items: center;
        gap: 0.05rem;
        line-height: 1.05;
    }

    .guess-submit-tries {
        font-size: 0.68rem;
        font-weight: var(--font-weight-semibold);
        letter-spacing: 0.06em;
        color: var(--color-ink-muted);
    }

    .guess-submit.is-tries-warn .guess-submit-tries {
        color: var(--color-red-soft);
    }

    .guess-input {
        width: 100%;
        height: var(--guess-input-height);
        padding: 0 1rem;
        border-radius: var(--guess-input-radius);
        color: var(--color-ink);
        caret-color: var(--color-red-soft);
    }

    .guess-input::placeholder {
        color: var(--color-ink-dim);
    }

    .guess-input:focus {
        border-color: rgba(232, 160, 160, 0.55);
        outline: none;
        box-shadow:
            inset 0 1px 0 var(--color-acrylic-shine),
            0 0 0 2px rgba(212, 132, 132, 0.25);
    }

    .guess.is-flash-wrong .guess-row {
        animation: guess-shake 0.45s var(--ease-out);
    }

    .guess.is-flash-wrong .guess-input {
        border-color: rgba(232, 160, 160, 0.72);
        background:
            linear-gradient(145deg, rgba(212, 132, 132, 0.3) 0%, rgba(42, 28, 31, 0.72) 48%, rgba(20, 12, 14, 0.55) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 0 1px rgba(212, 132, 132, 0.3),
            0 0 1.1rem rgba(212, 132, 132, 0.38),
            0 0 2rem rgba(212, 132, 132, 0.18);
    }

    .guess.is-flash-correct .guess-input {
        border-color: rgba(143, 191, 154, 0.72);
        background:
            linear-gradient(145deg, rgba(143, 191, 154, 0.3) 0%, rgba(42, 28, 31, 0.72) 48%, rgba(20, 12, 14, 0.55) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 0 1px rgba(143, 191, 154, 0.3),
            0 0 1.1rem rgba(143, 191, 154, 0.38),
            0 0 2rem rgba(143, 191, 154, 0.18);
    }

    .guess-dropdown {
        position: absolute;
        bottom: calc(100% + 0.4rem);
        left: 0;
        right: 0;
        z-index: var(--z-dropdown);
        margin: 0;
        padding: 0.35rem;
        list-style: none;
        max-height: var(--guess-dropdown-max-height);
        overflow: auto;
        border-radius: var(--guess-dropdown-radius);
        backdrop-filter: blur(var(--blur-dropdown)) saturate(1.4);
        -webkit-backdrop-filter: blur(var(--blur-dropdown)) saturate(1.4);
    }

    .guess-option {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.7rem 0.75rem;
        border-radius: 0.65rem;
        text-align: left;
        cursor: pointer;
        color: var(--color-ink-muted);
        transition:
            background-color var(--duration-fast) var(--ease-soft),
            color var(--duration-fast) var(--ease-soft);
    }

    .guess-option:hover,
    .guess-option:focus-visible {
        background: rgba(212, 132, 132, 0.18);
        color: var(--color-ink);
    }

    .guess-option-title {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    }

    .guess-result {
        display: grid;
        gap: 0.7rem;
        width: 100%;
    }

    .guess-panels {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.65rem;
        width: 100%;
    }

    .guess-panel {
        display: grid;
        justify-items: center;
        align-content: start;
        gap: 0.55rem;
        padding: 0.75rem 0.7rem 0.85rem;
        border-radius: var(--guess-dropdown-radius);
        text-align: center;
        min-width: 0;
    }

    .guess-panel.is-correct {
        border-color: rgba(143, 191, 154, 0.7);
        background:
            linear-gradient(145deg, rgba(143, 191, 154, 0.28) 0%, rgba(42, 28, 31, 0.72) 48%, rgba(20, 12, 14, 0.55) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 0 1px rgba(143, 191, 154, 0.28),
            0 0 1.1rem rgba(143, 191, 154, 0.3),
            0 0.35rem 1rem rgba(0, 0, 0, 0.2);
    }

    .guess-panel.is-wrong {
        border-color: rgba(232, 160, 160, 0.72);
        background:
            linear-gradient(145deg, rgba(212, 132, 132, 0.3) 0%, rgba(42, 28, 31, 0.72) 48%, rgba(20, 12, 14, 0.55) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 0 1px rgba(212, 132, 132, 0.3),
            0 0 1.1rem rgba(212, 132, 132, 0.32),
            0 0.35rem 1rem rgba(0, 0, 0, 0.2);
    }

    .guess-panel-title {
        margin: 0;
        width: 100%;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        color: var(--color-ink);
        text-align: center;
    }

    .guess-panel-vocaloids {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--badge-gap);
        min-height: 2.2rem;
        align-items: center;
    }

    .guess-panel-empty {
        color: var(--color-ink-dim);
        font-size: var(--font-size-sm);
    }

    .guess-panel-song {
        margin: 0;
        width: 100%;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        line-height: 1.3;
        color: var(--color-ink);
        overflow-wrap: anywhere;
    }

    .guess-result-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.55rem;
    }

    .guess-score {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
        font-size: var(--font-size-xs);
        color: var(--color-ink-muted);
    }

    .guess-score-total {
        color: var(--color-ink);
        font-weight: var(--font-weight-semibold);
    }

    .guess-follow {
        flex-shrink: 0;
        text-decoration: none;
        margin-left: auto;
    }

    @media (max-width: 30rem) {
        .guess-submit {
            margin-left: auto;
        }

        .guess-panels {
            gap: 0.5rem;
        }

        .guess-panel {
            padding: 0.65rem 0.5rem 0.75rem;
        }
    }

    @keyframes guess-shake {
        0%,
        100% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(-0.28rem);
        }
        40% {
            transform: translateX(0.26rem);
        }
        60% {
            transform: translateX(-0.18rem);
        }
        80% {
            transform: translateX(0.12rem);
        }
    }
</style>
