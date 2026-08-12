import { onBeforeUnmount, unref, watch } from 'vue'


/** Vinyl preview from /samples mp3 — waits for playback start; optional full play (no cutoff). */
export const useSamplePreview = ({
    sampleUrl,
    previewSeconds,
    playToken,
    isPlaying,
    volume = 0.3,
    enabled = true,
    allowFullPlay = false,
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

    const applyVolume = () => {
        if (!audio) return
        const next = Number(unref(volume))
        audio.volume = Number.isFinite(next) ? Math.min(1, Math.max(0, next)) : 0.3
    }

    const onAudioEnded = () => {
        onEnded?.()
    }

    const destroyAudio = () => {
        clearStopTimer()
        playGeneration += 1
        if (!audio) return
        audio.removeEventListener('ended', onAudioEnded)
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

        if (unref(allowFullPlay)) return

        const seconds = Number(unref(previewSeconds))
        if (!Number.isFinite(seconds) || seconds <= 0) return

        stopTimer = setTimeout(() => {
            stopPreview()
            onEnded?.()
        }, seconds * 1000)
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

        if (!audio) {
            audio = new Audio()
            audio.addEventListener('ended', onAudioEnded)
        }

        applyVolume()

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

    watch(volume, () => {
        applyVolume()
    })

    watch(allowFullPlay, (fullPlay) => {
        if (fullPlay) clearStopTimer()
    })

    watch([sampleUrl, enabled], () => {
        destroyAudio()
    })

    onBeforeUnmount(() => {
        destroyAudio()
    })

    return { stopPreview }
}
