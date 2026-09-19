<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { initTheme } = useTheme()
onMounted(() => { initTheme() })
</script>

<style>
html, body, #__nuxt {
  height: 100dvh;
  overflow: hidden;
}
</style>
