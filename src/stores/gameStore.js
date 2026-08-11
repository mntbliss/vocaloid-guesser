import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'


import { DIFFICULTY_CONFIG, GAME_CONFIG, GameMode } from '@/configs/gameConfig'
import { buildRoundScore } from '@/configs/score'
import { Vocaloid } from '@/configs/vocaloids'
import { TRACKS, filterTracks, trackLabel, trackSampleUrl } from '@/data/tracks'
import {
    findTrackById,
    getSongOfTheDayEntry,
    pickSongOfTheDayTrack,
    saveSongOfTheDayResult
} from '@/services/songOfTheDay'
import { clearDifficultyLock, getLockedDifficulty, lockDifficulty } from '@/services/difficultyLock'
import { useSettingsStore } from '@/stores/settingsStore'

const pickRandomTrack = (tracks, excludeId) => {
    const pool = tracks.filter((track) => track.id !== excludeId)
    const source = pool.length ? pool : tracks
    if (!source.length) return null
    return source[Math.floor(Math.random() * source.length)]
}

const matchesFocus = (track, focusVocaloidId) => {
    if (focusVocaloidId === Vocaloid.EVERYONE) return true
    return track.vocaloids.includes(focusVocaloidId)
}

export const useGameStore = defineStore('game', () => {
    const settings = useSettingsStore()
    const { difficulty, catalog, gameMode, focusVocaloidId, language } = storeToRefs(settings)

    const currentTrack = ref(null)
    const selectedGuess = ref(null)
    const guessQuery = ref('')
    const selectedVocaloids = ref([])
    const triesUsed = ref(0)
    const sessionTriesLeft = ref(DIFFICULTY_CONFIG[difficulty.value]?.maxTries ?? 5)
    const isPlaying = ref(false)
    const revealAnswer = ref(false)
    const lastResult = ref(null)
    const playToken = ref(0)
    const sessionScore = ref(0)
    const songOfTheDayCompleted = ref(false)

    const difficultyConfig = computed(() => DIFFICULTY_CONFIG[difficulty.value])

    const isClassic = computed(() => gameMode.value === GameMode.CLASSIC)

    const isEndless = computed(() => gameMode.value === GameMode.ENDLESS)

    const isSongOfTheDay = computed(() => gameMode.value === GameMode.SONG_OF_THE_DAY)

    const usesScore = computed(() => !isEndless.value)

    const catalogTracks = computed(() =>
        TRACKS.filter(
            (track) => track.catalog === catalog.value && matchesFocus(track, focusVocaloidId.value)
        )
    )

    /** Vocaloids that appear on at least one track in the active catalog (Original/Covers). */
    const availableVocaloidIds = computed(() => {
        const ids = new Set()
        for (const track of TRACKS) {
            if (track.catalog !== catalog.value) continue
            for (const vocaloidId of track.vocaloids) ids.add(vocaloidId)
        }
        return ids
    })

    const difficultyLockVersion = ref(0)

    const lockedDifficulty = computed(() => {
        difficultyLockVersion.value
        return getLockedDifficulty(gameMode.value, catalog.value)
    })

    const isDifficultyLocked = computed(() => Boolean(lockedDifficulty.value))

    const lockCurrentDifficulty = () => {
        lockDifficulty(gameMode.value, catalog.value, difficulty.value)
        difficultyLockVersion.value += 1
    }

    const clearCurrentDifficultyLock = () => {
        clearDifficultyLock(gameMode.value, catalog.value)
        difficultyLockVersion.value += 1
    }

    const previewSeconds = computed(() => difficultyConfig.value.previewSeconds)

    const maxTries = computed(() => difficultyConfig.value.maxTries)

    const triesLeft = computed(() => {
        if (isClassic.value) return Math.max(0, sessionTriesLeft.value)
        if (isSongOfTheDay.value) return Math.max(0, maxTries.value - triesUsed.value)
        return 0
    })

    const canSkip = computed(
        () => isEndless.value && Boolean(currentTrack.value) && !songOfTheDayCompleted.value
    )

    const canContinue = computed(() => {
        if (!revealAnswer.value) return false
        if (isSongOfTheDay.value) return false
        if (isEndless.value) return false
        return Boolean(lastResult.value?.correct)
    })

    const needsNewGame = computed(() => {
        if (!revealAnswer.value || !lastResult.value || lastResult.value.correct) return false
        return isClassic.value
    })

    const dropdownOptions = computed(() =>
        filterTracks(catalogTracks.value, {
            catalog: catalog.value,
            query: guessQuery.value,
            limit: GAME_CONFIG.dropdownResultLimit
        })
    )

    const coverVideo = computed(() => currentTrack.value?.coverVideo || '')

    const sampleUrl = computed(() => trackSampleUrl(currentTrack.value))

    const clearRoundInput = ({ resetRoundTries = true } = {}) => {
        selectedGuess.value = null
        guessQuery.value = ''
        selectedVocaloids.value = []
        if (resetRoundTries) triesUsed.value = 0
        revealAnswer.value = false
        lastResult.value = null
        isPlaying.value = false
        playToken.value += 1
    }

    const loadSongOfTheDayRound = () => {
        const track = pickSongOfTheDayTrack(catalogTracks.value)
        currentTrack.value = track
        clearRoundInput()
        songOfTheDayCompleted.value = false

        const entry = getSongOfTheDayEntry(catalog.value)
        if (!entry || !track || entry.trackId !== track.id) return

        const guessTrack = entry.guessTrackId ? findTrackById(entry.guessTrackId) : null
        const pickedVocaloids = Array.isArray(entry.pickedVocaloids) ? [...entry.pickedVocaloids] : []

        songOfTheDayCompleted.value = true
        revealAnswer.value = true
        selectedVocaloids.value = pickedVocaloids
        selectedGuess.value = guessTrack
        guessQuery.value = guessTrack ? trackLabel(guessTrack, language.value) : ''
        triesUsed.value = entry.triesUsed ?? maxTries.value
        sessionScore.value = entry.score?.total ?? 0
        lastResult.value = {
            correct: entry.correct,
            track,
            guess: guessTrack,
            score: entry.score ?? null,
            alreadyPlayed: true
        }
    }

    const loadRandomRound = ({ resetRoundTries = true } = {}) => {
        const next = pickRandomTrack(catalogTracks.value, currentTrack.value?.id)
        currentTrack.value = next
        clearRoundInput({ resetRoundTries })
        songOfTheDayCompleted.value = false
    }

    const startRound = () => {
        if (isSongOfTheDay.value) {
            loadSongOfTheDayRound()
            return
        }

        // Classic continue: keep session tries; Endless/new classic: fresh round tries
        loadRandomRound({ resetRoundTries: true })
    }

    const resetGame = ({ clearDifficultyLockForMode = false } = {}) => {
        sessionScore.value = 0
        sessionTriesLeft.value = maxTries.value
        if (clearDifficultyLockForMode && !isSongOfTheDay.value) {
            clearCurrentDifficultyLock()
        }
        startRound()
    }

    const setGuessQuery = (value) => {
        guessQuery.value = value
        if (selectedGuess.value && trackLabel(selectedGuess.value, language.value) !== value) {
            selectedGuess.value = null
        }
    }

    const selectGuess = (track) => {
        selectedGuess.value = track
        guessQuery.value = trackLabel(track, language.value)
    }

    watch(language, () => {
        if (!selectedGuess.value) return
        guessQuery.value = trackLabel(selectedGuess.value, language.value)
    })

    const finishRound = (songCorrect) => {
        let score = null

        if (usesScore.value) {
            score = buildRoundScore({
                songCorrect,
                multiplier: difficultyConfig.value.multiplier,
                maxTries: maxTries.value,
                triesUsed: triesUsed.value,
                actualVocaloids: currentTrack.value?.vocaloids ?? [],
                pickedVocaloids: selectedVocaloids.value
            })
            sessionScore.value += score.total
        }

        revealAnswer.value = true
        lastResult.value = {
            correct: songCorrect,
            track: currentTrack.value,
            guess: selectedGuess.value,
            score
        }

        if (isSongOfTheDay.value && currentTrack.value) {
            saveSongOfTheDayResult({
                catalog: catalog.value,
                correct: songCorrect,
                trackId: currentTrack.value.id,
                guessTrackId: selectedGuess.value?.id ?? null,
                pickedVocaloids: selectedVocaloids.value,
                score,
                triesUsed: triesUsed.value
            })
            songOfTheDayCompleted.value = true
        }
    }

    const submitGuess = () => {
        if (!currentTrack.value || !selectedGuess.value || revealAnswer.value) return false
        if (isSongOfTheDay.value && songOfTheDayCompleted.value) return false

        const correct = selectedGuess.value.id === currentTrack.value.id

        if (isEndless.value) {
            if (correct) {
                finishRound(true)
                return true
            }

            lastResult.value = {
                correct: false,
                track: null,
                guess: selectedGuess.value,
                score: null
            }
            selectedGuess.value = null
            guessQuery.value = ''
            return false
        }

        triesUsed.value += 1

        if (isClassic.value) {
            if (correct) {
                // Restore the try spent on this correct guess
                finishRound(true)
                return true
            }

            sessionTriesLeft.value = Math.max(0, sessionTriesLeft.value - 1)
            if (sessionTriesLeft.value <= 0) {
                finishRound(false)
                return false
            }

            lastResult.value = {
                correct: false,
                track: null,
                guess: selectedGuess.value,
                score: null
            }
            selectedGuess.value = null
            guessQuery.value = ''
            return false
        }

        // Song of the Day — tries for this song only
        if (correct || triesUsed.value >= maxTries.value) {
            finishRound(correct)
            return correct
        }

        lastResult.value = {
            correct: false,
            track: null,
            guess: selectedGuess.value,
            score: null
        }
        selectedGuess.value = null
        guessQuery.value = ''
        return false
    }

    const skipTrack = () => {
        if (!canSkip.value) return
        stopPlay()
        loadRandomRound()
    }

    const continueOrReset = () => {
        stopPlay()

        if (needsNewGame.value) {
            resetGame({ clearDifficultyLockForMode: true })
            return
        }

        if (canContinue.value) startRound()
    }

    const setPlaying = (value) => (isPlaying.value = value)

    const requestPlay = () => {
        if (!currentTrack.value) startRound()
        lockCurrentDifficulty()
        playToken.value += 1
        isPlaying.value = true
    }

    const stopPlay = () => {
        isPlaying.value = false
    }

    const togglePlay = () => {
        if (isPlaying.value) {
            stopPlay()
            return
        }
        requestPlay()
    }

    return {
        currentTrack,
        selectedGuess,
        guessQuery,
        selectedVocaloids,
        triesUsed,
        isPlaying,
        revealAnswer,
        lastResult,
        playToken,
        sessionScore,
        songOfTheDayCompleted,
        difficultyConfig,
        isClassic,
        isEndless,
        isSongOfTheDay,
        usesScore,
        catalogTracks,
        availableVocaloidIds,
        lockedDifficulty,
        isDifficultyLocked,
        previewSeconds,
        maxTries,
        triesLeft,
        canSkip,
        canContinue,
        needsNewGame,
        dropdownOptions,
        coverVideo,
        sampleUrl,
        startRound,
        resetGame,
        setGuessQuery,
        selectGuess,
        submitGuess,
        skipTrack,
        continueOrReset,
        setPlaying,
        requestPlay,
        stopPlay,
        togglePlay
    }
})
