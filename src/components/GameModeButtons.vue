<script setup>
    import { computed } from 'vue'


    import LocalizedText from '@/components/LocalizedText.vue'
    import { GameMode } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const gameMode = defineModel('gameMode', { type: String, required: true })

    const options = computed(() => [
        { value: GameMode.CLASSIC, localeKey: LocaleKey.MODE_CLASSIC },
        { value: GameMode.SONG_OF_THE_DAY, localeKey: LocaleKey.MODE_SONG_OF_THE_DAY },
        { value: GameMode.ENDLESS, localeKey: LocaleKey.MODE_ENDLESS }
    ])
</script>

<template>
    <div class="game-mode" role="radiogroup" aria-label="Game mode">
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="acrylic-btn"
            role="radio"
            :aria-checked="gameMode === option.value"
            :class="{ 'is-active': gameMode === option.value }"
            @click="gameMode = option.value">
            <LocalizedText :locale-key="option.localeKey" />
        </button>
    </div>
</template>

<style scoped>
    .game-mode {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--difficulty-gap);
    }
</style>
