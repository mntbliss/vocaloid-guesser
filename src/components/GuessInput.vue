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
        resultCorrect: { default: null },
        score: { type: Object, default: null }
    })

    const emit = defineEmits(['update:modelValue', 'select', 'submit', 'skip', 'listen'])

    const { localize, getTrackLabel } = useLocalization()

    const isOpen = ref(false)
    const rootElement = ref(null)

    const hasOptions = computed(() => props.options.length > 0)

    const showYourGuess = computed(() => {
        if (!props.revealedTrack || !props.guessedTrack) return false
        if (props.resultCorrect) return false
        return props.guessedTrack.id !== props.revealedTrack.id
    })

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
    <div ref="rootElement" class="guess">
        <div class="guess-row">
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
                    :disabled="Boolean(revealedTrack)"
                    @input="onInput"
                    @focus="onFocus"
                    @blur="onBlur"
                    @keydown="onKeydown" />

                <ul v-if="isOpen && hasOptions && !revealedTrack" class="guess-dropdown acrylic no-scrollbar" role="listbox">
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
                v-if="!revealedTrack"
                type="button"
                class="acrylic-btn guess-submit"
                :disabled="!canSubmit"
                @click="emit('submit')">
                <LocalizedText :locale-key="LocaleKey.GUESS" />
            </button>

            <button
                v-if="canSkip"
                type="button"
                class="acrylic-btn guess-submit"
                @click="emit('skip')">
                <LocalizedText :locale-key="LocaleKey.SKIP_TRACK" />
            </button>
        </div>

        <div v-if="revealedTrack" class="guess-reveal acrylic" :class="{ 'is-correct': resultCorrect, 'is-wrong': resultCorrect === false }">
            <div class="guess-reveal-copy">
                <p class="guess-reveal-status">
                    <LocalizedText :locale-key="resultCorrect ? LocaleKey.CORRECT : LocaleKey.OUT_OF_TRIES" />
                </p>
                <p class="guess-reveal-title">{{ getTrackLabel(revealedTrack) }}</p>
                <p v-if="showYourGuess" class="guess-reveal-yours">
                    <LocalizedText :locale-key="LocaleKey.YOUR_GUESS" />
                    <span>{{ getTrackLabel(guessedTrack) }}</span>
                </p>
                <div class="guess-reveal-vocaloids">
                    <VocaloidBadge
                        v-for="vocaloidId in revealedTrack.vocaloids"
                        :key="`reveal-${vocaloidId}`"
                        :vocaloid-id="vocaloidId"
                        size="lg" />
                </div>
                <div v-if="score" class="guess-score">
                    <span>{{ localize(LocaleKey.SONG_POINTS, { points: formatPoints(score.songPoints) }) }}</span>
                    <span>{{ localize(LocaleKey.VOCALOID_POINTS, { points: formatPoints(score.vocaloidPoints) }) }}</span>
                    <span class="guess-score-total">{{ localize(LocaleKey.TOTAL_POINTS, { points: formatPoints(score.total) }) }}</span>
                </div>
            </div>
            <a
                class="acrylic-btn guess-listen"
                :href="youtubeUrl(revealedTrack.youtubeId)"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="emit('listen', revealedTrack)">
                <LocalizedText :locale-key="LocaleKey.LISTEN" />
            </a>
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

    .guess-input {
        width: 100%;
        height: var(--guess-input-height);
        padding: 0 1rem;
        border-radius: var(--guess-input-radius);
        color: var(--color-ink);
        caret-color: var(--color-red-soft);
    }

    .guess-input:disabled {
        opacity: 0.7;
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

    .guess-reveal {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.85rem;
        padding: 0.85rem 1rem;
        border-radius: var(--guess-dropdown-radius);
    }

    .guess-reveal.is-correct {
        border-color: rgba(143, 191, 154, 0.45);
    }

    .guess-reveal.is-wrong {
        border-color: rgba(212, 132, 132, 0.5);
    }

    .guess-reveal-status {
        margin: 0;
        font-size: var(--font-size-xs);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        color: var(--color-ink-muted);
    }

    .guess-reveal-title {
        margin: 0.2rem 0 0.55rem;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
    }

    .guess-reveal-yours {
        margin: -0.25rem 0 0.55rem;
        display: grid;
        gap: 0.15rem;
        font-size: var(--font-size-xs);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--color-ink-dim);
    }

    .guess-reveal-yours span {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        letter-spacing: 0;
        text-transform: none;
        color: var(--color-ink-muted);
    }

    .guess-reveal-vocaloids {
        display: flex;
        gap: var(--badge-gap);
    }

    .guess-score {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
        margin-top: 0.55rem;
        font-size: var(--font-size-xs);
        color: var(--color-ink-muted);
    }

    .guess-score-total {
        color: var(--color-ink);
        font-weight: var(--font-weight-semibold);
    }

    .guess-listen {
        flex-shrink: 0;
        text-decoration: none;
    }

    @media (max-width: 30rem) {
        .guess-submit {
            margin-left: auto;
        }
    }
</style>
