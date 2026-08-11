<script setup>
    import { computed, onMounted, ref, watch } from 'vue'
    import { storeToRefs } from 'pinia'


    import CoverMediaToggle from '@/components/CoverMediaToggle.vue'
    import DifficultyButtons from '@/components/DifficultyButtons.vue'
    import FocusVocaloidSelect from '@/components/FocusVocaloidSelect.vue'
    import GameModeButtons from '@/components/GameModeButtons.vue'
    import GuessInput from '@/components/GuessInput.vue'
    import LanguageSelect from '@/components/LanguageSelect.vue'
    import LocalizedText from '@/components/LocalizedText.vue'
    import ModeSlider from '@/components/ModeSlider.vue'
    import ScoreBoard from '@/components/ScoreBoard.vue'
    import VinylPlayer from '@/components/VinylPlayer.vue'
    import VocaloidPicker from '@/components/VocaloidPicker.vue'
    import { LocaleKey } from '@/localization/keys'
    import { useLocalization } from '@/localization/useLocalization'
    import { Vocaloid } from '@/configs/vocaloids'
    import { youtubeUrl } from '@/data/tracks'
    import { useGameStore } from '@/stores/gameStore'
    import { useSettingsStore } from '@/stores/settingsStore'

    const settings = useSettingsStore()
    const game = useGameStore()
    const { localize, getBrandTitle } = useLocalization()

    const { catalog, difficulty, gameMode, coverMediaMode, focusVocaloidId, language } = storeToRefs(settings)
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
        coverVideo,
        sampleUrl,
        triesLeft,
        maxTries,
        sessionScore,
        isEndless,
        isSongOfTheDay,
        usesScore,
        canSkip,
        canContinue,
        needsNewGame,
        songOfTheDayCompleted,
        availableVocaloidIds,
        lockedDifficulty
    } = storeToRefs(game)

    const wrongGuessFlash = ref(false)
    let wrongFlashTimer = null
    let allowSettingResets = false

    const canSubmit = computed(
        () => Boolean(selectedGuess.value) && !revealAnswer.value && !songOfTheDayCompleted.value
    )

    const revealedTrack = computed(() => (revealAnswer.value ? currentTrack.value : null))

    const resultCorrect = computed(() => (revealAnswer.value ? (lastResult.value?.correct ?? null) : null))

    const roundScore = computed(() => lastResult.value?.score ?? null)

    const guessedTrack = computed(() => lastResult.value?.guess ?? null)

    const allowFullPlay = computed(() => Boolean(revealAnswer.value))

    const brandName = computed(() => getBrandTitle(focusVocaloidId.value))

    const continueLocaleKey = computed(() =>
        needsNewGame.value ? LocaleKey.NEW_GAME : LocaleKey.NEXT_TRACK
    )

    const showDifficultyNewGame = computed(() => !isSongOfTheDay.value)

    const canStartNewGame = computed(() => showDifficultyNewGame.value && Boolean(lockedDifficulty.value))

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
        // Goal screen: open the full YouTube track
        if (allowFullPlay.value && currentTrack.value?.youtubeId) {
            window.open(youtubeUrl(currentTrack.value.youtubeId), '_blank', 'noopener,noreferrer')
            return
        }
        game.requestPlay()
    }

    const onSkipTrack = () => game.skipTrack()

    const onContinue = () => game.continueOrReset()

    const onNewGame = () => {
        if (!canStartNewGame.value) return
        game.stopPlay()
        game.resetGame({ clearDifficultyLockForMode: true })
    }

    const syncLockedDifficulty = () => {
        if (lockedDifficulty.value && difficulty.value !== lockedDifficulty.value) {
            difficulty.value = lockedDifficulty.value
        }
    }

    const resetEverything = () => {
        if (!allowSettingResets) return
        syncLockedDifficulty()
        game.resetGame()
    }

    watch(catalog, resetEverything)
    watch(difficulty, resetEverything)
    watch(gameMode, resetEverything)
    watch(focusVocaloidId, resetEverything)
    watch(
        availableVocaloidIds,
        (availableIds) => {
            if (
                focusVocaloidId.value !== Vocaloid.EVERYONE &&
                !availableIds.has(focusVocaloidId.value)
            ) {
                focusVocaloidId.value = Vocaloid.EVERYONE
            }

            selectedVocaloids.value = selectedVocaloids.value.filter((id) => availableIds.has(id))
        },
        { immediate: true }
    )
    watch(
        brandName,
        (title) => {
            document.title = title
        },
        { immediate: true }
    )

    onMounted(() => {
        syncLockedDifficulty()
        game.resetGame()
        allowSettingResets = true
    })
</script>

<template>
    <div class="page">
        <LanguageSelect v-model:language="language" />

        <header class="page-header">
            <div class="page-brand">
                <FocusVocaloidSelect
                    v-model:focus-id="focusVocaloidId"
                    :available-ids="availableVocaloidIds" />
                <span class="page-brand-en">{{ brandName }}</span>
            </div>

            <ModeSlider v-model:catalog="catalog" />
            <div class="page-play-options">
                <GameModeButtons v-model:game-mode="gameMode" />
                <div class="page-difficulty-row">
                    <button
                        v-if="showDifficultyNewGame"
                        type="button"
                        class="acrylic-btn page-new-game"
                        :disabled="!canStartNewGame"
                        @click="onNewGame">
                        <LocalizedText :locale-key="LocaleKey.NEW_GAME" />
                    </button>
                    <span
                        v-if="showDifficultyNewGame"
                        class="page-difficulty-divider"
                        :class="{ 'is-new-game': canStartNewGame, 'is-difficulty': !canStartNewGame }"
                        aria-hidden="true" />
                    <DifficultyButtons
                        v-model:difficulty="difficulty"
                        :locked-difficulty="lockedDifficulty" />
                </div>
            </div>
            <ScoreBoard
                v-if="!isEndless"
                :score="sessionScore"
                :tries-left="triesLeft"
                :max-tries="maxTries"
                :warn-tries="wrongGuessFlash" />
        </header>

        <main class="page-stage">
            <VinylPlayer
                :cover-video="coverVideo"
                :sample-url="sampleUrl"
                :media-mode="coverMediaMode"
                :youtube-id="currentTrack?.youtubeId ?? ''"
                :preview-seconds="previewSeconds"
                :play-token="playToken"
                :is-playing="isPlaying"
                :revealed="revealAnswer"
                :allow-full-play="allowFullPlay"
                @toggle="onVinylToggle"
                @ended="onEnded" />
        </main>

        <footer class="page-footer">
            <p class="page-hint">{{ localize(LocaleKey.TAP_VINYL, { seconds: previewSeconds }) }}</p>

            <VocaloidPicker
                v-model:selected-ids="selectedVocaloids"
                :available-ids="availableVocaloidIds"
                :disabled="revealAnswer || songOfTheDayCompleted" />

            <div class="page-guess-bar">
                <CoverMediaToggle v-model:mode="coverMediaMode" />
                <GuessInput
                    :model-value="guessQuery"
                    :options="dropdownOptions"
                    :can-submit="canSubmit"
                    :can-skip="canSkip"
                    :revealed-track="revealedTrack"
                    :guessed-track="guessedTrack"
                    :result-correct="resultCorrect"
                    :score="usesScore ? roundScore : null"
                    @update:model-value="game.setGuessQuery"
                    @select="onSelectGuess"
                    @submit="onSubmitGuess"
                    @skip="onSkipTrack"
                    @listen="onListen" />
            </div>

            <p v-if="isSongOfTheDay && songOfTheDayCompleted && lastResult?.alreadyPlayed" class="page-sotd-note">
                <LocalizedText :locale-key="LocaleKey.ALREADY_PLAYED_TODAY" />
            </p>

            <div v-if="canContinue || needsNewGame" class="page-actions">
                <button type="button" class="acrylic-btn page-next" @click="onContinue">
                    <LocalizedText :locale-key="continueLocaleKey" />
                </button>
            </div>
        </footer>
    </div>
</template>

<style scoped>
    .page {
        width: 100%;
        min-height: 100dvh;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: var(--page-gap);
        padding: var(--page-padding-y) var(--page-padding-x);
        padding-bottom: calc(var(--page-padding-y) + env(safe-area-inset-bottom, 0px));
        max-width: var(--page-max-width);
        margin-inline: auto;
        box-sizing: border-box;
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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        text-align: left;
    }

    .page-brand-en {
        font-family: var(--font-display);
        font-size: var(--font-size-hero);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-display);
        color: var(--color-ink);
        line-height: 1.05;
    }

    .page-play-options {
        display: grid;
        justify-items: center;
        gap: 0.55rem;
    }

    .page-difficulty-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.65rem 0.85rem;
    }

    .page-new-game:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        filter: grayscale(0.35);
    }

    .page-difficulty-divider {
        width: 1px;
        height: 1.55rem;
        background: var(--color-accent-line);
        border-radius: 999px;
        opacity: 0.45;
        transition:
            opacity var(--duration-fast) var(--ease-soft),
            background-color var(--duration-fast) var(--ease-soft);
    }

    .page-difficulty-divider.is-new-game,
    .page-difficulty-divider.is-difficulty {
        opacity: 1;
        background: var(--color-red-soft);
    }

    @media (max-width: 40rem) {
        .page-difficulty-divider {
            width: 2.5rem;
            height: 1px;
        }
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
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: start;
        column-gap: var(--guess-row-gap);
        row-gap: 0.55rem;
        width: 100%;
        max-width: 32rem;
    }

    /* Flatten GuessInput so the reveal card can span under toggle + input */
    .page-guess-bar :deep(.guess) {
        display: contents;
    }

    .page-guess-bar :deep(.guess-row) {
        grid-column: 2;
        grid-row: 1;
        min-width: 0;
        width: 100%;
    }

    .page-guess-bar :deep(.guess-reveal) {
        grid-column: 1 / -1;
        grid-row: 2;
        width: 100%;
    }

    .page-guess-bar :deep(.cover-toggle) {
        grid-column: 1;
        grid-row: 1;
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

    .page-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.55rem;
    }

    .page-sotd-note {
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
