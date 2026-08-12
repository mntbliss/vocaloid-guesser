import { Language } from '@/configs/languages'
import { LocaleKey } from '@/localization/keys'

export const STRINGS = Object.freeze({
    [Language.ENGLISH]: {
        [LocaleKey.BRAND_NAME]: 'SynthWaifu',
        [LocaleKey.BRAND_GUESSER]: '{name} Guesser',
        [LocaleKey.BRAND_EVERYONE]: 'Everyone',
        [LocaleKey.SCORE]: 'Score',
        [LocaleKey.TRIES]: 'Tries {left}/{max}',
        [LocaleKey.TAP_VINYL]: 'Tap vinyl · {seconds}s',
        [LocaleKey.WHOS_SINGING]: 'Who’s singing?',
        [LocaleKey.ORIGINAL_SONGS]: 'Original Songs',
        [LocaleKey.COVERS]: 'Covers',
        [LocaleKey.EASY]: 'Easy',
        [LocaleKey.MEDIUM]: 'Medium',
        [LocaleKey.HARD]: 'Hard',
        [LocaleKey.IMAGE]: 'Image',
        [LocaleKey.VIDEO]: 'Video',
        [LocaleKey.GUESS]: 'Guess',
        [LocaleKey.FOLLOW_CREATOR]: 'Follow Creator',
        [LocaleKey.NEXT_TRACK]: 'Next track',
        [LocaleKey.CORRECT]: 'Correct!',
        [LocaleKey.OUT_OF_TRIES]: 'Out of tries',
        [LocaleKey.SONG_POINTS]: 'Song {points}',
        [LocaleKey.VOCALOID_POINTS]: 'Vocaloids {points}',
        [LocaleKey.TOTAL_POINTS]: 'Total {points}',
        [LocaleKey.GUESS_PLACEHOLDER]: 'Producer — Song title',
        [LocaleKey.FOCUS_CHANGE]: 'Change focus',
        [LocaleKey.FOCUS_RANDOM_POOL]: 'Random pool',
        [LocaleKey.LANGUAGE]: 'Language',
        [LocaleKey.MODE_CLASSIC]: 'Classic',
        [LocaleKey.MODE_SONG_OF_THE_DAY]: 'Song of the Day',
        [LocaleKey.MODE_ENDLESS]: 'Endless',
        [LocaleKey.SKIP_TRACK]: 'Skip',
        [LocaleKey.NEW_GAME]: 'New game',
        [LocaleKey.YOUR_GUESS]: 'Your guess',
        [LocaleKey.CORRECT_GUESS]: 'Correct guess',
        [LocaleKey.ALREADY_PLAYED_TODAY]: 'Already played today',
        [LocaleKey.SCORE_HELP_TITLE]: 'How score works?',
        [LocaleKey.SCORE_HELP_SONG]:
            'Guess the song correctly to earn most points (up to {points} × difficulty multiplier; fewer tries used = more points).',
        [LocaleKey.SCORE_HELP_VOCALOIDS]:
            'Pick singers in “Who’s singing?” for bonus points (+{correct} each correct, {wrong} each wrong).',
        [LocaleKey.SCORE_HELP_DIFFICULTY]:
            'Each difficulty has its own tries, listen time, and score multiplier.',
        [LocaleKey.SCORE_HELP_DIFF_ROW]: '{tries} tries · {seconds}s · ×{multiplier}'
    },
    [Language.JAPANESE]: {
        [LocaleKey.BRAND_NAME]: 'SynthWaifu',
        [LocaleKey.BRAND_GUESSER]: '{name}ゲッサー',
        [LocaleKey.BRAND_EVERYONE]: 'すべて',
        [LocaleKey.SCORE]: 'スコア',
        [LocaleKey.TRIES]: '残り {left}/{max}',
        [LocaleKey.TAP_VINYL]: 'レコードをタップ · {seconds}秒',
        [LocaleKey.WHOS_SINGING]: '誰が歌ってる？',
        [LocaleKey.ORIGINAL_SONGS]: 'オリジナル',
        [LocaleKey.COVERS]: 'カバー',
        [LocaleKey.EASY]: 'かんたん',
        [LocaleKey.MEDIUM]: 'ふつう',
        [LocaleKey.HARD]: 'むずかしい',
        [LocaleKey.IMAGE]: '画像',
        [LocaleKey.VIDEO]: '動画',
        [LocaleKey.GUESS]: '答える',
        [LocaleKey.FOLLOW_CREATOR]: 'クリエイターをフォロー',
        [LocaleKey.NEXT_TRACK]: '次の曲',
        [LocaleKey.CORRECT]: '正解！',
        [LocaleKey.OUT_OF_TRIES]: 'ゲームオーバー',
        [LocaleKey.SONG_POINTS]: '曲 {points}',
        [LocaleKey.VOCALOID_POINTS]: 'ボカロ {points}',
        [LocaleKey.TOTAL_POINTS]: '合計 {points}',
        [LocaleKey.GUESS_PLACEHOLDER]: 'プロデューサー — 曲名',
        [LocaleKey.FOCUS_CHANGE]: 'フォーカスを変更',
        [LocaleKey.FOCUS_RANDOM_POOL]: 'ランダム',
        [LocaleKey.LANGUAGE]: '言語',
        [LocaleKey.MODE_CLASSIC]: 'クラシック',
        [LocaleKey.MODE_SONG_OF_THE_DAY]: '今日の曲',
        [LocaleKey.MODE_ENDLESS]: 'エンドレス',
        [LocaleKey.SKIP_TRACK]: 'スキップ',
        [LocaleKey.NEW_GAME]: '新しいゲーム',
        [LocaleKey.YOUR_GUESS]: 'あなたの答え',
        [LocaleKey.CORRECT_GUESS]: '正解',
        [LocaleKey.ALREADY_PLAYED_TODAY]: '今日はプレイ済み',
        [LocaleKey.SCORE_HELP_TITLE]: 'スコアの仕組みは？',
        [LocaleKey.SCORE_HELP_SONG]:
            '曲を当てると主な得点になります（最大 {points} × 難易度倍率。残りの挑戦回数が多いほど高得点）。',
        [LocaleKey.SCORE_HELP_VOCALOIDS]:
            '「誰が歌ってる？」でボカロを選ぶとボーナス（正解 +{correct} / 不正解 {wrong}）。',
        [LocaleKey.SCORE_HELP_DIFFICULTY]:
            '難易度ごとに挑戦回数・試聴秒数・倍率があります。',
        [LocaleKey.SCORE_HELP_DIFF_ROW]: '{tries}回 · {seconds}秒 · ×{multiplier}'
    }
})

const fillTemplate = (template, params = {}) =>
    template.replace(/\{(\w+)\}/g, (_, key) => {
        if (params[key] === undefined || params[key] === null) return `{${key}}`
        return String(params[key])
    })

export const translate = (language, localeKey, params = {}) => {
    const table = STRINGS[language] ?? STRINGS[Language.ENGLISH]
    const template = table[localeKey] ?? STRINGS[Language.ENGLISH][localeKey] ?? localeKey
    return fillTemplate(template, params)
}
