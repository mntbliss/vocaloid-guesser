import { onBeforeUnmount, unref, watch } from 'vue'


/** Vinyl preview from /samples mp3 only — waits for actual playback before onStarted. */
export const useSamplePreview = ({
    sampleUrl,
    previewSeconds,
    playToken,
    isPlaying,
    enabled = true,
    onStarted,
    onEnded
}) => {
    let audio = null
    let stopTimer = null
    let playGeneration = 0
    let startedForGeneration = 0

    const clearStopTimer = () => {
        if (!stopTimer) return
        clearTimeout(stopTimer)
        stopTimer = null
    }

    const destroyAudio = () => {
        clearStopTimer()
        playGeneration += 1
        if (!audio) return
        audio.pause()
        audio.src = ''
        audio = null
    }

    const stopPreview = () => {
        clearStopTimer()
        if (!audio) return
        audio.pause()
        audio.currentTime = 0
    }

    const markStarted = (generation) => {
        if (generation !== playGeneration || startedForGeneration === generation) return
        startedForGeneration = generation
        onStarted?.()
        clearStopTimer()
        stopTimer = setTimeout(() => {
            stopPreview()
            onEnded?.()
        }, unref(previewSeconds) * 1000)
    }

    const playPreview = async () => {
        if (!unref(enabled) || !unref(isPlaying)) return

        const url = unref(sampleUrl)
        if (!url) {
            onEnded?.()
            return
        }

        stopPreview()
        const generation = ++playGeneration
        startedForGeneration = 0

        if (!audio) audio = new Audio()

        let settled = false
        const finishStart = (ok) => {
            if (settled || generation !== playGeneration) return
            settled = true
            clearTimeout(timeout)
            audio.removeEventListener('playing', onPlaying)
            audio.removeEventListener('error', onError)
            if (ok) markStarted(generation)
            else onEnded?.()
        }

        const onPlaying = () => finishStart(true)
        const onError = () => finishStart(false)
        const timeout = setTimeout(() => finishStart(!audio.paused), 2500)

        audio.addEventListener('playing', onPlaying)
        audio.addEventListener('error', onError)
        audio.src = url
        audio.currentTime = 0

        try {
            await audio.play()
        } catch {
            finishStart(false)
        }
    }

    watch(playToken, () => {
        if (!unref(enabled) || !unref(isPlaying)) return
        playPreview()
    })

    watch(isPlaying, (playing) => {
        if (!unref(enabled) || !playing) stopPreview()
    })

    watch([sampleUrl, enabled], () => {
        destroyAudio()
    })

    onBeforeUnmount(() => {
        destroyAudio()
    })

    return { stopPreview }
}
