<script setup>
    import { computed } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { SongCatalog } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const catalog = defineModel('catalog', { type: String, required: true })

    const options = computed(() => [
        { value: SongCatalog.ORIGINAL, localeKey: LocaleKey.ORIGINAL_SONGS },
        { value: SongCatalog.COVER, localeKey: LocaleKey.COVERS }
    ])
</script>

<template>
    <div class="mode-slider acrylic" role="tablist" aria-label="Song catalog">
        <div
            class="mode-slider-thumb"
            :class="{ 'is-covers': catalog === SongCatalog.COVER }"
            aria-hidden="true" />
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="mode-slider-option"
            role="tab"
            :aria-selected="catalog === option.value"
            :class="{ 'is-active': catalog === option.value }"
            @click="catalog = option.value">
            <LocalizedText :locale-key="option.localeKey" />
        </button>
    </div>
</template>

<style scoped>
    .mode-slider {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: var(--mode-slider-width);
        height: var(--mode-slider-height);
        padding: var(--mode-slider-pad);
        border-radius: var(--mode-slider-radius);
        z-index: var(--z-header);
    }

    .mode-slider-thumb {
        position: absolute;
        top: var(--mode-slider-pad);
        left: var(--mode-slider-pad);
        width: calc(50% - var(--mode-slider-pad));
        height: calc(100% - calc(var(--mode-slider-pad) * 2));
        border-radius: inherit;
        background: var(--color-acrylic-active);
        box-shadow:
            inset 0 1px 0 var(--color-acrylic-shine),
            0 0.25rem 0.75rem rgba(184, 95, 95, 0.28);
        transition: transform var(--duration-base) var(--ease-out);
        pointer-events: none;
    }

    .mode-slider-thumb.is-covers {
        transform: translateX(100%);
    }

    .mode-slider-option {
        position: relative;
        z-index: 1;
        display: grid;
        place-items: center;
        border-radius: inherit;
        color: var(--color-ink-muted);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: color var(--duration-fast) var(--ease-soft);
    }

    .mode-slider-option.is-active,
    .mode-slider-option:hover {
        color: var(--color-ink);
    }

    .mode-slider-option:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 2px;
    }
</style>
