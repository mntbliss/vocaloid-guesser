export const Vocaloid = Object.freeze({
    TETO: 1,
    MIKU: 2,
    GUMI: 3,
    KAITO: 4,
    LUKA: 5,
    MEIKO: 6,
    RYU: 7,
    IA: 8,
    LILY: 9,
    NOIZ: 10,
    KYOKO: 11,
    RUKA: 12,
    KAGAME_RIN: 13,
    KAGAME_LEN: 14
})

export const VOCALOID_META = Object.freeze({
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
    [Vocaloid.RYU]: {
        id: Vocaloid.RYU,
        name: 'Ryu',
        nameJa: 'リュウ',
        color: '#7ec8c8',
        short: 'Ryu',
        imgUrl: '/images/avatars/_ryu.jpg'
    },
    [Vocaloid.IA]: {
        id: Vocaloid.IA,
        name: 'IA',
        nameJa: 'イア',
        color: '#7ec8c8',
        short: 'IA',
        imgUrl: '/images/avatars/_ia.jpg'
    },
    [Vocaloid.LILY]: {
        id: Vocaloid.LILY,
        name: 'Lily',
        nameJa: 'リリー',
        color: '#7ec8c8',
        short: 'Lily',
        imgUrl: '/images/avatars/_lily.jpg'
    },
    [Vocaloid.NOIZ]: {
        id: Vocaloid.NOIZ,
        name: 'Noiz',
        nameJa: 'ノイズ',
        color: '#7ec8c8',
        short: 'Noiz',
        imgUrl: '/images/avatars/_noiz.jpg'
    },
    [Vocaloid.KYOKO]: {
        id: Vocaloid.KYOKO,
        name: 'Kyoko',
        nameJa: 'キョコ',
        color: '#7ec8c8',
        short: 'Kyoko',
        imgUrl: '/images/avatars/_kyoko.jpg'
    },
    [Vocaloid.RUKA]: {
        id: Vocaloid.RUKA,
        name: 'Ruka',
        nameJa: 'ルカ',
        color: '#7ec8c8',
        short: 'Ruka',
        imgUrl: '/images/avatars/_ruka.jpg'
    },
    [Vocaloid.KAGAME_RIN]: {
        id: Vocaloid.KAGAME_RIN,
        name: 'Kagame Rin',
        nameJa: 'カガメリン',
        color: '#7ec8c8',
        short: 'Kagame Rin',
        imgUrl: '/images/avatars/_kagame_rin.jpg'
    },
    [Vocaloid.KAGAME_LEN]: {
        id: Vocaloid.KAGAME_LEN,
        name: 'Kagame Len',
        nameJa: 'カガメレン',
        color: '#7ec8c8',
        short: 'Kagame Len',
        imgUrl: '/images/avatars/_kagame_len.jpg'
    }
})

export const VOCALOID_LIST = Object.freeze(Object.values(VOCALOID_META))
