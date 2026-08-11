import { ref, unref, watch } from 'vue'


import { resolveYoutubeThumbnail, youtubeHqUrl } from '@/utils/youtubeThumbnail'

export const useYoutubeThumbnail = (youtubeIdSource) => {
    const thumbnailUrl = ref('')

    watch(
        () => unref(youtubeIdSource),
        async (youtubeId, _previous, onCleanup) => {
            let cancelled = false
            onCleanup(() => {
                cancelled = true
            })

            if (!youtubeId) {
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
