<script setup>
    import { computed, nextTick, ref, toRef, watch } from 'vue'


    import { CoverMediaMode, GAME_CONFIG } from '@/configs/gameConfig'
    import { useYoutubePreview } from '@/composables/useYoutubePreview'
    import { useYoutubeThumbnail } from '@/composables/useYoutubeThumbnail'

    const props = defineProps({
        coverVideo: { type: String, default: '' },
        mediaMode: { type: String, required: true },
        youtubeId: { type: String, default: '' },
        previewSeconds: { type: Number, required: true },
        playToken: { type: Number, required: true },
        isPlaying: { type: Boolean, default: false },
        revealed: { type: Boolean, default: false }
    })

    const emit = defineEmits(['toggle', 'ended'])

    const youtubeIdRef = toRef(props, 'youtubeId')
    const { thumbnailUrl } = useYoutubeThumbnail(youtubeIdRef)

    const coverHost = ref(null)
    const audioHost = ref(null)
    const fileVideoElement = ref(null)
    let fileStopTimer = null

    const showAnswerMedia = computed(() => props.revealed)

    const showVideo = computed(
        () =>
            showAnswerMedia.value &&
            props.mediaMode === CoverMediaMode.VIDEO &&
            Boolean(props.coverVideo || props.youtubeId)
    )

    const showFileVideo = computed(() => showVideo.value && Boolean(props.coverVideo))

    const showYoutubeVideo = computed(() => showVideo.value && !props.coverVideo && Boolean(props.youtubeId))

    const playerHost = computed(() => (showYoutubeVideo.value ? coverHost.value : audioHost.value))

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

    const clearFileStopTimer = () => {
        if (!fileStopTimer) return
        clearTimeout(fileStopTimer)
        fileStopTimer = null
    }

    const stopFileVideo = () => {
        clearFileStopTimer()
        const video = fileVideoElement.value
        if (!video) return
        video.pause()
        video.currentTime = 0
    }

    const playFileVideo = async () => {
        const video = fileVideoElement.value
        if (!video) return

        clearFileStopTimer()
        video.currentTime = 0
        try {
            await video.play()
        } catch {
            emit('ended')
            return
        }

        fileStopTimer = setTimeout(() => {
            stopFileVideo()
            emit('ended')
        }, props.previewSeconds * 1000)
    }

    useYoutubePreview({
        youtubeId: youtubeIdRef,
        previewSeconds: toRef(props, 'previewSeconds'),
        playToken: toRef(props, 'playToken'),
        isPlaying: computed(() => props.isPlaying && !showFileVideo.value),
        hostElement: playerHost,
        visible: showYoutubeVideo,
        onEnded: () => emit('ended')
    })

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

    const onStageActivate = () => emit('toggle')
</script>

<template>
    <div class="vinyl-stage">
        <button
            type="button"
            class="vinyl-stage-hit"
            :class="{ 'is-spinning': isPlaying }"
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
                        :alt="showAnswerMedia ? 'Track cover' : 'Kasane Teto'" />
                </div>
            </div>
        </button>

        <div
            v-show="!showYoutubeVideo"
            ref="audioHost"
            class="vinyl-stage-audio-host"
            aria-hidden="true" />
    </div>
</template>

<style scoped>
    .vinyl-stage {
        position: relative;
        width: var(--vinyl-stage-width);
        aspect-ratio: 1.35 / 1;
        margin-inline: auto;
    }

    .vinyl-stage-hit {
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: var(--vinyl-radius-cover);
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

    .vinyl-stage-audio-host {
        position: absolute;
        width: 0;
        height: 0;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
    }

    @keyframes vinyl-spin {
        to {
            transform: translateY(-50%) rotate(360deg);
        }
    }
</style>
