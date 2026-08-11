export const Language = Object.freeze({
    ENGLISH: 'en',
    JAPANESE: 'ja'
})

export const LANGUAGE_META = Object.freeze({
    [Language.ENGLISH]: {
        id: Language.ENGLISH,
        name: 'English',
        short: 'EN',
        imgUrl: '/images/languages/_en.svg'
    },
    [Language.JAPANESE]: {
        id: Language.JAPANESE,
        name: '日本語',
        short: 'JP',
        imgUrl: '/images/languages/_ja.svg'
    }
})

export const LANGUAGE_LIST = Object.freeze(Object.values(LANGUAGE_META))

export const getLanguageMeta = (languageId) =>
    LANGUAGE_META[languageId] ?? LANGUAGE_META[Language.ENGLISH]
