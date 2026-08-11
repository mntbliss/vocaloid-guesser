import { TRACKS } from '@/data/tracks'

const CALENDAR_STORAGE_KEY = 'teto-guesser-song-of-the-day'

const toDateKey = (date = new Date()) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const hashDateKey = (dateKey) => {
    let hash = 0
    for (let index = 0; index < dateKey.length; index += 1) {
        hash = (hash * 31 + dateKey.charCodeAt(index)) >>> 0
    }
    return hash
}

export const readSongOfTheDayCalendar = () => {
    try {
        const raw = localStorage.getItem(CALENDAR_STORAGE_KEY)
        if (!raw) return {}
        return JSON.parse(raw)
    } catch {
        return {}
    }
}

export const writeSongOfTheDayCalendar = (calendar) => {
    localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(calendar))
}

export const getSongOfTheDayEntry = (date = new Date()) => {
    const calendar = readSongOfTheDayCalendar()
    return calendar[toDateKey(date)] ?? null
}

export const saveSongOfTheDayResult = ({
    correct,
    trackId,
    guessTrackId = null,
    pickedVocaloids = [],
    score = null,
    triesUsed = 0,
    date = new Date()
}) => {
    const dateKey = toDateKey(date)
    const calendar = readSongOfTheDayCalendar()
    calendar[dateKey] = {
        correct: Boolean(correct),
        trackId,
        guessTrackId,
        pickedVocaloids: [...pickedVocaloids],
        score: score
            ? {
                  songPoints: score.songPoints,
                  vocaloidPoints: score.vocaloidPoints,
                  vocaloidCorrectCount: score.vocaloidCorrectCount,
                  vocaloidWrongCount: score.vocaloidWrongCount,
                  total: score.total
              }
            : null,
        triesUsed,
        guessedAt: new Date().toISOString()
    }
    writeSongOfTheDayCalendar(calendar)
    return calendar[dateKey]
}

/** Stable daily pick from pool — replace with backend later */
export const pickSongOfTheDayTrack = (pool, date = new Date()) => {
    const source = pool.length ? pool : TRACKS
    if (!source.length) return null

    const dateKey = toDateKey(date)
    const index = hashDateKey(dateKey) % source.length
    return source[index]
}

export const findTrackById = (trackId) => TRACKS.find((track) => track.id === trackId) ?? null
