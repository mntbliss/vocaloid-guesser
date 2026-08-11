import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


import { CoverMediaMode, Difficulty, SongCatalog } from '@/configs/gameConfig'

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

    watch(
        [catalog, difficulty, coverMediaMode],
        () => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    catalog: catalog.value,
                    difficulty: difficulty.value,
                    coverMediaMode: coverMediaMode.value
                })
            )
        },
        { deep: true }
    )

    const setCatalog = (value) => (catalog.value = value)
    const setDifficulty = (value) => (difficulty.value = value)
    const setCoverMediaMode = (value) => (coverMediaMode.value = value)
    const toggleCoverMediaMode = () => {
        coverMediaMode.value =
            coverMediaMode.value === CoverMediaMode.IMAGE ? CoverMediaMode.VIDEO : CoverMediaMode.IMAGE
    }

    return {
        catalog,
        difficulty,
        coverMediaMode,
        setCatalog,
        setDifficulty,
        setCoverMediaMode,
        toggleCoverMediaMode
    }
})
