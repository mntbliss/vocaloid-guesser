<script setup>
    import { computed } from 'vue'


    import { Vocaloid, VOCALOID_META } from '@/configs/vocaloids'

    const props = defineProps({
        vocaloidId: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            default: 'md'
        }
    })

    const meta = computed(() => VOCALOID_META[props.vocaloidId])

    const showImage = computed(() => Boolean(meta.value?.imgUrl))

    const initial = computed(() => {
        if (props.vocaloidId === Vocaloid.EVERYONE) return '?'
        return meta.value?.short?.[0] ?? '?'
    })
</script>

<template>
    <span
        class="vocaloid-badge"
        :class="`vocaloid-badge-${size}`"
        :style="{ '--badge-color': meta?.color }"
        :title="meta?.name"
        :aria-label="meta?.name">
        <img
            v-if="showImage"
            class="vocaloid-badge-img"
            :src="meta.imgUrl"
            :alt="meta.name"
            draggable="false" />
        <span v-else class="vocaloid-badge-initial">
            {{ initial }}
        </span>
    </span>
</template>

<style scoped>
    .vocaloid-badge {
        display: inline-grid;
        place-items: center;
        width: var(--badge-size);
        height: var(--badge-size);
        border-radius: 50%;
        overflow: hidden;
        background: var(--badge-color, var(--color-red));
        color: var(--color-bg);
        box-shadow:
            0 0 0 2px rgba(30, 20, 22, 0.55),
            0 0.15rem 0.35rem rgba(0, 0, 0, 0.28);
        font-weight: var(--font-weight-bold);
        line-height: 1;
        user-select: none;
    }

    .vocaloid-badge-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .vocaloid-badge-initial {
        font-size: 0.65rem;
        letter-spacing: 0;
    }

    .vocaloid-badge-sm {
        width: 1.1rem;
        height: 1.1rem;
    }

    .vocaloid-badge-sm .vocaloid-badge-initial {
        font-size: 0.55rem;
    }

    .vocaloid-badge-lg {
        width: 1.75rem;
        height: 1.75rem;
    }

    .vocaloid-badge-lg .vocaloid-badge-initial {
        font-size: 0.8rem;
    }
</style>
