<script setup>
    import { computed } from 'vue'


    import OptionSlider from '@/components/OptionSlider.vue'
    import { SongCatalog } from '@/configs/gameConfig'
    import { LocaleKey } from '@/localization/keys'

    const catalog = defineModel('catalog', { type: String, required: true })

    const options = computed(() => [
        { value: SongCatalog.ORIGINAL, localeKey: LocaleKey.ORIGINAL_SONGS },
        { value: SongCatalog.COVER, localeKey: LocaleKey.COVERS }
    ])
</script>

<template>
    <OptionSlider v-model="catalog" :options="options" aria-label="Song catalog" />
</template>
