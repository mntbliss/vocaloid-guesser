import { ref, unref, watch } from 'vue'


import { resolveYoutubeThumbnail, youtubeHqUrl } from '@/utils/youtubeThumbnail'

/** Only resolve when enabled (after reveal) so pre-guess play never hits YouTube. */
export const useYoutubeThumbnail = (youtubeIdSource, { enabled = true } = {}) => {
    const thumbnailUrl = ref('')

    watch(
        [() => unref(youtubeIdSource), () => unref(enabled)],
        async ([youtubeId, isEnabled], _previous, onCleanup) => {
            let cancelled = false
            onCleanup(() => {
                cancelled = true
            })

            if (!isEnabled || !youtubeId) {
                thumbnailUrl.value = ''
                return
            }

            thumbnailUrl.value = youtubeHqUrl(youtubeId)
            const resolved = await resolveYoutubeThumbnail(youtubeId)
            if (!cancelled) thumbnailUrl.value = resolved
        },
        { immediate: true }
    )

    return { thumbnailUrl }
}
