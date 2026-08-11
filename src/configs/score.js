import { SCORE_CONFIG } from '@/configs/gameConfig'

export const scoreSongGuess = ({ correct, multiplier, maxTries, triesUsed }) => {
    if (!correct) return 0

    const tryFactor = (maxTries - triesUsed + 1) / maxTries
    return Math.round(SCORE_CONFIG.baseSongPoints * multiplier * tryFactor)
}

export const scoreVocaloidPicks = ({ actualVocaloids, pickedVocaloids }) => {
    const actual = new Set(actualVocaloids ?? [])
    const picked = pickedVocaloids ?? []

    let points = 0
    let correctCount = 0
    let wrongCount = 0

    for (const vocaloidId of picked) {
        if (actual.has(vocaloidId)) {
            points += SCORE_CONFIG.vocaloidCorrect
            correctCount += 1
            continue
        }

        points += SCORE_CONFIG.vocaloidWrong
        wrongCount += 1
    }

    return { points, correctCount, wrongCount }
}

export const buildRoundScore = ({
    songCorrect,
    multiplier,
    maxTries,
    triesUsed,
    actualVocaloids,
    pickedVocaloids
}) => {
    const songPoints = scoreSongGuess({
        correct: songCorrect,
        multiplier,
        maxTries,
        triesUsed
    })
    const vocaloid = scoreVocaloidPicks({ actualVocaloids, pickedVocaloids })
    const total = songPoints + vocaloid.points

    return {
        songPoints,
        vocaloidPoints: vocaloid.points,
        vocaloidCorrectCount: vocaloid.correctCount,
        vocaloidWrongCount: vocaloid.wrongCount,
        total
    }
}
