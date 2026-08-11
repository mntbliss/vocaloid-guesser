<script setup>
    import { computed } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'

    const model = defineModel({ type: String, required: true })

    const props = defineProps({
        options: {
            type: Array,
            required: true
        },
        ariaLabel: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: 'md'
        }
    })

    const activeIndex = computed(() => {
        const index = props.options.findIndex((option) => option.value === model.value)
        return index >= 0 ? index : 0
    })

    const columnCount = computed(() => Math.max(props.options.length, 1))

    const thumbStyle = computed(() => ({
        width: `calc((100% - (2 * var(--mode-slider-pad))) / ${columnCount.value})`,
        transform: `translateX(calc(${activeIndex.value} * 100%))`
    }))

    const isDisabled = (option) => Boolean(option.disabled)

    const select = (option) => {
        if (isDisabled(option)) return
        model.value = option.value
    }
</script>

<template>
    <div
        class="option-slider acrylic"
        :class="`is-${size}`"
        role="tablist"
        :aria-label="ariaLabel"
        :style="{ '--option-slider-cols': columnCount }">
        <div class="option-slider-thumb" :style="thumbStyle" aria-hidden="true" />
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="option-slider-option"
            role="tab"
            :aria-selected="model === option.value"
            :aria-disabled="isDisabled(option)"
            :disabled="isDisabled(option)"
            :class="{
                'is-active': model === option.value,
                'is-locked-out': isDisabled(option)
            }"
            @click="select(option)">
            <LocalizedText :locale-key="option.localeKey" />
        </button>
    </div>
</template>

<style scoped>
    .option-slider {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--option-slider-cols), minmax(0, 1fr));
        width: var(--mode-slider-width);
        height: var(--mode-slider-height);
        padding: var(--mode-slider-pad);
        border-radius: var(--mode-slider-radius);
        z-index: var(--z-header);
    }

    .option-slider.is-sm {
        width: var(--mode-slider-width-sm);
        height: var(--mode-slider-height-sm);
    }

    .option-slider.is-lg {
        width: var(--mode-slider-width-lg);
    }

    .option-slider-thumb {
        position: absolute;
        top: var(--mode-slider-pad);
        left: var(--mode-slider-pad);
        height: calc(100% - (var(--mode-slider-pad) * 2));
        border-radius: inherit;
        background: var(--color-acrylic-active);
        box-shadow:
            inset 0 1px 0 var(--color-acrylic-shine),
            0 0.25rem 0.75rem rgba(184, 95, 95, 0.28);
        transition: transform var(--duration-base) var(--ease-out);
        pointer-events: none;
    }

    .option-slider-option {
        position: relative;
        z-index: 1;
        display: grid;
        place-items: center;
        min-width: 0;
        padding-inline: 0.35rem;
        border-radius: inherit;
        color: var(--color-ink-muted);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: color var(--duration-fast) var(--ease-soft);
    }

    .option-slider.is-sm .option-slider-option {
        font-size: var(--font-size-xs);
        letter-spacing: var(--letter-spacing-buttons);
        text-transform: uppercase;
    }

    .option-slider-option.is-active,
    .option-slider-option:hover:not(:disabled) {
        color: var(--color-ink);
    }

    .option-slider-option.is-locked-out {
        opacity: 0.4;
        cursor: not-allowed;
        filter: grayscale(0.35);
    }

    .option-slider-option:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 2px;
    }
</style>
