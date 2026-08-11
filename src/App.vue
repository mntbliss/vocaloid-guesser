<script setup>
    import { computed, onMounted, ref, watch } from 'vue'
    import { storeToRefs } from 'pinia'


    import CoverMediaToggle from '@/components/CoverMediaToggle.vue'
    import DifficultyButtons from '@/components/DifficultyButtons.vue'
    import GuessInput from '@/components/GuessInput.vue'
    import ModeSlider from '@/components/ModeSlider.vue'
    import ScoreBoard from '@/components/ScoreBoard.vue'
    import VinylPlayer from '@/components/VinylPlayer.vue'
    import VocaloidPicker from '@/components/VocaloidPicker.vue'
    import { useGameStore } from '@/stores/gameStore'
    import { useSettingsStore } from '@/stores/settingsStore'

    const settings = useSettingsStore()
    const game = useGameStore()

    const { catalog, difficulty, coverMediaMode } = storeToRefs(settings)
    const {
        currentTrack,
        selectedGuess,
        guessQuery,
        selectedVocaloids,
        isPlaying,
        revealAnswer,
        lastResult,
        playToken,
        previewSeconds,
        dropdownOptions,
        displayMedia,
        triesLeft,
        maxTries,
        sessionScore
    } = storeToRefs(game)

    const wrongGuessFlash = ref(false)
    let wrongFlashTimer = null

    const canSubmit = computed(() => Boolean(selectedGuess.value) && !revealAnswer.value)

    const revealedTrack = computed(() => (revealAnswer.value ? currentTrack.value : null))

    const resultCorrect = computed(() => (revealAnswer.value ? (lastResult.value?.correct ?? null) : null))

    const roundScore = computed(() => lastResult.value?.score ?? null)

    const onVinylToggle = () => game.togglePlay()

    const onEnded = () => game.stopPlay()

    const onSelectGuess = (track) => game.selectGuess(track)

    const onSubmitGuess = () => {
        const wasRevealed = revealAnswer.value
        const correct = game.submitGuess()

        if (revealAnswer.value || correct || wasRevealed) return

        wrongGuessFlash.value = true
        clearTimeout(wrongFlashTimer)
        wrongFlashTimer = setTimeout(() => {
            wrongGuessFlash.value = false
        }, 700)
    }

    const onListen = () => {
        game.requestPlay()
    }

    const onNextRound = () => game.startRound()

    watch(catalog, () => game.startRound())
    watch(difficulty, () => game.startRound())

    onMounted(() => game.startRound())
</script>

<template>
    <div class="page">
        <header class="page-header">
            <p class="page-brand">
                <span class="page-brand-en">Teto Guesser</span>
                <span class="page-brand-ja">重音テト</span>
            </p>

            <ModeSlider v-model:catalog="catalog" />
            <DifficultyButtons v-model:difficulty="difficulty" />
            <ScoreBoard
                :score="sessionScore"
                :tries-left="triesLeft"
                :max-tries="maxTries"
                :warn-tries="wrongGuessFlash" />
        </header>

        <main class="page-stage">
            <VinylPlayer
                :cover-image="displayMedia.coverImage"
                :cover-video="displayMedia.coverVideo"
                :label-image="displayMedia.labelImage"
                :media-mode="coverMediaMode"
                :youtube-id="currentTrack?.youtubeId ?? ''"
                :preview-seconds="previewSeconds"
                :play-token="playToken"
                :is-playing="isPlaying"
                :revealed="revealAnswer"
                @toggle="onVinylToggle"
                @ended="onEnded" />
        </main>

        <footer class="page-footer">
            <p class="page-hint">Tap vinyl · {{ previewSeconds }}s</p>

            <VocaloidPicker v-model:selected-ids="selectedVocaloids" :disabled="revealAnswer" />

            <div class="page-guess-bar">
                <CoverMediaToggle v-model:mode="coverMediaMode" />
                <GuessInput
                    :model-value="guessQuery"
                    :options="dropdownOptions"
                    :can-submit="canSubmit"
                    :revealed-track="revealedTrack"
                    :result-correct="resultCorrect"
                    :score="roundScore"
                    @update:model-value="game.setGuessQuery"
                    @select="onSelectGuess"
                    @submit="onSubmitGuess"
                    @listen="onListen" />
            </div>

            <button v-if="revealAnswer" type="button" class="acrylic-btn page-next" @click="onNextRound">
                Next track
            </button>
        </footer>
    </div>
</template>

<style scoped>
    .page {
        min-height: 100dvh;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: var(--page-gap);
        padding: var(--page-padding-y) var(--page-padding-x);
        padding-bottom: calc(var(--page-padding-y) + env(safe-area-inset-bottom, 0px));
        max-width: var(--page-max-width);
        margin-inline: auto;
    }

    @media (min-width: 64rem) {
        .page {
            height: 100dvh;
            max-height: 100dvh;
            overflow: hidden;
            align-content: center;
        }
    }

    .page-header {
        display: grid;
        justify-items: center;
        gap: var(--header-gap);
        z-index: var(--z-header);
    }

    .page-brand {
        margin: 0;
        display: grid;
        justify-items: center;
        gap: 0.15rem;
        text-align: center;
    }

    .page-brand-en {
        font-family: var(--font-display);
        font-size: var(--font-size-hero);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-ink);
        line-height: 1.05;
    }

    .page-brand-ja {
        font-size: var(--font-size-sm);
        letter-spacing: 0.28em;
        color: var(--color-red-soft);
        text-indent: 0.28em;
    }

    .page-stage {
        display: grid;
        place-items: center;
        min-height: 0;
        padding-block: 0.35rem;
    }

    .page-footer {
        display: grid;
        justify-items: center;
        gap: 0.55rem;
        padding-bottom: 0.25rem;
        width: 100%;
    }

    .page-guess-bar {
        display: flex;
        align-items: flex-start;
        gap: var(--guess-row-gap);
        width: min(32rem, 100%);
    }

    .page-guess-bar :deep(.guess) {
        flex: 1;
        width: auto;
        min-width: 0;
        margin-inline: 0;
    }

    .page-guess-bar :deep(.cover-toggle) {
        flex-shrink: 0;
        height: var(--guess-input-height);
        padding: 0 0.65rem;
    }

    .page-hint {
        margin: 0;
        font-size: var(--font-size-xs);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
        color: var(--color-ink-dim);
    }

    .page-next {
        min-width: 8rem;
    }
</style>
