import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'system')
    const isDark = ref(false)

    const setTheme = (newTheme) => {
        theme.value = newTheme
        localStorage.setItem('theme', newTheme)
        applyTheme()
    }

    const systemThemeHandler = (e) => {
        isDark.value = e.matches
        applyTheme()
    }

    const applyTheme = () => {
        const darkMode = theme.value === 'dark' ||
            (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

        document.documentElement.classList.toggle('dark', darkMode)
        isDark.value = darkMode

        // Принудительно обновляем изображения
        const images = document.querySelectorAll('img[data-theme]')
        images.forEach(img => {
            img.src = img.getAttribute(darkMode ? 'data-dark-src' : 'data-light-src')
        })
    }

    applyTheme()

    watchEffect(() => {
        if (theme.value === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            mediaQuery.addEventListener('change', systemThemeHandler)
            return () => mediaQuery.removeEventListener('change', systemThemeHandler)
        }
    })
    const isDarkTheme = computed(() => isDark.value)

    return {
        theme,
        isDark: computed(() => isDark.value),
        setTheme,
        applyTheme
    }
})