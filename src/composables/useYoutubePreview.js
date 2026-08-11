import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'


let youtubeApiPromise = null

const loadYoutubeApi = () => {
    if (window.YT?.Player) return Promise.resolve(window.YT)
    if (youtubeApiPromise) return youtubeApiPromise

    youtubeApiPromise = new Promise((resolve) => {
        const previous = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = () => {
            previous?.()
            resolve(window.YT)
        }

        if (!document.getElementById('youtube-iframe-api')) {
            const script = document.createElement('script')
            script.id = 'youtube-iframe-api'
            script.src = 'https://www.youtube.com/iframe_api'
            document.head.appendChild(script)
        }
    })

    return youtubeApiPromise
}

export const useYoutubePreview = ({ youtubeId, previewSeconds, playToken, isPlaying, onEnded }) => {
    const hostElement = shallowRef(null)
    const player = shallowRef(null)
    const isReady = ref(false)
    let stopTimer = null

    const clearStopTimer = () => {
        if (!stopTimer) return
        clearTimeout(stopTimer)
        stopTimer = null
    }

    const destroyPlayer = () => {
        clearStopTimer()
        player.value?.destroy?.()
        player.value = null
        isReady.value = false
    }

    const scheduleStop = () => {
        clearStopTimer()
        stopTimer = setTimeout(() => {
            player.value?.pauseVideo?.()
            onEnded?.()
        }, previewSeconds.value * 1000)
    }

    const playPreview = async () => {
        if (!youtubeId.value || !hostElement.value) return

        const YT = await loadYoutubeApi()

        if (!player.value) {
            player.value = new YT.Player(hostElement.value, {
                width: '0',
                height: '0',
                videoId: youtubeId.value,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0
                },
                events: {
                    onReady: () => {
                        isReady.value = true
                        player.value.seekTo(0, true)
                        player.value.playVideo()
                        scheduleStop()
                    },
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.ENDED) {
                            clearStopTimer()
                            onEnded?.()
                        }
                    }
                }
            })
            return
        }

        player.value.loadVideoById({ videoId: youtubeId.value, startSeconds: 0 })
        player.value.playVideo()
        scheduleStop()
    }

    const stopPreview = () => {
        clearStopTimer()
        player.value?.pauseVideo?.()
    }

    watch(playToken, () => {
        if (!isPlaying.value) return
        playPreview()
    })

    watch(isPlaying, (playing) => {
        if (!playing) stopPreview()
    })

    watch(youtubeId, () => {
        destroyPlayer()
    })

    onBeforeUnmount(() => {
        destroyPlayer()
    })

    return {
        hostElement,
        isReady,
        playPreview,
        stopPreview
    }
}
