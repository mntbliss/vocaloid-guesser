<script setup>
    import { computed } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { Difficulty } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const difficulty = defineModel('difficulty', { type: String, required: true })

    const props = defineProps({
        lockedDifficulty: { type: String, default: null }
    })

    const options = computed(() => [
        { value: Difficulty.EASY, localeKey: LocaleKey.EASY },
        { value: Difficulty.MEDIUM, localeKey: LocaleKey.MEDIUM },
        { value: Difficulty.HARD, localeKey: LocaleKey.HARD }
    ])

    const isLocked = computed(() => Boolean(props.lockedDifficulty))

    const selectDifficulty = (value) => {
        if (isLocked.value && value !== props.lockedDifficulty) return
        difficulty.value = value
    }
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
            :aria-disabled="isLocked && option.value !== lockedDifficulty"
            :disabled="isLocked && option.value !== lockedDifficulty"
            :class="{
                'is-active': difficulty === option.value,
                'is-locked-out': isLocked && option.value !== lockedDifficulty
            }"
            @click="selectDifficulty(option.value)">
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

    .difficulty .is-locked-out {
        opacity: 0.4;
        cursor: not-allowed;
        filter: grayscale(0.35);
    }
</style>
