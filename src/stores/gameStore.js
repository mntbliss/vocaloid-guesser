import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


import { DIFFICULTY_CONFIG, GAME_CONFIG } from '@/configs/gameConfig'
import { buildRoundScore } from '@/configs/score'
import { TRACKS, filterTracks, trackLabel } from '@/data/tracks'
import { useSettingsStore } from '@/stores/settingsStore'

const pickRandomTrack = (tracks, excludeId) => {
    const pool = tracks.filter((track) => track.id !== excludeId)
    const source = pool.length ? pool : tracks
    if (!source.length) return null
    return source[Math.floor(Math.random() * source.length)]
}

export const useGameStore = defineStore('game', () => {
    const settings = useSettingsStore()

    const currentTrack = ref(null)
    const selectedGuess = ref(null)
    const guessQuery = ref('')
    const selectedVocaloids = ref([])
    const triesUsed = ref(0)
    const isPlaying = ref(false)
    const revealAnswer = ref(false)
    const lastResult = ref(null)
    const playToken = ref(0)
    const sessionScore = ref(0)

    const difficultyConfig = computed(() => DIFFICULTY_CONFIG[settings.difficulty])

    const catalogTracks = computed(() => TRACKS.filter((track) => track.catalog === settings.catalog))

    const previewSeconds = computed(() => difficultyConfig.value.previewSeconds)

    const maxTries = computed(() => difficultyConfig.value.maxTries)

    const triesLeft = computed(() => Math.max(0, maxTries.value - triesUsed.value))

    const dropdownOptions = computed(() =>
        filterTracks(catalogTracks.value, {
            catalog: settings.catalog,
            query: guessQuery.value,
            limit: GAME_CONFIG.dropdownResultLimit
        })
    )

    const displayMedia = computed(() => {
        const track = currentTrack.value
        if (!track) {
            return {
                coverImage: GAME_CONFIG.defaultCoverImage,
                coverVideo: '',
                labelImage: GAME_CONFIG.defaultLabelImage
            }
        }

        return {
            coverImage: track.coverImage || GAME_CONFIG.defaultCoverImage,
            coverVideo: track.coverVideo || '',
            labelImage: track.labelImage || track.coverImage || GAME_CONFIG.defaultLabelImage
        }
    })

    const startRound = () => {
        const next = pickRandomTrack(catalogTracks.value, currentTrack.value?.id)
        currentTrack.value = next
        selectedGuess.value = null
        guessQuery.value = ''
        selectedVocaloids.value = []
        triesUsed.value = 0
        revealAnswer.value = false
        lastResult.value = null
        isPlaying.value = false
        playToken.value += 1
    }

    const setGuessQuery = (value) => {
        guessQuery.value = value
        if (selectedGuess.value && trackLabel(selectedGuess.value) !== value) {
            selectedGuess.value = null
        }
    }

    const selectGuess = (track) => {
        selectedGuess.value = track
        guessQuery.value = trackLabel(track)
    }

    const finishRound = (songCorrect) => {
        const score = buildRoundScore({
            songCorrect,
            multiplier: difficultyConfig.value.multiplier,
            maxTries: maxTries.value,
            triesUsed: triesUsed.value,
            actualVocaloids: currentTrack.value?.vocaloids ?? [],
            pickedVocaloids: selectedVocaloids.value
        })

        revealAnswer.value = true
        sessionScore.value += score.total
        lastResult.value = {
            correct: songCorrect,
            track: currentTrack.value,
            guess: selectedGuess.value,
            score
        }
    }

    const submitGuess = () => {
        if (!currentTrack.value || !selectedGuess.value || revealAnswer.value) return false

        triesUsed.value += 1
        const correct = selectedGuess.value.id === currentTrack.value.id

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

    const setPlaying = (value) => (isPlaying.value = value)

    const requestPlay = () => {
        if (!currentTrack.value) startRound()
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
        difficultyConfig,
        catalogTracks,
        previewSeconds,
        maxTries,
        triesLeft,
        dropdownOptions,
        displayMedia,
        startRound,
        setGuessQuery,
        selectGuess,
        submitGuess,
        setPlaying,
        requestPlay,
        stopPlay,
        togglePlay
    }
})
