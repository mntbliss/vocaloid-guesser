const YOUTUBE_THUMB_HOST = 'https://i.ytimg.com/vi'
const THUMB_TIMEOUT_MS = 2000
const PLACEHOLDER_MAX_WIDTH = 120

export const youtubeMaxresUrl = (youtubeId) => `${YOUTUBE_THUMB_HOST}/${youtubeId}/maxresdefault.jpg`

export const youtubeHqUrl = (youtubeId) => `${YOUTUBE_THUMB_HOST}/${youtubeId}/hqdefault.jpg`

const isUsableThumbnail = (image) => image.naturalWidth > PLACEHOLDER_MAX_WIDTH && image.naturalHeight > PLACEHOLDER_MAX_WIDTH

/**
 * Prefer maxres, if error, placeholder, or takes > 2s = usehqdefault
 */
export const resolveYoutubeThumbnail = (youtubeId, { timeoutMs = THUMB_TIMEOUT_MS } = {}) => {
    if (!youtubeId) return Promise.resolve('')

    const maxresUrl = youtubeMaxresUrl(youtubeId)
    const hqUrl = youtubeHqUrl(youtubeId)

    return new Promise((resolve) => {
        let settled = false
        const image = new Image()

        const finish = (url) => {
            if (settled) return
            settled = true
            clearTimeout(timer)
            resolve(url)
        }

        const timer = setTimeout(() => finish(hqUrl), timeoutMs)

        image.onload = () => {
            finish(isUsableThumbnail(image) ? maxresUrl : hqUrl)
        }

        image.onerror = () => finish(hqUrl)
        image.src = maxresUrl
    })
}
