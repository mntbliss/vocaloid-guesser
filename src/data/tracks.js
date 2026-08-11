import { SongCatalog } from '@/configs/gameConfig'
import { Language } from '@/configs/languages'
import { Vocaloid } from '@/configs/vocaloids'

/**
 * Track shape:
 * {
 *   id, producer, title, vocaloids, youtubeId, catalog,
 *   producerJa?, titleJa?, coverVideo?, sampleUrl?
 * }
 * Display uses EN or JA from language; search matches both.
 * Vinyl preview uses /samples/{id}.mp3 (or sampleUrl). youtubeId = thumb + Listen/Video after reveal.
 */
export const TRACKS = [
    {
        id: 'teto-machine-love',
        producer: 'Jamie Paige',
        producerJa: 'ジェイミー・ペイジ',
        title: 'Machine Love',
        titleJa: 'マシンラブ',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'sqK-jh4TDXo',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-override',
        producer: 'Yoshida Yasei',
        producerJa: '吉田夜世',
        title: 'Override',
        titleJa: 'オーバーライド',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'LLjfal8jCYI',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-mesmerizer',
        producer: '32ki',
        title: 'Mesmerizer',
        titleJa: 'メズマライザー',
        vocaloids: [Vocaloid.TETO, Vocaloid.MIKU],
        youtubeId: '19y8YTbvri8',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-triple-baka',
        producer: 'LamazeP',
        producerJa: 'ラマーズP',
        title: 'Triple Baka',
        titleJa: 'トリプルバカ',
        vocaloids: [Vocaloid.TETO, Vocaloid.MIKU, Vocaloid.NERU],
        youtubeId: 'duPJqfKiA78',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'original-god-ish',
        producer: 'PINOCCHIOP',
        producerJa: 'ピノキオピー',
        title: 'God-ish',
        titleJa: '神っぽいな',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'EHBFKhLUVig',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-cover-god-ish',
        producer: 'PINOCCHIOP',
        producerJa: 'ピノキオピー',
        title: 'God-ish (Kasane Teto Cover)',
        titleJa: '神っぽいな（重音テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'uROzuNSb3Cw',
        catalog: SongCatalog.COVER
    },
    {
        id: 'original-melt',
        producer: 'supercell',
        title: 'Melt',
        titleJa: 'メルト',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: '5rFBkHb8CL8',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'cover-world-is-mine',
        producer: 'ryo',
        title: 'World is Mine (Teto Cover)',
        titleJa: 'ワールドイズマイン（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: '0eaeiSjh7pU',
        catalog: SongCatalog.COVER
    },
    {
        id: 'original-world-is-mine',
        producer: 'ryo',
        title: 'World is Mine',
        titleJa: 'ワールドイズマイン',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'jhl5afLEKdo',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'original-rolling-girl',
        producer: 'wowaka',
        title: 'Rolling Girl',
        titleJa: 'ローリンガール',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'vPlFkyXY6L0',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'cover-rolling-girl',
        producer: 'wowaka',
        title: 'Rolling Girl (Teto Cover)',
        titleJa: 'ローリンガール（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'iOtp-GQMpXg',
        catalog: SongCatalog.COVER
    },
    {
        id: 'miku-monitoring',
        producer: 'DECO*27',
        title: 'Monitoring',
        titleJa: 'モニタリング',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'kbNdx0yqbZE',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-monitoring',
        producer: 'yasai31',
        title: 'DECO*27 - Monitoring (Teto Cover)',
        titleJa: 'DECO*27 - モニタリング（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'b-lg99jzkII',
        catalog: SongCatalog.COVER
    },
    {
        id: 'tak-pppp-doridori',
        producer: 'TAK / DORIDORI',
        title: 'PPPP',
        titleJa: '',
        vocaloids: [Vocaloid.TETO, Vocaloid.MIKU],
        youtubeId: '8Cm-7oCq9HA',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'tokyo-manaka-brainrot',
        producer: 'Tokyo Manaka',
        title: 'Brainrot',
        titleJa: 'ブレインロット',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'UsjsYMo3O1Q',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-territory',
        producer: 'Oxi',
        title: 'Teto territory',
        titleJa: 'テトテリトリー',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'JALbemLw3G4',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'approve-genie-pls',
        producer: 'TRAP CHICK / 트랩칙',
        title: 'Approve please, Genie!',
        titleJa: '承認してくださいジーニーさん',
        vocaloids: [Vocaloid.TETO, Vocaloid.UNA],
        youtubeId: 'XKZIQlqVjjk',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-see-you-again',
        producer: 'Suriw',
        title: 'Tyler, The Creator - See You Again (Teto Cover)',
        titleJa: 'Tyler, The Creator - See You Again（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'yBFtw7CPFHY',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-sonic-frontiers',
        producer: 'AMA',
        title: 'Sonic Frontiers - Vandalize (Teto Cover)',
        titleJa: 'ソニックフロンティアス - バンダライズ（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'I_H62d0l1_Y',
        catalog: SongCatalog.COVER
    },
    {
        id: 'miku-sonic-frontiers',
        producer: 'AMA',
        title: 'Sonic Frontiers - Vandalize (Miku Cover)',
        titleJa: 'ソニックフロンティアス - バンダライズ（ミクカバー）',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: '6HG6b84MiTQ',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-bao-52-hearts',
        producer: 'AMA',
        title: '52 Hearts - Hikaru Station (Bao) (Teto Cover)',
        titleJa: '52 Hearts - Hikaru Station (Bao) (テトカバー)',
        vocaloids: [Vocaloid.TETO],
        youtubeId: '45gpfGC75w4',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-i-wonder',
        producer: 'Suriw',
        title: 'Kanye West - I Wonder (Teto Cover)',
        titleJa: 'Kanye West - I Wonder（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'AwrHSMcdREI',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-stuckmoth',
        producer: 'AMA',
        title: 'DECO*27 - Stuckmoth (Teto Cover)',
        titleJa: 'DECO*27 - Stuckmoth（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'XJjFWKZMw0Q',
        catalog: SongCatalog.COVER
    },
    {
        id: 'miku-stuckmoth',
        producer: 'DECO*27',
        title: 'Stuckmoth',
        titleJa: 'カイコ',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'g0JEUPfmu9c',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'miku-popipo',
        producer: 'TAROUND',
        title: 'Popipo',
        titleJa: 'ポピポ',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'HQgaCVT9Bw8',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-popipo',
        producer: 'TetoKasaneChan',
        title: 'Popipo (Teto Cover)',
        titleJa: 'ポピポ（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'pIduwPIh6_c',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-hibana',
        producer: 'さばとP',
        title: 'DECO*27 - Hibana (Spark) (Teto Cover)',
        titleJa: 'DECO*27 - ヒバナ（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'vET9_UNBrUU',
        catalog: SongCatalog.COVER
    }
]

const pickLocalized = (localized, fallback) => {
    const value = typeof localized === 'string' ? localized.trim() : localized
    return value || fallback
}

export const trackProducer = (track, language = Language.ENGLISH) => {
    if (language === Language.JAPANESE) return pickLocalized(track.producerJa, track.producer)
    return track.producer
}

export const trackTitle = (track, language = Language.ENGLISH) => {
    if (language === Language.JAPANESE) return pickLocalized(track.titleJa, track.title)
    return track.title
}

export const trackLabel = (track, language = Language.ENGLISH) => `${trackProducer(track, language)} — ${trackTitle(track, language)}`

export const trackSearchText = (track) => [track.producer, track.producerJa, track.title, track.titleJa].filter(Boolean).join(' ').toLowerCase()

export const youtubeUrl = (youtubeId) => `https://www.youtube.com/watch?v=${youtubeId}`

/** Vinyl preview clip — put files in public/samples/{id}.mp3 */
export const trackSampleUrl = (track) => {
    if (!track) return ''
    if (typeof track.sampleUrl === 'string' && track.sampleUrl.trim()) return track.sampleUrl.trim()
    return `/samples/${track.id}.mp3`
}

export const filterTracks = (tracks, { catalog, query, limit }) => {
    const normalizedQuery = (query ?? '').trim().toLowerCase()
    const filtered = tracks.filter((track) => {
        if (catalog && track.catalog !== catalog) return false
        if (!normalizedQuery) return true
        return trackSearchText(track).includes(normalizedQuery)
    })

    if (!limit) return filtered
    return filtered.slice(0, limit)
}
