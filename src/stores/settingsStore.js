import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


import { CoverMediaMode, Difficulty, SongCatalog } from '@/configs/gameConfig'
import { Language } from '@/configs/languages'
import { Vocaloid } from '@/configs/vocaloids'

const STORAGE_KEY = 'teto-guesser-settings'

const readStoredSettings = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw)
    } catch {
        return null
    }
}

export const useSettingsStore = defineStore('settings', () => {
    const stored = readStoredSettings()

    const catalog = ref(stored?.catalog ?? SongCatalog.ORIGINAL)
    const difficulty = ref(stored?.difficulty ?? Difficulty.EASY)
    const coverMediaMode = ref(stored?.coverMediaMode ?? CoverMediaMode.IMAGE)
    const focusVocaloidId = ref(stored?.focusVocaloidId ?? Vocaloid.EVERYONE)
    const language = ref(stored?.language ?? Language.ENGLISH)

    watch(
        [catalog, difficulty, coverMediaMode, focusVocaloidId, language],
        () => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    catalog: catalog.value,
                    difficulty: difficulty.value,
                    coverMediaMode: coverMediaMode.value,
                    focusVocaloidId: focusVocaloidId.value,
                    language: language.value
                })
            )
        },
        { deep: true }
    )

    const setCatalog = (value) => (catalog.value = value)
    const setDifficulty = (value) => (difficulty.value = value)
    const setCoverMediaMode = (value) => (coverMediaMode.value = value)
    const setFocusVocaloidId = (value) => (focusVocaloidId.value = value)
    const setLanguage = (value) => (language.value = value)
    const toggleCoverMediaMode = () => {
        coverMediaMode.value =
            coverMediaMode.value === CoverMediaMode.IMAGE ? CoverMediaMode.VIDEO : CoverMediaMode.IMAGE
    }

    return {
        catalog,
        difficulty,
        coverMediaMode,
        focusVocaloidId,
        language,
        setCatalog,
        setDifficulty,
        setCoverMediaMode,
        setFocusVocaloidId,
        setLanguage,
        toggleCoverMediaMode
    }
})
