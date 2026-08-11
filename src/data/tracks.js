import { Vocaloid } from '@/configs/vocaloids'
import { SongCatalog } from '@/configs/gameConfig'

/**
 * Track shape:
 * { id, producer, title, vocaloids, youtubeId, catalog, coverImage?, coverVideo?, labelImage? }
 */
export const TRACKS = [
    {
        id: 'teto-machine-love',
        producer: 'Jamie Paige',
        title: 'Machine Love',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'teto-override',
        producer: 'Yoshida Yasei',
        title: 'Override',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'teto-mesmerizer',
        producer: '32ki',
        title: 'Mesmerizer',
        vocaloids: [Vocaloid.TETO, Vocaloid.MIKU],
        youtubeId: '19y8YTbvri8',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/19y8YTbvri8/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/19y8YTbvri8/hqdefault.jpg'
    },
    {
        id: 'teto-triple-baka',
        producer: 'LamazeP',
        title: 'Triple Baka',
        vocaloids: [Vocaloid.TETO, Vocaloid.MIKU],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'teto-peach-pies',
        producer: 'PINOCCHIOP',
        title: 'God-ish',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'cover-melt-teto',
        producer: 'supercell',
        title: 'Melt (Teto Cover)',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.COVER,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'cover-world-is-mine',
        producer: 'ryo',
        title: 'World is Mine (Teto Cover)',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.COVER,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'cover-rolling-girl',
        producer: 'wowaka',
        title: 'Rolling Girl (Teto Cover)',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.COVER,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'miku-teto-monitoring',
        producer: 'DECO*27',
        title: 'Monitoring',
        vocaloids: [Vocaloid.MIKU, Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
        id: 'teto-habitat',
        producer: 'null',
        title: 'Habitat',
        vocaloids: [Vocaloid.TETO],
        youtubeId: 'dQw4w9WgXcQ',
        catalog: SongCatalog.ORIGINAL,
        coverImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        coverVideo: '',
        labelImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    }
]

export const trackLabel = (track) => `${track.producer} — ${track.title}`

export const youtubeUrl = (youtubeId) => `https://www.youtube.com/watch?v=${youtubeId}`

export const filterTracks = (tracks, { catalog, query, limit }) => {
    const normalizedQuery = (query ?? '').trim().toLowerCase()
    const filtered = tracks.filter((track) => {
        if (catalog && track.catalog !== catalog) return false
        if (!normalizedQuery) return true

        const haystack = `${track.producer} ${track.title}`.toLowerCase()
        return haystack.includes(normalizedQuery)
    })

    if (!limit) return filtered
    return filtered.slice(0, limit)
}
