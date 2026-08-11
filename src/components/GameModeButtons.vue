<script setup>
    import { computed } from 'vue'


    import OptionSlider from '@/components/OptionSlider.vue'
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
    <OptionSlider
        v-model="gameMode"
        :options="options"
        size="lg"
        aria-label="Game mode" />
</template>
