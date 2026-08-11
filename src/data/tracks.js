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
        producer: 'DECO*27',
        title: 'Monitoring (Teto Cover)',
        titleJa: 'モニタリング（テトカバー）',
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
