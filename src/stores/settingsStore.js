import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


import { CoverMediaMode, Difficulty, GameMode, SongCatalog } from '@/configs/gameConfig'
import { Language } from '@/configs/languages'
import { Vocaloid } from '@/configs/vocaloids'

const STORAGE_KEY = 'teto-guesser-settings'
const DEFAULT_VOLUME = 0.3

const readStoredSettings = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw)
    } catch {
        return null
    }
}

const resolveGameMode = (value) => {
    if (value === 'coop') return GameMode.CLASSIC
    if (Object.values(GameMode).includes(value)) return value
    return GameMode.SONG_OF_THE_DAY
}

const clampVolume = (value) => {
    const number = Number(value)
    if (!Number.isFinite(number)) return DEFAULT_VOLUME
    return Math.min(1, Math.max(0, Math.round(number * 100) / 100))
}

const persistSettings = (payload) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export const useSettingsStore = defineStore('settings', () => {
    const stored = readStoredSettings()

    const catalog = ref(stored?.catalog ?? SongCatalog.ORIGINAL)
    const difficulty = ref(stored?.difficulty ?? Difficulty.EASY)
    const gameMode = ref(resolveGameMode(stored?.gameMode))
    const coverMediaMode = ref(stored?.coverMediaMode ?? CoverMediaMode.VIDEO)
    const focusVocaloidId = ref(stored?.focusVocaloidId ?? Vocaloid.EVERYONE)
    const language = ref(stored?.language ?? Language.ENGLISH)
    const volume = ref(clampVolume(stored?.volume ?? DEFAULT_VOLUME))

    // Persist only after user changes — avoid write on first paint
    watch(
        [catalog, difficulty, gameMode, coverMediaMode, focusVocaloidId, language, volume],
        () => {
            persistSettings({
                catalog: catalog.value,
                difficulty: difficulty.value,
                gameMode: gameMode.value,
                coverMediaMode: coverMediaMode.value,
                focusVocaloidId: focusVocaloidId.value,
                language: language.value,
                volume: volume.value
            })
        }
    )

    const setCatalog = (value) => (catalog.value = value)
    const setDifficulty = (value) => (difficulty.value = value)
    const setGameMode = (value) => (gameMode.value = value)
    const setCoverMediaMode = (value) => (coverMediaMode.value = value)
    const setFocusVocaloidId = (value) => (focusVocaloidId.value = value)
    const setLanguage = (value) => (language.value = value)
    const setVolume = (value) => {
        volume.value = clampVolume(value)
    }
    const toggleCoverMediaMode = () => {
        coverMediaMode.value =
            coverMediaMode.value === CoverMediaMode.IMAGE ? CoverMediaMode.VIDEO : CoverMediaMode.IMAGE
    }

    return {
        catalog,
        difficulty,
        gameMode,
        coverMediaMode,
        focusVocaloidId,
        language,
        volume,
        setCatalog,
        setDifficulty,
        setGameMode,
        setCoverMediaMode,
        setFocusVocaloidId,
        setLanguage,
        setVolume,
        toggleCoverMediaMode
    }
})
