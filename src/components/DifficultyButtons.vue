<script setup>
    import { computed } from 'vue'


    import OptionSlider from '@/components/OptionSlider.vue'
    import { Difficulty } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const difficulty = defineModel('difficulty', { type: String, required: true })

    const props = defineProps({
        lockedDifficulty: { type: String, default: null }
    })

    const options = computed(() => {
        const locked = props.lockedDifficulty
        return [
            {
                value: Difficulty.EASY,
                localeKey: LocaleKey.EASY,
                disabled: Boolean(locked && locked !== Difficulty.EASY)
            },
            {
                value: Difficulty.MEDIUM,
                localeKey: LocaleKey.MEDIUM,
                disabled: Boolean(locked && locked !== Difficulty.MEDIUM)
            },
            {
                value: Difficulty.HARD,
                localeKey: LocaleKey.HARD,
                disabled: Boolean(locked && locked !== Difficulty.HARD)
            }
        ]
    })
</script>

<template>
    <OptionSlider
        v-model="difficulty"
        :options="options"
        size="sm"
        aria-label="Difficulty" />
</template>
