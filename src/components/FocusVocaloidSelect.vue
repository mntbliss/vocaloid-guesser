<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue'


    import VocaloidBadge from '@/components/VocaloidBadge.vue'
    import { Language } from '@/configs/languages'
    import { FOCUS_VOCALOID_LIST, Vocaloid } from '@/configs/vocaloids'
    import { LocaleKey } from '@/localization/keys'
    import { useLocalization } from '@/localization/useLocalization'

    const focusId = defineModel('focusId', { type: Number, default: Vocaloid.EVERYONE })

    const { localize, getVocaloidLabel, language } = useLocalization()

    const rootElement = ref(null)
    const isOpen = ref(false)

    const optionSubtitle = (vocaloid) => {
        if (vocaloid.id === Vocaloid.EVERYONE) return localize(LocaleKey.FOCUS_RANDOM_POOL)
        return language.value === Language.JAPANESE ? vocaloid.nameJa : vocaloid.name
    }

    const close = () => {
        isOpen.value = false
    }

    const toggleOpen = () => {
        isOpen.value = !isOpen.value
    }

    const select = (vocaloidId) => {
        focusId.value = vocaloidId
        close()
    }

    const onDocumentPointerDown = (event) => {
        if (!isOpen.value) return
        if (rootElement.value?.contains(event.target)) return
        close()
    }

    const onKeydown = (event) => {
        if (event.key === 'Escape') close()
    }

    onMounted(() => {
        document.addEventListener('pointerdown', onDocumentPointerDown)
        document.addEventListener('keydown', onKeydown)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('pointerdown', onDocumentPointerDown)
        document.removeEventListener('keydown', onKeydown)
    })
</script>

<template>
    <div ref="rootElement" class="focus-select">
        <button
            type="button"
            class="focus-select-trigger"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
            :title="`${getVocaloidLabel(focusId)} — ${localize(LocaleKey.FOCUS_CHANGE)}`"
            @click="toggleOpen">
            <VocaloidBadge :vocaloid-id="focusId" size="lg" />
        </button>

        <div v-if="isOpen" class="focus-select-menu acrylic" role="listbox" :aria-label="localize(LocaleKey.FOCUS_CHANGE)">
            <button
                v-for="vocaloid in FOCUS_VOCALOID_LIST"
                :key="vocaloid.id"
                type="button"
                class="focus-select-option"
                role="option"
                :aria-selected="focusId === vocaloid.id"
                :class="{ 'is-active': focusId === vocaloid.id }"
                @click="select(vocaloid.id)">
                <VocaloidBadge :vocaloid-id="vocaloid.id" size="lg" />
                <span class="focus-select-copy">
                    <span class="focus-select-name">{{ getVocaloidLabel(vocaloid.id) }}</span>
                    <span class="focus-select-sub">{{ optionSubtitle(vocaloid) }}</span>
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .focus-select {
        position: relative;
        flex-shrink: 0;
    }

    .focus-select-trigger {
        display: grid;
        place-items: center;
        padding: 0.15rem;
        border-radius: 50%;
        cursor: pointer;
        transition: transform var(--duration-fast) var(--ease-soft);
    }

    .focus-select-trigger:hover {
        transform: scale(1.06);
    }

    .focus-select-trigger:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 3px;
    }

    .focus-select-trigger :deep(.vocaloid-badge-lg) {
        width: 2.6rem;
        height: 2.6rem;
    }

    .focus-select-menu {
        position: absolute;
        top: calc(100% + 0.45rem);
        left: 0;
        z-index: calc(var(--z-header) + 5);
        display: grid;
        gap: 0.2rem;
        width: min(16rem, 72vw);
        max-height: 14rem;
        overflow: auto;
        padding: 0.4rem;
        border-radius: 0.9rem;
        scrollbar-width: thin;
        scrollbar-color: var(--color-red-muted) transparent;
    }

    .focus-select-option {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        width: 100%;
        padding: 0.45rem 0.55rem;
        border-radius: 0.7rem;
        text-align: left;
        color: var(--color-ink-muted);
        cursor: pointer;
        transition:
            background-color var(--duration-fast) var(--ease-soft),
            color var(--duration-fast) var(--ease-soft);
    }

    .focus-select-option:hover,
    .focus-select-option.is-active {
        background: rgba(212, 132, 132, 0.18);
        color: var(--color-ink);
    }

    .focus-select-copy {
        display: grid;
        gap: 0.05rem;
        min-width: 0;
    }

    .focus-select-name {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
    }

    .focus-select-sub {
        font-size: var(--font-size-xs);
        color: var(--color-ink-dim);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
