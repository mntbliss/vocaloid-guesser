<script setup>
    import { computed } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { Difficulty } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const difficulty = defineModel('difficulty', { type: String, required: true })

    const options = computed(() => [
        { value: Difficulty.EASY, localeKey: LocaleKey.EASY },
        { value: Difficulty.MEDIUM, localeKey: LocaleKey.MEDIUM },
        { value: Difficulty.HARD, localeKey: LocaleKey.HARD }
    ])
</script>

<template>
    <div class="difficulty" role="radiogroup" aria-label="Difficulty">
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="acrylic-btn"
            role="radio"
            :aria-checked="difficulty === option.value"
            :class="{ 'is-active': difficulty === option.value }"
            @click="difficulty = option.value">
            <LocalizedText :locale-key="option.localeKey" />
        </button>
    </div>
</template>

<style scoped>
    .difficulty {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--difficulty-gap);
    }
</style>
