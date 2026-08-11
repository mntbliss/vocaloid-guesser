export const Language = Object.freeze({
    ENGLISH: 'en',
    JAPANESE: 'ja'
})

export const LANGUAGE_META = Object.freeze({
    [Language.ENGLISH]: {
        id: Language.ENGLISH,
        name: 'English',
        imgUrl: '/images/languages/_en.webp'
    },
    [Language.JAPANESE]: {
        id: Language.JAPANESE,
        name: '日本語',
        imgUrl: '/images/languages/_jp.webp'
    }
})

export const LANGUAGE_LIST = Object.freeze(Object.values(LANGUAGE_META))

export const getLanguageMeta = (languageId) => LANGUAGE_META[languageId] ?? LANGUAGE_META[Language.ENGLISH]
