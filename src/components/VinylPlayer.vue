<script setup>
    import { computed, nextTick, ref, toRef, watch } from 'vue'


    import CoverMediaToggle from '@/components/CoverMediaToggle.vue'
    import VolumeSlider from '@/components/VolumeSlider.vue'
    import { CoverMediaMode, GAME_CONFIG } from '@/configs/gameConfig'
    import { useSamplePreview } from '@/composables/useSamplePreview'
    import { useYoutubePreview } from '@/composables/useYoutubePreview'
    import { useYoutubeThumbnail } from '@/composables/useYoutubeThumbnail'

    const props = defineProps({
        coverVideo: { type: String, default: '' },
        sampleUrl: { type: String, default: '' },
        youtubeId: { type: String, default: '' },
        previewSeconds: { type: Number, required: true },
        playToken: { type: Number, required: true },
        isPlaying: { type: Boolean, default: false },
        revealed: { type: Boolean, default: false },
        allowFullPlay: { type: Boolean, default: false },
        flash: { type: String, default: null }
    })

    const volume = defineModel('volume', { type: Number, default: 0.3 })
    const mediaMode = defineModel('mediaMode', { type: String, required: true })

    const emit = defineEmits(['toggle', 'ended'])

    const youtubeIdRef = toRef(props, 'youtubeId')
    const revealedRef = toRef(props, 'revealed')
    const { thumbnailUrl } = useYoutubeThumbnail(youtubeIdRef, { enabled: revealedRef })

    const coverHost = ref(null)
    const fileVideoElement = ref(null)
    const isAudiblyPlaying = ref(false)
    let fileStopTimer = null

    const showAnswerMedia = computed(() => props.revealed)

    const showVideo = computed(
        () =>
            showAnswerMedia.value &&
            mediaMode.value === CoverMediaMode.VIDEO &&
            Boolean(props.coverVideo || props.youtubeId)
    )

    const showFileVideo = computed(() => showVideo.value && Boolean(props.coverVideo))

    const showYoutubeVideo = computed(() => showVideo.value && !props.coverVideo && Boolean(props.youtubeId))

    const useSampleAudio = computed(() => !showFileVideo.value && !showYoutubeVideo.value)

    // Goal screen (revealed): never cut off at difficulty preview length
    const allowFullPlayRef = computed(() => Boolean(props.allowFullPlay || props.revealed))

    const activeCoverImage = computed(() =>
        showAnswerMedia.value && thumbnailUrl.value
            ? thumbnailUrl.value
            : GAME_CONFIG.defaultCoverImage
    )

    const activeLabelImage = computed(() =>
        showAnswerMedia.value && thumbnailUrl.value
            ? thumbnailUrl.value
            : GAME_CONFIG.defaultLabelImage
    )

    const applyFileVolume = () => {
        const video = fileVideoElement.value
        if (!video) return
        const next = Number(volume.value)
        video.volume = Number.isFinite(next) ? Math.min(1, Math.max(0, next)) : 0.3
    }

    const clearFileStopTimer = () => {
        if (!fileStopTimer) return
        clearTimeout(fileStopTimer)
        fileStopTimer = null
    }

    const stopFileVideo = () => {
        clearFileStopTimer()
        isAudiblyPlaying.value = false
        const video = fileVideoElement.value
        if (!video) return
        video.pause()
        video.currentTime = 0
    }

    const playFileVideo = async () => {
        const video = fileVideoElement.value
        if (!video) return

        clearFileStopTimer()
        isAudiblyPlaying.value = false
        video.currentTime = 0
        applyFileVolume()

        const onPlaying = () => {
            isAudiblyPlaying.value = true
            if (allowFullPlayRef.value) {
                const onEndedOnce = () => {
                    video.removeEventListener('ended', onEndedOnce)
                    stopFileVideo()
                    emit('ended')
                }
                video.addEventListener('ended', onEndedOnce)
                return
            }
            fileStopTimer = setTimeout(() => {
                stopFileVideo()
                emit('ended')
            }, props.previewSeconds * 1000)
        }

        video.addEventListener('playing', onPlaying, { once: true })

        try {
            await video.play()
        } catch {
            video.removeEventListener('playing', onPlaying)
            emit('ended')
        }
    }

    useSamplePreview({
        sampleUrl: toRef(props, 'sampleUrl'),
        previewSeconds: toRef(props, 'previewSeconds'),
        playToken: toRef(props, 'playToken'),
        isPlaying: toRef(props, 'isPlaying'),
        volume,
        enabled: useSampleAudio,
        allowFullPlay: allowFullPlayRef,
        onStarted: () => {
            isAudiblyPlaying.value = true
        },
        onEnded: () => {
            isAudiblyPlaying.value = false
            emit('ended')
        }
    })

    useYoutubePreview({
        youtubeId: youtubeIdRef,
        previewSeconds: toRef(props, 'previewSeconds'),
        playToken: toRef(props, 'playToken'),
        isPlaying: computed(() => props.isPlaying && showYoutubeVideo.value),
        hostElement: coverHost,
        visible: showYoutubeVideo,
        allowFullPlay: allowFullPlayRef,
        volume,
        onStarted: () => {
            isAudiblyPlaying.value = true
        },
        onEnded: () => {
            isAudiblyPlaying.value = false
            emit('ended')
        }
    })

    watch(
        () => props.isPlaying,
        (playing) => {
            if (!playing) isAudiblyPlaying.value = false
        }
    )

    watch(
        [() => props.isPlaying, () => props.playToken, showFileVideo],
        async ([playing, _token, fileMode]) => {
            if (!fileMode) {
                stopFileVideo()
                return
            }

            if (playing) {
                await nextTick()
                playFileVideo()
                return
            }

            stopFileVideo()
        }
    )

    watch(allowFullPlayRef, (fullPlay) => {
        if (fullPlay) clearFileStopTimer()
    })

    watch(volume, () => {
        applyFileVolume()
    })

    const onStageActivate = () => emit('toggle')
</script>

<template>
    <div
        class="vinyl-layout"
        :class="{
            'is-flash-wrong': flash === 'wrong',
            'is-flash-correct': flash === 'correct'
        }">
        <div class="vinyl-layout-controls">
            <VolumeSlider v-model="volume" />
            <CoverMediaToggle v-model:mode="mediaMode" compact />
        </div>

        <div class="vinyl-stage">
            <div class="vinyl-flash-glow" aria-hidden="true" />
            <button
                type="button"
                class="vinyl-stage-hit"
                :class="{ 'is-spinning': isAudiblyPlaying }"
                :aria-label="isPlaying ? 'Pause preview' : 'Play preview'"
                @click="onStageActivate">
                <div class="vinyl-stage-disc" aria-hidden="true">
                    <img class="vinyl-stage-disc-art" src="/images/vinyl.png" alt="" />
                    <div class="vinyl-stage-label">
                        <img class="vinyl-stage-label-media" :src="activeLabelImage" alt="" />
                        <div class="vinyl-stage-spindle" />
                    </div>
                </div>

                <div class="vinyl-stage-cover">
                    <div class="vinyl-stage-cover-face">
                        <video
                            v-if="showFileVideo"
                            ref="fileVideoElement"
                            class="vinyl-stage-cover-media"
                            :src="coverVideo"
                            playsinline
                            preload="metadata" />
                        <div
                            v-else-if="showYoutubeVideo"
                            ref="coverHost"
                            class="vinyl-stage-cover-youtube" />
                        <img
                            v-else
                            class="vinyl-stage-cover-media"
                            :src="activeCoverImage"
                            :alt="showAnswerMedia ? 'Track cover' : ''" />
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .vinyl-layout {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--volume-slider-gap);
        width: 100%;
        max-width: calc(var(--vinyl-stage-width) + 3.5rem + var(--volume-slider-gap));
        margin-inline: auto;
        overflow: visible;
    }

    .vinyl-layout-controls {
        flex: 0 0 auto;
        display: grid;
        justify-items: center;
        align-content: center;
        gap: 0.55rem;
        z-index: calc(var(--z-cover) + 1);
    }

    .vinyl-stage {
        position: relative;
        flex: 1 1 auto;
        width: 100%;
        max-width: var(--vinyl-stage-width);
        aspect-ratio: 1.35 / 1;
        overflow: visible;
    }

    .vinyl-flash-glow {
        position: absolute;
        top: 50%;
        /* Center on cover (cover width / 2), keep a true circle via aspect-ratio */
        left: calc(var(--vinyl-cover-size) / 2);
        width: 165%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(232, 160, 160, 0.9) 0%,
            rgba(212, 132, 132, 0.55) 18%,
            rgba(212, 132, 132, 0.28) 36%,
            rgba(212, 132, 132, 0.12) 52%,
            rgba(212, 132, 132, 0.045) 66%,
            rgba(212, 132, 132, 0.012) 80%,
            rgba(212, 132, 132, 0) 100%
        );
        opacity: 0;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        filter: blur(14px);
        will-change: transform, opacity;
    }

    .vinyl-layout.is-flash-wrong .vinyl-flash-glow {
        background: radial-gradient(
            circle,
            rgba(232, 160, 160, 0.92) 0%,
            rgba(212, 132, 132, 0.58) 18%,
            rgba(212, 132, 132, 0.3) 36%,
            rgba(184, 95, 95, 0.14) 52%,
            rgba(184, 95, 95, 0.05) 66%,
            rgba(184, 95, 95, 0.012) 80%,
            rgba(212, 132, 132, 0) 100%
        );
        animation: vinyl-glow-pulse 1s var(--ease-soft);
    }

    .vinyl-layout.is-flash-correct .vinyl-flash-glow {
        background: radial-gradient(
            circle,
            rgba(175, 214, 184, 0.92) 0%,
            rgba(143, 191, 154, 0.58) 18%,
            rgba(143, 191, 154, 0.3) 36%,
            rgba(143, 191, 154, 0.14) 52%,
            rgba(143, 191, 154, 0.05) 66%,
            rgba(143, 191, 154, 0.012) 80%,
            rgba(143, 191, 154, 0) 100%
        );
        animation: vinyl-glow-pulse 1s var(--ease-soft);
    }

    .vinyl-stage-hit {
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: var(--vinyl-radius-cover);
        z-index: 1;
    }

    .vinyl-stage-hit:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 2px;
    }

    .vinyl-stage-disc {
        position: absolute;
        top: 50%;
        left: var(--vinyl-disc-offset-x);
        z-index: var(--z-vinyl);
        width: var(--vinyl-disc-size);
        aspect-ratio: 1;
        transform: translateY(-50%);
        border-radius: 50%;
        filter: drop-shadow(0 0.8rem 1.4rem rgba(0, 0, 0, 0.45));
    }

    .vinyl-stage-hit.is-spinning .vinyl-stage-disc {
        animation: vinyl-spin var(--duration-spin) linear infinite;
    }

    .vinyl-stage-disc-art {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        pointer-events: none;
        user-select: none;
    }

    .vinyl-stage-label {
        position: absolute;
        inset: calc((100% - var(--vinyl-label-size)) / 2);
        border-radius: 50%;
        overflow: hidden;
        background: var(--color-red);
        box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.35);
    }

    .vinyl-stage-label-media {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    }

    .vinyl-stage-spindle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--vinyl-spindle-size);
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--color-vinyl);
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.35);
        z-index: 2;
    }

    .vinyl-stage-cover {
        position: absolute;
        top: 50%;
        left: 0;
        z-index: var(--z-cover);
        width: var(--vinyl-cover-size);
        aspect-ratio: 1;
        transform: translateY(-50%);
        border-radius: var(--vinyl-radius-cover);
        box-shadow: var(--vinyl-shadow);
    }

    .vinyl-stage-cover-face {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: inherit;
        background: var(--color-cover);
        border: 1px solid rgba(255, 255, 255, 0.35);
    }

    .vinyl-stage-cover-media,
    .vinyl-stage-cover-youtube {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 0;
        pointer-events: none;
    }

    .vinyl-stage-cover-youtube :deep(iframe) {
        width: 100%;
        height: 100%;
        border: 0;
        pointer-events: none;
    }

    @keyframes vinyl-spin {
        to {
            transform: translateY(-50%) rotate(360deg);
        }
    }

    @keyframes vinyl-glow-pulse {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.72);
        }
        22% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
        }
        55% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1.18);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.38);
        }
    }
</style>
