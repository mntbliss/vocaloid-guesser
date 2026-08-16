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
        title: 'takaokamizuki - God-ish (Teto Cover)',
        titleJa: 'タカオカミズキ - 神っぽいな（テトカバー）',
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
    },
    {
        id: 'teto-tetoris',
        producer: 'Hiiragi Magnetite',
        title: 'Tetoris',
        titleJa: 'テトリス',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'Soy4jGPHr3g',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-california-girls',
        producer: 'Persephone-P',
        title: 'Katy Perry - California Girls (Teto Cover)',
        titleJa: 'Katy Perry - California Girls（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: '3e8tdT92KKI',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-billie-jean',
        producer: 'Zireael',
        title: 'Billie Jean - MJ (Teto Cover)',
        titleJa: 'Billie Jean - MJ（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'RdUccsrVjh8',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-numb',
        producer: 'Sioell',
        title: 'Linkin Park - Numb (Teto Cover)',
        titleJa: 'Linkin Park - Numb（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: '9lzylmKhYCo',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-new-divide',
        producer: 'Sioell',
        title: 'Linkin Park - New Divide (Teto Cover)',
        titleJa: 'Linkin Park - New Divide（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'Tj17p7UP2NI',
        catalog: SongCatalog.COVER
    },
    {
        id: 'teto-gumi-teo',
        producer: 'Sioell',
        title: 'Omoi - Teo (Cover)',
        titleJa: 'Omoi - テオ (Cover)',
        vocaloids: [Vocaloid.TETO, Vocaloid.GUMI],
        youtubeId: 'R9v7gaTOxu8',
        catalog: SongCatalog.COVER
    },
    {
        id: 'miku-teo',
        producer: 'Omoi',
        title: 'Teo',
        titleJa: 'テオ',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'bmkY2yc1K7Q',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'topaz-cherry-pie',
        producer: 'Leshy-P',
        title: 'Cherry Pie',
        titleJa: 'チェリーピー',
        vocaloids: [Vocaloid.TOPAZ],
        youtubeId: 'lWP4NiOygAU',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'topaz-duckchil-crimson-valentine',
        producer: 'Duckchil',
        title: 'Crimson Valentine',
        titleJa: 'クリムゾンバレンタイン',
        vocaloids: [Vocaloid.TOPAZ],
        youtubeId: 'qvrcbH8lC9g',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'miku-confessions-of-a-rotten-girl',
        producer: 'SAWTOWNE',
        title: 'Confessions of a Rotten Girl',
        titleJa: '腐れ女の告白',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: 'sV2H712ldOI',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'shut-up-with-your-complains-neru',
        producer: 'Garuna (owataP)',
        title: 'Stop Nagging Me! (Shut Up with Your Complains)',
        titleJa: '嫌ってんなら嫌ってろ（シャットアップワィズワッシュコンプレインズ）',
        vocaloids: [Vocaloid.NERU],
        youtubeId: '-bt0IP16PZI',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'neru-flop-era',
        producer: 'ePiaeon',
        title: 'Flop Era',
        titleJa: 'フロップエラー',
        vocaloids: [Vocaloid.NERU],
        youtubeId: '1bsd8fFmTAo',
        catalog: SongCatalog.COVER
    },
    {
        id: 'king-o-lantern-neru-miku-akita',
        producer: '32ki',
        title: "King-o'-Lantern",
        titleJa: 'キング・オ・ランタン',
        vocaloids: [Vocaloid.NERU, Vocaloid.MIKU, Vocaloid.TETO],
        youtubeId: 'C1FnUXjmi6s',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'neru-cover-love-shot-sawtowne',
        producer: 'henezeo',
        title: 'SAWTOWNE - M@GICAL☆CURE! LOVE ♥ SHOT! (Neru Cover)',
        titleJa: 'SAWTOWNE - M@GICAL☆CURE! LOVE ♥ SHOT!（ネルカバー）',
        vocaloids: [Vocaloid.NERU],
        youtubeId: '4nAVZ-9h0CI',
        catalog: SongCatalog.COVER
    },
    {
        id: 'gumi-cover-retry-now-nakiso',
        producer: 'ryderflyder',
        title: 'NAKISO - Retry Now (GUMI Cover)',
        titleJa: 'なきそ - いますぐ輪廻（グミカバー）',
        vocaloids: [Vocaloid.GUMI],
        youtubeId: 'CeYKNP6lEdM',
        catalog: SongCatalog.COVER
    },
    {
        id: 'gumi-cover-headlock',
        producer: 'Novawari',
        title: 'Imogen Heap - Headlock',
        titleJa: 'Imogen Heap - Headlock',
        vocaloids: [Vocaloid.GUMI, Vocaloid.TETO],
        youtubeId: 'Ebkmzd3SER4',
        catalog: SongCatalog.COVER
    },
    {
        id: 'gumi-teto-bruno-mars-cover-die-with-a-smile',
        producer: 'OblongShape',
        title: 'Lady Gaga & Bruno Mars - Die With A Smile',
        titleJa: 'Lady Gaga & Bruno Mars - Die With A Smile',
        vocaloids: [Vocaloid.GUMI, Vocaloid.TETO],
        youtubeId: 'OzeDUhUdm6s',
        catalog: SongCatalog.COVER
    },
    {
        id: 'gumi-do-that-again',
        producer: 'Teirrel',
        title: 'Do That Again',
        titleJa: 'Do That Again',
        vocaloids: [Vocaloid.GUMI],
        youtubeId: 'jK-tt-3XJ7c',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'gumi-i-cant-wait',
        producer: 'd0tc0mmie',
        title: "I Can't Wait",
        titleJa: "I Can't Wait",
        vocaloids: [Vocaloid.GUMI],
        youtubeId: 'ESCmyMvPV_E',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'gumi-teeth-mark-love',
        producer: 'Mayonazy',
        title: 'Teeth Mark Love',
        titleJa: 'Teeth Mark Love',
        vocaloids: [Vocaloid.GUMI],
        youtubeId: 'cMnBeJcL7KY',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'gumi-givurta-vell',
        producer: 'Vell',
        title: 'Givurta',
        titleJa: 'Givurta',
        vocaloids: [Vocaloid.GUMI],
        youtubeId: '2YjKVSjdDVM',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'gumi-water-the-roses',
        producer: 'FLAVOR FOLEY',
        title: 'Water The Roses',
        titleJa: 'Water The Roses',
        vocaloids: [Vocaloid.GUMI],
        youtubeId: 'NA3MJmcyPpE',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'kaito-cover-retry-now-ciol',
        producer: 'ciol',
        producerJa: 'シオル',
        title: 'NAKISO - Retry Now (KAITO Cover)',
        titleJa: 'なきそ - いますぐ輪廻（カイトカバー）',
        vocaloids: [Vocaloid.KAITO],
        youtubeId: '9LN-4i_y-5U',
        catalog: SongCatalog.COVER
    },
    {
        id: 'miku-original-retry-now',
        producer: 'NAKISO',
        producerJa: 'なきそ',
        title: 'Retry Now',
        titleJa: 'いますぐ輪廻',
        vocaloids: [Vocaloid.MIKU],
        youtubeId: '3iUgKH8c7p4',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'teto-cover-retry-now',
        producer: 'yasai31',
        title: 'NAKISO - Retry Now (Teto Cover)',
        titleJa: 'なきそ - いますぐ輻轮（テトカバー）',
        vocaloids: [Vocaloid.TETO],
        youtubeId: '4e2XnoNEsdE',
        catalog: SongCatalog.COVER
    },
    {
        id: 'kaito-shanti-wotaku',
        producer: 'wotaku',
        title: 'SHANTI',
        titleJa: 'シャンティ',
        vocaloids: [Vocaloid.KAITO],
        youtubeId: 'POy0RvJeaqM',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'kaito-miku-ohedo-julia-night',
        producer: 'Mitchie M',
        title: 'Ohedo Julia Night',
        titleJa: '大江戸ジュリアナイト',
        vocaloids: [Vocaloid.KAITO, Vocaloid.MIKU],
        youtubeId: 'y3yyYYLyVzw',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'kaito-rosary-pale',
        producer: 'Shinjou-P',
        title: 'Rosary Pale',
        titleJa: 'ロザリーパイル',
        vocaloids: [Vocaloid.KAITO],
        youtubeId: 'CA1kx5QUQN8',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'kaito-judgment-of-evil',
        producer: 'mothy',
        title: 'Judgment of Evil',
        titleJa: '悪徳のジャッジメント',
        vocaloids: [Vocaloid.KAITO],
        youtubeId: 'xC_lHFBen5k',
        catalog: SongCatalog.ORIGINAL
    },
    {
        id: 'kaito-electric-weekend-zone',
        producer: 'CircusP feat. FLAVOR FOLEY',
        title: 'ELECTRIC WEEKEND ZONE',
        titleJa: 'エレクトリックウィークエンドゾーン',
        vocaloids: [Vocaloid.KAITO],
        youtubeId: 'lOwCUMprBoY',
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
