<script setup>
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue'


    import { LANGUAGE_LIST, getLanguageMeta } from '@/configs/languages'
    import { LocaleKey } from '@/localization/keys'
    import { useLocalization } from '@/localization/useLocalization'

    const language = defineModel('language', { type: String, required: true })

    const { localize } = useLocalization()

    const rootElement = ref(null)
    const isOpen = ref(false)

    const activeMeta = computed(() => getLanguageMeta(language.value))

    const close = () => {
        isOpen.value = false
    }

    const toggleOpen = () => {
        isOpen.value = !isOpen.value
    }

    const select = (languageId) => {
        language.value = languageId
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
    <div ref="rootElement" class="language-select">
        <button
            type="button"
            class="language-select-trigger acrylic"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
            :title="localize(LocaleKey.LANGUAGE)"
            @click="toggleOpen">
            <img
                v-if="activeMeta.imgUrl"
                class="language-select-flag"
                :src="activeMeta.imgUrl"
                :alt="activeMeta.name"
                draggable="false"
                @error="($event) => ($event.target.style.display = 'none')" />
            <span class="language-select-fallback">{{ activeMeta.short }}</span>
        </button>

        <div v-if="isOpen" class="language-select-menu acrylic" role="listbox" :aria-label="localize(LocaleKey.LANGUAGE)">
            <button
                v-for="item in LANGUAGE_LIST"
                :key="item.id"
                type="button"
                class="language-select-option"
                role="option"
                :aria-selected="language === item.id"
                :class="{ 'is-active': language === item.id }"
                @click="select(item.id)">
                <span class="language-select-option-flag">
                    <img
                        v-if="item.imgUrl"
                        :src="item.imgUrl"
                        :alt="item.name"
                        draggable="false"
                        @error="($event) => ($event.target.style.display = 'none')" />
                    <span>{{ item.short }}</span>
                </span>
                <span>{{ item.name }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .language-select {
        position: fixed;
        top: calc(0.75rem + env(safe-area-inset-top, 0px));
        left: calc(0.75rem + env(safe-area-inset-left, 0px));
        z-index: calc(var(--z-header) + 8);
    }

    .language-select-trigger {
        position: relative;
        width: 2.15rem;
        height: 2.15rem;
        border-radius: 50%;
        overflow: hidden;
        display: grid;
        place-items: center;
        cursor: pointer;
        padding: 0;
    }

    .language-select-trigger:focus-visible {
        outline: 2px solid var(--color-red-soft);
        outline-offset: 2px;
    }

    .language-select-flag {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .language-select-fallback {
        font-size: 0.65rem;
        font-weight: var(--font-weight-bold);
        letter-spacing: 0.04em;
        color: var(--color-ink);
        z-index: 0;
    }

    .language-select-menu {
        position: absolute;
        top: calc(100% + 0.4rem);
        left: 0;
        display: grid;
        gap: 0.15rem;
        min-width: 8.5rem;
        padding: 0.35rem;
        border-radius: 0.8rem;
    }

    .language-select-option {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        width: 100%;
        padding: 0.4rem 0.5rem;
        border-radius: 0.6rem;
        color: var(--color-ink-muted);
        cursor: pointer;
        font-size: var(--font-size-sm);
        text-align: left;
    }

    .language-select-option:hover,
    .language-select-option.is-active {
        background: rgba(212, 132, 132, 0.18);
        color: var(--color-ink);
    }

    .language-select-option-flag {
        position: relative;
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 50%;
        overflow: hidden;
        display: grid;
        place-items: center;
        background: var(--color-bg-soft);
        font-size: 0.55rem;
        font-weight: var(--font-weight-bold);
        flex-shrink: 0;
    }

    .language-select-option-flag img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
