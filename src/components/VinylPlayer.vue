<script setup>
    import { computed, toRef } from 'vue'


    import { CoverMediaMode, GAME_CONFIG } from '@/configs/gameConfig'
    import { useYoutubePreview } from '@/composables/useYoutubePreview'

    const props = defineProps({
        coverImage: { type: String, required: true },
        coverVideo: { type: String, default: '' },
        labelImage: { type: String, required: true },
        mediaMode: { type: String, required: true },
        youtubeId: { type: String, default: '' },
        previewSeconds: { type: Number, required: true },
        playToken: { type: Number, required: true },
        isPlaying: { type: Boolean, default: false },
        revealed: { type: Boolean, default: false }
    })

    const emit = defineEmits(['toggle', 'ended'])

    const showAnswerMedia = computed(() => props.revealed)

    const showVideo = computed(
        () => showAnswerMedia.value && props.mediaMode === CoverMediaMode.VIDEO && Boolean(props.coverVideo)
    )

    const activeCoverImage = computed(() =>
        showAnswerMedia.value ? props.coverImage : GAME_CONFIG.defaultCoverImage
    )

    const activeLabelImage = computed(() =>
        showAnswerMedia.value ? props.labelImage : GAME_CONFIG.defaultLabelImage
    )

    const { hostElement } = useYoutubePreview({
        youtubeId: toRef(props, 'youtubeId'),
        previewSeconds: toRef(props, 'previewSeconds'),
        playToken: toRef(props, 'playToken'),
        isPlaying: toRef(props, 'isPlaying'),
        onEnded: () => emit('ended')
    })

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
                    <video
                        v-if="showVideo"
                        class="vinyl-stage-label-media"
                        :src="coverVideo"
                        autoplay
                        muted
                        loop
                        playsinline />
                    <img
                        v-else
                        class="vinyl-stage-label-media"
                        :src="activeLabelImage"
                        alt="" />
                    <div class="vinyl-stage-spindle" />
                </div>
            </div>

            <div class="vinyl-stage-cover">
                <div class="vinyl-stage-cover-face">
                    <video
                        v-if="showVideo"
                        class="vinyl-stage-cover-media"
                        :src="coverVideo"
                        autoplay
                        muted
                        loop
                        playsinline />
                    <img
                        v-else
                        class="vinyl-stage-cover-media"
                        :src="activeCoverImage"
                        :alt="showAnswerMedia ? 'Track cover' : 'Kasane Teto'" />
                </div>
            </div>
        </button>

        <div ref="hostElement" class="vinyl-stage-audio-host" aria-hidden="true" />
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

    .vinyl-stage-cover-media {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
