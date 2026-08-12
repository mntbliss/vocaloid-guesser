import { computed } from 'vue'
import { storeToRefs } from 'pinia'


import { Language } from '@/configs/languages'
import { Vocaloid, getVocaloidMeta } from '@/configs/vocaloids'
import { trackLabel } from '@/data/tracks'
import { LocaleKey } from '@/localization/keys'
import { translate } from '@/localization/strings'
import { useSettingsStore } from '@/stores/settingsStore'

export const useLocalization = () => {
    const settings = useSettingsStore()
    const { language } = storeToRefs(settings)

    const localize = (localeKey, params = {}) => translate(language.value, localeKey, params)

    const getVocaloidLabel = (vocaloidId) => {
        const meta = getVocaloidMeta(vocaloidId)
        if (vocaloidId === Vocaloid.EVERYONE) return localize(LocaleKey.BRAND_EVERYONE)
        return language.value === Language.JAPANESE ? meta.nameJa : meta.short
    }

    const getBrandTitle = (focusVocaloidId = Vocaloid.EVERYONE) => {
        if (!focusVocaloidId || focusVocaloidId === Vocaloid.EVERYONE) {
            return localize(LocaleKey.BRAND_NAME)
        }
        return localize(LocaleKey.BRAND_GUESSER, { name: getVocaloidLabel(focusVocaloidId) })
    }

    const getTrackLabel = (track) => (track ? trackLabel(track, language.value) : '')

    return {
        language: computed(() => language.value),
        localize,
        getVocaloidLabel,
        getBrandTitle,
        getTrackLabel
    }
}
