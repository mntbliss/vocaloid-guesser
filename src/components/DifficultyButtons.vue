<script setup>
    import { Difficulty } from '@/configs/gameConfig'

    const difficulty = defineModel('difficulty', { type: String, required: true })

    const options = [
        { value: Difficulty.EASY, label: 'Easy' },
        { value: Difficulty.MEDIUM, label: 'Medium' },
        { value: Difficulty.HARD, label: 'Hard' }
    ]
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
            {{ option.label }}
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
