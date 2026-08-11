<script setup>
    import { useLocalization } from '@/localization/useLocalization'

    const props = defineProps({
        localeKey: {
            type: String,
            required: true
        },
        params: {
            type: Object,
            default: () => ({})
        },
        tag: {
            type: String,
            default: 'span'
        }
    })

    const { localize } = useLocalization()
</script>

<template>
    <component :is="tag">{{ localize(localeKey, params) }}</component>
</template>
