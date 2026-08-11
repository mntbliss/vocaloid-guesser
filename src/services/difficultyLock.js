const STORAGE_KEY = 'teto-guesser-difficulty-locks'

const readLocks = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        return JSON.parse(raw)
    } catch {
        return {}
    }
}

const writeLocks = (locks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locks))
}

export const difficultyLockKey = (gameMode, catalog) => `${gameMode}:${catalog}`

export const getLockedDifficulty = (gameMode, catalog) => {
    const locks = readLocks()
    return locks[difficultyLockKey(gameMode, catalog)] ?? null
}

export const lockDifficulty = (gameMode, catalog, difficulty) => {
    const key = difficultyLockKey(gameMode, catalog)
    const locks = readLocks()
    if (locks[key]) return locks[key]
    locks[key] = difficulty
    writeLocks(locks)
    return difficulty
}

export const clearDifficultyLock = (gameMode, catalog) => {
    const key = difficultyLockKey(gameMode, catalog)
    const locks = readLocks()
    if (!locks[key]) return
    delete locks[key]
    writeLocks(locks)
}
