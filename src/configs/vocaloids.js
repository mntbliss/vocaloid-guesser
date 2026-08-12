export const Vocaloid = Object.freeze({
    EVERYONE: 0,
    TETO: 1,
    MIKU: 2,
    GUMI: 3,
    KAITO: 4,
    LUKA: 5,
    MEIKO: 6,
    NERU: 7,
    IA: 8,
    UNA: 10,
    TOPAZ: 11,
    KAGAME_RIN: 13,
    KAGAME_LEN: 14
})

export const VOCALOID_META = Object.freeze({
    [Vocaloid.EVERYONE]: {
        id: Vocaloid.EVERYONE,
        name: 'Everyone',
        nameJa: 'みんな',
        color: '#c97878',
        short: 'All',
        imgUrl: ''
    },
    [Vocaloid.TETO]: {
        id: Vocaloid.TETO,
        name: 'Kasane Teto',
        nameJa: '重音テト',
        color: '#d48484',
        short: 'Teto',
        imgUrl: '/images/avatars/_teto.jpg'
    },
    [Vocaloid.MIKU]: {
        id: Vocaloid.MIKU,
        name: 'Hatsune Miku',
        nameJa: '初音ミク',
        color: '#7ec8c8',
        short: 'Miku',
        imgUrl: '/images/avatars/_miku.jpg'
    },
    [Vocaloid.GUMI]: {
        id: Vocaloid.GUMI,
        name: 'GUMI',
        nameJa: 'グミ',
        color: '#7ec8c8',
        short: 'Gumi',
        imgUrl: '/images/avatars/_gumi.jpg'
    },
    [Vocaloid.KAITO]: {
        id: Vocaloid.KAITO,
        name: 'Kaito',
        nameJa: 'カイト',
        color: '#7ec8c8',
        short: 'Kaito',
        imgUrl: '/images/avatars/_kaito.jpg'
    },
    [Vocaloid.LUKA]: {
        id: Vocaloid.LUKA,
        name: 'Luka',
        nameJa: 'ルカ',
        color: '#7ec8c8',
        short: 'Luka',
        imgUrl: '/images/avatars/_luka.jpg'
    },
    [Vocaloid.MEIKO]: {
        id: Vocaloid.MEIKO,
        name: 'Meiko',
        nameJa: 'メイコ',
        color: '#7ec8c8',
        short: 'Meiko',
        imgUrl: '/images/avatars/_meiko.jpg'
    },
    [Vocaloid.IA]: {
        id: Vocaloid.IA,
        name: 'IA',
        nameJa: 'イア',
        color: '#7ec8c8',
        short: 'IA',
        imgUrl: '/images/avatars/_ia.png'
    },
    [Vocaloid.NERU]: {
        id: Vocaloid.NERU,
        name: 'Neru',
        nameJa: 'ネル',
        color: '#7ec8c8',
        short: 'Neru',
        imgUrl: '/images/avatars/_neru.png'
    },
    [Vocaloid.UNA]: {
        id: Vocaloid.UNA,
        name: 'Una',
        nameJa: 'ユナ',
        color: '#7ec8c8',
        short: 'Una',
        imgUrl: '/images/avatars/_una.jpg'
    },
    [Vocaloid.TOPAZ]: {
        id: Vocaloid.TOPAZ,
        name: 'Topaz',
        nameJa: 'トパーズ',
        color: '#7ec8c8',
        short: 'Topaz',
        imgUrl: '/images/avatars/_topaz.png'
    },
    [Vocaloid.KAGAME_RIN]: {
        id: Vocaloid.KAGAME_RIN,
        name: 'Rin',
        nameJa: 'カガメリン',
        color: '#7ec8c8',
        short: 'Rin',
        imgUrl: '/images/avatars/_rin.jpg'
    },
    [Vocaloid.KAGAME_LEN]: {
        id: Vocaloid.KAGAME_LEN,
        name: 'Len',
        nameJa: 'カガメレン',
        color: '#7ec8c8',
        short: 'Len',
        imgUrl: '/images/avatars/_len.jpg'
    }
})

export const VOCALOID_LIST = Object.freeze(
    Object.values(VOCALOID_META).filter((vocaloid) => vocaloid.id !== Vocaloid.EVERYONE)
)

export const FOCUS_VOCALOID_LIST = Object.freeze(Object.values(VOCALOID_META))

export const getVocaloidMeta = (vocaloidId) => VOCALOID_META[vocaloidId] ?? VOCALOID_META[Vocaloid.EVERYONE]

/** Match /teto, /miku, etc. via short name (case-insensitive). */
export const findVocaloidBySlug = (slug) => {
    const key = String(slug ?? '')
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, '')
    if (!key || key === 'all') return null
    return VOCALOID_LIST.find((vocaloid) => vocaloid.short.toLowerCase() === key) ?? null
}

export const VOCALOID_SEO_TAGS = Object.freeze(
    VOCALOID_LIST.flatMap((vocaloid) => [vocaloid.short, vocaloid.name, vocaloid.nameJa].filter(Boolean))
)
