export const SongCatalog = Object.freeze({
    ORIGINAL: 'original',
    COVER: 'cover'
})

export const Difficulty = Object.freeze({
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
})

export const CoverMediaMode = Object.freeze({
    IMAGE: 'image',
    VIDEO: 'video'
})

export const DIFFICULTY_CONFIG = Object.freeze({
    [Difficulty.EASY]: {
        previewSeconds: 12,
        maxTries: 5,
        multiplier: 1
    },
    [Difficulty.MEDIUM]: {
        previewSeconds: 5,
        maxTries: 3,
        multiplier: 2
    },
    [Difficulty.HARD]: {
        previewSeconds: 1,
        maxTries: 1,
        multiplier: 5
    }
})

export const SCORE_CONFIG = Object.freeze({
    baseSongPoints: 100,
    vocaloidCorrect: 40,
    vocaloidWrong: -20
})

export const GAME_CONFIG = Object.freeze({
    maxGuessHistory: 12,
    dropdownResultLimit: 8,
    spinWhilePlaying: true,
    defaultCoverImage: '/images/cover2.jpg',
    defaultLabelImage: '/images/cover.jpg'
})
