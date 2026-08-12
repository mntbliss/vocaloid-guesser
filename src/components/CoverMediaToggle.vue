<script setup>
    import { computed } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { CoverMediaMode } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const mode = defineModel('mode', { type: String, required: true })

    defineProps({
        compact: { type: Boolean, default: false }
    })

    const isVideo = computed(() => mode.value === CoverMediaMode.VIDEO)
    const labelKey = computed(() => (isVideo.value ? LocaleKey.VIDEO : LocaleKey.IMAGE))

    const toggle = () => {
        mode.value = isVideo.value ? CoverMediaMode.IMAGE : CoverMediaMode.VIDEO
    }
</script>

<template>
    <button
        type="button"
        class="cover-toggle acrylic"
        :class="{ 'is-compact': compact }"
        :aria-pressed="isVideo"
        :aria-label="isVideo ? 'Video cover' : 'Image cover'"
        @click="toggle">
        <LocalizedText class="cover-toggle-label" :locale-key="labelKey" />
        <span class="cover-toggle-track" :class="{ 'is-on': isVideo }">
            <span class="cover-toggle-knob" />
        </span>
    </button>
</template>

<style scoped>
    .cover-toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.35rem 0.55rem 0.35rem 0.65rem;
        border-radius: var(--guess-input-radius);
        cursor: pointer;
        color: var(--color-ink-muted);
        transition: color var(--duration-fast) var(--ease-soft);
    }

    .cover-toggle.is-compact {
        flex-direction: column;
        gap: 0.2rem;
        padding: 0.3rem 0.35rem;
        border-radius: 0.75rem;
        width: 100%;
        max-width: 3.4rem;
    }

    .cover-toggle:hover {
        color: var(--color-ink);
    }

    .cover-toggle-label {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-wide);
        text-transform: uppercase;
    }

    .cover-toggle.is-compact .cover-toggle-label {
        font-size: 0.58rem;
        letter-spacing: 0.08em;
    }

    .cover-toggle-track {
        position: relative;
        width: var(--toggle-width);
        height: var(--toggle-height);
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.28);
        border: 1px solid var(--color-acrylic-border);
        transition: background-color var(--duration-base) var(--ease-soft);
    }

    .cover-toggle.is-compact .cover-toggle-track {
        width: 2.35rem;
        height: 1.2rem;
    }

    .cover-toggle-track.is-on {
        background: var(--color-acrylic-active);
    }

    .cover-toggle-knob {
        position: absolute;
        top: 50%;
        left: 0.15rem;
        width: var(--toggle-knob);
        height: var(--toggle-knob);
        border-radius: 50%;
        background: var(--color-ink);
        transform: translateY(-50%);
        transition: transform var(--duration-base) var(--ease-out);
        box-shadow: 0 0.15rem 0.4rem rgba(0, 0, 0, 0.3);
    }

    .cover-toggle.is-compact .cover-toggle-knob {
        width: 0.9rem;
        height: 0.9rem;
        left: 0.12rem;
    }

    .cover-toggle-track.is-on .cover-toggle-knob {
        transform: translate(1.55rem, -50%);
    }

    .cover-toggle.is-compact .cover-toggle-track.is-on .cover-toggle-knob {
        transform: translate(1.05rem, -50%);
    }
</style>
