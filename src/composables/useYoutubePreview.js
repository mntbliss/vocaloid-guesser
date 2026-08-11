import { onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'


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

export const useYoutubePreview = ({
    youtubeId,
    previewSeconds,
    playToken,
    isPlaying,
    hostElement,
    visible = false,
    onStarted,
    onEnded
}) => {
    const player = shallowRef(null)
    const isReady = ref(false)
    let stopTimer = null
    let createToken = 0
    let listenToken = 0
    let startedListenToken = 0

    const clearStopTimer = () => {
        if (!stopTimer) return
        clearTimeout(stopTimer)
        stopTimer = null
    }

    const destroyPlayer = () => {
        clearStopTimer()
        createToken += 1
        listenToken += 1
        player.value?.destroy?.()
        player.value = null
        isReady.value = false
    }

    const scheduleStop = () => {
        clearStopTimer()
        stopTimer = setTimeout(() => {
            player.value?.pauseVideo?.()
            onEnded?.()
        }, unref(previewSeconds) * 1000)
    }

    const markStarted = () => {
        if (startedListenToken === listenToken) return
        startedListenToken = listenToken
        onStarted?.()
        scheduleStop()
    }

    const resolveSize = (host, isVisible) => {
        if (!isVisible) return { width: 48, height: 48 }
        return {
            width: Math.max(host.clientWidth || 0, 1),
            height: Math.max(host.clientHeight || 0, 1)
        }
    }

    const beginListen = () => {
        listenToken += 1
        startedListenToken = 0
        clearStopTimer()
    }

    const ensurePlayer = async ({ shouldPlay = false } = {}) => {
        const id = unref(youtubeId)
        const host = unref(hostElement)
        const isVisible = Boolean(unref(visible))
        if (!id || !host) return

        const YT = await loadYoutubeApi()
        const token = ++createToken

        if (!player.value) {
            player.value = new YT.Player(host, {
                width: resolveSize(host, isVisible).width,
                height: resolveSize(host, isVisible).height,
                videoId: id,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0
                },
                events: {
                    onReady: () => {
                        if (token !== createToken) return
                        isReady.value = true
                        player.value?.cueVideoById?.({ videoId: id, startSeconds: 0 })
                        if (shouldPlay || unref(isPlaying)) {
                            beginListen()
                            player.value?.seekTo?.(0, true)
                            player.value?.playVideo?.()
                        }
                    },
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.PLAYING) markStarted()
                        if (event.data === YT.PlayerState.ENDED) {
                            clearStopTimer()
                            onEnded?.()
                        }
                    }
                }
            })
            return
        }

        if (shouldPlay || unref(isPlaying)) {
            beginListen()
            player.value.loadVideoById({ videoId: id, startSeconds: 0 })
            player.value.playVideo()
            return
        }

        player.value.cueVideoById({ videoId: id, startSeconds: 0 })
    }

    const playPreview = async () => {
        await ensurePlayer({ shouldPlay: true })
    }

    const stopPreview = () => {
        clearStopTimer()
        player.value?.pauseVideo?.()
    }

    watch(playToken, () => {
        if (!unref(isPlaying)) return
        playPreview()
    })

    watch(isPlaying, (playing) => {
        if (!playing) stopPreview()
    })

    watch([youtubeId, hostElement, visible], () => {
        destroyPlayer()
        if (unref(visible) && unref(youtubeId) && unref(hostElement)) {
            ensurePlayer({ shouldPlay: false })
        }
    })

    onBeforeUnmount(() => {
        destroyPlayer()
    })

    return {
        isReady,
        playPreview,
        stopPreview
    }
}
