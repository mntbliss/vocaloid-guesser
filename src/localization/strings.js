import { Language } from '@/configs/languages'
import { LocaleKey } from '@/localization/keys'

export const STRINGS = Object.freeze({
    [Language.ENGLISH]: {
        [LocaleKey.BRAND_GUESSER]: '{name} Guesser',
        [LocaleKey.BRAND_EVERYONE]: 'Vocaloid',
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
        [LocaleKey.LISTEN]: 'Listen',
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
        [LocaleKey.ALREADY_PLAYED_TODAY]: 'Already played today'
    },
    [Language.JAPANESE]: {
        [LocaleKey.BRAND_GUESSER]: '{name}ゲッサー',
        [LocaleKey.BRAND_EVERYONE]: 'ボーカロイド',
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
        [LocaleKey.LISTEN]: '聴く',
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
        [LocaleKey.ALREADY_PLAYED_TODAY]: '今日はプレイ済み'
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
